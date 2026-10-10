/**
 * Living Ads — Autonomous Marketing & Growth Platform Engine
 * Award-Winning Hackathon UX: Real Ad Previews, Interactive Device Simulator,
 * Dynamic Audience Breakdown & Organic Floating Toasts
 */

(function () {
  'use strict';

  // Application State
  const state = {
    currentTab: 'journey',
    currentStep: 1,
    personaMode: 'beginner',
    selectedGoal: 'subscribers',
    selectedFormat: 'feed',
    qAudience: 'both',
    qCac: 45,
    qBudget: 30000,
    metaBudget: 1000,
    retargetBudget: 450,
    targetAgeMin: 26,
    targetAgeMax: 52,
    campaignFilter: 'all',
    campaigns: [
      {
        id: 'camp-1',
        name: "Children's Retreat in Bali",
        sku: 'Holistic Nature & Creative Learning',
        platform: 'Meta & Instagram',
        status: 'live',
        spend: '₹12,480',
        budget: '₹30,000',
        clicks: '2,140 clicks',
        conversions: '186 signups',
        image: 'retreat_bali_ad.jpg'
      },
      {
        id: 'camp-2',
        name: 'Northwind Pour-Over Ritual',
        sku: 'Single-Origin Chemex Whole Bean',
        platform: 'Meta Reels UGC',
        status: 'live',
        spend: '₹18,400',
        budget: '₹45,000',
        clicks: '3,840 clicks',
        conversions: '580 signups',
        image: 'specialty_coffee_ad.jpg'
      },
      {
        id: 'camp-3',
        name: 'Google Exact Brand Search',
        sku: 'High-Intent Subscription Search',
        platform: 'Google Search Ads',
        status: 'live',
        spend: '₹7,500',
        budget: '₹15,000',
        clicks: '1,420 clicks',
        conversions: '310 signups',
        image: 'specialty_coffee_ad.jpg'
      },
      {
        id: 'camp-4',
        name: 'Meditation & Breathwork Workshop',
        sku: 'Weekend Immersive Series',
        platform: 'Meta Catalog',
        status: 'paused',
        spend: '₹8,150',
        budget: '₹15,000',
        clicks: '980 clicks',
        conversions: '42 signups',
        image: 'retreat_bali_ad.jpg'
      },
      {
        id: 'camp-5',
        name: 'Yoga Teacher Training 200hr',
        sku: 'Early Bird Cohort Certification',
        platform: 'Meta & Google Ads',
        status: 'attention',
        spend: '₹5,200',
        budget: '₹20,000',
        clicks: '890 clicks',
        conversions: '72 signups',
        image: 'retreat_bali_ad.jpg'
      },
      {
        id: 'camp-6',
        name: 'App Launch — Morning Ritual',
        sku: 'Daily Brew Tracker Subscription',
        platform: 'Instagram Reels',
        status: 'paused',
        spend: '₹3,420',
        budget: '₹10,000',
        clicks: '420 clicks',
        conversions: '38 signups',
        image: 'specialty_coffee_ad.jpg'
      }
    ]
  };

  // -----------------------------------------------------------------
  // 1. FLOATING TOAST NOTIFICATION ENGINE
  // -----------------------------------------------------------------
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'organic-toast-pill';
    toast.innerHTML = `<span>🌿</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.95)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // -----------------------------------------------------------------
  // 2. INITIALIZATION
  // -----------------------------------------------------------------
  function init() {
    setupTabRouter();
    setupPromptBanner();
    setupJourneyStepper();
    setupAdFormatSwitcher();
    setupMobileSimulatorModal();
    setupAudienceDemographicsModule();
    setupProgressiveDisclosure();
    setupAIStrategistChat();
    setupCampaignsList();
    initRevenueChart();

    showToast('Autonomous AI Marketing Engine Active (12ms latency)');
  }

  // -----------------------------------------------------------------
  // 3. TAB ROUTER
  // -----------------------------------------------------------------
  function setupTabRouter() {
    const navItems = document.querySelectorAll('.nav-item');
    const viewPanels = document.querySelectorAll('.view-panel');
    const viewTitle = document.getElementById('current-view-name');

    navItems.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        state.currentTab = tab;

        navItems.forEach((n) => n.classList.toggle('active', n === btn));
        viewPanels.forEach((p) => p.classList.toggle('active', p.id === `view-${tab}`));

        const titleSpan = btn.querySelector('.nav-title');
        if (titleSpan && viewTitle) viewTitle.textContent = titleSpan.textContent;

        if (tab === 'bento-overview') {
          setTimeout(initRevenueChart, 80);
        }
      });
    });

    document.getElementById('btn-quick-audit-top')?.addEventListener('click', () => {
      document.querySelector('.nav-item[data-tab="assistant"]')?.click();
      handleAIChatMessage('Perform a full proactive audit across Meta, Instagram, and Google Ads');
    });
  }

  // -----------------------------------------------------------------
  // 4. NATURAL LANGUAGE PROMPT BANNER
  // -----------------------------------------------------------------
  function setupPromptBanner() {
    const promptInput = document.getElementById('campaign-goal-prompt');
    const submitBtn = document.getElementById('btn-submit-prompt');
    const exampleBtns = document.querySelectorAll('.example-pill-btn');

    function applyGoalPrompt(text) {
      if (!text) return;
      promptInput.value = text;

      const previewTitle = document.getElementById('preview-title');
      const previewDesc = document.getElementById('preview-caption');
      const previewImg = document.getElementById('preview-ad-img');
      const simImg = document.getElementById('sim-post-img');
      const simCaption = document.getElementById('sim-caption-text');

      if (text.toLowerCase().includes('coffee') || text.toLowerCase().includes('pour-over')) {
        const cTitle = 'Northwind Pour-Over Ritual';
        const cDesc = 'Artisan micro-batch whole bean subscription delivered fresh to your door.';
        if (previewTitle) previewTitle.textContent = cTitle;
        if (previewDesc) previewDesc.textContent = cDesc;
        if (previewImg) previewImg.src = 'specialty_coffee_ad.jpg';
        if (simImg) simImg.src = 'specialty_coffee_ad.jpg';
        if (simCaption) simCaption.textContent = cDesc;
        showToast(`AI formulated campaign: "${cTitle}" (₹45,000 budget split)`);
      } else {
        const rTitle = "Children's Retreat in Bali";
        const rDesc = 'A magical learning retreat for children in the heart of Bali. Nature immersion & creative learning.';
        if (previewTitle) previewTitle.textContent = rTitle;
        if (previewDesc) previewDesc.textContent = rDesc;
        if (previewImg) previewImg.src = 'retreat_bali_ad.jpg';
        if (simImg) simImg.src = 'retreat_bali_ad.jpg';
        if (simCaption) simCaption.textContent = rDesc;
        showToast(`AI formulated campaign: "${rTitle}" (Target ROAS 3.89x)`);
      }

      const stage1 = document.getElementById('stage-1');
      if (stage1) {
        stage1.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    submitBtn?.addEventListener('click', () => {
      applyGoalPrompt(promptInput.value.trim());
    });

    promptInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        applyGoalPrompt(promptInput.value.trim());
      }
    });

    exampleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-goal-text');
        applyGoalPrompt(text);
      });
    });
  }

  // -----------------------------------------------------------------
  // 5. STEPPER & GUIDED JOURNEY
  // -----------------------------------------------------------------
  function setupJourneyStepper() {
    const stepItems = document.querySelectorAll('.step-item');
    const stageCards = document.querySelectorAll('.stage-card');

    function goToStep(stepNum) {
      state.currentStep = stepNum;

      stepItems.forEach((item) => {
        const s = parseInt(item.getAttribute('data-step'), 10);
        item.classList.toggle('active', s === stepNum);
        item.classList.toggle('completed', s < stepNum);
      });

      stageCards.forEach((card) => {
        card.classList.toggle('active', card.id === `stage-${stepNum}`);
      });

      const badge = document.getElementById('preview-status-badge');
      if (badge) {
        badge.textContent = stepNum === 6 ? 'Live' : 'Draft';
        badge.style.color = stepNum === 6 ? '#15803D' : '#737E76';
      }

      showToast(`Advanced to Step 0${stepNum} • ${stepNum === 6 ? 'Deployment Active' : 'Calibrated'}`);
    }

    stepItems.forEach((item) => {
      item.addEventListener('click', () => {
        const s = parseInt(item.getAttribute('data-step'), 10);
        goToStep(s);
      });
    });

    // Step 1: Goal Selection
    document.querySelectorAll('.goal-card').forEach((card) => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.goal-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        state.selectedGoal = card.getAttribute('data-goal');

        const title = card.querySelector('.goal-title')?.textContent;
        const previewTitle = document.getElementById('preview-title');
        const previewImg = document.getElementById('preview-ad-img');
        const simImg = document.getElementById('sim-post-img');

        if (previewTitle && title) previewTitle.textContent = title;
        const targetImg = state.selectedGoal.includes('coffee') ? 'specialty_coffee_ad.jpg' : 'retreat_bali_ad.jpg';
        if (previewImg) previewImg.src = targetImg;
        if (simImg) simImg.src = targetImg;

        showToast(`Target goal updated: ${title}`);
      });
    });

    document.getElementById('btn-to-stage-2')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btn-back-to-1')?.addEventListener('click', () => goToStep(1));

    // Step 2: Details & Audience Chips
    document.querySelectorAll('.chip-btn').forEach((chip) => {
      chip.addEventListener('click', () => {
        const parent = chip.closest('.chip-group');
        parent.querySelectorAll('.chip-btn').forEach((b) => b.classList.remove('active'));
        chip.classList.add('active');

        const qType = parent.getAttribute('data-q');
        const val = chip.getAttribute('data-val');

        if (qType === 'audience') {
          state.qAudience = val;
          const audEl = document.getElementById('preview-audience');
          if (audEl) {
            audEl.textContent = val === 'parents' ? 'Parents (Ages 28–48)' :
                                val === 'educators' ? 'Educators & Teachers' :
                                'Parents + Educators (Ages 28–50)';
          }
          showToast(`Target audience: ${val.toUpperCase()}`);
        }
        if (qType === 'budget') {
          state.qBudget = parseInt(val, 10);
          const bEl = document.getElementById('preview-budget');
          if (bEl) bEl.textContent = `₹${parseInt(val, 10).toLocaleString()}`;
          showToast(`Total budget set: ₹${parseInt(val, 10).toLocaleString()}`);
        }
        if (qType === 'cac') {
          state.qCac = parseInt(val, 10);
          showToast(`Target CAC cap set: ₹${val}`);
        }

        recalculateProjections();
      });
    });

    document.getElementById('btn-to-stage-3')?.addEventListener('click', () => goToStep(3));
    document.getElementById('btn-back-to-2')?.addEventListener('click', () => goToStep(2));

    // Step 3: Plan Review
    document.getElementById('btn-to-stage-4')?.addEventListener('click', () => goToStep(4));
    document.getElementById('btn-back-to-3')?.addEventListener('click', () => goToStep(3));

    // Step 4: Sliders & Parameter Customization
    const sliderMeta = document.getElementById('slider-meta');
    const valMeta = document.getElementById('val-meta-budget');
    sliderMeta?.addEventListener('input', (e) => {
      valMeta.textContent = `₹${parseInt(e.target.value, 10).toLocaleString()} / day`;
      state.metaBudget = parseInt(e.target.value, 10);
      recalculateProjections();
    });

    const sliderRetarget = document.getElementById('slider-retarget');
    const valRetarget = document.getElementById('val-retarget-budget');
    sliderRetarget?.addEventListener('input', (e) => {
      valRetarget.textContent = `₹${parseInt(e.target.value, 10).toLocaleString()} / day`;
      state.retargetBudget = parseInt(e.target.value, 10);
      recalculateProjections();
    });

    // Creative Angle Toggles
    document.querySelectorAll('.creative-toggle').forEach((t) => {
      t.addEventListener('click', () => {
        t.classList.toggle('active');
        const activeCount = document.querySelectorAll('.creative-toggle.active').length;
        showToast(`Active creative angles: ${activeCount} variations`);
      });
    });

    document.getElementById('btn-to-stage-5')?.addEventListener('click', () => goToStep(5));
    document.getElementById('btn-back-to-4')?.addEventListener('click', () => goToStep(4));

    // Step 5: Approval & Launch
    document.getElementById('btn-execute-launch')?.addEventListener('click', () => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#15803D', '#B93F00', '#18231C', '#FAF7F2']
        });
      }
      goToStep(6);
      showToast('🚀 Campaign deployed to Meta Marketing API and Google Ads Manager!');
    });
  }

  function recalculateProjections() {
    const totalDaily = state.metaBudget + state.retargetBudget + 250;
    const monthlySpend = totalDaily * 30;
    const projectedRev = Math.round(monthlySpend * 3.89);

    const spendCapEl = document.getElementById('review-spend-cap');
    const projRevEl = document.getElementById('review-projected-rev');
    const previewBudget = document.getElementById('preview-budget');

    if (spendCapEl) spendCapEl.textContent = `₹${monthlySpend.toLocaleString()}`;
    if (projRevEl) projRevEl.textContent = `₹${projectedRev.toLocaleString()}`;
    if (previewBudget) previewBudget.textContent = `₹${monthlySpend.toLocaleString()}`;
  }

  // -----------------------------------------------------------------
  // 6. AD FORMAT SWITCHER (FEED / REELS / GOOGLE AD)
  // -----------------------------------------------------------------
  function setupAdFormatSwitcher() {
    const tabs = document.querySelectorAll('.af-tab');
    const mediaContainer = document.getElementById('preview-media-container');
    const reelsUI = document.getElementById('reels-overlay-ui');
    const googleAdBox = document.getElementById('google-search-preview-box');
    const socialBox = document.getElementById('social-ad-content-box');
    const sponsorTag = document.getElementById('preview-sponsor-tag');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const format = tab.getAttribute('data-format');
        state.selectedFormat = format;

        if (format === 'feed') {
          if (mediaContainer) mediaContainer.style.display = 'block';
          if (reelsUI) reelsUI.style.display = 'none';
          if (googleAdBox) googleAdBox.style.display = 'none';
          if (socialBox) socialBox.style.display = 'block';
          if (sponsorTag) sponsorTag.textContent = 'Sponsored • Meta Ads';
          showToast('Switched preview to Meta Instagram Feed Post');
        } else if (format === 'reels') {
          if (mediaContainer) mediaContainer.style.display = 'block';
          if (reelsUI) reelsUI.style.display = 'flex';
          if (googleAdBox) googleAdBox.style.display = 'none';
          if (socialBox) socialBox.style.display = 'block';
          if (sponsorTag) sponsorTag.textContent = 'Sponsored Reel • Instagram';
          showToast('Switched preview to Instagram Reels / Stories');
        } else if (format === 'search') {
          if (mediaContainer) mediaContainer.style.display = 'none';
          if (googleAdBox) googleAdBox.style.display = 'block';
          if (socialBox) socialBox.style.display = 'none';
          showToast('Switched preview to Google Exact Search Ad');
        }
      });
    });
  }

  // -----------------------------------------------------------------
  // 7. MOBILE DEVICE SIMULATOR MODAL
  // -----------------------------------------------------------------
  function setupMobileSimulatorModal() {
    const triggerBtn = document.getElementById('btn-open-mobile-sim');
    const modal = document.getElementById('device-preview-modal');
    const closeBtn = document.getElementById('btn-close-sim-modal');

    triggerBtn?.addEventListener('click', () => {
      if (modal) modal.style.display = 'flex';
      showToast('iPhone 16 Pro Live Ad Simulator Opened');
    });

    closeBtn?.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // -----------------------------------------------------------------
  // 8. AUDIENCE DEMOGRAPHICS BREAKDOWN MODULE (STEP 4)
  // -----------------------------------------------------------------
  function setupAudienceDemographicsModule() {
    const ageSlider = document.getElementById('slider-age');
    const ageLabel = document.getElementById('age-range-label');
    const locChips = document.querySelectorAll('.loc-chip');

    ageSlider?.addEventListener('input', (e) => {
      const maxAge = parseInt(e.target.value, 10);
      const minAge = Math.max(18, maxAge - 26);
      state.targetAgeMin = minAge;
      state.targetAgeMax = maxAge;

      if (ageLabel) {
        ageLabel.textContent = `${minAge} – ${maxAge} years`;
      }

      // Animate demographic bars dynamically
      const fills = document.querySelectorAll('.demo-fill');
      if (fills.length >= 4) {
        const shift = (maxAge - 40) * 0.4;
        fills[0].style.width = `${Math.min(65, Math.max(30, 48 + shift))}%`;
        fills[1].style.width = `${Math.min(45, Math.max(20, 32 - shift * 0.5))}%`;
      }
    });

    locChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        const activeLocs = document.querySelectorAll('.loc-chip.active').length;
        const reachPill = document.querySelector('.reach-est-pill strong');
        if (reachPill) {
          const est = activeLocs * 75;
          reachPill.textContent = `${est}K – ${est * 2}K people`;
        }
        showToast('Audience reach updated based on geo-selection');
      });
    });
  }

  // -----------------------------------------------------------------
  // 9. PROGRESSIVE DISCLOSURE
  // -----------------------------------------------------------------
  function setupProgressiveDisclosure() {
    const toggleBtns = document.querySelectorAll('.p-toggle-btn');
    const powerSection = document.getElementById('power-user-section');

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        state.personaMode = mode;

        if (powerSection) {
          powerSection.style.display = mode === 'power' ? 'block' : 'none';
        }

        showToast(`Experience mode: ${mode === 'power' ? 'Pro / Advanced' : 'Simple'}`);
      });
    });

    if (powerSection) powerSection.style.display = 'none';
  }

  // -----------------------------------------------------------------
  // 10. ALL CAMPAIGNS LIST & FILTERS
  // -----------------------------------------------------------------
  function setupCampaignsList() {
    const container = document.getElementById('campaigns-list-container');
    const filterTabs = document.querySelectorAll('.c-tab');
    if (!container) return;

    function renderList() {
      const filtered = state.campaigns.filter((c) => {
        if (state.campaignFilter === 'all') return true;
        return c.status === state.campaignFilter;
      });

      container.innerHTML = filtered.map((c) => `
        <div class="campaign-row-card">
          <img src="${c.image}" alt="${c.name}" class="c-thumb-img" />
          <div class="c-main-info">
            <span class="c-title-text">${c.name}</span>
            <span class="c-sku-text">${c.sku} • ${c.platform}</span>
          </div>
          <div class="c-status-col">
            <span class="badge-status ${c.status}">
              ${c.status === 'live' ? '● Live' : c.status === 'paused' ? '⏸ Paused' : '⚠ Needs Attention'}
            </span>
          </div>
          <div class="c-metric-col">
            <span>Spend / Budget</span>
            <strong>${c.spend} <span style="font-size: 11px; color: #737E76; font-weight: normal;">/ ${c.budget}</span></strong>
          </div>
          <div class="c-metric-col">
            <span>Performance</span>
            <strong>${c.clicks} • ${c.conversions}</strong>
          </div>
          <div class="c-action-col">
            <button class="btn-clean secondary" style="padding: 6px 14px; font-size: 11px;" onclick="window.toggleCampaign('${c.id}')">
              ${c.status === 'live' ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>
      `).join('');
    }

    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        state.campaignFilter = tab.getAttribute('data-filter');
        renderList();
        showToast(`Filtered campaigns: ${state.campaignFilter.toUpperCase()}`);
      });
    });

    window.toggleCampaign = function (id) {
      const c = state.campaigns.find((item) => item.id === id);
      if (c) {
        c.status = c.status === 'live' ? 'paused' : 'live';
        renderList();
        showToast(`Campaign [${c.name}] status updated to ${c.status.toUpperCase()}`);
      }
    };

    renderList();
  }

  // -----------------------------------------------------------------
  // 11. AI STRATEGIST CHAT
  // -----------------------------------------------------------------
  function setupAIStrategistChat() {
    const form = document.getElementById('agent-chat-form');
    const input = document.getElementById('chat-input');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      handleAIChatMessage(text);
    });
  }

  function handleAIChatMessage(text) {
    const chat = document.getElementById('chat-messages');
    if (!chat) return;

    // User Turn
    const u = document.createElement('div');
    u.className = 'chat-turn user-turn';
    u.style.display = 'flex';
    u.style.flexDirection = 'column';
    u.style.alignItems = 'flex-end';
    u.style.marginBottom = '14px';
    u.innerHTML = `
      <div style="font-size: 11px; color: #737E76; margin-bottom: 4px;">Asha Syed</div>
      <div style="background: #18231C; color: #FFFFFF; padding: 12px 18px; border-radius: 16px 16px 4px 16px; font-size: 13px; max-width: 80%;">
        ${escapeHtml(text)}
      </div>
    `;
    chat.appendChild(u);
    chat.scrollTop = chat.scrollHeight;

    // Assistant Turn (thinking)
    const a = document.createElement('div');
    a.className = 'chat-turn assistant-turn';
    a.style.marginBottom = '18px';
    a.innerHTML = `
      <div class="turn-meta">AI Marketing Assistant • reasoning…</div>
      <div class="turn-bubble assistant-bubble">
        <p style="color: #737E76;">Analyzing cross-channel ad spend, creative fatigue, and conversion metrics…</p>
      </div>
    `;
    chat.appendChild(a);
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      const bubble = a.querySelector('.assistant-bubble');
      if (bubble) {
        bubble.innerHTML = `
          <p><strong>Strategic Growth Diagnostic:</strong> Analyzed historical performance for <em>"${escapeHtml(text)}"</em>.</p>
          <div class="chat-bento-metrics">
            <div class="c-bento-cell">
              <span class="cb-label">Predicted ROAS</span>
              <span class="cb-val highlight">4.12x</span>
              <span class="cb-sub positive">+0.7x Lift</span>
            </div>
            <div class="c-bento-cell">
              <span class="cb-label">Target CAC</span>
              <span class="cb-val">₹39.80</span>
              <span class="cb-sub positive">-12% Cheaper</span>
            </div>
            <div class="c-bento-cell">
              <span class="cb-label">Audience Match</span>
              <span class="cb-val">99.8%</span>
              <span class="cb-sub positive">CAPI Active</span>
            </div>
          </div>
          <p style="color: #4A544C; font-size: 13px; line-height: 1.5; margin-bottom: 12px;">
            Recommendation: Launch a dedicated Reels creative campaign paired with exact-match Google Search to capture high-intent inquiries.
          </p>
          <button class="btn-clean primary" style="font-size: 12px; padding: 8px 18px;" onclick="document.querySelector('.nav-item[data-tab=journey]').click()">Open Campaign Wizard →</button>
        `;
        chat.scrollTop = chat.scrollHeight;
        showToast('AI Strategist generated 3 data-driven recommendations');
      }
    }, 600);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // -----------------------------------------------------------------
  // 12. CHART.JS CLEAN WARM ANALYTICS CHART
  // -----------------------------------------------------------------
  let chartInstance = null;

  function initRevenueChart() {
    const canvas = document.getElementById('revenue-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const gradGreen = ctx.createLinearGradient(0, 0, 0, 240);
    gradGreen.addColorStop(0, 'rgba(21, 128, 61, 0.15)');
    gradGreen.addColorStop(1, 'rgba(21, 128, 61, 0.0)');

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Nov 10', 'Nov 14', 'Nov 18', 'Nov 22', 'Nov 26', 'Nov 30'],
        datasets: [
          {
            label: 'Ad Spend (₹)',
            data: [2100, 4300, 6800, 8900, 10800, 12480],
            borderColor: '#15803D',
            backgroundColor: gradGreen,
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#15803D',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4
          },
          {
            label: 'Signups',
            data: [18, 46, 88, 124, 156, 186],
            borderColor: '#B93F00',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.35,
            pointBackgroundColor: '#B93F00',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: 'rgba(232, 226, 216, 0.6)' },
            ticks: { color: '#737E76', font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(232, 226, 216, 0.6)' },
            ticks: {
              color: '#737E76',
              font: { family: 'Plus Jakarta Sans', size: 11 },
              callback: (v) => '₹' + v.toLocaleString()
            }
          },
          y1: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: '#B93F00', font: { family: 'Plus Jakarta Sans', size: 11 } }
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
