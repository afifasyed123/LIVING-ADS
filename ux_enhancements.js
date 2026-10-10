/**
 * LivingADs Next-Gen 3D & Micro-Interaction Engine
 * Powered by Three.js, GSAP, Deck.gl Shaders, and WebGL
 * Ultra-High Performance & Non-Blocking
 */

(function () {
  'use strict';

  function initEnhancements() {
    if (typeof THREE === 'undefined' || typeof gsap === 'undefined') {
      setTimeout(initEnhancements, 250);
      return;
    }

    try {
      createDOMOverlay();
      initAmbientWebGL();
      initAINeuralOrb();
      initGSAPCursorAndInteractions();
      initAttributionGlobeModal();
      initProductStudioModal();
      initAssistantStatePoller();
    } catch (err) {
      console.error('UX Enhancement initialization error:', err);
    }
  }

  // 1. Create Top HUD & Modals
  function createDOMOverlay() {
    if (document.getElementById('ai-orb-container')) return;

    // Ambient Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'webgl-ambient-canvas';
    document.body.appendChild(canvas);

    // Glowing Cursor
    const cursor = document.createElement('div');
    cursor.id = 'gsap-glow-cursor';
    document.body.appendChild(cursor);

    // AI Neural Orb Widget
    const orbWidget = document.createElement('div');
    orbWidget.id = 'ai-orb-container';
    orbWidget.title = 'LivingADs Neural Core - Click to focus chat';
    orbWidget.innerHTML = `
      <canvas id="ai-orb-canvas" width="130" height="130"></canvas>
      <div id="ai-orb-badge"><span class="hud-indicator"></span> AI CORE ACTIVE</div>
    `;
    document.body.appendChild(orbWidget);

    // Top Navigation HUD Bar
    const hud = document.createElement('div');
    hud.className = 'livingads-hud-panel';
    hud.innerHTML = `
      <button class="hud-btn" id="btn-open-globe">
        <span>🌐</span> 3D Geo Attribution
      </button>
      <button class="hud-btn" id="btn-open-studio">
        <span>☕</span> 3D Product Studio
      </button>
      <button class="hud-btn" id="btn-toggle-ambient">
        <span class="hud-indicator"></span> <span>WebGL FX</span>
      </button>
    `;
    document.body.appendChild(hud);

    // Modal 1: 3D Geo Attribution Globe
    const globeModal = document.createElement('div');
    globeModal.className = 'webgl-modal-backdrop';
    globeModal.id = 'modal-globe';
    globeModal.innerHTML = `
      <div class="webgl-modal-window">
        <div class="webgl-modal-header">
          <div class="webgl-modal-title">
            <span>🌐</span> 3D Real-Time Ad Attribution & Geo Conversion Deck
          </div>
          <button class="webgl-modal-close" id="close-modal-globe">✕</button>
        </div>
        <div class="webgl-modal-body">
          <canvas class="webgl-view-canvas" id="canvas-globe"></canvas>
          <div class="webgl-stats-overlay">
            <div class="webgl-stat-item">
              <span class="webgl-stat-val">₹1,42,850</span>
              <span class="webgl-stat-lbl">Global Meta/Google Spend</span>
            </div>
            <div class="webgl-stat-item">
              <span class="webgl-stat-val">3.42x</span>
              <span class="webgl-stat-lbl">Blended ROAS</span>
            </div>
            <div class="webgl-stat-item">
              <span class="webgl-stat-val">12,480</span>
              <span class="webgl-stat-lbl">Attributed Conversions</span>
            </div>
            <div class="webgl-stat-item">
              <span class="webgl-stat-val" style="color: #10b981;">98.4%</span>
              <span class="webgl-stat-lbl">Pixel Match Quality</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(globeModal);

    // Modal 2: 3D Product Studio
    const studioModal = document.createElement('div');
    studioModal.className = 'webgl-modal-backdrop';
    studioModal.id = 'modal-studio';
    studioModal.innerHTML = `
      <div class="webgl-modal-window">
        <div class="webgl-modal-header">
          <div class="webgl-modal-title">
            <span>☕</span> 3D Product & Creative Showcase (Northwind Coffee Co.)
          </div>
          <button class="webgl-modal-close" id="close-modal-studio">✕</button>
        </div>
        <div class="webgl-modal-body">
          <canvas class="webgl-view-canvas" id="canvas-studio"></canvas>
          <div class="webgl-stats-overlay">
            <div class="webgl-stat-item">
              <span class="webgl-stat-val">Arabica Dark Roast</span>
              <span class="webgl-stat-lbl">Active Hero SKU</span>
            </div>
            <div class="webgl-stat-item">
              <span class="webgl-stat-val" style="color: #00f2fe;">3D Ready</span>
              <span class="webgl-stat-lbl">Spline Ad Format</span>
            </div>
            <div class="webgl-stat-item">
              <span class="webgl-stat-val">+42%</span>
              <span class="webgl-stat-lbl">CTR vs Static Image</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(studioModal);
  }

  // 2. Ambient WebGL Particle Background (Optimized)
  function initAmbientWebGL() {
    const canvas = document.getElementById('webgl-ambient-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 25;

    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color('#7464f2');
    const c2 = new THREE.Color('#00f2fe');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const mixed = c1.clone().lerp(c2, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    let ambientOn = true;
    document.getElementById('btn-toggle-ambient')?.addEventListener('click', () => {
      ambientOn = !ambientOn;
      canvas.style.opacity = ambientOn ? '0.65' : '0';
      document.getElementById('btn-toggle-ambient')?.classList.toggle('active', ambientOn);
    });
  }

  // 3. 3D AI Neural Orb
  let orbMesh, orbWire, orbRing1;
  function initAINeuralOrb() {
    const canvas = document.getElementById('ai-orb-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(130, 130);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.2;

    const sphereGeo = new THREE.IcosahedronGeometry(1.1, 3);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x7464f2,
      emissive: 0x3b2d99,
      shininess: 90,
      transparent: true,
      opacity: 0.85
    });
    orbMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(orbMesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true, transparent: true, opacity: 0.5 });
    orbWire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(orbWire);

    const ringGeo = new THREE.TorusGeometry(1.65, 0.03, 12, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x7464f2, transparent: true, opacity: 0.7 });
    orbRing1 = new THREE.Mesh(ringGeo, ringMat);
    orbRing1.rotation.x = Math.PI / 3;
    scene.add(orbRing1);

    const pointLight = new THREE.PointLight(0x00f2fe, 1.8, 15);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    function animateOrb() {
      requestAnimationFrame(animateOrb);
      orbMesh.rotation.y += 0.015;
      orbMesh.rotation.x += 0.01;
      orbWire.rotation.y -= 0.01;
      orbRing1.rotation.z += 0.018;
      renderer.render(scene, camera);
    }
    animateOrb();

    document.getElementById('ai-orb-container')?.addEventListener('click', () => {
      gsap.to(orbMesh.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.2, yoyo: true, repeat: 1 });
      const input = document.querySelector('textarea, input[type="text"]');
      if (input) input.focus();
    });
  }

  // 4. GSAP Magnetic Follower Cursor & Card Tilts
  function initGSAPCursorAndInteractions() {
    const cursor = document.getElementById('gsap-glow-cursor');
    if (!cursor) return;

    let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    let posX = targetX, posY = targetY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });

    gsap.ticker.add(() => {
      posX += (targetX - posX) * 0.25;
      posY += (targetY - posY) * 0.25;
      cursor.style.transform = `translate3d(${posX - 14}px, ${posY - 14}px, 0)`;
    });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('button, a, input, textarea, .hud-btn')) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    }, { passive: true });
  }

  // 5. 3D Geo Attribution Globe Modal
  function initAttributionGlobeModal() {
    const modal = document.getElementById('modal-globe');
    const openBtn = document.getElementById('btn-open-globe');
    const closeBtn = document.getElementById('close-modal-globe');
    const canvas = document.getElementById('canvas-globe');

    if (!modal || !openBtn || !canvas) return;

    let initialized = false, globeMesh, renderer, scene, camera;

    function setupGlobe() {
      if (initialized) return;
      initialized = true;

      const width = canvas.clientWidth || 1000;
      const height = canvas.clientHeight || 600;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 18;

      const globeGeo = new THREE.SphereGeometry(6, 36, 36);
      const globeMat = new THREE.MeshPhongMaterial({
        color: 0x0f172a,
        emissive: 0x060b17,
        specular: 0x38bdf8,
        shininess: 25
      });
      globeMesh = new THREE.Mesh(globeGeo, globeMat);
      scene.add(globeMesh);

      const gridGeo = new THREE.SphereGeometry(6.04, 24, 12);
      const gridMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.2 });
      globeMesh.add(new THREE.Mesh(gridGeo, gridMat));

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(10, 10, 15);
      scene.add(dirLight);
      scene.add(new THREE.AmbientLight(0x38bdf8, 0.5));

      let isDragging = false, prev = { x: 0, y: 0 };
      canvas.addEventListener('mousedown', (e) => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; });
      window.addEventListener('mouseup', () => (isDragging = false));
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        globeMesh.rotation.y += (e.clientX - prev.x) * 0.006;
        globeMesh.rotation.x += (e.clientY - prev.y) * 0.006;
        prev = { x: e.clientX, y: e.clientY };
      });

      function render() {
        if (modal.classList.contains('open')) {
          requestAnimationFrame(render);
          if (!isDragging) globeMesh.rotation.y += 0.003;
          renderer.render(scene, camera);
        }
      }

      openBtn.addEventListener('click', () => {
        modal.classList.add('open');
        requestAnimationFrame(render);
      });
    }

    openBtn.addEventListener('click', () => {
      setupGlobe();
      modal.classList.add('open');
    });
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  // 6. 3D Product Studio Modal
  function initProductStudioModal() {
    const modal = document.getElementById('modal-studio');
    const openBtn = document.getElementById('btn-open-studio');
    const closeBtn = document.getElementById('close-modal-studio');
    const canvas = document.getElementById('canvas-studio');

    if (!modal || !openBtn || !canvas) return;

    let initialized = false, bagGroup, renderer, scene, camera;

    function setupStudio() {
      if (initialized) return;
      initialized = true;

      const width = canvas.clientWidth || 1000;
      const height = canvas.clientHeight || 600;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 9);

      bagGroup = new THREE.Group();
      scene.add(bagGroup);

      const bagGeo = new THREE.BoxGeometry(2.4, 3.8, 1.4);
      const bagMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.15 });
      bagGroup.add(new THREE.Mesh(bagGeo, bagMat));

      const labelGeo = new THREE.PlaneGeometry(1.8, 2.4);
      const labelMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.25 });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.z = 0.71;
      bagGroup.add(labelMesh);

      const halo = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.04, 16, 64), new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7 }));
      halo.rotation.x = Math.PI / 2.3;
      scene.add(halo);

      const spot = new THREE.SpotLight(0x00f2fe, 2.5);
      spot.position.set(5, 7, 6);
      scene.add(spot);
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));

      let isDragging = false, prev = { x: 0, y: 0 };
      canvas.addEventListener('mousedown', (e) => { isDragging = true; prev = { x: e.clientX, y: e.clientY }; });
      window.addEventListener('mouseup', () => (isDragging = false));
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        bagGroup.rotation.y += (e.clientX - prev.x) * 0.008;
        bagGroup.rotation.x += (e.clientY - prev.y) * 0.008;
        prev = { x: e.clientX, y: e.clientY };
      });

      function render() {
        if (modal.classList.contains('open')) {
          requestAnimationFrame(render);
          if (!isDragging) bagGroup.rotation.y += 0.008;
          halo.rotation.z += 0.01;
          renderer.render(scene, camera);
        }
      }

      openBtn.addEventListener('click', () => {
        modal.classList.add('open');
        requestAnimationFrame(render);
      });
    }

    openBtn.addEventListener('click', () => {
      setupStudio();
      modal.classList.add('open');
    });
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  // 7. Non-blocking Poller for AI Thinking State (NO DOM RECURSION)
  function initAssistantStatePoller() {
    let lastState = false;
    setInterval(() => {
      const isThinking = !!document.querySelector('.turn-work[data-running="true"], .turn-thought[data-live="true"]');
      if (isThinking !== lastState) {
        lastState = isThinking;
        const badge = document.getElementById('ai-orb-badge');
        if (isThinking) {
          if (orbMesh) { orbMesh.material.color.setHex(0x00f2fe); orbMesh.material.emissive.setHex(0x007799); }
          if (badge) badge.textContent = '⚡ REASONING…';
        } else {
          if (orbMesh) { orbMesh.material.color.setHex(0x7464f2); orbMesh.material.emissive.setHex(0x3b2d99); }
          if (badge) badge.textContent = '🟢 AI CORE ACTIVE';
        }
      }
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
  } else {
    initEnhancements();
  }
})();
