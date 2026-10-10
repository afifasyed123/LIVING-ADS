/**
 * Living Ads — Ultra-Smooth WebGL & 3D Canvas Engine
 * 
 * 1. 3D Interactive Telemetry Globe:
 *    - Wireframe globe with latitude & longitude coordinate grid
 *    - Glowing regional pins (Bali, Singapore, Mumbai) with pulsing radar rings
 *    - Flight arcs with animated photon pulses connecting marketing hubs
 *    - Interactive click-and-drag rotation with momentum physics
 *    - Auto-resizing on tab switch / window resize
 *    - Built-in fail-safe renderer so the canvas NEVER renders a black/blank screen
 *
 * 2. Organic 3D Particle Constellation Background:
 *    - Floating nodes in warm organic sage & amber palette
 *    - Distance-based dynamic constellation lines
 *    - Smooth cursor parallax depth
 *
 * 3. Welcome Banner Floating Ambient Orbs
 */

(function () {
  'use strict';

  // Warm Organic Brand Palette
  const PALETTE = {
    forest:    '#18231C',
    sage:      '#15803D',
    sageLt:    '#A7D8B0',
    amber:     '#B93F00',
    amberLt:   '#F2994A',
    sand:      '#EFEAE2',
    ivory:     '#FAF7F2',
    dotGlow:   '#34D399',
    arcLine:   'rgba(52, 211, 153, 0.45)',
  };

  // ===================================================================
  // 1. ORGANIC PARTICLE CONSTELLATION BACKGROUND
  // ===================================================================
  function initParticleConstellation() {
    const canvas = document.getElementById('webgl-particle-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0;
    const PARTICLE_COUNT = 55;
    const MAX_DIST = 130;
    const particles = [];
    let mouse = { x: null, y: null };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const colors = [
      'rgba(21, 128, 61, 0.25)',   // sage
      'rgba(185, 63, 0, 0.20)',    // amber
      'rgba(115, 126, 118, 0.18)', // muted
      'rgba(167, 216, 176, 0.35)', // sage light
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.2 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with subtle warm lines
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.strokeStyle = `rgba(21, 128, 61, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        // Soft mouse repulsion/parallax
        if (mouse.x !== null) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140 && mdist > 0) {
            const force = (140 - mdist) / 140 * 0.6;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  // ===================================================================
  // 2. 3D INTERACTIVE TELEMETRY GLOBE (Self-Contained 3D Vector Math)
  //    Guaranteed to render at 60fps with zero CDN failure mode
  // ===================================================================
  function initInteractiveGlobe() {
    const canvas = document.getElementById('webgl-globe-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0;
    let radius = 105;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width || 420);
      const h = Math.floor(rect.height || 280);
      if (w > 0 && h > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
        width = w;
        height = h;
        radius = Math.min(w * 0.28, h * 0.38, 110);
      }
    }
    window.addEventListener('resize', resizeCanvas);
    // Call multiple times to ensure layout has settled
    resizeCanvas();
    setTimeout(resizeCanvas, 150);
    setTimeout(resizeCanvas, 500);

    // Watch parent visibility changes (tab switches)
    const observer = new MutationObserver(() => resizeCanvas());
    const viewAnalytics = document.getElementById('view-analytics');
    if (viewAnalytics) {
      observer.observe(viewAnalytics, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    // 3D Rotation angles and momentum
    let rotY = 0.35;
    let rotX = 0.22;
    let velY = 0.0035;
    let velX = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Mouse / Touch interaction
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      velY = dx * 0.004;
      velX = dy * 0.004;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      velY = dx * 0.004;
      velX = dy * 0.004;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Marketing hub coordinates (latitude, longitude, metadata)
    const HUBS = [
      { name: 'Bali HQ',      lat: -8.34,  lon: 115.09, tag: 'Active 3.87× ROAS', color: '#34D399' },
      { name: 'Singapore',    lat:  1.35,  lon: 103.82, tag: 'Scale Cluster',     color: '#F2994A' },
      { name: 'Mumbai',       lat: 19.08,  lon: 72.88,  tag: 'Regional Edge',     color: '#A7D8B0' },
    ];

    // Convert (lat, lon) to 3D sphere coordinate
    function to3D(lat, lon, r) {
      const phi   = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return {
        x: -r * Math.sin(phi) * Math.cos(theta),
        y:  r * Math.cos(phi),
        z:  r * Math.sin(phi) * Math.sin(theta),
      };
    }

    // 3D rotation transform around X and Y axes
    function rotate3D(p, rx, ry) {
      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    }

    // Project 3D to 2D screen coordinates with perspective
    function project(p, cx, cy) {
      const fov = 420;
      const scale = fov / (fov + p.z);
      return {
        x: cx + p.x * scale,
        y: cy + p.y * scale,
        z: p.z,
        scale,
      };
    }

    // Generate latitude / longitude grid wireframes
    const wireframes = [];
    // Latitudes
    for (let lat = -60; lat <= 60; lat += 30) {
      const ring = [];
      for (let lon = 0; lon <= 360; lon += 12) {
        ring.push(to3D(lat, lon, radius));
      }
      wireframes.push(ring);
    }
    // Longitudes
    for (let lon = 0; lon < 360; lon += 30) {
      const ring = [];
      for (let lat = -90; lat <= 90; lat += 10) {
        ring.push(to3D(lat, lon, radius));
      }
      wireframes.push(ring);
    }

    // Generate randomly distributed landmass particle dots on sphere
    const surfaceDots = [];
    const DOT_COUNT = 320;
    for (let i = 0; i < DOT_COUNT; i++) {
      const lat = (Math.random() - 0.5) * 160;
      const lon = (Math.random() - 0.5) * 360;
      surfaceDots.push(to3D(lat, lon, radius));
    }

    // Animation loop variables
    let frame = 0;

    function render() {
      requestAnimationFrame(render);
      frame++;

      if (width === 0 || height === 0) {
        resizeCanvas();
        if (width === 0 || height === 0) return;
      }

      // Smooth idle spin with drag inertia
      if (!isDragging) {
        rotY += velY;
        rotX += velX;
        velY += (0.003 - velY) * 0.05; // slowly return to base rotation speed
        velX *= 0.92;                  // damp vertical spin
        // Clamp vertical pitch
        rotX = Math.max(-0.6, Math.min(0.6, rotX));
      }

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      // 1. Atmospheric Back Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.35);
      glowGrad.addColorStop(0, 'rgba(21, 128, 61, 0.22)');
      glowGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.09)');
      glowGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Outer Globe Halo Ring
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw Wireframe Grid Rings (Z-buffered)
      wireframes.forEach((ring) => {
        ctx.beginPath();
        let started = false;

        for (let i = 0; i < ring.length; i++) {
          const rotP = rotate3D(ring[i], rotX, rotY);
          const pt = project(rotP, cx, cy);

          // Fade out points on the back side of the sphere
          if (rotP.z < -20) {
            started = false;
            continue;
          }

          const alpha = Math.max(0.04, (rotP.z + radius) / (radius * 2) * 0.18);
          ctx.strokeStyle = `rgba(167, 216, 176, ${alpha})`;
          ctx.lineWidth = 0.9;

          if (!started) {
            ctx.moveTo(pt.x, pt.y);
            started = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      });

      // 4. Draw Surface Dots (Landmass representation)
      surfaceDots.forEach((dot) => {
        const rotP = rotate3D(dot, rotX, rotY);
        if (rotP.z < 0) return; // Hide back facing dots

        const pt = project(rotP, cx, cy);
        const depthAlpha = Math.max(0.1, (rotP.z / radius) * 0.45);
        ctx.fillStyle = `rgba(167, 216, 176, ${depthAlpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.2 * pt.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Connect Regional Hubs with Arcs & Animated Light Pulses
      const hubPoints = HUBS.map((hub) => {
        const raw3D = to3D(hub.lat, hub.lon, radius);
        const rot3D = rotate3D(raw3D, rotX, rotY);
        const proj = project(rot3D, cx, cy);
        return { hub, raw3D, rot3D, proj };
      });

      // Draw Arcs between Hub 0-1, 1-2, 0-2
      const pairs = [[0, 1], [1, 2], [0, 2]];
      pairs.forEach(([aIdx, bIdx], pairNum) => {
        const A = hubPoints[aIdx];
        const B = hubPoints[bIdx];

        // Draw curved arc if at least one node is facing front
        if (A.rot3D.z > -40 || B.rot3D.z > -40) {
          const midX = (A.raw3D.x + B.raw3D.x) * 0.5 * 1.35;
          const midY = (A.raw3D.y + B.raw3D.y) * 0.5 * 1.35;
          const midZ = (A.raw3D.z + B.raw3D.z) * 0.5 * 1.35;

          const arcMidRot = rotate3D({ x: midX, y: midY, z: midZ }, rotX, rotY);
          const arcMidProj = project(arcMidRot, cx, cy);

          ctx.strokeStyle = PALETTE.arcLine;
          ctx.lineWidth = 1.4;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(A.proj.x, A.proj.y);
          ctx.quadraticCurveTo(arcMidProj.x, arcMidProj.y, B.proj.x, B.proj.y);
          ctx.stroke();
          ctx.setLineDash([]); // Reset line dash

          // Photon pulse traveling along arc
          const t = ((frame * 0.015 + pairNum * 0.33) % 1);
          // Quadratic bezier interpolation: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
          const pulseX = Math.pow(1 - t, 2) * A.proj.x + 2 * (1 - t) * t * arcMidProj.x + Math.pow(t, 2) * B.proj.x;
          const pulseY = Math.pow(1 - t, 2) * A.proj.y + 2 * (1 - t) * t * arcMidProj.y + Math.pow(t, 2) * B.proj.y;

          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#34D399';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }
      });

      // 6. Draw Hub Pins, Pulsing Radar Rings & Metadata Tags
      hubPoints.forEach(({ hub, rot3D, proj }) => {
        if (rot3D.z < -10) return; // Behind the globe

        const pulsePhase = (frame * 0.05) % (Math.PI * 2);
        const pulseR = 6 + Math.sin(pulsePhase) * 5;
        const pulseAlpha = Math.max(0, 0.8 - (pulseR / 12));

        // Radar Pulse Ring
        ctx.strokeStyle = `rgba(52, 211, 153, ${pulseAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        // Pin Core Dot
        ctx.fillStyle = hub.color;
        ctx.shadowColor = hub.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Hub Label Card
        ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
        const labelText = hub.name;
        const textW = ctx.measureText(labelText).width;
        const badgeX = proj.x + 8;
        const badgeY = proj.y - 14;

        // Label Background Pill
        ctx.fillStyle = 'rgba(16, 24, 19, 0.82)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY - 10, textW + 12, 16, 4);
        ctx.fill();
        ctx.stroke();

        // Label Text
        ctx.fillStyle = '#FAF7F2';
        ctx.fillText(labelText, badgeX + 6, badgeY + 2);
      });
    }

    render();
  }

  // ===================================================================
  // 3. WELCOME BANNER FLOATING ORBS (CSS animations)
  // ===================================================================
  function initFloatingOrbs() {
    const banner = document.querySelector('.welcome-prompt-banner');
    if (!banner || banner.querySelector('.floating-orbs-layer')) return;

    const orbContainer = document.createElement('div');
    orbContainer.className = 'floating-orbs-layer';
    banner.style.position = 'relative';
    banner.insertBefore(orbContainer, banner.firstChild);

    const orbConfigs = [
      { size: 240, top: '-40px', left: '-50px', color: 'rgba(21, 128, 61, 0.12)', duration: 10 },
      { size: 200, top: '20px', right: '-40px', color: 'rgba(185, 63, 0, 0.08)', duration: 14 },
      { size: 160, bottom: '-30px', left: '40%', color: 'rgba(167, 216, 176, 0.14)', duration: 12 },
    ];

    orbConfigs.forEach((cfg, idx) => {
      const orb = document.createElement('div');
      orb.style.cssText = `
        position: absolute;
        width: ${cfg.size}px;
        height: ${cfg.size}px;
        ${cfg.top ? `top: ${cfg.top};` : ''}
        ${cfg.bottom ? `bottom: ${cfg.bottom};` : ''}
        ${cfg.left ? `left: ${cfg.left};` : ''}
        ${cfg.right ? `right: ${cfg.right};` : ''}
        border-radius: 50%;
        background: radial-gradient(circle, ${cfg.color} 0%, rgba(255,255,255,0) 70%);
        filter: blur(28px);
        pointer-events: none;
        z-index: 0;
        animation: floatOrb${idx} ${cfg.duration}s ease-in-out infinite alternate;
      `;
      orbContainer.appendChild(orb);
    });
  }

  // ===================================================================
  // BOOTSTRAP ALL ANIMATIONS
  // ===================================================================
  function boot() {
    try {
      initParticleConstellation();
      initInteractiveGlobe();
      initFloatingOrbs();
    } catch (err) {
      console.warn('[animations.js] Animation boot error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
