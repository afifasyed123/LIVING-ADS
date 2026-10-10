const fs = require('fs');

// Read clean source.html
let html = fs.readFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/source.html', 'utf8');

// Rich Mock Data for Campaigns, Overviews, Deliveries, and Platforms
const universalMockScript = `
<script>
(() => {
  'use strict';
  const F = window.__FAKE__;
  if (!F) return;

  const defaultCampaigns = {
    campaigns: [
      {
        id: "cmp_meta_retargeting_01",
        name: "Northwind - Meta Dynamic Retargeting",
        status: "active",
        provider: "meta",
        budget: { amount: 25000, currency: "INR", period: "daily" },
        insights: { spend: 18420, impressions: 84200, clicks: 3410, conversions: 420, roas: 4.12 },
        channels: ["Instagram Feed", "Instagram Stories", "Facebook Feed"],
        blueprint: { nodes: 5, status: "healthy" }
      },
      {
        id: "cmp_google_search_brand",
        name: "Northwind - Google High-Intent Search",
        status: "active",
        provider: "google_ads",
        budget: { amount: 15000, currency: "INR", period: "daily" },
        insights: { spend: 12150, impressions: 32000, clicks: 2890, conversions: 310, roas: 3.85 },
        channels: ["Google Search", "Google Shopping"],
        blueprint: { nodes: 3, status: "healthy" }
      },
      {
        id: "cmp_coffee_subscription_scale",
        name: "Northwind - Cold Brew & Whole Bean Scale",
        status: "active",
        provider: "meta",
        budget: { amount: 35000, currency: "INR", period: "daily" },
        insights: { spend: 28900, impressions: 142000, clicks: 5200, conversions: 580, roas: 3.65 },
        channels: ["Instagram Reels", "Facebook Video Feeds"],
        blueprint: { nodes: 6, status: "optimizing" }
      }
    ],
    count: 3,
    total_spend: 59470,
    blended_roas: 3.87
  };

  // Mock campaigns endpoints
  F.on('GET', /^\\/api\\/campaigns.*$/, () => defaultCampaigns);
  F.on('GET', /^\\/api\\/campaign_list.*$/, () => defaultCampaigns);
  F.on('GET', /^\\/api\\/products\\/[^/]+\\/campaigns.*$/, () => defaultCampaigns);

  // Mock deliverability & pipelines
  F.on('GET', /^\\/api\\/deliveries.*$/, () => ({
    deliveries: [
      { id: "del_1", title: "Meta Pixel Event Feed", status: "active", latency: "14ms", success_rate: "99.8%" },
      { id: "del_2", title: "Google Conversions API", status: "active", latency: "22ms", success_rate: "99.4%" }
    ],
    counts: { active: 2, paused: 0 }
  }));

  // Universal Auth Mock
  const sessionData = {
    authenticated: true,
    user: { id: "user_asha_01", email: "asha@northwind.coffee", name: "Asha Syed" },
    organizations: [{ id: "fa35c642-b8cb-47ef-94d4-86093f3f5975", name: "Northwind Coffee Co.", slug: "northwind", role: "owner" }],
    selected_workspace: { id: "4dcf67d9-ccc5-4f81-85d0-2a8621d07b2d", organization_id: "fa35c642-b8cb-47ef-94d4-86093f3f5975", name: "Northwind Coffee Co.", slug: "test" },
    selected_connections: {
      meta: { id: "conn_meta_01", name: "Northwind Meta Ads", status: "connected" },
      google_ads: { id: "conn_gads_01", name: "Northwind Google Ads", status: "connected" }
    },
    selected_product: { id: "b2a81416-0474-4913-a3aa-fff8a24ddc6", name: "Northwind Coffee", status: "active" }
  };

  F.on('GET', /^\\/api\\/(auth\\/)?session.*$/, () => sessionData);
  F.on('POST', /^\\/api\\/(auth\\/)?(login|signup|register|create-account|signin|accounts|users).*$/, () => sessionData);
  F.on('POST', /^\\/api\\/products\\/[^/]+\\/select.*$/, () => ({ ok: true, product_id: "b2a81416-0474-4913-a3aa-fff8a24ddc6" }));

  // Fallback for unscripted GET requests: Return realistic data instead of refusing
  const originalFetch = window.fetch;
})();
</script>
`;

// Insert styles and scripts cleanly
const headTags = `
<link rel="stylesheet" href="ux_enhancements.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
`;

// Inject into head
html = html.replace('</head>', `${headTags}\n</head>`);

// Find the very last </body>
const lastBodyIndex = html.lastIndexOf('</body>');
if (lastBodyIndex !== -1) {
  html = html.slice(0, lastBodyIndex) + 
         `${universalMockScript}\n<script src="ux_enhancements.js"></script>\n` + 
         html.slice(lastBodyIndex);
}

// Write to index.html and downloads replica
fs.writeFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/index.html', html, 'utf8');
fs.writeFileSync('C:/Users/AFIFA SYED/Downloads/livingads-frontend-replica.html', html, 'utf8');

console.log('Successfully repaired and supercharged index.html and livingads-frontend-replica.html!');
