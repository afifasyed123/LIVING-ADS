/**
 * Living Ads — Three.js WebGL Animations Engine
 * 
 * 1. Organic Particle Constellation Background
 *    - Hundreds of warm-toned particles floating in 3D space
 *    - Connected with glowing lines when near each other
 *    - Reacts to mouse movement with parallax depth
 *    - Matches the warm ivory/sand/sage color palette
 *
 * 2. 3D Wireframe Globe on Analytics Dashboard
 *    - Slowly rotating Earth wireframe with glowing geo-pins
 *    - Pulsing arcs between target cities (Bali, Singapore, Mumbai)
 *    - Sage green + terracotta amber glow on dark forest background
 *
 * 3. Welcome Banner Floating Orbs
 *    - Soft blurred gradient orbs floating behind the prompt input
 *    - Gentle breathing animation with parallax
 */

(function () {
  'use strict';

  // Bail out gracefully if Three.js didn't load
  if (typeof THREE === 'undefined') {
    console.warn('[animations.js] Three.js not loaded — skipping WebGL animations.');
    return;
  }

  // ===================================================================
  // PALETTE CONSTANTS (match the Living Ads warm organic palette)
  // ===================================================================
  const COLORS = {
    ivory:     0xFAF7F2,
    sand:      0xEFEAE2,
    forest:    0x18231C,
    sage:      0x15803D,
    sageLt:    0xA7D8B0,
    amber:     0xB93F00,
    amberLt:   0xE8845A,
    muted:     0x737E76,
    white:     0xFFFFFF,
  };

  // ===================================================================
  // 1. ORGANIC PARTICLE CONSTELLATION BACKGROUND
  // ===================================================================
  function initParticleConstellation() {
    const canvas = document.getElementById('webgl-particle-bg');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 280;

    // Particle system
    const PARTICLE_COUNT = 220;
    const SPREAD = 500;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = [];
    const sizes = new Float32Array(PARTICLE_COUNT);

    const particleColors = [
      new THREE.Color(COLORS.sage),
      new THREE.Color(COLORS.sageLt),
      new THREE.Color(COLORS.amber),
      new THREE.Color(COLORS.amberLt),
      new THREE.Color(COLORS.muted),
      new THREE.Color(COLORS.sand),
    ];
    const colorsArr = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      velocities.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.08,
      });

      sizes[i] = Math.random() * 3.5 + 1.2;

      const c = particleColors[Math.floor(Math.random() * particleColors.length)];
      colorsArr[i * 3]     = c.r;
      colorsArr[i * 3 + 1] = c.g;
      colorsArr[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(colorsArr, 3));
    particleGeo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    // Custom shader for soft circular particles
    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (200.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `;
    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.15, d) * 0.55;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const particleMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // Constellation lines (connect nearby particles)
    const LINE_DISTANCE = 70;
    const MAX_LINES = 400;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors    = new Float32Array(MAX_LINES * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColors, 3));
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize);
    resize();

    // Animation loop
    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      frame++;

      const pos = particleGeo.attributes.position.array;

      // Move particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3]     += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        // Soft boundary wrapping
        if (pos[i * 3]     >  SPREAD / 2) pos[i * 3]     = -SPREAD / 2;
        if (pos[i * 3]     < -SPREAD / 2) pos[i * 3]     =  SPREAD / 2;
        if (pos[i * 3 + 1] >  SPREAD / 2) pos[i * 3 + 1] = -SPREAD / 2;
        if (pos[i * 3 + 1] < -SPREAD / 2) pos[i * 3 + 1] =  SPREAD / 2;
        if (pos[i * 3 + 2] >  100)        pos[i * 3 + 2] = -100;
        if (pos[i * 3 + 2] < -100)        pos[i * 3 + 2] =  100;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Build constellation lines (every 3rd frame to save performance)
      if (frame % 3 === 0) {
        let lineIdx = 0;
        const linePos = lineGeo.attributes.position.array;
        const lineCol = lineGeo.attributes.color.array;
        const sageLine = new THREE.Color(COLORS.sageLt);

        for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_LINES; i++) {
          for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < MAX_LINES; j++) {
            const dx = pos[i * 3]     - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < LINE_DISTANCE) {
              const off = lineIdx * 6;
              linePos[off]     = pos[i * 3];
              linePos[off + 1] = pos[i * 3 + 1];
              linePos[off + 2] = pos[i * 3 + 2];
              linePos[off + 3] = pos[j * 3];
              linePos[off + 4] = pos[j * 3 + 1];
              linePos[off + 5] = pos[j * 3 + 2];

              const fade = 1 - dist / LINE_DISTANCE;
              lineCol[off]     = sageLine.r * fade;
              lineCol[off + 1] = sageLine.g * fade;
              lineCol[off + 2] = sageLine.b * fade;
              lineCol[off + 3] = sageLine.r * fade;
              lineCol[off + 4] = sageLine.g * fade;
              lineCol[off + 5] = sageLine.b * fade;
              lineIdx++;
            }
          }
        }
        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.color.needsUpdate = true;
        lineGeo.setDrawRange(0, lineIdx * 2);
      }

      // Mouse parallax on camera
      camera.position.x += (mouseX * 30 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 20 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Slow drift rotation
      particleMesh.rotation.y += 0.0003;
      particleMesh.rotation.x += 0.0001;

      renderer.render(scene, camera);
    }
    animate();
  }

  // ===================================================================
  // 2. 3D WIREFRAME GLOBE (Analytics Dashboard)
  // ===================================================================
  function initGlobe() {
    const canvas = document.getElementById('webgl-globe-canvas');
    if (!canvas) return;

    const W = 360, H = 280;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 500);
    camera.position.z = 220;

    // Globe wireframe sphere
    const globeGeo = new THREE.IcosahedronGeometry(65, 3);
    const globeMat = new THREE.MeshBasicMaterial({
      color: COLORS.sage,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Inner glow sphere
    const glowGeo = new THREE.SphereGeometry(63, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: COLORS.sage,
      transparent: true,
      opacity: 0.04,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Atmosphere ring
    const ringGeo = new THREE.RingGeometry(66, 68, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: COLORS.sageLt,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    // Geo-pins for target cities (lat/lon to 3D)
    function latLonToVec3(lat, lon, r) {
      const phi   = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta)
      );
    }

    const cities = [
      { name: 'Bali',      lat: -8.34,  lon: 115.09, color: COLORS.sage },
      { name: 'Singapore',  lat:  1.35,  lon: 103.82, color: COLORS.amberLt },
      { name: 'Mumbai',     lat: 19.08,  lon: 72.88,  color: COLORS.amber },
    ];

    const pinGroup = new THREE.Group();
    const cityPositions = [];

    cities.forEach((city) => {
      const pos = latLonToVec3(city.lat, city.lon, 65);
      cityPositions.push(pos);

      // Pin dot
      const dotGeo = new THREE.SphereGeometry(2.2, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: city.color });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      pinGroup.add(dot);

      // Pulse ring
      const pulseGeo = new THREE.RingGeometry(3, 4.5, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: city.color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(pos);
      pulse.lookAt(0, 0, 0);
      pulse.userData.phase = Math.random() * Math.PI * 2;
      pinGroup.add(pulse);
    });
    scene.add(pinGroup);

    // Arcs between cities
    function createArc(start, end, color) {
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(95); // lift arc above surface

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.35,
      });
      return new THREE.Line(arcGeo, arcMat);
    }

    // Connect all city pairs
    for (let i = 0; i < cityPositions.length; i++) {
      for (let j = i + 1; j < cityPositions.length; j++) {
        const arcColor = i === 0 ? COLORS.sage : COLORS.amberLt;
        scene.add(createArc(cityPositions[i], cityPositions[j], arcColor));
      }
    }

    // Ambient light for subtle shading
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Animation loop
    let globeFrame = 0;
    function animateGlobe() {
      requestAnimationFrame(animateGlobe);
      globeFrame++;

      globe.rotation.y += 0.003;
      pinGroup.rotation.y += 0.003;

      // Pulse the pin rings
      pinGroup.children.forEach((child) => {
        if (child.geometry.type === 'RingGeometry') {
          const phase = child.userData.phase || 0;
          const scale = 1 + 0.3 * Math.sin(globeFrame * 0.04 + phase);
          child.scale.set(scale, scale, scale);
          child.material.opacity = 0.5 - 0.3 * Math.abs(Math.sin(globeFrame * 0.04 + phase));
        }
      });

      renderer.render(scene, camera);
    }

    // Only animate when the analytics tab is visible (performance optimization)
    let isGlobeVisible = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isGlobeVisible) {
          isGlobeVisible = true;
          animateGlobe();
        }
        if (!entry.isIntersecting) {
          isGlobeVisible = false;
        }
      });
    }, { threshold: 0.1 });

    observer.observe(canvas);
  }

  // ===================================================================
  // 3. WELCOME BANNER FLOATING GRADIENT ORBS (CSS + JS driven)
  // ===================================================================
  function initFloatingOrbs() {
    const banner = document.querySelector('.welcome-prompt-banner');
    if (!banner) return;

    // Create orb container
    const orbContainer = document.createElement('div');
    orbContainer.className = 'floating-orbs-layer';
    banner.style.position = 'relative';
    banner.style.overflow = 'hidden';
    banner.insertBefore(orbContainer, banner.firstChild);

    const orbs = [
      { size: 180, x: '15%', y: '20%', color1: 'rgba(21, 128, 61, 0.12)', color2: 'rgba(167, 216, 176, 0.06)', duration: 8 },
      { size: 140, x: '75%', y: '30%', color1: 'rgba(185, 63, 0, 0.10)', color2: 'rgba(232, 132, 90, 0.05)',  duration: 10 },
      { size: 100, x: '50%', y: '60%', color1: 'rgba(21, 128, 61, 0.08)', color2: 'rgba(239, 234, 226, 0.06)', duration: 12 },
    ];

    orbs.forEach((cfg, idx) => {
      const orb = document.createElement('div');
      orb.className = 'floating-orb';
      orb.style.cssText = `
        position: absolute;
        width: ${cfg.size}px;
        height: ${cfg.size}px;
        left: ${cfg.x};
        top: ${cfg.y};
        border-radius: 50%;
        background: radial-gradient(circle, ${cfg.color1} 0%, ${cfg.color2} 60%, transparent 100%);
        filter: blur(40px);
        pointer-events: none;
        z-index: 0;
        animation: floatOrb${idx} ${cfg.duration}s ease-in-out infinite alternate;
      `;
      orbContainer.appendChild(orb);
    });

    // Inject keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
      .floating-orbs-layer {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
      .welcome-prompt-banner > *:not(.floating-orbs-layer) {
        position: relative;
        z-index: 1;
      }
      @keyframes floatOrb0 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(30px, -20px) scale(1.15); }
      }
      @keyframes floatOrb1 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(-25px, 15px) scale(1.1); }
      }
      @keyframes floatOrb2 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(15px, -25px) scale(1.2); }
      }
    `;
    document.head.appendChild(style);
  }

  // ===================================================================
  // BOOT
  // ===================================================================
  function boot() {
    initParticleConstellation();
    initGlobe();
    initFloatingOrbs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
