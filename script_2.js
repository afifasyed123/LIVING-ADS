// The assistant's side of the fake server: conversations, turns and agent runs.
// A turn is a recorded event stream from the real assistant on a synthetic account, replayed
// event for event through the same EventSource the page opens in production.
(() => {
  'use strict';
  const F = window.__FAKE__;
  if (!F) return;
  const TURNS = window.__REPLICA_TURNS__ || [];
  const clone = (value) => JSON.parse(JSON.stringify(value));

  // A few turns no recording produced, written by hand in the same event format, for the cards
  // that only appear after a person has acted (a switch turned on, a question answered).
  function synth(name, prompt, { note, tools = [], text }) {
    const events = [];
    const push = (e, d, dt) => events.push({ e, d: { run_id: 'turn_synth', at: 0, ...d }, dt });
    const filler = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';
    push('phase', { phase: 'thinking' }, 30);
    push('progress', { seconds: 0, state: 'thinking', round: 1 }, 10);
    for (let i = 0; i < filler.length; i += 24) push('reasoning', { round: 1, text: filler.slice(i, i + 24) }, 90);
    push('reasoning', { round: 1, done: true, ms: 1400, waited: 900 }, 60);
    if (note) push('thinking', { text: note, step: 1 }, 200);
    tools.forEach((tool) => {
      push('progress', { seconds: 0, state: 'working', tool: tool.tool }, 150);
      push('tool_call', { tool: tool.tool, args: tool.args || [], detail: tool.detail || '' }, 20);
      push('tool_result', { tool: tool.tool, ok: tool.ok !== false, cards: tool.card ? 1 : 0, ms: tool.ms || 40 }, 600);
      if (tool.card) push('card', { card: tool.card }, 10);
    });
    push('progress', { seconds: 0, state: 'waiting', round: 2 }, 400);
    push('text', { text, withheld: false, withheld_figures: [] }, 1400);
    push('done', { turn_id: 'turn_synth', tool_calls: tools.length, cards: tools.filter((t) => t.card).length, withheld: false, rounds: 2, stopped: '' }, 10);
    return { name, prompt, thread: '', turnId: 'turn_synth', events, synthetic: true };
  }
  TURNS.push(
    synth('pixel-proposal', 'It is on now. Go ahead.', {
      note: 'Preparing the pixel change as a proposal.',
      tools: [{ tool: 'propose_meta_pixel_change', args: ['fields', 'operation', 'pixel_ref', 'reason'], ms: 180, card: { kind: 'meta_pixel_proposal', detail: 'Rename the pixel to “Northwind Web Pixel”', attempt: { operation_label: 'Rename pixel' } } }],
      text: 'The rename is prepared as a proposal. Nothing reaches Meta until a named person approves it in Measurement.',
    }),
    synth('guardrails-missing', 'Raise the daily budget on our best campaign to ₹4,000.', {
      note: 'Preparing the budget change as a proposal.',
      tools: [{ tool: 'propose_meta_action', args: ['action', 'object_ref', 'value'], ok: false, ms: 60, card: { kind: 'guardrails_missing', can_manage: true } }],
      text: 'This account has no guardrails saved, so the budget change cannot be prepared. The limits are yours to set; ask again once they are.',
    }),
    synth('after-an-answer', '(any answer to a question)', {
      note: 'Carrying on from your answer.',
      tools: [{ tool: 'get_overview', ms: 420 }],
      text: 'Thanks, that settles it. In the product the assistant carries on from your answer at this point. This replica has no recording of what followed this particular question, so the turn ends here.',
    }),
  );
  const hex = (n) => Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
  const turnNamed = (name) => TURNS.find((turn) => turn.name === name);

  const chat = (F.chat = {
    conversation: { id: '', title: '' },
    history: [],
    threads: [],
    connected: false,
    runtime: 'ok', // ok | blocked | unavailable
    next: null, // what the next message should meet: { kind: 'turn', name } | { kind: 'refuse' | 'fail' | 'escalate' | 'lost' | 'quiet' }
    outputs: {},
    follow: null, // the recorded turn that naturally follows the one just played
    runs: {},
    live: null,
  });

  // ---- state and conversations -------------------------------------------------------------------
  function stateDoc() {
    const base = F.recorded('GET /api/chat/state') || { available: true, reason: '', provider: 'bedrock', model: 'global.moonshotai.kimi-k3', transport: 'bedrock_converse', credential_source: 'deployment', runtime_state: 'configured', blocker: null, build: '', scope: { selected: true, kind: 'product' } };
    base.conversation = clone(chat.conversation);
    base.history = clone(chat.history);
    base.active_runs = Object.values(chat.runs).filter((run) => !run.ended).map((run) => ({ run_id: run.id, status: run.status, goal: run.goal, stream_url: `/api/chat/runs/${run.id}/events` }));
    if (chat.connected) base.runtime_state = 'connected';
    if (chat.runtime === 'blocked') { base.runtime_state = 'blocked'; base.blocker = { code: 'model_credits_exhausted', human: 'The provider refused the last call because the account is out of credits. Add credits there, then send again.' }; }
    if (chat.runtime === 'unavailable') { base.available = false; base.reason = 'The configured AI provider is unavailable. Analytics, playbooks, and saved boards continue to work.'; }
    if (chat.live) base.active_turn = { turn_id: chat.live.turnId, message: chat.live.message, stream_url: `/api/chat/turns/${chat.live.turnId}/events` };
    return base;
  }
  function threadsDoc() {
    const rows = chat.threads.map((thread) => ({ id: thread.id, title: thread.title, updated_at: thread.updated_at }));
    if (chat.conversation.id) rows.unshift({ id: chat.conversation.id, title: chat.conversation.title, updated_at: new Date().toISOString() });
    return { conversation: clone(chat.conversation), conversations: rows };
  }
  function stash() {
    if (!chat.conversation.id) return;
    chat.threads = chat.threads.filter((thread) => thread.id !== chat.conversation.id);
    chat.threads.unshift({ id: chat.conversation.id, title: chat.conversation.title, updated_at: new Date().toISOString(), history: chat.history, follow: chat.follow });
  }
  F.on('GET', /^\/api\/chat\/state$/, () => stateDoc());
  F.on('GET', /^\/api\/chat\/conversations$/, () => threadsDoc());
  F.on('POST', /^\/api\/chat\/conversations\/new$/, () => {
    stash();
    chat.conversation = { id: '', title: '' }; chat.history = []; chat.follow = null;
    return threadsDoc();
  });
  F.on('POST', /^\/api\/chat\/conversations\/([^/]+)\/open$/, ({ match }) => {
    const id = decodeURIComponent(match[1]);
    const thread = chat.threads.find((row) => row.id === id);
    if (!thread) return F.refuse(404, 'conversation_not_found', 'That conversation is gone.');
    stash();
    chat.threads = chat.threads.filter((row) => row.id !== id);
    chat.conversation = { id: thread.id, title: thread.title }; chat.history = thread.history; chat.follow = thread.follow || null;
    return threadsDoc();
  });
  F.on('POST', /^\/api\/chat\/conversations\/([^/]+)\/delete$/, ({ match }) => {
    const id = decodeURIComponent(match[1]);
    chat.threads = chat.threads.filter((row) => row.id !== id);
    if (chat.conversation.id === id) { chat.conversation = { id: '', title: '' }; chat.history = []; chat.follow = null; }
    return { ...threadsDoc(), deleted: true };
  });
  F.on('GET', /^\/api\/chat\/turns\/([^/]+)\/outputs$/, ({ match }) => {
    const id = decodeURIComponent(match[1]);
    const outputs = chat.outputs[id];
    if (!outputs) return F.refuse(404, 'turn_outputs_missing', "This turn's outputs are not available. A turn that is still running has stored nothing yet.");
    return { turn_id: id, fetched_at: new Date().toISOString(), current: true, outputs };
  });

  // ---- which recorded turn answers a message ------------------------------------------------------
  const plain = (text) => String(text || '').toLowerCase().replace(/[^a-z0-9₹ ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const RULES = [
    [/what can you do|what do you do|capabilit|help me/, 'capabilities'],
    [/turn that plan|into a campaign|show me the graph|campaign graph|build (the|a) campaign/, 'campaign-graph'],
    [/media plan|brief for a media plan|paying subscribers/, 'media-plan'],
    [/funnel|losing the most|drop off|dropping/, 'funnel'],
    [/which of those|should i pause|pause/, 'follow-up-pause'],
    [/what changed|this week|what happened/, 'what-changed'],
    [/hierarchy|ad sets and ads|campaign structure/, 'hierarchy'],
    [/pixel/, 'pixel-closed-switch'],
    [/budget|raise|increase|scale/, 'budget-change'],
    [/fix|improve|optimi[sz]e/, 'ambiguous'],
    [/what does|what is|mean|define|explain/, 'direct'],
  ];
  function pickScript(message, forced) {
    if (forced && forced.kind === 'turn') return { turn: turnNamed(forced.name) };
    const said = plain(message);
    const exact = TURNS.find((turn) => plain(turn.prompt) === said);
    if (exact) return { turn: exact };
    if (/^it is on now/.test(said)) return { turn: turnNamed('pixel-proposal') };
    if (chat.asked) { const next = chat.follow && turnNamed(chat.follow); chat.asked = false; return { turn: next || turnNamed('after-an-answer') }; }
    if (chat.follow && /^(yes|ok|go ahead|continue|do it)/.test(said)) return { turn: turnNamed(chat.follow) };
    for (const [pattern, name] of RULES) if (pattern.test(said) && turnNamed(name)) return { turn: turnNamed(name) };
    const direct = turnNamed('direct');
    return { turn: direct, text: 'This is the replica answering. It can only replay turns that were recorded from the real assistant: ask what changed on Meta this week, where the funnel is losing people, for a media plan, for the campaign hierarchy, or what it can do.' };
  }
  const FOLLOWS = { 'what-changed': 'follow-up-pause', 'media-plan': 'campaign-graph' };

  // ---- one turn, replayed ---------------------------------------------------------------------------
  /** What the server does when a turn ends: the message and what answered it are stored together,
   *  and a thread that had no id until now gets one. */
  function store(sent, row) {
    if (!chat.conversation.id) chat.conversation = { id: `conv_${hex(10)}`, title: String(sent.text).slice(0, 80) };
    chat.history.push(sent);
    if (row) chat.history.push(row);
  }
  async function playTurn(source, script, turnId, sent, forced) {
    const message = sent.text;
    const turn = script.turn;
    const events = turn ? turn.events : [];
    const old = turn ? turn.turnId : '';
    const started = Date.now();
    const row = { role: 'assistant', text: '', turn_id: turnId, cards: [], work: { seconds: 0, entries: [] } };
    const thoughts = new Map();
    const outputs = [];
    const openCalls = [];
    let seq = 0;
    let ended = '';
    const cutAt = forced && ['fail', 'escalate', 'lost'].includes(forced.kind) ? Math.max(3, Math.floor(events.length * 0.45)) : -1;
    chat.live = { turnId, message };
    for (let index = 0; index < events.length; index += 1) {
      const item = events[index];
      if (source._closed) break;
      if (forced && forced.kind === 'quiet' && index === 2) await F.wait(26000);
      await F.wait(Math.min(item.dt, 9000));
      if (source._closed) break;
      if (index === cutAt) {
        if (forced.kind === 'lost') { ended = 'lost'; break; }
        const data = forced.kind === 'escalate'
          ? { run_id: turnId, code: 'turn_budget_exhausted', human: 'This needs more rounds than one turn allows.', escalate: { run: true, turn_id: turnId } }
          : { run_id: turnId, code: 'model_timeout', human: 'The model stopped responding before it answered.' };
        row.role = 'error'; row.code = data.code; row.text = data.human;
        ended = 'failed';
        settle();
        source.send('failed', data, ++seq);
        break;
      }
      let data = old ? JSON.parse(JSON.stringify(item.d).split(old).join(turnId)) : clone(item.d);
      if (data && typeof data === 'object' && 'at' in data) data.at = Date.now() / 1000;
      if (item.e === 'text' && script.text) data.text = script.text;
      if (item.e === 'thinking' && data.text) row.work.entries.push({ kind: 'note', text: data.text });
      if (item.e === 'reasoning') {
        const round = data.round || 0;
        if (!thoughts.has(round)) { const entry = { kind: 'thought', round, text: '', ms: 0, waited: 0 }; thoughts.set(round, entry); row.work.entries.push(entry); }
        const entry = thoughts.get(round);
        if (data.done) { entry.ms = data.ms || 0; entry.waited = data.waited || 0; } else if (data.reset) entry.text = ''; else entry.text += data.text || '';
      }
      if (item.e === 'tool_call') openCalls.push({ tool: data.tool, detail: data.detail || '' });
      if (item.e === 'tool_result') {
        const at = openCalls.findIndex((call) => call.tool === data.tool);
        const call = at >= 0 ? openCalls.splice(at, 1)[0] : { tool: data.tool, detail: '' };
        row.work.entries.push({ kind: 'step', tool: data.tool, ok: data.ok !== false, ms: data.ms || 0, detail: call.detail });
        outputs.push({ tool: data.tool, ok: data.ok !== false, result: data.ok === false ? { refused: true } : { cards: data.cards || 0, ms: data.ms || 0 } });
      }
      if (item.e === 'card' && data.card) {
        if (data.card.kind === 'question') { row.role = 'question'; chat.asked = true; }
        const call = data.card.apply;
        if (call && call.path && F.applyPaths) F.applyPaths.add(`${String(call.method || 'PATCH').toUpperCase()} ${call.path}`);
        row.cards.push(data.card);
        const last = outputs[outputs.length - 1];
        if (last && last.ok) last.result = data.card.data || data.card;
      }
      if (item.e === 'plan') { const at = row.cards.findIndex((card) => card.kind === 'turn_plan'); const card = { kind: 'turn_plan', steps: data.steps || [] }; if (at >= 0) row.cards[at] = card; else row.cards.push(card); }
      if (item.e === 'text') { row.text = data.text || ''; row.withheld = data.withheld === true; }
      if (item.e === 'done') ended = 'done';
      if (item.e === 'failed') { ended = 'failed'; row.role = 'error'; row.code = data.code; row.text = data.human || ''; }
      if (ended) { settle(); }
      source.send(item.e, data, ++seq);
      if (ended) break;
    }
    function settle() {
      row.work.seconds = Math.round(((Date.now() - started) / 1000) * (F.speed || 1) * 10) / 10;
      chat.live = null;
      chat.outputs[turnId] = outputs;
      store(sent, row);
      if (ended === 'done') { chat.connected = true; chat.follow = turn ? FOLLOWS[turn.name] || null : chat.follow; }
    }
    chat.live = null;
    F.note('turn', `${turn ? turn.name : 'none'} · ${ended || 'closed'}`);
    if (ended === 'lost' || !ended) source.drop();
  }

  F.on('POST', /^\/api\/chat$/, ({ body }) => {
    const message = String((body && body.message) || '');
    const forced = chat.next;
    chat.next = null;
    window.dispatchEvent(new CustomEvent('replica:log'));
    if (chat.runtime === 'blocked') {
      // the real server takes the message and the model call fails
    }
    if (forced && forced.kind === 'refuse') return F.refuse(409, 'turn_in_progress', 'Another turn is still finishing for this conversation. Try again in a moment.');
    const script = pickScript(message, forced);
    const turnId = `turn_${hex(12)}`;
    const sent = { role: 'user', text: message };
    const path = `/api/chat/turns/${turnId}/events`;
    F.streams.set(path, (source) => {
      if (chat.runtime === 'blocked') {
        setTimeout(() => { store(sent, { role: 'error', code: 'model_credits_exhausted', text: 'The AI provider refused the request: credits are exhausted.', turn_id: turnId }); source.send('failed', { run_id: turnId, code: 'model_credits_exhausted', human: 'The AI provider refused the request: credits are exhausted.' }, 1); }, 700);
        return;
      }
      playTurn(source, script, turnId, sent, forced);
    });
    return { turn_id: turnId, stream_url: path };
  });

  // ---- agent runs -----------------------------------------------------------------------------------
  // Written by hand in the server's own event vocabulary (run_started, run_phase, plan, step,
  // progress, tool_call, tool_result, step_result, message, budget, approval_required,
  // approval_resolved, note, text, done, failed); no run was recorded.
  const RUN_PLAN = ['Read last month’s Meta spend', 'Find who lapsed and why', 'Draft the win-back campaign graph', 'Build the campaign draft'];
  const planOf = (done) => RUN_PLAN.map((title, i) => ({ id: `p${i + 1}`, title, status: i < done ? 'done' : i === done ? 'active' : 'pending' }));
  const budgets = { model_calls: 12, tool_calls: 40, tokens: 400000 };
  function runScript(run) {
    const say = (name, data, ms = 500) => ({ name, data, ms });
    const step = (n, title, tool, detail, tokens) => [
      say('progress', { state: 'thinking', round: n, seconds: 0 }, 400),
      say('step', { step_id: `s${n}`, title, plan_ref: `p${n}`, model: 'moonshotai.kimi-k3', at: 0 }, 600),
      say('progress', { state: 'working', round: n, tool, detail, seconds: 0 }, 300),
      say('tool_call', { tool, args: ['window'], detail, at: 0 }, 300),
      say('tool_result', { tool, ok: true, ms: 1800, at: 0 }, 1500),
      say('budget', { model_calls: n, tool_calls: n + 1, tokens, of: budgets, cost_priced: false }, 150),
      say('step_result', { step_id: `s${n}`, ok: true, note: 'done', at: 0 }, 300),
      say('plan', { steps: planOf(n) }, 250),
    ];
    return {
      open: [
        say('run_started', { goal: run.goal, budgets }, 200),
        say('run_phase', { phase: 'running' }, 400),
        say('plan', { steps: planOf(0) }, 300),
        ...step(1, RUN_PLAN[0], 'get_platform_metrics', 'Meta · last 30 days', 8400),
        say('message', { text: 'Halfway: two ad sets carried 71% of last month’s spend. Looking at who cancelled next.', at: 0 }, 700),
        ...step(2, RUN_PLAN[1], 'diagnose_funnel', 'cancellations · 6 months', 21900),
        say('approval_required', { ref: 'gate-1', kind: 'confirm', step: { id: 'p3', title: RUN_PLAN[2] }, final: false, since: '', wait_s: 0, at: 0 }, 700),
      ],
      'gate-1': [
        say('approval_resolved', { ref: 'gate-1', outcome: 'confirmed', at: 0 }, 300),
        say('run_phase', { phase: 'running' }, 300),
        ...step(3, RUN_PLAN[2], 'propose_campaign_graph', '5 nodes', 30200),
        say('approval_required', { ref: 'gate-2', kind: 'confirm', step: { id: 'p4', title: RUN_PLAN[3] }, final: true, since: '', wait_s: 0, at: 0 }, 700),
      ],
      'gate-2': [
        say('approval_resolved', { ref: 'gate-2', outcome: 'confirmed', at: 0 }, 300),
        say('run_phase', { phase: 'running' }, 300),
        ...step(4, RUN_PLAN[3], 'build_campaign', 'draft', 36800),
        say('text', { text: 'The audit is done and the win-back campaign is a draft.\n\n- Two ad sets carried 71% of last month’s Meta spend.\n- Most people who cancelled left in their second month.\n- The draft has five blocks and has not been sent anywhere. It waits in Campaigns for review.' }, 600),
        say('done', { outcome: 'complete', usage: { model_calls: 4, tool_calls: 6, tokens: 36800 } }, 300),
      ],
    };
  }
  async function playRun(run, part) {
    for (const item of run.script[part] || []) {
      await F.wait(item.ms);
      if (run.ended) return;
      const data = clone(item.data);
      if (data && 'at' in data) data.at = Date.now() / 1000;
      if (item.name === 'run_phase') run.status = data.phase;
      if (item.name === 'approval_required') { run.status = 'awaiting_approval'; run.gate = data.ref; }
      if (item.name === 'done' || item.name === 'failed') { run.ended = true; run.status = item.name; }
      run.events.push({ name: item.name, data, id: run.events.length + 1 });
      run.sources.forEach((source) => source.send(item.name, data, run.events.length));
    }
  }
  function endRun(run, name, data) {
    run.ended = true; run.status = name;
    run.events.push({ name, data, id: run.events.length + 1 });
    run.sources.forEach((source) => source.send(name, data, run.events.length));
  }
  function startRun(goal) {
    const run = { id: `run_${hex(8)}`, goal, status: 'queued', events: [], sources: new Set(), ended: false, gate: '' };
    run.script = runScript(run);
    chat.runs[run.id] = run;
    F.streams.set(`/api/chat/runs/${run.id}/events`, (source) => {
      run.sources.add(source);
      run.events.forEach((event) => source.send(event.name, event.data, event.id)); // the bus replays, then follows
    });
    playRun(run, 'open');
    F.note('run', `started · ${goal.slice(0, 60)}`);
    return { run_id: run.id, status: 'queued', goal, stream_url: `/api/chat/runs/${run.id}/events` };
  }
  F.on('POST', /^\/api\/chat\/runs$/, ({ body }) => {
    const goal = String((body && body.goal) || '') || (chat.history.filter((row) => row.role === 'user').pop() || {}).text || 'Carry this goal on in the background';
    if (body && body.goal) store({ role: 'user', text: goal }, null);
    return startRun(goal);
  });
  F.on('POST', /^\/api\/chat\/runs\/([^/]+)\/confirm$/, ({ match, body }) => {
    const run = chat.runs[decodeURIComponent(match[1])];
    if (!run || run.ended) return F.refuse(409, 'run_not_waiting', 'This run is not waiting any more.');
    const gate = run.gate; run.gate = '';
    if (body && body.decision === 'stop') { endRun(run, 'done', { outcome: 'cancelled', usage: {} }); return { ok: true }; }
    playRun(run, gate);
    return { ok: true };
  });
  F.on('POST', /^\/api\/chat\/runs\/([^/]+)\/cancel$/, ({ match }) => {
    const run = chat.runs[decodeURIComponent(match[1])];
    if (run && !run.ended) setTimeout(() => endRun(run, 'done', { outcome: 'cancelled', usage: {} }), 600 / (F.speed || 1));
    return { ok: true, status: 'cancelling' };
  });
  F.on('POST', /^\/api\/chat\/runs\/([^/]+)\/note$/, ({ match, body }) => {
    const run = chat.runs[decodeURIComponent(match[1])];
    const text = String((body && (body.text || body.note)) || '');
    if (run && !run.ended && text) setTimeout(() => { const data = { text, at: Date.now() / 1000 }; run.events.push({ name: 'note', data, id: run.events.length + 1 }); run.sources.forEach((source) => source.send('note', data, run.events.length)); }, 300);
    return { ok: true };
  });
  F.on('GET', /^\/api\/chat\/runs\/([^/]+)$/, ({ match }) => {
    const run = chat.runs[decodeURIComponent(match[1])];
    if (!run) return F.refuse(404, 'run_not_found', 'That run is gone.');
    return { run_id: run.id, status: run.ended ? 'done' : run.status, goal: run.goal, outcome: run.ended ? 'complete' : '', steps: [], plan: [], budgets, usage: {} };
  });
})();

;
// What the fake server does when the page changes something, for the actions worth scripting.
// Anything else that writes gets an honest refusal from fake-backend.js.
(() => {
  'use strict';
  const F = window.__FAKE__;
  if (!F) return;
  const WRITES = window.__REPLICA_WRITES__ || {};
  const recordedWrite = (key) => (WRITES[key] ? JSON.parse(WRITES[key].body || '{}') : null);

  // ---- signing in and out ------------------------------------------------------------------------
  const auth = (F.auth = { signedIn: true });
  F.on('GET', /^\/api\/auth\/session$/, () => (auth.signedIn ? undefined : { authenticated: false, user: null, organizations: [], selected_workspace: null }));
  F.on('GET', /^\/api\/session$/, () => (auth.signedIn ? undefined : { enabled: false, authenticated: false, door: null, brand_id: '' }));
  F.on('POST', /^\/api\/auth\/(login|signup|register)$/, () => { auth.signedIn = true; return recordedWrite('POST /api/auth/login') || F.recorded('GET /api/auth/session') || { authenticated: true }; });
  F.on('POST', /^\/api\/(auth\/)?logout$/, () => { auth.signedIn = false; return { ok: true }; });

  // ---- which brand the session has selected -------------------------------------------------------
  F.on('POST', /^\/api\/products\/([^/]+)\/select$/, ({ match }) => {
    F.brand = decodeURIComponent(match[1]);
    F.note('brand', F.brand);
    return recordedWrite(`POST /api/products/${F.brand}/select`) || { ok: true, product_id: F.brand };
  });

  // ---- the switches a card can turn on --------------------------------------------------------------
  const flags = (F.flags = {});
  const flagRoute = /^\/api\/platforms\/meta\/(pixels|audience-access|business)\/flags$/;
  const flagDoc = (url) => {
    const doc = F.recorded(`GET ${url.pathname}`) || { data: {} };
    doc.data = doc.data || {};
    doc.data.flags = { ...(doc.data.flags || {}), ...flags };
    // a route that reports one switch by name says so in flag / flag_open
    if (doc.data.flag && flags[doc.data.flag] !== undefined) doc.data.flag_open = flags[doc.data.flag];
    doc.data.can_manage_flags = true;
    return doc;
  };
  F.on('GET', flagRoute, ({ url }) => flagDoc(url));
  F.on('POST', flagRoute, ({ url, body }) => {
    for (const [key, value] of Object.entries(body || {})) if (key !== 'confirmed') flags[key] = value === true;
    return flagDoc(url);
  });

  // ---- a proposal a person approves ------------------------------------------------------------------
  // The card carries its own call (method, path, body). Paths seen on cards are remembered as they
  // stream past, so approving one succeeds and the audit line under it has something to show.
  const applied = [];
  F.applyPaths = new Set();
  F.on('*', /^\/api\//, ({ method, url }) => {
    if (method === 'GET' || !F.applyPaths.has(`${method} ${url.pathname}`)) return undefined;
    applied.push({ action: 'proposal.applied', target_type: 'campaign', target_id: url.pathname.split('/')[3] || '', at: new Date().toISOString() });
    return { ok: true, applied: true, job: { state: 'queued', goc_job_id: 'job_replica_1' } };
  });
  F.on('GET', /^\/api\/chat\/audit$/, () => ({ events: applied.slice(-3).reverse() }));

  // ---- anything recorded as a write is answered the way the real server answered it ---------------
  F.on('*', /^\/api\//, ({ method, url }) => {
    if (method === 'GET') return undefined;
    const body = recordedWrite(`${method} ${url.pathname}`);
    return body === null ? undefined : body;
  });
})();

;
// The one thing on the page that is not the product: a small tab on the right edge with the
// replica's controls. It lives in its own shadow root outside <body>, so it neither styles the
// product nor is styled by it. Add "noreplica" to the address after "#" options, or press
// "Hide", to be rid of it.
(() => {
  'use strict';
  const F = window.__FAKE__;
  if (!F || !F.chat) return;
  // settings that should survive a reload travel in window.name, which needs no storage
  let kept = {};
  try { kept = JSON.parse(window.name || '{}').replica || {}; } catch { kept = {}; }
  const keep = (patch) => { kept = { ...kept, ...patch }; try { window.name = JSON.stringify({ replica: kept }); } catch { /* fine */ } };
  if (kept.runtime) F.chat.runtime = kept.runtime;
  if (kept.speed !== undefined) F.speed = kept.speed;
  if (kept.hidden) return;

  const TURNS = window.__REPLICA_TURNS__ || [];
  const host = document.createElement('div');
  host.setAttribute('data-replica-controls', '');
  host.style.cssText = 'position:fixed;top:0;right:0;z-index:2147483000;';
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>
    :host { all: initial; }
    * { box-sizing: border-box; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
    .tab { position: fixed; right: 0; top: 46%; transform: translateY(-50%); writing-mode: vertical-rl; padding: 10px 6px; border: 0; border-radius: 8px 0 0 8px; background: #17152a; color: #f3f1ff; font-size: 11px; font-weight: 600; letter-spacing: .06em; cursor: pointer; opacity: .82; }
    .tab:hover { opacity: 1; }
    .panel { position: fixed; top: 12px; right: 12px; bottom: 12px; width: min(340px, calc(100vw - 24px)); display: flex; flex-direction: column; border-radius: 14px; background: #17152a; color: #f3f1ff; box-shadow: 0 20px 70px rgba(10, 8, 30, .45); font-size: 12px; line-height: 1.45; overflow: hidden; }
    .panel[hidden] { display: none; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px 14px; border-bottom: 1px solid #38345a; }
    header b { font-size: 13px; }
    .body { flex: 1 1 auto; overflow-y: auto; padding: 12px 14px; display: grid; gap: 14px; align-content: start; }
    h4 { margin: 0 0 6px; color: #b7b2d6; font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
    p { margin: 0; color: #b7b2d6; }
    p b { color: #f3f1ff; font-weight: 600; }
    .list { display: grid; gap: 4px; }
    button.row { display: block; width: 100%; padding: 7px 9px; border: 1px solid #38345a; border-radius: 8px; background: #23203b; color: #f3f1ff; font-size: 12px; text-align: left; cursor: pointer; }
    button.row:hover { border-color: #b7b2d6; }
    button.row small { display: block; color: #b7b2d6; font-size: 10.5px; }
    button.row[aria-pressed="true"] { border-color: #7be0b0; }
    .seg { display: inline-flex; padding: 2px; border: 1px solid #38345a; border-radius: 8px; background: #23203b; }
    .seg button { padding: 3px 9px; border: 0; border-radius: 6px; background: transparent; color: #b7b2d6; font-size: 11px; font-weight: 600; cursor: pointer; }
    .seg button[aria-pressed="true"] { background: #f3f1ff; color: #17152a; }
    .x { border: 0; background: none; color: #b7b2d6; font-size: 12px; cursor: pointer; }
    .x:hover { color: #f3f1ff; }
    .armed { padding: 6px 9px; border-radius: 8px; background: #ffc857; color: #2b1e00; font-weight: 600; }
    .armed[hidden] { display: none; }
    ul { margin: 4px 0 0; padding-left: 16px; color: #b7b2d6; }
  </style>
  <button class="tab" type="button" aria-expanded="false">REPLICA CONTROLS</button>
  <section class="panel" hidden aria-label="Replica controls">
    <header><b>Replica controls</b><span><button class="x" data-do="hide" type="button">Hide for good</button> · <button class="x" data-do="close" type="button">Close</button></span></header>
    <div class="body">
      <div><p><b>The screens are the product's own code and stylesheets.</b> Only the server is fake: screens show data recorded from a synthetic account, and the assistant replays turns recorded from the real assistant, with the model's own notes replaced by placeholder text.</p></div>
      <div><h4>Play a recorded turn</h4><div class="list" data-list="turns"></div></div>
      <div><h4>Make a turn go wrong</h4><p class="armed" hidden></p><div class="list" data-list="faults"></div></div>
      <div><h4>The assistant's runtime (reloads the page)</h4><div class="seg" data-seg="runtime"><button data-v="ok" type="button">Connected</button><button data-v="blocked" type="button">Blocked</button><button data-v="unavailable" type="button">Unavailable</button></div></div>
      <div><h4>Replay speed</h4><div class="seg" data-seg="speed"><button data-v="1" type="button">Real time</button><button data-v="2" type="button">2×</button><button data-v="4" type="button">4×</button><button data-v="12" type="button">12×</button></div></div>
      <div><h4>Not recorded</h4><p>A screen or button the recording never touched says so in the product's own error slot. So far in this session: <b data-count>0</b>.</p><ul data-missing></ul></div>
    </div>
  </section>`;
  const $ = (selector) => root.querySelector(selector);
  const panel = $('.panel');
  const tab = $('.tab');
  const armed = $('.armed');
  const LABELS = { direct: 'A direct answer', 'what-changed': 'Reads Meta, several steps, a reply with figures held back', 'follow-up-pause': 'A follow-up in the same conversation', hierarchy: 'Many cards of one kind', capabilities: 'The capabilities card', funnel: 'Two cards and a short reply', 'media-plan': 'A plan, then stops on one question', 'campaign-graph': 'A long turn: plan, graph proposal, a page to open', 'pixel-closed-switch': 'Stopped by a switch that is off', 'budget-change': 'Many reads, then a question', ambiguous: 'A vague request', 'image-attached': 'A message about an attached image' };
  const FAULTS = [
    ['refuse', 'The server refuses the message', 'Nothing starts; the words come back with Try again'],
    ['fail', 'The model fails mid-turn', 'Stopped, with the work so far kept'],
    ['escalate', 'Too big for one turn', 'Offers to continue as an agent run'],
    ['lost', 'The connection drops', 'A plain line says so'],
    ['quiet', 'The server goes quiet', 'After 20 seconds the status line says no signal'],
  ];

  /** Type into the product's own composer and press its own send button. */
  async function sendThroughPage(text) {
    const moved = !document.querySelector('.chat-form textarea');
    if (moved) { window.location.hash = '#/assistant'; }
    for (let i = 0; i < 60 && !document.querySelector('.chat-form textarea'); i += 1) await new Promise((r) => setTimeout(r, 100));
    // the page reads the brand's thread when it appears; a message typed before that has landed is overwritten by it
    if (moved) await new Promise((r) => setTimeout(r, 1200));
    const box = document.querySelector('.chat-form textarea');
    if (!box) return;
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
    setter.call(box, text);
    box.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 60));
    const form = box.closest('form');
    if (form && form.requestSubmit) form.requestSubmit(); else box.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true }));
  }
  F.sendThroughPage = sendThroughPage;

  $('[data-list="turns"]').innerHTML = TURNS.map((turn) => `<button class="row" type="button" data-turn="${turn.name}">${turn.prompt.replace(/</g, '&lt;')}<small>${LABELS[turn.name] || turn.name} · ${Math.round(turn.events.reduce((n, e) => n + e.dt, 0) / 1000)} s in real time</small></button>`).join('');
  $('[data-list="faults"]').innerHTML = FAULTS.map(([kind, label, note]) => `<button class="row" type="button" data-fault="${kind}">${label}<small>${note}</small></button>`).join('');
  function sync() {
    root.querySelectorAll('[data-seg="runtime"] button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === F.chat.runtime)));
    root.querySelectorAll('[data-seg="speed"] button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.v) === F.speed)));
    const missing = [...F.missing.keys()];
    $('[data-count]').textContent = String(missing.length);
    $('[data-missing]').innerHTML = missing.slice(-8).map((key) => `<li>${key.replace(/</g, '&lt;').slice(0, 80)}</li>`).join('');
    armed.hidden = !F.chat.next;
    if (F.chat.next) armed.textContent = `Armed: the next message will meet “${(FAULTS.find(([kind]) => kind === F.chat.next.kind) || ['', F.chat.next.kind])[1]}”.`;
  }
  window.addEventListener('replica:log', sync);
  root.addEventListener('click', (event) => {
    const el = event.target.closest('button');
    if (!el) return;
    if (el === tab) { panel.hidden = false; tab.hidden = true; sync(); return; }
    if (el.dataset.do === 'close') { panel.hidden = true; tab.hidden = false; return; }
    if (el.dataset.do === 'hide') { keep({ hidden: true }); host.remove(); return; }
    if (el.dataset.turn) { F.chat.next = { kind: 'turn', name: el.dataset.turn }; const turn = TURNS.find((t) => t.name === el.dataset.turn); panel.hidden = true; tab.hidden = false; sendThroughPage(turn.prompt); return; }
    if (el.dataset.fault) { F.chat.next = { kind: el.dataset.fault }; sync(); panel.hidden = true; tab.hidden = false; sendThroughPage('What changed on Meta this week?'); return; }
    const seg = el.closest('[data-seg]');
    if (seg && seg.dataset.seg === 'speed') { F.speed = Number(el.dataset.v); keep({ speed: F.speed }); sync(); return; }
    if (seg && seg.dataset.seg === 'runtime') { keep({ runtime: el.dataset.v }); window.location.hash = '#/assistant'; window.location.reload(); }
  });
  const mount = () => document.documentElement.appendChild(host);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  sync();
})();
