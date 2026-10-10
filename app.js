/**
 * LivingADs — Bento Grid & Editorial AI Platform Controller
 */

(function () {
  'use strict';

  const state = {
    currentTab: 'assistant',
    campaigns: [
      {
        id: 'cmp_1',
        name: 'Meta Dynamic Catalog Retargeting',
        sub: '14-Day Cart Abandoners • Auto-Catalog Carousels',
        provider: 'Meta Ads',
        status: 'active',
        budget: '₹25,000 / day',
        spend: '₹43,900',
        roas: '4.62x',
        conversions: '580'
      },
      {
        id: 'cmp_2',
        name: 'Google High-Intent Search (Whole Bean)',
        sub: 'Exact Match "Cold Brew Beans" • 92% Top Share',
        provider: 'Google Ads',
        status: 'active',
        budget: '₹15,000 / day',
        spend: '₹12,150',
        roas: '3.85x',
        conversions: '310'
      },
      {
        id: 'cmp_3',
        name: 'TikTok Arabica Tasting Kit Spark Flow',
        sub: 'Creator UGC Video Placements • Gen Z Scale',
        provider: 'TikTok Ads',
        status: 'active',
        budget: '₹8,000 / day',
        spend: '₹3,420',
        roas: '3.15x',
        conversions: '420'
      }
    ]
  };

  function init() {
    setupRouter();
    setupChat();
    setupCampaigns();
    initChart();
    initAmbientCanvas();
    initBentoOrb();
    initTopology3D();
    initAttributionGlobe();
    initCreativeStudio();
    initMagneticCursor();
  }

  // 1. Tab Router
  function setupRouter() {
    const navItems = document.querySelectorAll('.nav-item');
    const viewPanels = document.querySelectorAll('.view-panel');
    const heading = document.getElementById('page-heading');

    navItems.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        state.currentTab = tab;

        navItems.forEach((n) => n.classList.toggle('active', n === btn));
        viewPanels.forEach((p) => p.classList.toggle('active', p.id === `view-${tab}`));

        const span = btn.querySelector('span');
        if (span && heading) heading.textContent = span.textContent;

        window.dispatchEvent(new Event('resize'));
      });
    });

    document.getElementById('btn-run-audit')?.addEventListener('click', () => {
      document.querySelector('.nav-item[data-tab="assistant"]')?.click();
      handleUserMessage('Synthesize a full strategic audit across our 30-day Meta and Google ad spend');
    });

    document.getElementById('bento-orb-cell')?.addEventListener('click', () => {
      document.querySelector('.nav-item[data-tab="assistant"]')?.click();
      document.getElementById('chat-input')?.focus();
    });
  }

  // 2. Editorial Conversational AI Engine
  function setupChat() {
    const form = document.getElementById('agent-chat-form');
    const input = document.getElementById('chat-input');

    // Editorial Prompt Cards
    document.querySelectorAll('.editorial-prompt-card').forEach((card) => {
      card.addEventListener('click', () => {
        const prompt = card.getAttribute('data-prompt');
        if (prompt) handleUserMessage(prompt);
      });
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      handleUserMessage(text);
    });
  }

  function handleUserMessage(text) {
    const chat = document.getElementById('chat-messages');
    if (!chat) return;

    // User Turn
    const userTurn = document.createElement('div');
    userTurn.className = 'chat-turn user-turn';
    userTurn.innerHTML = `
      <div class="turn-meta">Asha Syed • Northwind Growth Lead</div>
      <div class="turn-bubble user-bubble">${escapeHtml(text)}</div>
    `;
    chat.appendChild(userTurn);
    chat.scrollTop = chat.scrollHeight;

    // Assistant Turn with Thought Accordion
    const assistantTurn = document.createElement('div');
    assistantTurn.className = 'chat-turn assistant-turn';
    assistantTurn.innerHTML = `
      <div class="turn-meta">LivingADs Autonomous Agent • reasoning…</div>
      <div class="thought-process-accordion open">
        <div class="thought-header">
          <div class="thought-indicator"></div>
          <span class="thought-label">Synthesizing marketing telemetry & querying channel schemas…</span>
          <span class="thought-toggle">▼</span>
        </div>
        <div class="thought-body">
          <div class="thought-step">
            <span class="step-icon">✓</span>
            <span>Queried <strong>Meta Marketing API</strong> for recent conversion velocity</span>
          </div>
          <div class="thought-step">
            <span class="step-icon">✓</span>
            <span>Evaluated ROAS efficiency and CAC threshold benchmarks</span>
          </div>
        </div>
      </div>
      <div class="turn-bubble assistant-bubble">
        <p style="color: #94a3b8;">Synthesizing strategic growth insights and actionable recommendations…</p>
      </div>
    `;
    chat.appendChild(assistantTurn);
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      const bubble = assistantTurn.querySelector('.assistant-bubble');
      const thoughtLabel = assistantTurn.querySelector('.thought-label');
      if (thoughtLabel) thoughtLabel.textContent = 'Reasoned across 12,480 conversion touchpoints';
      if (bubble) bubble.innerHTML = generateEditorialReply(text);
      chat.scrollTop = chat.scrollHeight;
    }, 1300);
  }

  function generateEditorialReply(query) {
    const q = query.toLowerCase();

    if (q.includes('creative') || q.includes('copy') || q.includes('angle')) {
      return `
        <p class="editorial-lead">Here are 3 high-converting creative angles generated for <strong>Northwind Arabica Dark Roast</strong> based on top-performing hooks in the specialty coffee niche:</p>
        
        <div class="editorial-action-card">
          <div class="action-card-header">
            <span class="action-tag">ANGLE 01 • SENSORY & CRAFT</span>
            <span class="action-meta">Est. CTR 4.8%</span>
          </div>
          <h3 class="action-title">"The 6:00 AM Pour-Over Ritual" (Reels / TikTok)</h3>
          <p class="action-desc"><strong>Visual:</strong> Slow-motion golden crema blooming over Chemex filter.<br><strong>Hook:</strong> "Stop drinking stale grocery store beans. This micro-batch roast changes your mornings forever."</p>
        </div>

        <div class="editorial-action-card" style="margin-top: 10px;">
          <div class="action-card-header">
            <span class="action-tag">ANGLE 02 • VALUE COMPARISON</span>
            <span class="action-meta">Est. CTR 3.9%</span>
          </div>
          <h3 class="action-title">"₹35 vs ₹350 Café Espresso" (Meta Carousel)</h3>
          <p class="action-desc"><strong>Hook:</strong> "How I brew cafe-quality specialty espresso at home for 1/10th the price with fresh roasted whole bean delivery."</p>
        </div>
      `;
    }

    if (q.includes('retarget') || q.includes('campaign') || q.includes('graph') || q.includes('node')) {
      return `
        <p class="editorial-lead">I have drafted an autonomous <strong>5-Node Dynamic Retargeting Blueprint</strong> for Northwind Coffee Co.:</p>
        <ul class="editorial-list">
          <li><strong>Node 1: Audience Trigger:</strong> 14-day cart abandoners of Whole Bean & Cold Brew SKUs.</li>
          <li><strong>Node 2: Dynamic Ad Set:</strong> Instagram & Facebook Carousel showcasing viewed products with social proof reviews.</li>
          <li><strong>Node 3: Incentive Trigger:</strong> If unpurchased after 48h → Deliver personalized 15% First-Bag code.</li>
          <li><strong>Node 4: CAPI Verification:</strong> Server-side event verification with zero attribution drop.</li>
        </ul>
        <div class="editorial-action-card">
          <div class="action-card-header">
            <span class="action-tag">READY TO EXECUTE</span>
            <span class="action-meta">+18% Conversion Lift</span>
          </div>
          <h3 class="action-title">Deploy Retargeting Node Graph to Meta Marketing API</h3>
          <p class="action-desc">Reallocates ₹8,000 daily budget from the lowest-performing prospecting set into this dynamic flow.</p>
          <div class="action-btns">
            <button class="btn-editorial primary" onclick="alert('✅ Blueprint executed via Meta API!')">Execute Deployment</button>
            <button class="btn-editorial secondary" onclick="document.querySelector('.nav-item[data-tab=topology]').click()">Inspect 3D Node Topology</button>
          </div>
        </div>
      `;
    }

    return `
      <p class="editorial-lead">Strategic synthesis across Meta, Google Ads, and server-side Conversion API for: <em>"${escapeHtml(query)}"</em></p>
      
      <div class="chat-bento-metrics">
        <div class="c-bento-cell">
          <span class="cb-label">Efficiency Index</span>
          <span class="cb-val highlight">94/100</span>
          <span class="cb-sub positive">Top 5% Cohort</span>
        </div>
        <div class="c-bento-cell">
          <span class="cb-label">Blended ROAS</span>
          <span class="cb-val">3.87x</span>
          <span class="cb-sub positive">+0.45x MoM</span>
        </div>
        <div class="c-bento-cell">
          <span class="cb-label">Scale SKU</span>
          <span class="cb-val">Arabica Dark</span>
          <span class="cb-sub positive">₹45.40 CAC</span>
        </div>
        <div class="c-bento-cell">
          <span class="cb-label">Pixel Health</span>
          <span class="cb-val">99.8%</span>
          <span class="cb-sub positive">Optimal Match</span>
        </div>
      </div>

      <p style="color: #94a3b8; font-size: 13px;"><strong>Executive Takeaway:</strong> Unit economics remain highly scalable. Daily ad spend on the Meta Retargeting flow can be increased by +25% without diminishing returns on blended ROAS.</p>
    `;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // 3. Campaigns Table
  function setupCampaigns() {
    const tbody = document.getElementById('campaigns-table-body');
    if (!tbody) return;

    tbody.innerHTML = state.campaigns.map((c) => `
      <tr>
        <td>
          <div class="tbl-campaign-name">${c.name}</div>
          <div class="tbl-campaign-sub">${c.sub}</div>
        </td>
        <td><strong style="color: #fff;">${c.provider}</strong></td>
        <td>
          <span style="color: #10b981; font-weight: 700; font-size: 11px; display: inline-flex; align-items: center; gap: 4px;">
            <span style="width: 5px; height: 5px; border-radius: 50%; background: #10b981;"></span>
            ${c.status.toUpperCase()}
          </span>
        </td>
        <td><span style="color: #fff; font-family: var(--font-mono);">${c.budget}</span></td>
        <td><span style="color: #fff; font-family: var(--font-mono);">${c.spend}</span></td>
        <td><strong style="color: #10b981; font-family: var(--font-mono);">${c.roas}</strong></td>
        <td><strong style="color: #06b6d4; font-family: var(--font-mono);">${c.conversions}</strong></td>
        <td>
          <button class="btn-editorial" style="padding: 4px 10px; font-size: 11px;" onclick="alert('⚡ Scaling applied to ${c.name}!')">Scale +20%</button>
        </td>
      </tr>
    `).join('');

    document.getElementById('btn-create-campaign')?.addEventListener('click', () => {
      document.querySelector('.nav-item[data-tab="assistant"]')?.click();
      handleUserMessage('Help me create and launch a new high-converting Meta & Google ad campaign for Cold Brew Concentrate');
    });
  }

  // 4. Chart.js Bento Revenue Trajectory
  function initChart() {
    const canvas = document.getElementById('revenue-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    
    const grad1 = ctx.createLinearGradient(0, 0, 0, 220);
    grad1.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
    grad1.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    const grad2 = ctx.createLinearGradient(0, 0, 0, 220);
    grad2.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    grad2.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        datasets: [
          {
            label: 'Meta Ad Revenue',
            data: [4200, 5800, 7100, 6800, 8900, 11200, 14800],
            borderColor: '#6366f1',
            backgroundColor: grad1,
            borderWidth: 2,
            fill: true,
            tension: 0.35,
            pointRadius: 0
          },
          {
            label: 'Google Ads Revenue',
            data: [2100, 3100, 3900, 4200, 4800, 5600, 6900],
            borderColor: '#06b6d4',
            backgroundColor: grad2,
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
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.03)' },
            ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.03)' },
            ticks: {
              color: '#64748b',
              font: { family: 'JetBrains Mono', size: 10 },
              callback: (v) => '₹' + v
            }
          }
        }
      }
    });
  }

  // 5. Ambient WebGL Particles
  function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 30;

    const count = 250;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color('#6366f1');
    const c2 = new THREE.Color('#06b6d4');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const mixed = c1.clone().lerp(c2, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({ size: 1.4, vertexColors: true, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0006;
      renderer.render(scene, camera);
    }
    animate();
  }

  // 6. Bento 3D AI Neural Orb
  function initBentoOrb() {
    const canvas = document.getElementById('bento-orb-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(130, 130);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 4.2;

    const orb = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.1, 3),
      new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x312e81, shininess: 90, transparent: true, opacity: 0.85 })
    );
    scene.add(orb);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 1),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.55 })
    );
    scene.add(wire);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.03, 12, 48),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.7 })
    );
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const light = new THREE.PointLight(0x06b6d4, 2, 15);
    light.position.set(3, 3, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    function animate() {
      requestAnimationFrame(animate);
      orb.rotation.y += 0.012;
      orb.rotation.x += 0.008;
      wire.rotation.y -= 0.008;
      ring.rotation.z += 0.015;
      renderer.render(scene, camera);
    }
    animate();
  }

  // 7. 3D Neural Campaign Topology Graph
  function initTopology3D() {
    const canvas = document.getElementById('topology-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const width = canvas.clientWidth || 900;
    const height = canvas.clientHeight || 580;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const group = new THREE.Group();
    scene.add(group);

    const NODES = [
      { name: '14D Cart Abandoners', pos: [-5, 2, 0], color: 0x6366f1, size: 0.8 },
      { name: 'Meta Dynamic Catalog', pos: [-1, 2.5, 1], color: 0x06b6d4, size: 1.1 },
      { name: 'Cold Brew Video Ads', pos: [-1, -2, -1], color: 0xec4899, size: 0.9 },
      { name: '15% Incentive Code', pos: [3.5, 1.5, 0], color: 0x10b981, size: 0.85 },
      { name: 'Shopify Purchase Event', pos: [6.5, 0, 0], color: 0xf59e0b, size: 1.3 }
    ];

    const nodeMeshes = [];
    NODES.forEach((n) => {
      const geo = new THREE.SphereGeometry(n.size, 24, 24);
      const mat = new THREE.MeshPhongMaterial({ color: n.color, emissive: n.color, emissiveIntensity: 0.4, shininess: 80 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...n.pos);
      group.add(mesh);
      nodeMeshes.push(mesh);
    });

    const connections = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]];
    connections.forEach(([fromIdx, toIdx]) => {
      const p1 = new THREE.Vector3(...NODES[fromIdx].pos);
      const p2 = new THREE.Vector3(...NODES[toIdx].pos);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.y += 1.2;

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
      const curveMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 });
      group.add(new THREE.Line(curveGeo, curveMat));
    });

    scene.add(new THREE.PointLight(0xffffff, 1.5, 40));
    scene.add(new THREE.AmbientLight(0x6366f1, 0.4));

    let isDragging = false, prev = { x: 0, y: 0 };
    canvas.addEventListener('mousedown', (e) => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('mouseup', () => (isDragging = false));
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      group.rotation.y += (e.clientX - prev.x) * 0.005;
      group.rotation.x += (e.clientY - prev.y) * 0.005;
      prev = { x: e.clientX, y: e.clientY };
    });

    document.getElementById('btn-pulse-topology-data')?.addEventListener('click', () => {
      nodeMeshes.forEach((mesh, i) => {
        gsap.to(mesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.25, delay: i * 0.15, yoyo: true, repeat: 1 });
      });
    });

    document.getElementById('btn-reset-topology-cam')?.addEventListener('click', () => {
      gsap.to(group.rotation, { x: 0, y: 0, z: 0, duration: 0.5 });
    });

    function animate() {
      requestAnimationFrame(animate);
      if (!isDragging) group.rotation.y += 0.0015;
      renderer.render(scene, camera);
    }
    animate();
  }

  // 8. 3D Geo Attribution Globe
  function initAttributionGlobe() {
    const canvas = document.getElementById('attribution-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const width = canvas.clientWidth || 900;
    const height = canvas.clientHeight || 580;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(6, 40, 40),
      new THREE.MeshPhongMaterial({ color: 0x0f111c, emissive: 0x070913, specular: 0x38bdf8, shininess: 30 })
    );
    scene.add(globe);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(6.05, 24, 12),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.2 })
    );
    globe.add(wire);

    scene.add(new THREE.DirectionalLight(0xffffff, 1.2));
    scene.add(new THREE.AmbientLight(0x38bdf8, 0.5));

    let isDragging = false, prev = { x: 0, y: 0 };
    canvas.addEventListener('mousedown', (e) => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('mouseup', () => (isDragging = false));
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      globe.rotation.y += (e.clientX - prev.x) * 0.005;
      globe.rotation.x += (e.clientY - prev.y) * 0.005;
      prev = { x: e.clientX, y: e.clientY };
    });

    function animate() {
      requestAnimationFrame(animate);
      if (!isDragging) globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    }
    animate();
  }

  // 9. 3D Creative Studio
  function initCreativeStudio() {
    const canvas = document.getElementById('creative-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const width = canvas.clientWidth || 900;
    const height = canvas.clientHeight || 580;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const group = new THREE.Group();
    scene.add(group);

    const bag = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 3.8, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.15 })
    );
    group.add(bag);

    const labelMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.25 });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.4), labelMat);
    label.position.z = 0.71;
    group.add(label);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.04, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 })
    );
    halo.rotation.x = Math.PI / 2.3;
    scene.add(halo);

    const spot = new THREE.SpotLight(0x06b6d4, 3);
    spot.position.set(5, 7, 6);
    scene.add(spot);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Material Switcher
    document.querySelectorAll('.material-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.material-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const mat = btn.getAttribute('data-mat');
        if (mat === 'gold') {
          labelMat.color.setHex(0xd97706);
          labelMat.metalness = 0.85;
        } else if (mat === 'cyber') {
          labelMat.color.setHex(0x06b6d4);
          labelMat.metalness = 0.95;
        } else if (mat === 'emerald') {
          labelMat.color.setHex(0x10b981);
          labelMat.metalness = 0.75;
        }
      });
    });

    let isDragging = false, prev = { x: 0, y: 0 };
    canvas.addEventListener('mousedown', (e) => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('mouseup', () => (isDragging = false));
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      group.rotation.y += (e.clientX - prev.x) * 0.008;
      group.rotation.x += (e.clientY - prev.y) * 0.008;
      prev = { x: e.clientX, y: e.clientY };
    });

    function animate() {
      requestAnimationFrame(animate);
      if (!isDragging) group.rotation.y += 0.008;
      halo.rotation.z += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }

  // 10. GSAP Follower Cursor
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
      cursor.style.transform = `translate3d(${posX - 15}px, ${posY - 15}px, 0)`;
    });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('button, a, input, textarea, .nav-item, .editorial-prompt-card, .bento-cell')) {
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
