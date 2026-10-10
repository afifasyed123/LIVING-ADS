# 🚀 LivingADs Web Application Clone

A complete, self-contained clone and breakdown of the **LivingADs** AI Growth & Marketing Automation platform.

---

## 🌟 Overview & Key Capabilities

**LivingADs** is an AI-powered autonomous marketing operations suite designed for e-commerce and direct-to-consumer brands (showcased with *Northwind Coffee Co.*). It combines an intelligent agent reasoning engine, multi-channel ad orchestration (Meta & Google Ads), dynamic campaign graphs, and conversion funnel analytics.

---

## 🛠️ Extracted Features & Modules

### 1. 🤖 Autonomous AI Growth Agent
* **Real-time Event Streaming:** Replays multi-round reasoning, thinking states, tool execution timers, and intermediate thoughts.
* **Tool Calling Framework:** Autonomous data fetching, hierarchy queries, budget modification, and creative inspection.
* **Human-in-the-loop Guardrails:** Confirmation gates, policy warnings, and interactive approval cards before modifying real ad spend.
* **Conversational Context:** Multi-turn memory, conversation branching, thread history, and thread deletion.

### 2. 🎯 Pre-Recorded Interactive Scenarios (12 Built-in Turns)
1. **Direct Q&A:** Fast definition of marketing metrics (e.g., ROAS calculation and benchmarks).
2. **Meta Performance Audit:** *"What changed on Meta this week?"* — Reads Meta spend, CPA, CPM, and gives synthesized root-cause summaries.
3. **Actionable Recommendations:** *"Which of those should I pause, and why?"* — Surfaces underperforming ad sets with instant 1-click pause cards.
4. **Campaign Hierarchy Visualizer:** *"Show me the Meta campaign hierarchy"* — Renders campaigns, ad sets, and ads with status tags.
5. **Capabilities Catalog:** Agent self-diagnosis of all available integrations, read/write permissions, and tools.
6. **Funnel Leakage Analysis:** *"Where am I losing the most people in the funnel?"* — Step-by-step conversion drop-off analysis.
7. **Strategic Media Planner:** *"Write me a media plan to get paying subscribers on a ₹50,000 budget"* — Budget split across top, middle, and bottom of funnel.
8. **Campaign Graph Generation:** *"Turn that plan into a campaign and show me the graph"* — Renders node-based campaign flow pipeline.
9. **Pixel Setup & Governance:** *"Create a Meta pixel called Alpha Web Pixel"* — Triggers governance checks and interactive creation switches.
10. **Safe Budget Scaling:** *"Raise the daily budget of our best performing Meta campaign by 20%"* — Applies policy checks before scaling spend.
11. **Comprehensive Account Doctor:** *"Fix our ads"* — Deep multi-vector audit of creative fatigue, audience saturation, and bidding strategy.
12. **Creative & Multimodal Vision:** *"Is this image good enough to lead our launch ad?"* — Visual breakdown of contrast, text legibility, branding, and conversion potential.

### 3. 📊 Multi-Channel Marketing Stack
* **Meta Ads Suite:** Campaigns, Ad Sets, Ads, Custom Audiences, Conversions API, Pixel flags, and Business Manager status.
* **Google Ads & Merchant Center:** Lifecycle hierarchy, Asset groups, Performance Max diagnostics, Audience segments, and Conversion sync.
* **Funnel & Attribution:** Multi-touch funnel definition, measurement boundaries, delivery logs, contact tagging, and form catalog.
* **Workspace & Team Governance:** Role-based access control (Owner, Admin, Member), invite workflows, approval logs, and internal notification center.

### 4. 🎛️ Developer & QA Simulation Toolbar
* **Interactive Testing Panel:** Bottom overlay allowing one-click execution of any of the 12 scenarios.
* **Fault Injection Engine:** Simulate network drops, agent escalations, or execution failures.
* **Playback Speed Control:** Toggle streaming speed (1x, 2x, instant).

---

## 🚀 How to Run Locally

### Method 1: Instant Local Server (Node.js)
```bash
# In this directory:
npm start
# or
node server.js
```
Open **`http://localhost:4173`** in Chrome or your favorite browser.

### Method 2: Open Directly
Double-click **`index.html`** to run directly in any browser without needing external dependencies.
