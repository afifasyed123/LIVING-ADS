/**
 * LivingADs UX Redesign — Interactive 6-Stage Journey & Platform Engine
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

  function init() {
    setupTabRouter();
    setupJourneyStepper();
    setupProgressiveDisclosure();
    setupAIStrategistChat();
    setupCampaignsTable();
    initRevenueChart();
    initMagneticCursor();
  }

  // 1. Tab Router
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
          setTimeout(initRevenueChart, 100);
        }
      });
    });

    document.getElementById('btn-quick-audit-top')?.addEventListener('click', () => {
      document.querySelector('.nav-item[data-tab="assistant"]')?.click();
      handleAIChatMessage('Perform an instant multi-channel audit across Meta and Google Ads');
    });
  }

  // 2. The 6-Stage Guided Stepper Journey
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
    }

    // Step 1: Goal Selection
    document.querySelectorAll('.goal-card').forEach((card) => {
      card.addEventListener('click', () => {
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
        const parent = chip.closest('.chip-group');
        parent.querySelectorAll('.chip-btn').forEach((b) => b.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    document.getElementById('btn-to-stage-3')?.addEventListener('click', () => goToStep(3));
    document.getElementById('btn-back-to-2')?.addEventListener('click', () => goToStep(2));

    // Step 3: Plan Review
    document.getElementById('btn-to-stage-4')?.addEventListener('click', () => goToStep(4));
    document.getElementById('btn-back-to-3')?.addEventListener('click', () => goToStep(3));

    // Step 4: Inline Customization
    const sliderMeta = document.getElementById('slider-meta');
    const valMeta = document.getElementById('val-meta-budget');
    sliderMeta?.addEventListener('input', (e) => {
      valMeta.textContent = `₹${e.target.value} / day`;
      state.metaBudget = parseInt(e.target.value, 10);
    });

    const sliderRetarget = document.getElementById('slider-retarget');
    const valRetarget = document.getElementById('val-retarget-budget');
    sliderRetarget?.addEventListener('input', (e) => {
      valRetarget.textContent = `₹${e.target.value} / day`;
      state.retargetBudget = parseInt(e.target.value, 10);
    });

    // Creative Angle Toggles
    document.querySelectorAll('.creative-toggle').forEach((t) => {
      t.addEventListener('click', () => t.classList.toggle('active'));
    });

    document.getElementById('btn-to-stage-5')?.addEventListener('click', () => goToStep(5));
    document.getElementById('btn-back-to-4')?.addEventListener('click', () => goToStep(4));

    // Step 5: Approval & Launch
    document.getElementById('btn-execute-launch')?.addEventListener('click', () => {
      // Confetti burst
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      goToStep(6);
    });
  }

  // 3. Progressive Disclosure (Beginner vs Power User)
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
      });
    });

    // Default to beginner view
    if (powerSection) powerSection.style.display = 'none';
  }

  // 4. AI Growth Strategist Chat
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
    u.style.marginBottom = '12px';
    u.innerHTML = `
      <div style="font-size: 10px; color: #64748b; margin-bottom: 4px;">Asha Syed</div>
      <div style="background: #1e2238; border: 1px solid rgba(99, 102, 241, 0.4); padding: 12px 18px; border-radius: 16px 16px 4px 16px; font-size: 13px; max-width: 80%; color: #fff;">
        ${escapeHtml(text)}
      </div>
    `;
    chat.appendChild(u);
    chat.scrollTop = chat.scrollHeight;

    // Assistant Turn
    const a = document.createElement('div');
    a.className = 'chat-turn assistant-turn';
    a.style.marginBottom = '16px';
    a.innerHTML = `
      <div style="font-size: 10px; color: #64748b; margin-bottom: 4px;">LivingADs Autonomous Agent • reasoning…</div>
      <div style="background: rgba(16, 20, 32, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); padding: 18px; border-radius: 16px; font-size: 13px; color: #e2e8f0; line-height: 1.5;">
        <p style="color: #94a3b8;">Synthesizing marketing intelligence across Meta and Google Ads pipelines…</p>
      </div>
    `;
    chat.appendChild(a);
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      const bubble = a.querySelector('div:nth-child(2)');
      if (bubble) {
        bubble.innerHTML = `
          <p><strong>Strategic Growth Diagnostic:</strong> Analyzed 12,480 conversion events for <em>"${escapeHtml(text)}"</em>.</p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 12px 0;">
            <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
              <span style="font-size: 10px; color: #64748b;">Target ROAS</span>
              <strong style="display: block; font-size: 16px; color: #10b981; font-family: var(--font-mono);">3.87x</strong>
            </div>
            <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
              <span style="font-size: 10px; color: #64748b;">Customer CAC</span>
              <strong style="display: block; font-size: 16px; color: #fff; font-family: var(--font-mono);">₹45.40</strong>
            </div>
            <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
              <span style="font-size: 10px; color: #64748b;">CAPI Health</span>
              <strong style="display: block; font-size: 16px; color: #06b6d4; font-family: var(--font-mono);">99.8%</strong>
            </div>
          </div>
          <p>Would you like me to launch a dedicated <strong>Campaign Journey</strong> to scale this strategy automatically?</p>
          <button class="btn-editorial primary" style="margin-top: 10px;" onclick="document.querySelector('.nav-item[data-tab=journey]').click()">Open 6-Step Campaign Journey →</button>
        `;
        chat.scrollTop = chat.scrollHeight;
      }
    }, 1100);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // 5. Campaigns Table
  function setupCampaignsTable() {
    const tbody = document.getElementById('campaigns-table-body');
    if (!tbody) return;

    tbody.innerHTML = state.campaigns.map((c) => `
      <tr>
        <td>
          <div style="font-weight: 700; color: #fff;">${c.name}</div>
          <div style="font-size: 11px; color: #64748b;">${c.sku}</div>
        </td>
        <td><strong style="color: #fff;">${c.platform}</strong></td>
        <td>
          <span style="color: #10b981; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
            <span style="width: 5px; height: 5px; border-radius: 50%; background: #10b981;"></span>
            ${c.status.toUpperCase()}
          </span>
        </td>
        <td><span style="font-family: var(--font-mono); color: #fff;">${c.budget}</span></td>
        <td><span style="font-family: var(--font-mono); color: #fff;">${c.spend}</span></td>
        <td><strong style="color: #10b981; font-family: var(--font-mono);">${c.roas}</strong></td>
        <td><strong style="color: #06b6d4; font-family: var(--font-mono);">${c.conversions}</strong></td>
        <td>
          <button class="btn-editorial secondary" style="padding: 4px 10px; font-size: 11px;" onclick="alert('⚡ Campaign ${c.name} scaled +20%!')">Scale</button>
        </td>
      </tr>
    `).join('');
  }

  // 6. Chart.js Revenue Trajectory
  let chartInstance = null;
  function initRevenueChart() {
    const canvas = document.getElementById('revenue-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const gradMeta = ctx.createLinearGradient(0, 0, 0, 220);
    gradMeta.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
    gradMeta.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    const gradGoogle = ctx.createLinearGradient(0, 0, 0, 220);
    gradGoogle.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    gradGoogle.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        datasets: [
          {
            label: 'Meta Ad Revenue',
            data: [4200, 5800, 7100, 6800, 8900, 11200, 14800],
            borderColor: '#6366f1',
            backgroundColor: gradMeta,
            borderWidth: 2,
            fill: true,
            tension: 0.35,
            pointRadius: 0
          },
          {
            label: 'Google Ads Revenue',
            data: [2100, 3100, 3900, 4200, 4800, 5600, 6900],
            borderColor: '#06b6d4',
            backgroundColor: gradGoogle,
            borderWidth: 2,
            fill: true,
            tension: 0.35,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#64748b', font: { size: 10 } } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#64748b', font: { size: 10 }, callback: (v) => '₹' + v } }
        }
      }
    });
  }

  // 7. GSAP Cursor
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
      posX += (targetX - posX) * 0.22;
      posY += (targetY - posY) * 0.22;
      cursor.style.transform = `translate3d(${posX - 14}px, ${posY - 14}px, 0)`;
    });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('button, a, input, textarea, .nav-item, .goal-card, .chip-btn, .opportunity-card, .creative-toggle')) {
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
