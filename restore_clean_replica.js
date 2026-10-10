const fs = require('fs');

// Read clean authentic source.html
let html = fs.readFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/source.html', 'utf8');

// Clean Universal Mock & Dynamic AI Engine for LivingADs
// This ensures every screen (Overview, Campaigns, Graph, Chat, Settings, Deliveries) works 100% without dead-ends.
const enhancedLivingAdsScript = `
<script>
(() => {
  'use strict';
  const F = window.__FAKE__;
  if (!F) return;

  // 1. Universal Session & Auth
  const defaultSession = {
    authenticated: true,
    user: { id: 'usr_asha', email: 'asha@northwind.coffee', name: 'Asha Syed' },
    organizations: [{ id: 'fa35c642-b8cb-47ef-94d4-86093f3f5975', name: 'Northwind Coffee Co.', slug: 'northwind', role: 'owner' }],
    selected_workspace: { id: '4dcf67d9-ccc5-4f81-85d0-2a8621d07b2d', organization_id: 'fa35c642-b8cb-47ef-94d4-86093f3f5975', name: 'Northwind Coffee Co.', slug: 'test' },
    selected_connections: {
      meta: { id: 'conn_meta_01', name: 'Northwind Meta Ads', status: 'connected' },
      google_ads: { id: 'conn_gads_01', name: 'Northwind Google Ads', status: 'connected' }
    },
    selected_product: { id: 'b2a81416-0474-4913-a3aa-fff8a24ddc6', name: 'Northwind Coffee', status: 'active' }
  };

  F.on('GET', /^\\/api\\/(auth\\/)?session.*$/, () => defaultSession);
  F.on('POST', /^\\/api\\/(auth\\/)?(login|signup|register|create-account|signin|accounts|users).*$/, () => defaultSession);
  F.on('POST', /^\\/api\\/products\\/[^/]+\\/select.*$/, () => ({ ok: true, product_id: 'b2a81416-0474-4913-a3aa-fff8a24ddc6' }));

  // 2. Dynamic Assistant Workflow Engine: Goal -> AI Questions -> Campaign Plan -> Edit -> Approve -> Launch
  // Intercept custom prompts when not directly recorded in replica
  const originalHistory = (window.__REPLICA_RECORDED__ && window.__REPLICA_RECORDED__['GET /api/chat/history']) ? 
    JSON.parse(window.__REPLICA_RECORDED__['GET /api/chat/history'].body) : { turns: [] };

  let dynamicTurns = [];

  F.on('POST', /^\\/api\\/chat$/, async ({ body }) => {
    const prompt = (body && body.text) || '';
    const q = prompt.toLowerCase();

    // Check if recorded turn exists
    const recordedTurn = (window.__REPLICA_TURNS__ || []).find(t => t.prompt.toLowerCase() === q);
    if (recordedTurn) {
      // Return standard recorded response
      const turnKey = \`POST /api/chat/replay/\${recordedTurn.name}\`;
      const recorded = F.recorded(turnKey);
      if (recorded) return recorded;
    }

    // Dynamic Intelligent Flow: Guided Journey
    const turnId = 'turn_' + Date.now();
    let replyText = '';
    let planCards = [];
    let approvalAction = null;

    if (q.includes('goal') || q.includes('plan') || q.includes('launch') || q.includes('scale') || q.includes('campaign') || q.includes('subscribers') || q.includes('budget')) {
      replyText = \`### 🎯 Step 1: Goal Clarification & Strategy Alignment

I have analyzed your connected channels (**Meta CAPI** & **Google Ads**) for **Northwind Coffee Co.** Here is our recommended guided journey:

1. **Target Goal:** Acquire high-LTV recurring coffee subscribers at or below **₹45 CAC**.
2. **Proposed Budget:** ₹50,000 / month split 70% Meta (Reels/Feed) + 30% Google Brand & High-Intent Search.
3. **Core Audience:** Specialty coffee lovers & 14-day cart abandoners.

---

### 📋 Step 2: Modular Campaign Plan

| Phase | Channel & Format | Target Audience | Daily Budget | Est. ROAS |
| :--- | :--- | :--- | :--- | :--- |
| **Top of Funnel (Prospecting)** | Instagram Reels (Sensory Brewing UGC) | Broad Specialty Coffee Affinity | ₹1,200/day | 3.4x |
| **Middle of Funnel (Retargeting)** | Meta Dynamic Catalog Carousel | 14-Day Add-to-Cart & ViewContent | ₹800/day | 4.8x |
| **Bottom of Funnel (High Intent)** | Google Search (Exact Brand + "Cold Brew") | In-Market Purchase Intent | ₹600/day | 4.2x |

---

### ⚡ Step 3: Interactive Approval Checkpoint
Would you like to customize any parameters (Budget, Target Location, Creative Angles) or approve this plan for deployment?\`;

      planCards = [
        {
          kind: 'turn_plan',
          steps: [
            { id: 's1', title: 'Verify Meta Pixel & CAPI event tracking (Purchase & AddToCart)', status: 'done' },
            { id: 's2', title: 'Synthesize audience cohorts & 1% high-intent lookalikes', status: 'done' },
            { id: 's3', title: 'Generate high-CTR creative angles (Sensory Chemex & Cold Brew)', status: 'done' },
            { id: 's4', title: 'Compile 5-node campaign graph blueprint into Drafts', status: 'active' },
            { id: 's5', title: 'One-click launch to Meta Marketing API & Google Ads Manager', status: 'pending' }
          ]
        }
      ];
    } else {
      replyText = \`I am your **LivingADs Autonomous Growth Strategist**. 

I have full read and write access to your connected **Meta Ads**, **Google Ads**, and **GA4** pipelines. 

**Here is what I can do right now:**
- **Audit & Diagnostics:** Identify ad fatigue, high-CPA ad sets, and funnel drop-offs.
- **Campaign Synthesis:** Draft modular blueprints (\`Goal -> Plan -> Edit -> Approve -> Launch\`).
- **Live Execution:** Adjust daily budgets, pause underperforming ads, or deploy dynamic retargeting graphs with 1-click approvals.\`;
    }

    return {
      turn_id: turnId,
      status: 'complete',
      answer: {
        text: replyText,
        cards: planCards
      },
      usage: { model_calls: 1, tool_calls: 2, tokens: 1450 }
    };
  });

  console.log('✅ LivingADs Universal Engine & Guided Journey active.');
})();
</script>
`;

// Insert the enhancement script cleanly right before the last closing </body> tag
const lastBodyIndex = html.lastIndexOf('</body>');
if (lastBodyIndex !== -1) {
  html = html.slice(0, lastBodyIndex) + `\n${enhancedLivingAdsScript}\n` + html.slice(lastBodyIndex);
}

// Write to index.html
fs.writeFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/index.html', html, 'utf8');
fs.writeFileSync('C:/Users/AFIFA SYED/Downloads/livingads-frontend-replica.html', html, 'utf8');

console.log('Successfully restored authentic LivingADs HTML copy and enabled complete workflow engine!');
