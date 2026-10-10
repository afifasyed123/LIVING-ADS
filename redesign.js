/**
 * Living Ads — Autonomous Marketing & Growth Platform Engine
 * Award-Winning Hackathon UX:
 * - Native Web Audio API micro-tones (tactile clicks, harmonic step chimes, launch fanfare)
 * - 1-Click Autonomous Autopilot with Real-Time Neural Reasoning HUD
 * - Spotlight Command Palette (⌘K / Ctrl+K) with keyboard navigation
 * - Real-Time Predictive Revenue & Profit Matrix with dynamic ROAS gauge
 * - AI Psychological Hook Lab (3 copy formulas with live reactive preview)
 * - Multi-Channel Preview Switcher (Instagram Feed, 9:16 Reels UGC, Google Search, LinkedIn)
 * - Interactive Apple iPhone 16 Pro Simulator with Dynamic Island & Push Notifications
 * - Campaign Architecture JSON Exporter & Shareable URL generator
 * - Complete 100% feature preservation of stepper, telemetry bento, AI strategist, & all campaigns
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
    selectedHook: 1,
    activeSlide: 0,
    soundEnabled: true,
    qAudience: 'both',
    qCac: 45,
    qBudget: 30000,
    metaBudget: 1000,
    retargetBudget: 450,
    targetAgeMin: 26,
    targetAgeMax: 52,
    campaignFilter: 'all',
    feedLikes: 1842,
    feedLiked: false,
    feedSaved: false,
    simLikes: 1842,
    simLiked: false,
    simTheme: 'midnight',
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
  // 1. NATIVE WEB AUDIO API SYNTHESIZER (ZERO EXTERNAL ASSETS)
  // -----------------------------------------------------------------
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(type) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(860, now + 0.06);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'step') {
        [523.25, 659.25].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.09, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.16);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.16);
        });
      } else if (type === 'celebrate') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.14, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.45);
        });
      }
    } catch (e) {
      // Audio not permitted or supported; fail gracefully
    }
  }

  // -----------------------------------------------------------------
  // 2. FLOATING TOAST NOTIFICATION ENGINE
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
  // 3. INITIALIZATION
  // -----------------------------------------------------------------
  function init() {
    setupTabRouter();
    setupAudioToggle();
    setupPromptBanner();
    setupAutopilotDemo();
    setupJourneyStepper();
    setupAdFormatSwitcher();
    setupInteractiveSocialWidgets();
    setupMobileSimulatorModal();
    setupAudienceDemographicsModule();
    setupPredictiveMatrix();
    setupAIHookLab();
    setupCommandPalette();
    setupExportModal();
    setupProgressiveDisclosure();
    setupAIStrategistChat();
    setupCampaignsList();
    initRevenueChart();

    showToast('Autonomous AI Marketing Engine Active (12ms latency)');
  }

  // -----------------------------------------------------------------
  // 4. TOPBAR AUDIO TOGGLE
  // -----------------------------------------------------------------
  function setupAudioToggle() {
    const btn = document.getElementById('btn-toggle-sound');
    const icon = document.getElementById('sound-icon');
    const text = document.getElementById('sound-text');
    if (!btn) return;

    btn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      btn.classList.toggle('muted', !state.soundEnabled);
      if (icon) icon.textContent = state.soundEnabled ? '🔊' : '🔇';
      if (text) text.textContent = state.soundEnabled ? 'Sound: On' : 'Sound: Off';
      if (state.soundEnabled) playTone('pop');
      showToast(`Ambient Sound FX: ${state.soundEnabled ? 'ENABLED' : 'MUTED'}`);
    });
  }

  // -----------------------------------------------------------------
  // 5. TAB ROUTER
  // -----------------------------------------------------------------
  function setupTabRouter() {
    const navItems = document.querySelectorAll('.nav-item');
    const viewPanels = document.querySelectorAll('.view-panel');
    const viewTitle = document.getElementById('current-view-name');

    navItems.forEach((btn) => {
      btn.addEventListener('click', () => {
        playTone('click');
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
      playTone('click');
      document.querySelector('.nav-item[data-tab="assistant"]')?.click();
      handleAIChatMessage('Perform a full proactive audit across Meta, Instagram, and Google Ads');
    });
  }

  // -----------------------------------------------------------------
  // 6. NATURAL LANGUAGE PROMPT BANNER & 1-CLICK AUTOPILOT DEMO
  // -----------------------------------------------------------------
  function setupPromptBanner() {
    const promptInput = document.getElementById('campaign-goal-prompt');
    const submitBtn = document.getElementById('btn-submit-prompt');
    const exampleBtns = document.querySelectorAll('.example-pill-btn');

    function applyGoalPrompt(text) {
      if (!text) return;
      playTone('pop');
      promptInput.value = text;

      const previewTitle = document.getElementById('preview-title');
      const previewDesc = document.getElementById('preview-caption');
      const previewImg = document.getElementById('preview-ad-img');
      const simImg = document.getElementById('sim-post-img');
      const simCaption = document.getElementById('sim-caption-text');
      const liImg = document.getElementById('li-preview-img');

      if (text.toLowerCase().includes('coffee') || text.toLowerCase().includes('pour-over')) {
        const cTitle = 'Northwind Pour-Over Ritual';
        const cDesc = 'Artisan micro-batch whole bean subscription delivered fresh to your door.';
        if (previewTitle) previewTitle.textContent = cTitle;
        if (previewDesc) previewDesc.textContent = cDesc;
        if (previewImg) previewImg.src = 'specialty_coffee_ad.jpg';
        if (simImg) simImg.src = 'specialty_coffee_ad.jpg';
        if (liImg) liImg.src = 'specialty_coffee_ad.jpg';
        if (simCaption) simCaption.textContent = cDesc;
        showToast(`AI formulated campaign: "${cTitle}" (₹45,000 budget split)`);
      } else {
        const rTitle = "Children's Retreat in Bali";
        const rDesc = 'A magical learning retreat for children in the heart of Bali. Nature immersion & creative learning.';
        if (previewTitle) previewTitle.textContent = rTitle;
        if (previewDesc) previewDesc.textContent = rDesc;
        if (previewImg) previewImg.src = 'retreat_bali_ad.jpg';
        if (simImg) simImg.src = 'retreat_bali_ad.jpg';
        if (liImg) liImg.src = 'retreat_bali_ad.jpg';
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

  function setupAutopilotDemo() {
    const autoBtn = document.getElementById('btn-trigger-autopilot');
    const hud = document.getElementById('ai-neural-stream-hud');
    const s1 = document.getElementById('hud-s1');
    const s2 = document.getElementById('hud-s2');
    const s3 = document.getElementById('hud-s3');
    const s4 = document.getElementById('hud-s4');
    const timerTag = document.getElementById('hud-timer-tag');
    const promptInput = document.getElementById('campaign-goal-prompt');

    if (!autoBtn) return;

    autoBtn.addEventListener('click', () => {
      playTone('pop');
      if (hud) hud.style.display = 'block';

      // Typewriter animation in input
      const targetText = "I want to promote a children's retreat in Bali with maximum ROAS";
      if (promptInput) {
        promptInput.value = '';
        let charIdx = 0;
        const typeInterval = setInterval(() => {
          if (charIdx < targetText.length) {
            promptInput.value += targetText[charIdx];
            charIdx++;
          } else {
            clearInterval(typeInterval);
          }
        }, 15);
      }

      // Step 1: Avatar analysis
      if (s1) {
        s1.className = 'hud-step-item in-progress';
        s1.querySelector('.h-icon').textContent = '⚡';
      }
      if (timerTag) timerTag.textContent = '0.3s elapsed';

      setTimeout(() => {
        if (s1) {
          s1.className = 'hud-step-item completed';
          s1.querySelector('.h-icon').textContent = '✓';
        }
        if (s2) {
          s2.className = 'hud-step-item in-progress';
          s2.querySelector('.h-icon').textContent = '⚡';
        }
        if (timerTag) timerTag.textContent = '0.7s elapsed';
        playTone('click');
      }, 700);

      setTimeout(() => {
        if (s2) {
          s2.className = 'hud-step-item completed';
          s2.querySelector('.h-icon').textContent = '✓';
        }
        if (s3) {
          s3.className = 'hud-step-item in-progress';
          s3.querySelector('.h-icon').textContent = '⚡';
        }
        if (timerTag) timerTag.textContent = '1.2s elapsed';
        playTone('click');
        goToStep(3);
      }, 1500);

      setTimeout(() => {
        if (s3) {
          s3.className = 'hud-step-item completed';
          s3.querySelector('.h-icon').textContent = '✓';
        }
        if (s4) {
          s4.className = 'hud-step-item in-progress';
          s4.querySelector('.h-icon').textContent = '⚡';
        }
        if (timerTag) timerTag.textContent = '1.8s elapsed';
        playTone('click');
        goToStep(4);
      }, 2300);

      setTimeout(() => {
        if (s4) {
          s4.className = 'hud-step-item completed';
          s4.querySelector('.h-icon').textContent = '✓';
        }
        if (timerTag) timerTag.textContent = 'Synced (12ms)';
        playTone('step');
        showToast('✨ Autonomous AI Formulation Complete • Ready for fine-tuning');
        setTimeout(() => {
          if (hud) hud.style.display = 'none';
        }, 3600);
      }, 3100);
    });
  }

  // -----------------------------------------------------------------
  // 7. STEPPER & GUIDED JOURNEY
  // -----------------------------------------------------------------
  function goToStep(stepNum) {
    state.currentStep = stepNum;
    playTone('step');

    const stepItems = document.querySelectorAll('.step-item');
    const stageCards = document.querySelectorAll('.stage-card');

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
  window.goToStep = goToStep;

  function setupJourneyStepper() {
    const stepItems = document.querySelectorAll('.step-item');

    stepItems.forEach((item) => {
      item.addEventListener('click', () => {
        const s = parseInt(item.getAttribute('data-step'), 10);
        goToStep(s);
      });
    });

    // Step 1: Goal Selection
    document.querySelectorAll('.goal-card').forEach((card) => {
      card.addEventListener('click', () => {
        playTone('click');
        document.querySelectorAll('.goal-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        state.selectedGoal = card.getAttribute('data-goal');

        const title = card.querySelector('.goal-title')?.textContent;
        const previewTitle = document.getElementById('preview-title');
        const previewImg = document.getElementById('preview-ad-img');
        const simImg = document.getElementById('sim-post-img');
        const liImg = document.getElementById('li-preview-img');

        if (previewTitle && title) previewTitle.textContent = title;
        const targetImg = state.selectedGoal.includes('coffee') ? 'specialty_coffee_ad.jpg' : 'retreat_bali_ad.jpg';
        if (previewImg) previewImg.src = targetImg;
        if (simImg) simImg.src = targetImg;
        if (liImg) liImg.src = targetImg;

        showToast(`Target goal updated: ${title}`);
      });
    });

    document.getElementById('btn-to-stage-2')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btn-back-to-1')?.addEventListener('click', () => goToStep(1));

    // Step 2: Details & Audience Chips
    document.querySelectorAll('.chip-btn').forEach((chip) => {
      chip.addEventListener('click', () => {
        playTone('click');
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
        playTone('click');
        t.classList.toggle('active');
        const activeCount = document.querySelectorAll('.creative-toggle.active').length;
        showToast(`Active creative angles: ${activeCount} variations`);
      });
    });

    document.getElementById('btn-to-stage-5')?.addEventListener('click', () => goToStep(5));
    document.getElementById('btn-back-to-4')?.addEventListener('click', () => goToStep(4));

    // Step 5: Approval & Launch
    document.getElementById('btn-execute-launch')?.addEventListener('click', () => {
      playTone('celebrate');
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 160,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#15803D', '#B93F00', '#18231C', '#FAF7F2']
        });
      }
      goToStep(6);
      showToast('🚀 Campaign deployed to Meta Marketing API and Google Ads Manager!');
    });
  }

  // -----------------------------------------------------------------
  // 8. REAL-TIME PREDICTIVE REVENUE & PROFIT MATRIX
  // -----------------------------------------------------------------
  function setupPredictiveMatrix() {
    recalculateProjections();
  }

  function recalculateProjections() {
    const totalDaily = state.metaBudget + state.retargetBudget + 250;
    const monthlySpend = totalDaily * 30;
    const projectedRev = Math.round(monthlySpend * 3.89);
    const netLift = projectedRev - monthlySpend;

    const reachEst = Math.round(monthlySpend * 3.88);
    const conversionsEst = Math.round(monthlySpend / state.qCac);

    const spendCapEl = document.getElementById('review-spend-cap');
    const projRevEl = document.getElementById('review-projected-rev');
    const previewBudget = document.getElementById('preview-budget');

    const dynReach = document.getElementById('dyn-reach-val');
    const dynConv = document.getElementById('dyn-conversions-val');
    const dynProfit = document.getElementById('dyn-profit-val');
    const roasFill = document.getElementById('roas-meter-fill');

    if (spendCapEl) spendCapEl.textContent = `₹${monthlySpend.toLocaleString()}`;
    if (projRevEl) projRevEl.textContent = `₹${projectedRev.toLocaleString()}`;
    if (previewBudget) previewBudget.textContent = `₹${monthlySpend.toLocaleString()}`;

    if (dynReach) dynReach.textContent = reachEst.toLocaleString();
    if (dynConv) dynConv.textContent = `${conversionsEst.toLocaleString()} signups`;
    if (dynProfit) dynProfit.textContent = `₹${projectedRev.toLocaleString()}`;
    if (roasFill) {
      const pct = Math.min(100, Math.max(40, (3.89 / 5.0) * 100));
      roasFill.style.width = `${pct}%`;
    }
  }

  // -----------------------------------------------------------------
  // 9. AI PSYCHOLOGICAL HOOK LAB
  // -----------------------------------------------------------------
  function setupAIHookLab() {
    const cards = document.querySelectorAll('.hook-choice-card');
    const previewTitle = document.getElementById('preview-title');
    const previewCaption = document.getElementById('preview-caption');
    const simCaption = document.getElementById('sim-caption-text');
    const liHeadline = document.getElementById('li-headline');
    const liPost = document.getElementById('li-post-caption');

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        playTone('pop');
        cards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');

        const hookId = parseInt(card.getAttribute('data-hook'), 10);
        state.selectedHook = hookId;

        const quote = card.querySelector('.hook-quote')?.textContent.replace(/"/g, '');
        const sub = card.querySelector('.hook-sub')?.textContent;

        if (previewTitle && quote) previewTitle.textContent = quote;
        if (previewCaption && sub) previewCaption.textContent = sub;
        if (simCaption && sub) simCaption.textContent = sub;
        if (liHeadline && quote) liHeadline.textContent = quote;
        if (liPost && sub) liPost.textContent = sub;

        showToast(`AI Hook Applied: "${quote}"`);
      });
    });
  }

  // -----------------------------------------------------------------
  // 10. AD FORMAT SWITCHER (FEED / REELS / GOOGLE / LINKEDIN)
  // -----------------------------------------------------------------
  function setupAdFormatSwitcher() {
    const tabs = document.querySelectorAll('.af-tab');
    const mediaContainer = document.getElementById('preview-media-container');
    const reelsUI = document.getElementById('reels-overlay-ui');
    const googleAdBox = document.getElementById('google-search-preview-box');
    const linkedinBox = document.getElementById('linkedin-ad-box');
    const socialBox = document.getElementById('social-ad-content-box');
    const sponsorTag = document.getElementById('preview-sponsor-tag');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        playTone('click');
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const format = tab.getAttribute('data-format');
        state.selectedFormat = format;

        if (format === 'feed') {
          if (mediaContainer) mediaContainer.style.display = 'block';
          if (reelsUI) reelsUI.style.display = 'none';
          if (googleAdBox) googleAdBox.style.display = 'none';
          if (linkedinBox) linkedinBox.style.display = 'none';
          if (socialBox) socialBox.style.display = 'block';
          if (sponsorTag) sponsorTag.textContent = 'Sponsored • Meta Ads';
          showToast('Switched preview to Meta Instagram Feed Post');
        } else if (format === 'reels') {
          if (mediaContainer) mediaContainer.style.display = 'block';
          if (reelsUI) reelsUI.style.display = 'flex';
          if (googleAdBox) googleAdBox.style.display = 'none';
          if (linkedinBox) linkedinBox.style.display = 'none';
          if (socialBox) socialBox.style.display = 'block';
          if (sponsorTag) sponsorTag.textContent = 'Sponsored Reel • Instagram';
          showToast('Switched preview to Instagram Reels / Stories');
        } else if (format === 'search') {
          if (mediaContainer) mediaContainer.style.display = 'none';
          if (googleAdBox) googleAdBox.style.display = 'block';
          if (linkedinBox) linkedinBox.style.display = 'none';
          if (socialBox) socialBox.style.display = 'none';
          showToast('Switched preview to Google Exact Search Ad');
        } else if (format === 'linkedin') {
          if (mediaContainer) mediaContainer.style.display = 'none';
          if (googleAdBox) googleAdBox.style.display = 'none';
          if (linkedinBox) linkedinBox.style.display = 'block';
          if (socialBox) socialBox.style.display = 'none';
          showToast('Switched preview to LinkedIn Sponsored Ad');
        }
      });
    });
  }

  // -----------------------------------------------------------------
  // 11. INTERACTIVE SOCIAL WIDGETS & CAROUSEL DOTS
  // -----------------------------------------------------------------
  function setupInteractiveSocialWidgets() {
    // Like button
    const likeBtn = document.getElementById('btn-preview-like');
    const likeCount = document.getElementById('preview-like-count');
    likeBtn?.addEventListener('click', () => {
      state.feedLiked = !state.feedLiked;
      likeBtn.classList.toggle('liked', state.feedLiked);
      state.feedLikes += state.feedLiked ? 1 : -1;
      if (likeCount) likeCount.textContent = state.feedLikes.toLocaleString();
      playTone('pop');
      showToast(state.feedLiked ? '❤️ Ad liked by user (+1 organic engagement)' : 'Ad engagement updated');
    });

    // Bookmark button
    const bmBtn = document.getElementById('btn-preview-bookmark');
    const saveTxt = document.getElementById('preview-save-txt');
    bmBtn?.addEventListener('click', () => {
      state.feedSaved = !state.feedSaved;
      bmBtn.classList.toggle('saved', state.feedSaved);
      if (saveTxt) saveTxt.textContent = state.feedSaved ? 'Saved ✓' : 'Save';
      playTone('pop');
      showToast(state.feedSaved ? '🔖 Ad saved to Campaign Bookmarks' : 'Bookmark removed');
    });

    // Share button
    const shareBtn = document.getElementById('btn-preview-share');
    shareBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      playTone('pop');
      showToast('↗️ Ad preview shareable link copied!');
    });

    // Reels Like Trigger
    const reelsLike = document.getElementById('reels-like-trigger');
    reelsLike?.addEventListener('click', () => {
      playTone('pop');
      reelsLike.textContent = '❤️ 14.9k';
      showToast('❤️ Reel engagement incremented');
    });

    // Carousel Dots
    const dots = document.querySelectorAll('#carousel-dots-bar .c-dot');
    const previewImg = document.getElementById('preview-ad-img');
    const simImg = document.getElementById('sim-post-img');
    const previewTitle = document.getElementById('preview-title');

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        playTone('click');
        dots.forEach((d) => d.classList.remove('active'));
        dot.classList.add('active');

        const slide = parseInt(dot.getAttribute('data-slide'), 10);
        state.activeSlide = slide;

        if (slide === 0) {
          if (previewImg) previewImg.src = 'retreat_bali_ad.jpg';
          if (simImg) simImg.src = 'retreat_bali_ad.jpg';
          if (previewTitle) previewTitle.textContent = "Children's Retreat in Bali";
          showToast('Creative Angle 1: Nature Immersion Active');
        } else if (slide === 1) {
          if (previewImg) previewImg.src = 'specialty_coffee_ad.jpg';
          if (simImg) simImg.src = 'specialty_coffee_ad.jpg';
          if (previewTitle) previewTitle.textContent = "The 6:00 AM Pour-Over Ritual";
          showToast('Creative Angle 2: Morning Sensory Ritual Active');
        } else {
          if (previewImg) previewImg.src = 'retreat_bali_ad.jpg';
          if (simImg) simImg.src = 'retreat_bali_ad.jpg';
          if (previewTitle) previewTitle.textContent = "Screen-Free Summers in Bali";
          showToast('Creative Angle 3: Pattern Interrupt Active');
        }
      });
    });
  }

  // -----------------------------------------------------------------
  // 12. MOBILE DEVICE SIMULATOR MODAL (APPLE IPHONE 16 PRO)
  // -----------------------------------------------------------------
  function setupMobileSimulatorModal() {
    const triggerBtn = document.getElementById('btn-open-mobile-sim');
    const modal = document.getElementById('device-preview-modal');
    const closeBtn = document.getElementById('btn-close-sim-modal');
    const themeBtn = document.getElementById('btn-toggle-sim-theme');
    const bezelFrame = document.getElementById('iphone-bezel-frame');
    const dynamicIsland = document.getElementById('sim-dynamic-island');
    const simLikeBtn = document.getElementById('sim-btn-like');
    const simLikeCount = document.getElementById('sim-like-count');
    const pushBanner = document.getElementById('sim-push-banner');

    triggerBtn?.addEventListener('click', () => {
      if (modal) modal.style.display = 'flex';
      playTone('pop');
      showToast('iPhone 16 Pro Live Ad Simulator Opened');
      if (pushBanner) {
        pushBanner.style.display = 'flex';
        setTimeout(() => {
          pushBanner.style.transition = 'opacity 0.4s ease';
          pushBanner.style.opacity = '0';
          setTimeout(() => {
            pushBanner.style.display = 'none';
            pushBanner.style.opacity = '1';
          }, 400);
        }, 3200);
      }
    });

    closeBtn?.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
      playTone('click');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    themeBtn?.addEventListener('click', () => {
      playTone('pop');
      state.simTheme = state.simTheme === 'midnight' ? 'titanium' : 'midnight';
      bezelFrame?.classList.toggle('titanium', state.simTheme === 'titanium');
      showToast(`iPhone Bezel Frame: ${state.simTheme.toUpperCase()}`);
    });

    dynamicIsland?.addEventListener('click', () => {
      playTone('pop');
      showToast('Dynamic Island: Meta Conversions API 99.8% match • 12ms latency');
    });

    simLikeBtn?.addEventListener('click', () => {
      playTone('pop');
      state.simLiked = !state.simLiked;
      state.simLikes += state.simLiked ? 1 : -1;
      if (simLikeCount) simLikeCount.textContent = state.simLikes.toLocaleString();
      showToast('❤️ iPhone Simulator: Post Liked!');
    });
  }

  // -----------------------------------------------------------------
  // 13. AUDIENCE DEMOGRAPHICS BREAKDOWN MODULE (STEP 4)
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

      const fills = document.querySelectorAll('.demo-fill');
      if (fills.length >= 4) {
        const shift = (maxAge - 40) * 0.4;
        fills[0].style.width = `${Math.min(65, Math.max(30, 48 + shift))}%`;
        fills[1].style.width = `${Math.min(45, Math.max(20, 32 - shift * 0.5))}%`;
      }
      recalculateProjections();
    });

    locChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        playTone('click');
        chip.classList.toggle('active');
        const activeLocs = document.querySelectorAll('.loc-chip.active').length;
        const reachPill = document.querySelector('.reach-est-pill strong');
        if (reachPill) {
          const est = activeLocs * 75;
          reachPill.textContent = `${est}K – ${est * 2}K people`;
        }
        showToast('Audience reach updated based on geo-selection');
        recalculateProjections();
      });
    });
  }

  // -----------------------------------------------------------------
  // 14. SPOTLIGHT COMMAND PALETTE (⌘K / CTRL+K)
  // -----------------------------------------------------------------
  function setupCommandPalette() {
    const modal = document.getElementById('command-palette-modal');
    const input = document.getElementById('cmd-search-input');
    const container = document.getElementById('cmd-results-container');
    const triggerBtn = document.getElementById('btn-open-command-palette');
    const floatHint = document.getElementById('floating-cmd-hint');

    function openPalette() {
      if (!modal) return;
      modal.style.display = 'flex';
      if (input) {
        input.value = '';
        input.focus();
      }
      playTone('pop');
      filterCommands('');
    }

    function closePalette() {
      if (!modal) return;
      modal.style.display = 'none';
    }

    triggerBtn?.addEventListener('click', openPalette);
    floatHint?.addEventListener('click', openPalette);

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal && modal.style.display === 'flex') {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closePalette();
      }
    });

    function filterCommands(query) {
      const q = query.toLowerCase().trim();
      const items = container?.querySelectorAll('.cmd-item');
      if (!items) return;
      let firstVisible = null;
      items.forEach((item) => {
        const title = item.querySelector('.cmd-item-title')?.textContent.toLowerCase() || '';
        const sub = item.querySelector('.cmd-item-sub')?.textContent.toLowerCase() || '';
        const match = title.includes(q) || sub.includes(q);
        item.style.display = match ? 'flex' : 'none';
        item.classList.remove('active');
        if (match && !firstVisible) firstVisible = item;
      });
      if (firstVisible) firstVisible.classList.add('active');
    }

    input?.addEventListener('input', (e) => filterCommands(e.target.value));

    input?.addEventListener('keydown', (e) => {
      const visibleItems = Array.from(container?.querySelectorAll('.cmd-item') || []).filter(
        (i) => i.style.display !== 'none'
      );
      const activeIdx = visibleItems.findIndex((i) => i.classList.contains('active'));

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (visibleItems.length > 0) {
          visibleItems.forEach((i) => i.classList.remove('active'));
          const nextIdx = (activeIdx + 1) % visibleItems.length;
          visibleItems[nextIdx].classList.add('active');
          visibleItems[nextIdx].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (visibleItems.length > 0) {
          visibleItems.forEach((i) => i.classList.remove('active'));
          const prevIdx = (activeIdx - 1 + visibleItems.length) % visibleItems.length;
          visibleItems[prevIdx].classList.add('active');
          visibleItems[prevIdx].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeItem = visibleItems[activeIdx] || visibleItems[0];
        if (activeItem) {
          executeCommand(activeItem.getAttribute('data-action'));
          closePalette();
        }
      }
    });

    container?.querySelectorAll('.cmd-item').forEach((item) => {
      item.addEventListener('click', () => {
        executeCommand(item.getAttribute('data-action'));
        closePalette();
      });
    });

    function executeCommand(action) {
      playTone('click');
      if (action === 'autopilot') {
        document.querySelector('.nav-item[data-tab="journey"]')?.click();
        document.getElementById('btn-trigger-autopilot')?.click();
      } else if (action === 'bali') {
        document.querySelector('.nav-item[data-tab="journey"]')?.click();
        const card = document.querySelector('.goal-card[data-goal="subscribers"]');
        if (card) card.click();
      } else if (action === 'coffee') {
        document.querySelector('.nav-item[data-tab="journey"]')?.click();
        const card = document.querySelector('.goal-card[data-goal="retargeting"]');
        if (card) card.click();
      } else if (action === 'simulator') {
        document.getElementById('btn-open-mobile-sim')?.click();
      } else if (action === 'reels') {
        document.querySelector('.nav-item[data-tab="journey"]')?.click();
        document.querySelector('.af-tab[data-format="reels"]')?.click();
      } else if (action === 'google') {
        document.querySelector('.nav-item[data-tab="journey"]')?.click();
        document.querySelector('.af-tab[data-format="search"]')?.click();
      } else if (action === 'linkedin') {
        document.querySelector('.nav-item[data-tab="journey"]')?.click();
        document.querySelector('.af-tab[data-format="linkedin"]')?.click();
      } else if (action === 'analytics') {
        document.querySelector('.nav-item[data-tab="bento-overview"]')?.click();
      } else if (action === 'sound') {
        document.getElementById('btn-toggle-sound')?.click();
      } else if (action === 'export') {
        document.getElementById('btn-open-export-modal')?.click();
      }
    }
  }

  // -----------------------------------------------------------------
  // 15. CAMPAIGN ARCHITECTURE JSON EXPORT SPEC MODAL
  // -----------------------------------------------------------------
  function setupExportModal() {
    const openBtn = document.getElementById('btn-open-export-modal');
    const modal = document.getElementById('export-modal');
    const closeBtn = document.getElementById('btn-close-export-modal');
    const codeEl = document.getElementById('export-json-code');
    const copyBtn = document.getElementById('btn-copy-export-json');
    const dlBtn = document.getElementById('btn-download-export-json');
    const shareBtn = document.getElementById('btn-copy-preview-link');

    function buildCampaignJson() {
      const data = {
        name: state.selectedGoal.includes('coffee') ? 'Northwind Pour-Over Ritual' : "Children's Retreat in Bali",
        version: "2.4.0",
        timestamp: new Date().toISOString(),
        goal: state.selectedGoal,
        target_roas: 3.89,
        budget: {
          daily_meta_prospecting: state.metaBudget,
          daily_dynamic_retargeting: state.retargetBudget,
          daily_google_search: 250,
          monthly_spend_cap: (state.metaBudget + state.retargetBudget + 250) * 30,
          currency: "INR"
        },
        targeting: {
          age_range: [state.targetAgeMin, state.targetAgeMax],
          audience_cluster: state.qAudience,
          locations: ["Bali, Indonesia", "Singapore", "Mumbai, India"],
          estimated_reach: "140,000 - 280,000"
        },
        channels: [
          { platform: "Meta Ads", placements: ["Instagram Feed", "Instagram Reels"], objective: "OUTCOME_SALES" },
          { platform: "Google Ads", type: "SEARCH_EXACT", bid_strategy: "MAXIMIZE_CONVERSIONS" },
          { platform: "LinkedIn Ads", placement: "Sponsored Content", audience: "Parents & Educators" }
        ],
        conversions_api: {
          status: "CONNECTED",
          match_rate: "99.8%",
          server_event_latency_ms: 12
        }
      };
      return JSON.stringify(data, null, 2);
    }

    openBtn?.addEventListener('click', () => {
      if (codeEl) codeEl.textContent = buildCampaignJson();
      if (modal) modal.style.display = 'flex';
      playTone('pop');
    });

    closeBtn?.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
      playTone('click');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    copyBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText(buildCampaignJson()).then(() => {
        playTone('pop');
        showToast('📋 Campaign JSON spec copied to clipboard!');
      });
    });

    dlBtn?.addEventListener('click', () => {
      const blob = new Blob([buildCampaignJson()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'living-ads-campaign-spec.json';
      a.click();
      URL.revokeObjectURL(url);
      playTone('pop');
      showToast('💾 Campaign JSON file downloaded!');
    });

    shareBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        playTone('pop');
        showToast('🔗 Live campaign share link copied to clipboard!');
      });
    });
  }

  // -----------------------------------------------------------------
  // 16. PROGRESSIVE DISCLOSURE (SIMPLE / PRO MODE)
  // -----------------------------------------------------------------
  function setupProgressiveDisclosure() {
    const toggleBtns = document.querySelectorAll('.p-toggle-btn');
    const powerSection = document.getElementById('power-user-section');

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        playTone('click');
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
  // 17. ALL CAMPAIGNS LIST & FILTERS
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
        playTone('click');
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        state.campaignFilter = tab.getAttribute('data-filter');
        renderList();
        showToast(`Filtered campaigns: ${state.campaignFilter.toUpperCase()}`);
      });
    });

    window.toggleCampaign = function (id) {
      playTone('pop');
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
  // 18. AI STRATEGIST CHAT
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
    playTone('pop');
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
      playTone('step');
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
  // 19. CHART.JS CLEAN WARM ANALYTICS CHART
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
