/**
 * LivingADs Cybercore / Cyberpunk Platform Engine
 * Autonomous AI Growth Command Deck with Tactical SFX & Multi-Style Matrix
 */

(function () {
  'use strict';

  // Application State
  const state = {
    currentTab: 'journey',
    currentStep: 1,
    personaMode: 'beginner',
    selectedGoal: 'subscribers',
    qCac: 45,
    qBudget: 50000,
    qSku: 'arabica',
    metaBudget: 1000,
    retargetBudget: 450,
    sfxEnabled: true,
    currentTheme: 'cyberpunk',
    campaigns: [
      {
        name: 'Meta Dynamic Retargeting',
        sku: 'Whole Bean & Cold Brew SKUs',
        platform: 'Meta Ads',
        status: 'active',
        budget: '₹13,500 / mo',
        spend: '₹43,900',
        roas: '4.62x',
        conversions: '580'
      },
      {
        name: 'Google Exact Match Brand Search',
        sku: 'High-Intent Subscription Search',
        platform: 'Google Ads',
        status: 'active',
        budget: '₹7,500 / mo',
        spend: '₹12,150',
        roas: '5.10x',
        conversions: '310'
      },
      {
        name: 'TikTok Arabica UGC Spark Ad',
        sku: 'Sensory Chemex Pour-Over Reel',
        platform: 'TikTok Ads',
        status: 'active',
        budget: '₹4,000 / mo',
        spend: '₹3,420',
        roas: '3.42x',
        conversions: '420'
      }
    ]
  };

  // -----------------------------------------------------------------
  // 1. TACTICAL AUDIO SFX SYNTHESIZER (Web Audio API)
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

  function playSound(type) {
    if (!state.sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'transition') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'launch') {
        // Futuristic chord cascade
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);
          gain.gain.setValueAtTime(0.05, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.4);
        });
      } else if (type === 'chip') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      }
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  function setupSoundToggle() {
    const sfxBtn = document.getElementById('sfx-toggle');
    const sfxIcon = document.getElementById('sfx-icon');
    const sfxLabel = document.getElementById('sfx-label');
    if (!sfxBtn) return;

    sfxBtn.addEventListener('click', () => {
      state.sfxEnabled = !state.sfxEnabled;
      if (state.sfxEnabled) {
        sfxIcon.textContent = '🔊';
        sfxLabel.textContent = 'SFX ON';
        sfxBtn.classList.add('active');
        playSound('transition');
      } else {
        sfxIcon.textContent = '🔇';
        sfxLabel.textContent = 'SFX OFF';
        sfxBtn.classList.remove('active');
      }
    });
  }

  // -----------------------------------------------------------------
  // 2. AESTHETIC STYLE MATRIX SWITCHER
  // -----------------------------------------------------------------
  function setupAestheticSwitcher() {
    const switcher = document.getElementById('aesthetic-switcher');
    if (!switcher) return;

    switcher.addEventListener('change', (e) => {
      const selected = e.target.value;
      state.currentTheme = selected;
      document.body.className = `ux-redesign-app theme-${selected}`;
      playSound('transition');

      // Update Chart.js styling if active
      if (state.currentTab === 'bento-overview') {
        initRevenueChart();
      }
    });
  }

  // -----------------------------------------------------------------
  // 3. INTERACTIVE CYBER BACKGROUND CANVAS
  // -----------------------------------------------------------------
  function initCyberCanvas() {
    const canvas = document.getElementById('cyber-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Grid particles
    const particles = [];
    const count = Math.min(55, Math.floor(width / 35));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(255, 0, 127, '
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw faint cyber grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 48;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Update & render particles with connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.18 * (1 - dist / 110)})`;
            ctx.shadowBlur = 0;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  // -----------------------------------------------------------------
  // 4. MAIN APP INITIALIZATION
  // -----------------------------------------------------------------
  function init() {
    setupSoundToggle();
    setupAestheticSwitcher();
    initCyberCanvas();
    setupTabRouter();
    setupJourneyStepper();
    setupProgressiveDisclosure();
    setupAIStrategistChat();
    setupCampaignsTable();
    initRevenueChart();
    initMagneticCursor();
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
        const tab = btn.getAttribute('data-tab');
        state.currentTab = tab;
        playSound('click');

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
      playSound('transition');
      document.querySelector('.nav-item[data-tab="assistant"]')?.click();
      handleAIChatMessage('Perform deep autonomous multi-channel audit across Meta and Google Ads');
    });
  }

  // -----------------------------------------------------------------
  // 6. GUIDED 6-STAGE CAMPAIGN JOURNEY
  // -----------------------------------------------------------------
  function setupJourneyStepper() {
    const stepItems = document.querySelectorAll('.step-item');
    const stageCards = document.querySelectorAll('.stage-card');

    function goToStep(stepNum) {
      state.currentStep = stepNum;
      playSound('transition');

      stepItems.forEach((item) => {
        const s = parseInt(item.getAttribute('data-step'), 10);
        item.classList.toggle('active', s === stepNum);
        item.classList.toggle('completed', s < stepNum);
      });

      stageCards.forEach((card) => {
        card.classList.toggle('active', card.id === `stage-${stepNum}`);
      });
    }

    // Step navigation buttons
    stepItems.forEach((item) => {
      item.addEventListener('click', () => {
        const s = parseInt(item.getAttribute('data-step'), 10);
        goToStep(s);
      });
    });

    // Step 1: Goal Selection
    document.querySelectorAll('.goal-card').forEach((card) => {
      card.addEventListener('click', () => {
        playSound('chip');
        document.querySelectorAll('.goal-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        state.selectedGoal = card.getAttribute('data-goal');
      });
    });

    document.getElementById('btn-to-stage-2')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btn-back-to-1')?.addEventListener('click', () => goToStep(1));

    // Step 2: Diagnostic Questions
    document.querySelectorAll('.chip-btn').forEach((chip) => {
      chip.addEventListener('click', () => {
        playSound('chip');
        const parent = chip.closest('.chip-group');
        parent.querySelectorAll('.chip-btn').forEach((b) => b.classList.remove('active'));
        chip.classList.add('active');

        const qType = parent.getAttribute('data-q');
        const val = chip.getAttribute('data-val');
        if (qType === 'cac') state.qCac = parseInt(val, 10);
        if (qType === 'budget') state.qBudget = parseInt(val, 10);
        if (qType === 'sku') state.qSku = val;

        recalculateProjections();
      });
    });

    document.getElementById('btn-to-stage-3')?.addEventListener('click', () => goToStep(3));
    document.getElementById('btn-back-to-2')?.addEventListener('click', () => goToStep(2));

    // Step 3: Plan Review
    document.getElementById('btn-to-stage-4')?.addEventListener('click', () => goToStep(4));
    document.getElementById('btn-back-to-3')?.addEventListener('click', () => goToStep(3));

    // Step 4: Parameter Customization
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
        playSound('click');
        t.classList.toggle('active');
      });
    });

    document.getElementById('btn-to-stage-5')?.addEventListener('click', () => goToStep(5));
    document.getElementById('btn-back-to-4')?.addEventListener('click', () => goToStep(4));

    // Step 5: Approval & Launch
    document.getElementById('btn-execute-launch')?.addEventListener('click', () => {
      playSound('launch');
      // Confetti burst
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 160,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#ff007f', '#00ff9d', '#ffe600', '#ffffff']
        });
      }
      goToStep(6);
    });
  }

  // Dynamic projection recalculations for Stage 5
  function recalculateProjections() {
    const totalDaily = state.metaBudget + state.retargetBudget + 250; // 250 google search
    const monthlySpend = totalDaily * 30;
    const estRoas = 3.89;
    const projectedRevenue = Math.round(monthlySpend * estRoas);

    const spendCapEl = document.querySelector('.safety-stat-box:nth-child(1) .s-val');
    const revEl = document.querySelector('.safety-stat-box:nth-child(2) .s-val');
    if (spendCapEl) spendCapEl.textContent = `₹${monthlySpend.toLocaleString()}`;
    if (revEl) revEl.textContent = `₹${projectedRevenue.toLocaleString()}`;
  }

  // -----------------------------------------------------------------
  // 7. PROGRESSIVE DISCLOSURE
  // -----------------------------------------------------------------
  function setupProgressiveDisclosure() {
    const toggleBtns = document.querySelectorAll('.p-toggle-btn');
    const powerSection = document.getElementById('power-user-section');

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        playSound('click');
        toggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        state.personaMode = mode;

        if (powerSection) {
          powerSection.style.display = mode === 'power' ? 'block' : 'none';
        }
      });
    });

    if (powerSection) powerSection.style.display = 'none';
  }

  // -----------------------------------------------------------------
  // 8. AI STRATEGIST CONVERSATIONAL TERMINAL
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
    playSound('click');

    // User Turn
    const u = document.createElement('div');
    u.className = 'chat-turn user-turn';
    u.style.display = 'flex';
    u.style.flexDirection = 'column';
    u.style.alignItems = 'flex-end';
    u.style.marginBottom = '14px';
    u.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 10px; color: var(--neon-cyan); margin-bottom: 4px;">// OPERATOR_ASHA</div>
      <div style="background: rgba(0, 240, 255, 0.12); border: 1px solid rgba(0, 240, 255, 0.4); padding: 12px 18px; border-radius: 12px 12px 2px 12px; font-size: 13px; max-width: 80%; color: #fff; box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);">
        ${escapeHtml(text)}
      </div>
    `;
    chat.appendChild(u);
    chat.scrollTop = chat.scrollHeight;

    // Agent Reasoning Turn
    const a = document.createElement('div');
    a.className = 'chat-turn assistant-turn';
    a.style.marginBottom = '18px';
    a.innerHTML = `
      <div class="turn-meta">// AGENT_CORE • AUDITING DATA STREAMS…</div>
      <div class="turn-bubble assistant-bubble">
        <p style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 12px;">⚡ Querying Meta Conversions API & Google Ads attribution graph…</p>
      </div>
    `;
    chat.appendChild(a);
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      playSound('transition');
      const bubble = a.querySelector('.assistant-bubble');
      if (bubble) {
        bubble.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-family: var(--font-mono); font-size: 10px; color: var(--neon-green); font-weight: 800;">[STATUS: DEEP_AUDIT_COMPLETE]</span>
            <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-dim);">LATENCY: 14MS</span>
          </div>
          <p style="margin-bottom: 12px;"><strong>Synthesized Analysis for "${escapeHtml(text)}":</strong></p>
          <div class="chat-bento-metrics">
            <div class="c-bento-cell">
              <span class="cb-label">Predicted ROAS</span>
              <span class="cb-val highlight">4.12x</span>
              <span class="cb-sub positive">+0.7x Projected</span>
            </div>
            <div class="c-bento-cell">
              <span class="cb-label">Target CAC</span>
              <span class="cb-val">₹39.80</span>
              <span class="cb-sub positive">-12% Efficiency</span>
            </div>
            <div class="c-bento-cell">
              <span class="cb-label">CAPI Health</span>
              <span class="cb-val" style="color: var(--neon-cyan);">99.8%</span>
              <span class="cb-sub positive">Zero Drop</span>
            </div>
          </div>
          <p style="margin: 10px 0; font-size: 12px; color: var(--text-muted); line-height: 1.5;">
            Recommendation: Allocate <strong>₹1,000/day</strong> to "Pour-Over Ritual" Reel on Meta, coupled with Exact-Match Brand Search on Google to capture demand spikes.
          </p>
          <button class="btn-editorial primary" style="margin-top: 8px; font-size: 11px; padding: 8px 16px;" onclick="document.querySelector('.nav-item[data-tab=journey]').click()">Deploy Plan in Campaign Journey →</button>
        `;
        chat.scrollTop = chat.scrollHeight;
      }
    }, 950);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // -----------------------------------------------------------------
  // 9. LIVE BLUEPRINTS TABLE
  // -----------------------------------------------------------------
  function setupCampaignsTable() {
    const tbody = document.getElementById('campaigns-table-body');
    if (!tbody) return;

    tbody.innerHTML = state.campaigns.map((c) => `
      <tr>
        <td>
          <div style="font-family: var(--font-display); font-weight: 700; color: #fff; font-size: 13px;">${c.name}</div>
          <div style="font-size: 11px; color: var(--text-dim); font-family: var(--font-mono); margin-top: 2px;">${c.sku}</div>
        </td>
        <td><strong style="color: #fff; font-family: var(--font-display);">${c.platform}</strong></td>
        <td>
          <span style="color: var(--neon-green); font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono);">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--neon-green); box-shadow: 0 0 8px var(--neon-green);"></span>
            ${c.status.toUpperCase()}
          </span>
        </td>
        <td><span style="font-family: var(--font-mono); color: #fff; font-weight: 700;">${c.budget}</span></td>
        <td><span style="font-family: var(--font-mono); color: #fff;">${c.spend}</span></td>
        <td><strong style="color: var(--neon-green); font-family: var(--font-mono); font-size: 14px; text-shadow: 0 0 8px rgba(0,255,157,0.3);">${c.roas}</strong></td>
        <td><strong style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 14px; text-shadow: 0 0 8px rgba(0,240,255,0.3);">${c.conversions}</strong></td>
        <td>
          <button class="btn-editorial secondary" style="padding: 5px 12px; font-size: 11px;" onclick="window.scaleCampaign('${c.name}')">⚡ Scale</button>
        </td>
      </tr>
    `).join('');

    window.scaleCampaign = function (name) {
      playSound('launch');
      alert(`⚡ Campaign [${name}] scaled +20% with AI guardrails verified!`);
    };
  }

  // -----------------------------------------------------------------
  // 10. CHART.JS CYBER REVENUE TRAJECTORY
  // -----------------------------------------------------------------
  let chartInstance = null;

  function initRevenueChart() {
    const canvas = document.getElementById('revenue-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const gradMeta = ctx.createLinearGradient(0, 0, 0, 220);
    gradMeta.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
    gradMeta.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

    const gradGoogle = ctx.createLinearGradient(0, 0, 0, 220);
    gradGoogle.addColorStop(0, 'rgba(255, 0, 127, 0.35)');
    gradGoogle.addColorStop(1, 'rgba(255, 0, 127, 0.0)');

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 01', 'Day 05', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        datasets: [
          {
            label: 'Meta Ad Revenue',
            data: [4200, 5800, 7100, 6800, 8900, 11200, 14800],
            borderColor: '#00f0ff',
            backgroundColor: gradMeta,
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#00f0ff',
            pointBorderColor: '#fff',
            pointRadius: 4,
            pointHoverRadius: 7
          },
          {
            label: 'Google Ads Revenue',
            data: [2100, 3100, 3900, 4200, 4800, 5600, 6900],
            borderColor: '#ff007f',
            backgroundColor: gradGoogle,
            borderWidth: 2,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#ff007f',
            pointBorderColor: '#fff',
            pointRadius: 3,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#8b9bb4',
              font: { family: 'JetBrains Mono', size: 10 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(5, 8, 19, 0.92)',
            titleColor: '#00f0ff',
            bodyColor: '#fff',
            borderColor: '#00f0ff',
            borderWidth: 1,
            titleFont: { family: 'Orbitron', size: 11 },
            bodyFont: { family: 'JetBrains Mono', size: 11 },
            padding: 10
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(0, 240, 255, 0.05)' },
            ticks: { color: '#52637a', font: { family: 'JetBrains Mono', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(0, 240, 255, 0.05)' },
            ticks: {
              color: '#52637a',
              font: { family: 'JetBrains Mono', size: 10 },
              callback: (v) => '₹' + v.toLocaleString()
            }
          }
        }
      }
    });
  }

  // -----------------------------------------------------------------
  // 11. GSAP MAGNETIC RETICLE CURSOR
  // -----------------------------------------------------------------
  function initMagneticCursor() {
    const cursor = document.getElementById('magnetic-cursor');
    const dot = document.getElementById('magnetic-cursor-dot');
    if (!cursor || !dot || typeof gsap === 'undefined') return;

    let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    let posX = targetX, posY = targetY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX - 2}px, ${targetY - 2}px, 0)`;
    }, { passive: true });

    gsap.ticker.add(() => {
      posX += (targetX - posX) * 0.24;
      posY += (targetY - posY) * 0.24;
      cursor.style.transform = `translate3d(${posX - 17}px, ${posY - 17}px, 0)`;
    });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('button, a, input, textarea, select, .nav-item, .goal-card, .chip-btn, .opportunity-card, .creative-toggle, .step-item')) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
