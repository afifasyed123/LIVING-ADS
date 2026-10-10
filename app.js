/**
 * LivingADs Next-Gen Autonomous AI Growth Platform
 * Logic, 3D WebGL Engines, Router & Chat Controller
 */

(function () {
  'use strict';

  // State
  const state = {
    currentTab: 'assistant',
    campaigns: [
      {
        id: 'cmp_1',
        name: 'Meta Dynamic Retargeting (Reels & Feed)',
        sub: '14-Day Cart Abandoners • Auto-Catalog',
        provider: 'Meta Ads',
        status: 'active',
        budget: '₹25,000 / day',
        spend: '₹43,900',
        roas: '4.62x',
        conversions: '580'
      },
      {
        id: 'cmp_2',
        name: 'Google High-Intent Whole Bean Search',
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
        name: 'TikTok Arabica Tasting Kit Scale',
        sub: 'Spark Ads with Creator Content • Gen Z Cohort',
        provider: 'TikTok Ads',
        status: 'active',
        budget: '₹8,000 / day',
        spend: '₹3,420',
        roas: '3.15x',
        conversions: '420'
      }
    ]
  };

  // DOM Elements
  const navItems = document.querySelectorAll('.nav-item');
  const viewPanels = document.querySelectorAll('.view-panel');
  const viewTitle = document.getElementById('current-view-title');
  const chatForm = document.getElementById('agent-chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // Initialize
  function initApp() {
    setupNavigation();
    setupChatEngine();
    setupCampaignsTable();
    initChart();
    initAmbientCanvas();
    initNeuralCoreOrb();
    initTopology3D();
    initAttributionGlobe();
    initCreativeStudio();
    initMagneticCursor();
  }

  // 1. Navigation & Tab Routing
  function setupNavigation() {
    navItems.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    document.getElementById('ai-neural-core')?.addEventListener('click', () => {
      switchTab('assistant');
      chatInput?.focus();
    });

    document.getElementById('btn-inspect-graph')?.addEventListener('click', () => {
      switchTab('topology');
    });

    document.getElementById('btn-quick-audit')?.addEventListener('click', () => {
      switchTab('assistant');
      handleUserMessage('Perform an instant comprehensive audit across all active Meta & Google ad blueprints');
    });
  }

  function switchTab(tabId) {
    state.currentTab = tabId;
    navItems.forEach((item) => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    viewPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === `view-${tabId}`);
    });

    const activeItem = document.querySelector(`.nav-item[data-tab="${tabId}"] span`);
    if (activeItem && viewTitle) {
      viewTitle.textContent = activeItem.textContent;
    }

    // Trigger 3D resizes if needed
    window.dispatchEvent(new Event('resize'));
  }

  // 2. Autonomous AI Chat Engine
  function setupChatEngine() {
    // Quick prompt chips
    document.querySelectorAll('.quick-prompt-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (prompt) handleUserMessage(prompt);
      });
    });

    // Form submission
    chatForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleUserMessage(text);
    });
  }

  function handleUserMessage(text) {
    // Append User message
    const userTurn = document.createElement('div');
    userTurn.className = 'chat-turn user-turn';
    userTurn.innerHTML = `<div class="turn-bubble user-bubble">${escapeHtml(text)}</div>`;
    chatMessages.appendChild(userTurn);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // AI Thinking State
    const assistantTurn = document.createElement('div');
    assistantTurn.className = 'chat-turn assistant-turn';
    
    const thoughtAccordion = document.createElement('div');
    thoughtAccordion.className = 'thought-process-accordion open';
    thoughtAccordion.innerHTML = `
      <div class="thought-header">
        <div class="thought-pulse"></div>
        <span class="thought-label">Thinking • Inspecting Meta & Google API Schemas…</span>
        <span class="thought-toggle">▼</span>
      </div>
      <div class="thought-body">
        <div class="thought-step ok">
          <span class="step-check">✓</span>
          <span class="step-text">Connecting to <strong>Northwind Coffee Workspace</strong></span>
          <span class="step-badge">auth_ok</span>
        </div>
        <div class="thought-step ok">
          <span class="step-check">✓</span>
          <span class="step-text">Evaluating keyword bids & cross-channel attribution matrix</span>
          <span class="step-badge">growth_heuristics</span>
        </div>
      </div>
    `;
    assistantTurn.appendChild(thoughtAccordion);

    const answerBubble = document.createElement('div');
    answerBubble.className = 'turn-bubble assistant-bubble';
    answerBubble.innerHTML = `<p style="color: #94a3b8;">Synthesizing marketing recommendations and live action blueprints…</p>`;
    assistantTurn.appendChild(answerBubble);

    chatMessages.appendChild(assistantTurn);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI synthesis
    setTimeout(() => {
      thoughtAccordion.querySelector('.thought-label').textContent = 'Thought for 2.8s • Analyzed 3 Channels';
      
      let replyContent = generateAIReply(text);
      answerBubble.innerHTML = replyContent;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1400);
  }

  function generateAIReply(query) {
    const q = query.toLowerCase();
    
    if (q.includes('creative') || q.includes('copy') || q.includes('angle')) {
      return `
        <p>Here are 3 high-converting creative angles generated for <strong>Northwind Arabica Dark Roast</strong> based on top-performing hooks in the coffee niche:</p>
        <div class="proposal-card">
          <div class="proposal-header">
            <span class="proposal-badge">ANGLE 1 • SENSORY & CRAFT</span>
            <span class="proposal-impact">Est. CTR 4.8%</span>
          </div>
          <div class="proposal-title">"The 6:00 AM Pour-Over Ritual" (Reels / TikTok)</div>
          <p class="proposal-desc"><strong>Visual:</strong> Slow-motion golden crema blooming over Chemex filter.<br><strong>Hook:</strong> "Stop drinking burnt grocery store beans. This micro-batch roast changes your mornings forever."</p>
        </div>
        <div class="proposal-card" style="margin-top: 10px;">
          <div class="proposal-header">
            <span class="proposal-badge" style="background:#00f2fe;color:#000;">ANGLE 2 • COMPARISON HOOK</span>
            <span class="proposal-impact">Est. CTR 3.9%</span>
          </div>
          <div class="proposal-title">"₹35 vs ₹350 Café Espresso" (Meta Carousel)</div>
          <p class="proposal-desc"><strong>Hook:</strong> "How I brew cafe-quality specialty espresso at home for 1/10th the price."</p>
        </div>
      `;
    }

    if (q.includes('retarget') || q.includes('campaign') || q.includes('node') || q.includes('graph')) {
      return `
        <p>I have drafted a <strong>5-Node Dynamic Retargeting Blueprint</strong> for Northwind Coffee Co.:</p>
        <ul class="styled-list">
          <li><strong>Node 1:</strong> Audience Trigger: Viewed 'Dark Roast' or Added to Cart within 14 days without purchasing.</li>
          <li><strong>Node 2:</strong> Dynamic Product Catalog Carousel on Instagram & Facebook Feed.</li>
          <li><strong>Node 3:</strong> If unpurchased after 48h → Deliver 15% First-Bag Subscriber Discount code.</li>
          <li><strong>Node 4:</strong> Sync event stream with Meta Conversions API (CAPI) for real-time bid optimization.</li>
        </ul>
        <div class="proposal-card">
          <div class="proposal-header">
            <span class="proposal-badge">⚡ READY TO DEPLOY</span>
            <span class="proposal-impact">+18% Conversion Lift</span>
          </div>
          <div class="proposal-title">Deploy Dynamic Retargeting Node Graph to Meta Ads Manager</div>
          <p class="proposal-desc">Allocates ₹8,000 daily budget from the lowest-performing prospecting set directly into this flow.</p>
          <div class="proposal-actions">
            <button class="btn-primary" onclick="alert('✅ Campaign Graph successfully synced with Meta Marketing API!')">Execute Deployment</button>
            <button class="btn-secondary" onclick="document.querySelector('.nav-item[data-tab=topology]').click()">View 3D Topology</button>
          </div>
        </div>
      `;
    }

    return `
      <p>I analyzed your growth data across Meta, Google, and your server-side conversion pipeline for: <em>"${escapeHtml(query)}"</em></p>
      
      <div class="response-stat-grid">
        <div class="response-stat-box">
          <span class="r-label">Efficiency Score</span>
          <span class="r-val" style="color: #10b981;">94 / 100</span>
          <span class="r-change positive">Top 5% in Category</span>
        </div>
        <div class="response-stat-box">
          <span class="r-label">Blended ROAS</span>
          <span class="r-val">3.87x</span>
          <span class="r-change positive">+0.45x Gain</span>
        </div>
        <div class="response-stat-box">
          <span class="r-label">Active Scale SKU</span>
          <span class="r-val" style="color: #00f2fe;">Whole Bean</span>
          <span class="r-change positive">₹45.40 CAC</span>
        </div>
        <div class="response-stat-box">
          <span class="r-label">Pixel Health</span>
          <span class="r-val">99.8%</span>
          <span class="r-change positive">Zero Deduplication Drop</span>
        </div>
      </div>

      <p><strong>Recommendation:</strong> Your unit economics are exceptionally strong. You can safely increase daily spend on Meta Dynamic Retargeting by +25% without diminishing returns on blended ROAS.</p>
    `;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // 3. Campaigns Table
  function setupCampaignsTable() {
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
          <span class="tbl-status-badge ${c.status}">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span>
            ${c.status.toUpperCase()}
          </span>
        </td>
        <td><span style="color: #fff; font-family: var(--font-mono);">${c.budget}</span></td>
        <td><span style="color: #fff; font-family: var(--font-mono);">${c.spend}</span></td>
        <td><strong style="color: #10b981; font-family: var(--font-mono);">${c.roas}</strong></td>
        <td><strong style="color: #00f2fe; font-family: var(--font-mono);">${c.conversions}</strong></td>
        <td>
          <button class="switch-btn" onclick="alert('⚡ Live adjustment applied to ${c.name}!')">Edit / Scale</button>
        </td>
      </tr>
    `).join('');

    document.getElementById('btn-create-campaign')?.addEventListener('click', () => {
      switchTab('assistant');
      handleUserMessage('Help me create and launch a new high-converting Meta & Google ad campaign for Cold Brew Concentrate');
    });
  }

  // 4. Chart.js Daily Revenue & ROAS Trajectory
  function initChart() {
    const canvas = document.getElementById('revenue-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    
    const gradientMeta = ctx.createLinearGradient(0, 0, 0, 260);
    gradientMeta.addColorStop(0, 'rgba(116, 100, 242, 0.45)');
    gradientMeta.addColorStop(1, 'rgba(116, 100, 242, 0.0)');

    const gradientGoogle = ctx.createLinearGradient(0, 0, 0, 260);
    gradientGoogle.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
    gradientGoogle.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        datasets: [
          {
            label: 'Meta Ad Revenue',
            data: [4200, 5800, 7100, 6800, 8900, 11200, 14800],
            borderColor: '#7464f2',
            backgroundColor: gradientMeta,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#7464f2',
            pointRadius: 3
          },
          {
            label: 'Google Ads Revenue',
            data: [2100, 3100, 3900, 4200, 4800, 5600, 6900],
            borderColor: '#00f2fe',
            backgroundColor: gradientGoogle,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00f2fe',
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(18, 20, 32, 0.9)',
            titleColor: '#fff',
            bodyColor: '#94a3b8',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: {
              color: '#64748b',
              font: { family: 'JetBrains Mono', size: 11 },
              callback: (val) => '₹' + val
            }
          }
        }
      }
    });
  }

  // 5. Three.js Ambient Background Particle Grid
  function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 30;

    const count = 300;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color('#7464f2');
    const c2 = new THREE.Color('#00f2fe');

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

    const mat = new THREE.PointsMaterial({ size: 1.6, vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0004;

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  }

  // 6. Floating 3D AI Neural Core Orb
  function initNeuralCoreOrb() {
    const canvas = document.getElementById('neural-core-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(120, 120);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 4.2;

    const sphereGeo = new THREE.IcosahedronGeometry(1.1, 3);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x7464f2,
      emissive: 0x3b2d99,
      shininess: 90,
      transparent: true,
      opacity: 0.85
    });
    const orb = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(orb);

    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 1), new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true, transparent: true, opacity: 0.55 }));
    scene.add(wire);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.03, 12, 48), new THREE.MeshBasicMaterial({ color: 0x7464f2, transparent: true, opacity: 0.7 }));
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const light = new THREE.PointLight(0x00f2fe, 2, 15);
    light.position.set(3, 3, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    function animate() {
      requestAnimationFrame(animate);
      orb.rotation.y += 0.015;
      orb.rotation.x += 0.01;
      wire.rotation.y -= 0.01;
      ring.rotation.z += 0.018;
      renderer.render(scene, camera);
    }
    animate();
  }

  // 7. 3D Neural Campaign Topology Graph (Three.js)
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

    // Nodes
    const NODES = [
      { name: '14D Cart Abandoners', pos: [-5, 2, 0], color: 0x7464f2, size: 0.8, desc: 'High-intent pixel cohort trigger' },
      { name: 'Meta Dynamic Catalog Carousel', pos: [-1, 2.5, 1], color: 0x00f2fe, size: 1.1, desc: 'Auto-generates personal product carousel' },
      { name: 'Cold Brew Video Ad Set', pos: [-1, -2, -1], color: 0xec4899, size: 0.9, desc: 'Sensory pour-over video creative' },
      { name: '15% Subscriber Incentive Code', pos: [3.5, 1.5, 0], color: 0x10b981, size: 0.85, desc: 'Conversion booster on 48h hesitation' },
      { name: 'Shopify Checkout Conversion', pos: [6.5, 0, 0], color: 0xf59e0b, size: 1.3, desc: 'Attributed purchase event (CAPI Verified)' }
    ];

    const nodeMeshes = [];
    NODES.forEach((n) => {
      const geo = new THREE.SphereGeometry(n.size, 24, 24);
      const mat = new THREE.MeshPhongMaterial({ color: n.color, emissive: n.color, emissiveIntensity: 0.4, shininess: 80 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...n.pos);
      mesh.userData = n;
      group.add(mesh);
      nodeMeshes.push(mesh);

      // Node Halo
      const halo = new THREE.Mesh(new THREE.RingGeometry(n.size * 1.3, n.size * 1.5, 24), new THREE.MeshBasicMaterial({ color: n.color, side: THREE.DoubleSide, transparent: true, opacity: 0.6 }));
      halo.position.set(...n.pos);
      group.add(halo);
    });

    // Connecting Bezier Curves
    const connections = [
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4]
    ];

    connections.forEach(([fromIdx, toIdx]) => {
      const p1 = new THREE.Vector3(...NODES[fromIdx].pos);
      const p2 = new THREE.Vector3(...NODES[toIdx].pos);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.y += 1.2;

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
      const curveMat = new THREE.LineBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7, linewidth: 2 });
      group.add(new THREE.Line(curveGeo, curveMat));
    });

    scene.add(new THREE.PointLight(0xffffff, 1.5, 40));
    scene.add(new THREE.AmbientLight(0x7464f2, 0.4));

    let isDragging = false, prev = { x: 0, y: 0 };
    canvas.addEventListener('mousedown', (e) => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('mouseup', () => (isDragging = false));
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      group.rotation.y += (e.clientX - prev.x) * 0.005;
      group.rotation.x += (e.clientY - prev.y) * 0.005;
      prev = { x: e.clientX, y: e.clientY };
    });

    // Pulse Wave Button
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

  // 8. 3D Geo Attribution Globe (Three.js & Deck.gl style)
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
      new THREE.MeshPhongMaterial({ color: 0x0f172a, emissive: 0x060b17, specular: 0x38bdf8, shininess: 30 })
    );
    scene.add(globe);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(6.05, 24, 12),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.18 })
    );
    globe.add(wire);

    // City Pins
    const CITIES = [
      { lat: 28.6139, lon: 77.2090 }, // Delhi
      { lat: 19.0760, lon: 72.8777 }, // Mumbai
      { lat: 12.9716, lon: 77.5946 }, // Bengaluru
      { lat: 37.7749, lon: -122.4194 }, // SF
      { lat: 51.5074, lon: -0.1278 } // London
    ];

    function latLonToVector3(lat, lon, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    CITIES.forEach((c) => {
      const p = latLonToVector3(c.lat, c.lon, 6.06);
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.02, 0.7, 8), new THREE.MeshBasicMaterial({ color: 0x00f2fe }));
      pin.position.copy(p);
      pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());
      globe.add(pin);
    });

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 10, 15);
    scene.add(dirLight);
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

  // 9. 3D Creative Studio (Northwind Coffee Showcase)
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
      new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7 })
    );
    halo.rotation.x = Math.PI / 2.3;
    scene.add(halo);

    const spot = new THREE.SpotLight(0x00f2fe, 3);
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
          labelMat.color.setHex(0x00f2fe);
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

  // 10. GSAP Magnetic Follower Cursor
  function initMagneticCursor() {
    const cursor = document.getElementById('magnetic-cursor');
    const dot = document.getElementById('magnetic-cursor-dot');
    if (!cursor || !dot || typeof gsap === 'undefined') return;

    let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    let posX = targetX, posY = targetY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
    }, { passive: true });

    gsap.ticker.add(() => {
      posX += (targetX - posX) * 0.22;
      posY += (targetY - posY) * 0.22;
      cursor.style.transform = `translate3d(${posX - 16}px, ${posY - 16}px, 0)`;
    });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('button, a, input, textarea, .nav-item, .quick-prompt-chip, .proposal-card')) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    }, { passive: true });
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
