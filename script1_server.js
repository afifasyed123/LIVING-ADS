// The fake server. The frontend above it is the real one and only ever calls fetch() and
// EventSource; both are answered here, from responses recorded off a local synthetic backend and
// from recorded event streams. Nothing leaves the page.
(() => {
  'use strict';
  if (window.__REPLICA_MODE__ === 'record') return;
  const REC = window.__REPLICA_RECORDED__ || {};
  const nativeFetch = window.fetch ? window.fetch.bind(window) : null;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const uid = (prefix) => `${prefix}_${Math.random().toString(16).slice(2, 14)}`;
  const F = (window.__FAKE__ = {
    speed: 1,
    missing: new Map(),
    log: [],
    handlers: [],
    streams: new Map(),
    on(method, pattern, fn) { F.handlers.push({ method, pattern, fn }); },
    json(body, status = 200) { return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } }); },
    refuse(status, code, human) { return F.json({ error: code, code, human, detail: human }, status); },
    note(kind, text) { F.log.push({ at: Date.now(), kind, text }); if (F.log.length > 400) F.log.shift(); window.dispatchEvent(new CustomEvent('replica:log')); },
  });
  const wait = (ms) => sleep(F.speed === 0 ? 0 : ms / F.speed);
  F.wait = wait;

  function keyOf(method, url) {
    const params = [...url.searchParams.entries()].sort(([a], [b]) => a.localeCompare(b));
    return `${method} ${url.pathname}${params.length ? `?${new URLSearchParams(params).toString()}` : ''}`;
  }
  function fromRecord(entry) {
    const empty = entry.status === 204 || entry.status === 304;
    let body = empty ? null : entry.body;
    if (entry.binary && body) { const raw = atob(body); const bytes = new Uint8Array(raw.length); for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i); body = bytes; }
    return new Response(body, { status: entry.status, headers: entry.type ? { 'content-type': entry.type } : {} });
  }
  F.recorded = (key) => (REC[key] ? JSON.parse(REC[key].body) : null);

  async function answer(method, url, init) {
    let body = init && init.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { /* not JSON */ } }
    for (const handler of F.handlers) {
      if (handler.method !== method && handler.method !== '*') continue;
      const match = handler.pattern.exec(url.pathname);
      if (!match) continue;
      const out = await handler.fn({ match, url, body, init, method });
      if (out === undefined) continue;
      return out instanceof Response ? out : F.json(out);
    }
    const key = keyOf(method, url);
    // a brand other than the one the recording started on has its own set of answers
    if (F.brand && REC[`@${F.brand} ${key}`]) return fromRecord(REC[`@${F.brand} ${key}`]);
    if (REC[key]) return fromRecord(REC[key]);
    if (method === 'GET') {
      // the same path asked with other parameters: the nearest recorded answer
      const near = Object.keys(REC).find((k) => k === `GET ${url.pathname}` || k.startsWith(`GET ${url.pathname}?`));
      if (near) return fromRecord(REC[near]);
    }
    F.missing.set(key, (F.missing.get(key) || 0) + 1);
    F.note('missing', key);
    if (method === 'GET') return F.refuse(404, 'not_in_replica', 'This part of the product was not recorded into the replica.');
    return F.refuse(409, 'not_in_replica', 'This action is not scripted in the replica. Nothing was changed.');
  }

  window.fetch = async (input, init = {}) => {
    const raw = typeof input === 'string' ? input : input instanceof URL ? String(input) : input.url;
    const method = String(init.method || (typeof input === 'object' && input.method) || 'GET').toUpperCase();
    let url;
    try { url = new URL(raw, 'http://replica.local'); } catch { return F.refuse(400, 'bad_url', 'Bad address.'); }
    if (!url.pathname.startsWith('/api/')) {
      if (/^https?:/.test(raw) && nativeFetch) return nativeFetch(input, init);
      return new Response('', { status: 404 });
    }
    await wait(method === 'GET' ? 40 + Math.random() * 110 : 160 + Math.random() * 220);
    if (init.signal && init.signal.aborted) throw new DOMException('Aborted', 'AbortError');
    return answer(method, url, init);
  };

  // ---- EventSource --------------------------------------------------------------------------------
  class FakeEventSource {
    constructor(address) {
      this.url = String(address);
      this.readyState = 0;
      this.withCredentials = true;
      this.onopen = null; this.onmessage = null; this.onerror = null;
      this._listeners = new Map();
      this._closed = false;
      const url = new URL(this.url, 'http://replica.local');
      setTimeout(() => {
        if (this._closed) return;
        const opener = F.streams.get(url.pathname);
        if (!opener) { this.readyState = 2; this._fire('error', new Event('error')); return; }
        this.readyState = 1;
        this._fire('open', new Event('open'));
        opener(this, url);
      }, 30);
    }
    addEventListener(type, fn) { if (!this._listeners.has(type)) this._listeners.set(type, new Set()); this._listeners.get(type).add(fn); }
    removeEventListener(type, fn) { const set = this._listeners.get(type); if (set) set.delete(fn); }
    dispatchEvent(event) { this._fire(event.type, event); return true; }
    close() { this._closed = true; this.readyState = 2; }
    _fire(type, event) {
      const own = this[`on${type}`];
      if (typeof own === 'function') own.call(this, event);
      const set = this._listeners.get(type);
      if (set) [...set].forEach((fn) => fn.call(this, event));
    }
    /** One server-sent event, as the server frames it: a name, a JSON body, an id. */
    send(name, data, id) {
      if (this._closed) return;
      this._fire(name, new MessageEvent(name, { data: JSON.stringify(data), lastEventId: id ? String(id) : '' }));
    }
    /** The server closes the stream: the browser's EventSource reports an error with readyState CLOSED. */
    drop() { if (this._closed) return; this.readyState = 2; this._closed = true; this._fire('error', new Event('error')); }
  }
  FakeEventSource.CONNECTING = 0; FakeEventSource.OPEN = 1; FakeEventSource.CLOSED = 2;
  window.EventSource = FakeEventSource;
})();
