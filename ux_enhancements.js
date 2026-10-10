/**
 * LivingADs Next-Gen 3D & Micro-Interaction Engine
 * Powered by Three.js, GSAP, Deck.gl Shaders, and WebGL
 */

(function () {
  'use strict';

  // Wait for DOM
  function initEnhancements() {
    if (typeof THREE === 'undefined' || typeof gsap === 'undefined') {
      console.warn('Three.js or GSAP loading...');
      setTimeout(initEnhancements, 200);
      return;
    }

    createDOMOverlay();
    initAmbientWebGL();
    initAINeuralOrb();
    initGSAPCursorAndInteractions();
    initAttributionGlobeModal();
    initProductStudioModal();
    hookIntoAssistantEvents();
  }

  // 1. Create Top HUD & Modal Elements
  function createDOMOverlay() {
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
    orbWidget.title = 'LivingADs Neural Core - Click to inspect';
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

    // Modal 1: 3D Geo Attribution Globe (Deck.gl / Three.js)
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

    // Modal 2: 3D Spline-Style Product Studio (Northwind Coffee)
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

  // 2. Ambient WebGL Background Particle Grid (Three.js)
  function initAmbientWebGL() {
    const canvas = document.getElementById('webgl-ambient-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Particle Cloud
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#7464f2');
    const color2 = new THREE.Color('#00f2fe');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const mixed = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle Wave Mesh
    const gridGeo = new THREE.PlaneGeometry(120, 120, 24, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x7464f2,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2.8;
    gridMesh.position.y = -15;
    scene.add(gridMesh);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = elapsed * 0.02;

      gridMesh.rotation.z = elapsed * 0.015;

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    // Toggle Button
    let ambientActive = true;
    const toggleBtn = document.getElementById('btn-toggle-ambient');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        ambientActive = !ambientActive;
        canvas.style.opacity = ambientActive ? '0.65' : '0';
        toggleBtn.classList.toggle('active', ambientActive);
      });
    }
  }

  // 3. 3D AI Neural Core Orb (Three.js)
  let orbMesh, orbWire, orbRing1, orbRing2;
  function initAINeuralOrb() {
    const canvas = document.getElementById('ai-orb-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(130, 130);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.2;

    // Glowing Core Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.1, 4);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x7464f2,
      emissive: 0x3b2d99,
      shininess: 100,
      transparent: true,
      opacity: 0.85
    });
    orbMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(orbMesh);

    // Outer Wireframe Lattice
    const wireGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    orbWire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(orbWire);

    // Orbiting Rings
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.03, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x7464f2, transparent: true, opacity: 0.7 });
    orbRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbRing1.rotation.x = Math.PI / 3;
    scene.add(orbRing1);

    const ringGeo2 = new THREE.TorusGeometry(1.85, 0.02, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.5 });
    orbRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbRing2.rotation.y = Math.PI / 4;
    scene.add(orbRing2);

    // Lights
    const pointLight = new THREE.PointLight(0x00f2fe, 2, 20);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    let speed = 1.0;

    function animateOrb() {
      requestAnimationFrame(animateOrb);

      orbMesh.rotation.y += 0.015 * speed;
      orbMesh.rotation.x += 0.01 * speed;

      orbWire.rotation.y -= 0.01 * speed;
      orbWire.rotation.z += 0.012 * speed;

      orbRing1.rotation.z += 0.02 * speed;
      orbRing2.rotation.x -= 0.015 * speed;

      renderer.render(scene, camera);
    }
    animateOrb();

    // Click Orb to pulse
    document.getElementById('ai-orb-container')?.addEventListener('click', () => {
      gsap.to(orbMesh.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' });
      gsap.to(orbWire.scale, { x: 1.6, y: 1.6, z: 1.6, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' });
      
      // Auto-trigger a thought inspection or focus chat
      const chatInput = document.querySelector('.chat-form textarea');
      if (chatInput) {
        chatInput.focus();
        gsap.fromTo(chatInput, { scale: 0.98 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
      }
    });
  }

  // 4. GSAP Cursor, Magnetic Hover & 3D Card Tilts
  function initGSAPCursorAndInteractions() {
    const cursor = document.getElementById('gsap-glow-cursor');
    if (!cursor) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: mouse.x, y: mouse.y };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * 0.25;
      pos.y += (mouse.y - pos.y) * 0.25;
      gsap.set(cursor, { x: pos.x, y: pos.y });
    });

    // Hover effect on clickable elements
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('button, a, input, textarea, select, .hud-btn, .chat-think');
      if (target) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    });

    // 3D Tilt Effect on Assistant Cards
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.assistant-card, .chat-think, .turn-plan, .research-brief');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotX = -(y / rect.height) * 8;
          const rotY = (x / rect.width) * 8;
          gsap.to(card, { rotationX: rotX, rotationY: rotY, transformPerspective: 900, duration: 0.2, ease: 'power1.out' });
        } else {
          gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.3, ease: 'power2.out' });
        }
      });
    });
  }

  // 5. 3D Geo Attribution & Conversion Globe (Three.js & Deck.gl style)
  function initAttributionGlobeModal() {
    const modal = document.getElementById('modal-globe');
    const openBtn = document.getElementById('btn-open-globe');
    const closeBtn = document.getElementById('close-modal-globe');
    const canvas = document.getElementById('canvas-globe');

    if (!modal || !openBtn || !canvas) return;

    let scene, camera, renderer, globeMesh, atmosphereMesh, arcsGroup;
    let initialized = false;

    function setupGlobe() {
      if (initialized) return;
      initialized = true;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 1100;
      const height = rect.height || 650;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 18;

      // Base Globe Sphere
      const globeGeo = new THREE.SphereGeometry(6, 64, 64);
      const globeMat = new THREE.MeshPhongMaterial({
        color: 0x0f172a,
        emissive: 0x060b17,
        specular: 0x38bdf8,
        shininess: 25,
        wireframe: false
      });
      globeMesh = new THREE.Mesh(globeGeo, globeMat);
      scene.add(globeMesh);

      // Globe Wireframe Grid Overlay
      const gridGeo = new THREE.SphereGeometry(6.04, 36, 18);
      const gridMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });
      const gridMesh = new THREE.Mesh(gridGeo, gridMat);
      globeMesh.add(gridMesh);

      // Atmosphere Shader Glow
      const atmosGeo = new THREE.SphereGeometry(6.6, 32, 32);
      const atmosMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide
      });
      atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
      scene.add(atmosphereMesh);

      // Attribution Arcs & Conversion Beacons
      arcsGroup = new THREE.Group();
      globeMesh.add(arcsGroup);

      const CITIES = [
        { lat: 28.6139, lon: 77.2090, name: 'Delhi', spend: '₹45K' },
        { lat: 19.0760, lon: 72.8777, name: 'Mumbai', spend: '₹62K' },
        { lat: 12.9716, lon: 77.5946, name: 'Bengaluru', spend: '₹35K' },
        { lat: 37.7749, lon: -122.4194, name: 'San Francisco', spend: 'Meta HQ' },
        { lat: 51.5074, lon: -0.1278, name: 'London', spend: 'EU Node' },
        { lat: 1.3521, lon: 103.8198, name: 'Singapore', spend: 'APAC Hub' }
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

      // Add Glowing Pins
      CITIES.forEach((city) => {
        const pos = latLonToVector3(city.lat, city.lon, 6.05);
        const pinGeo = new THREE.CylinderGeometry(0.08, 0.02, 0.8, 8);
        const pinMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
        const pin = new THREE.Mesh(pinGeo, pinMat);
        pin.position.copy(pos);
        pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
        arcsGroup.add(pin);

        // Halo Ring
        const ringGeo = new THREE.RingGeometry(0.15, 0.3, 16);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x7464f2, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos.clone().multiplyScalar(1.02));
        ring.lookAt(pos.clone().multiplyScalar(2));
        arcsGroup.add(ring);
      });

      // Add Connecting Bezier Spline Arcs
      for (let i = 0; i < CITIES.length; i++) {
        for (let j = i + 1; j < CITIES.length; j++) {
          const v1 = latLonToVector3(CITIES[i].lat, CITIES[i].lon, 6.05);
          const v2 = latLonToVector3(CITIES[j].lat, CITIES[j].lon, 6.05);
          const mid = v1.clone().add(v2).multiplyScalar(0.5);
          const dist = v1.distanceTo(v2);
          mid.normalize().multiplyScalar(6.05 + dist * 0.25);

          const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
          const points = curve.getPoints(36);
          const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
          const curveMat = new THREE.LineBasicMaterial({
            color: j % 2 === 0 ? 0x00f2fe : 0x7464f2,
            transparent: true,
            opacity: 0.75,
            linewidth: 2
          });
          const arc = new THREE.Line(curveGeo, curveMat);
          arcsGroup.add(arc);
        }
      }

      // Lights
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(10, 10, 15);
      scene.add(dirLight);

      const ambLight = new THREE.AmbientLight(0x38bdf8, 0.4);
      scene.add(ambLight);

      // Drag to rotate
      let isDragging = false;
      let prevMouse = { x: 0, y: 0 };

      canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mouseup', () => (isDragging = false));
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        globeMesh.rotation.y += deltaX * 0.006;
        globeMesh.rotation.x += deltaY * 0.006;
        prevMouse = { x: e.clientX, y: e.clientY };
      });

      function renderGlobe() {
        if (modal.classList.contains('open')) {
          requestAnimationFrame(renderGlobe);
          if (!isDragging) {
            globeMesh.rotation.y += 0.003;
          }
          renderer.render(scene, camera);
        }
      }

      openBtn.addEventListener('click', () => {
        modal.classList.add('open');
        requestAnimationFrame(renderGlobe);
      });
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    openBtn.addEventListener('click', () => {
      setupGlobe();
      modal.classList.add('open');
    });
  }

  // 6. 3D Spline-Style Product Studio (Northwind Coffee Showcase)
  function initProductStudioModal() {
    const modal = document.getElementById('modal-studio');
    const openBtn = document.getElementById('btn-open-studio');
    const closeBtn = document.getElementById('close-modal-studio');
    const canvas = document.getElementById('canvas-studio');

    if (!modal || !openBtn || !canvas) return;

    let scene, camera, renderer, coffeeBagGroup;
    let initialized = false;

    function setupStudio() {
      if (initialized) return;
      initialized = true;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 1100;
      const height = rect.height || 650;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 9);

      coffeeBagGroup = new THREE.Group();
      scene.add(coffeeBagGroup);

      // 3D Procedural Coffee Bag Package
      const bagGeo = new THREE.BoxGeometry(2.4, 3.8, 1.4, 16, 16, 16);
      const bagMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.35,
        metalness: 0.15
      });
      const bagMesh = new THREE.Mesh(bagGeo, bagMat);
      bagMesh.castShadow = true;
      coffeeBagGroup.add(bagMesh);

      // Gold Foil Brand Label (Northwind Coffee Co.)
      const labelGeo = new THREE.PlaneGeometry(1.8, 2.4);
      const labelMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.85,
        roughness: 0.25,
        emissive: 0x451a03,
        emissiveIntensity: 0.4
      });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.z = 0.71;
      coffeeBagGroup.add(labelMesh);

      // Holographic Ring
      const haloGeo = new THREE.TorusGeometry(3.2, 0.04, 16, 100);
      const haloMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7 });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2.3;
      scene.add(halo);

      // Studio Lighting
      const mainLight = new THREE.SpotLight(0x00f2fe, 3, 20, Math.PI / 4, 0.5);
      mainLight.position.set(5, 7, 6);
      scene.add(mainLight);

      const purpleRim = new THREE.PointLight(0x7464f2, 2.5, 15);
      purpleRim.position.set(-6, -4, -4);
      scene.add(purpleRim);

      const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambLight);

      let isDragging = false;
      let prevMouse = { x: 0, y: 0 };

      canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mouseup', () => (isDragging = false));
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        coffeeBagGroup.rotation.y += deltaX * 0.008;
        coffeeBagGroup.rotation.x += deltaY * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      });

      function renderStudio() {
        if (modal.classList.contains('open')) {
          requestAnimationFrame(renderStudio);
          if (!isDragging) {
            coffeeBagGroup.rotation.y += 0.008;
          }
          halo.rotation.z += 0.01;
          renderer.render(scene, camera);
        }
      }

      openBtn.addEventListener('click', () => {
        modal.classList.add('open');
        requestAnimationFrame(renderStudio);
      });
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    openBtn.addEventListener('click', () => {
      setupStudio();
      modal.classList.add('open');
    });
  }

  // 7. Hook into Live Assistant Turn Events to React in 3D
  function hookIntoAssistantEvents() {
    const observer = new MutationObserver(() => {
      const thinkingEl = document.querySelector('.turn-work[data-running="true"], .turn-thought[data-live="true"]');
      const orbBadge = document.getElementById('ai-orb-badge');
      
      if (thinkingEl) {
        if (orbMesh) {
          orbMesh.material.color.setHex(0x00f2fe);
          orbMesh.material.emissive.setHex(0x007799);
        }
        if (orbBadge) {
          orbBadge.innerHTML = `<span class="hud-indicator" style="background:#00f2fe;box-shadow:0 0 10px #00f2fe;"></span> REASONING…`;
        }
      } else {
        if (orbMesh) {
          orbMesh.material.color.setHex(0x7464f2);
          orbMesh.material.emissive.setHex(0x3b2d99);
        }
        if (orbBadge) {
          orbBadge.innerHTML = `<span class="hud-indicator"></span> AI CORE ACTIVE`;
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
  }

  // Kickoff when scripts are loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
  } else {
    initEnhancements();
  }
})();
