import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeDBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion & mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070305, 0.0016);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 42;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Texture for glowing circular stardust
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(223, 164, 95, 0.85)');
      grad.addColorStop(0.6, 'rgba(216, 58, 86, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    // 2. Texture for soft translucent bokeh rings
    const createRingTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      ctx.beginPath();
      ctx.arc(64, 64, 52, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(223, 164, 95, 0.35)';
      ctx.stroke();

      const grad = ctx.createRadialGradient(64, 64, 40, 64, 64, 64);
      grad.addColorStop(0, 'rgba(216, 58, 86, 0.08)');
      grad.addColorStop(0.7, 'rgba(223, 164, 95, 0.04)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    };

    // 3. Texture for subtle tiny floating hearts
    const createHeartTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      ctx.clearRect(0, 0, 64, 64);
      ctx.fillStyle = 'rgba(233, 168, 155, 0.75)';
      ctx.beginPath();
      ctx.moveTo(32, 48);
      ctx.bezierCurveTo(18, 38, 12, 28, 12, 20);
      ctx.bezierCurveTo(12, 12, 18, 8, 24, 8);
      ctx.bezierCurveTo(28, 8, 31, 11, 32, 14);
      ctx.bezierCurveTo(33, 11, 36, 8, 40, 8);
      ctx.bezierCurveTo(46, 8, 52, 12, 52, 20);
      ctx.bezierCurveTo(52, 28, 46, 38, 32, 48);
      ctx.closePath();
      ctx.fill();

      ctx.shadowColor = 'rgba(216, 58, 86, 0.5)';
      ctx.shadowBlur = 8;
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    };

    const circleTexture = createCircleTexture();
    const ringTexture = createRingTexture();
    const heartTexture = createHeartTexture();

    // LAYER 1: Deep Distant Micro-Stardust Layer
    const deepCount = isMobile ? 60 : 140;
    const deepGeo = new THREE.BufferGeometry();
    const deepPos = new Float32Array(deepCount * 3);
    const deepCol = new Float32Array(deepCount * 3);

    const goldColor = new THREE.Color(0xdfa45f);
    const roseColor = new THREE.Color(0xe9a89b);
    const wineColor = new THREE.Color(0x8b263e);

    for (let i = 0; i < deepCount; i++) {
      deepPos[i * 3] = (Math.random() - 0.5) * 90;
      deepPos[i * 3 + 1] = (Math.random() - 0.5) * 70;
      deepPos[i * 3 + 2] = -25 + (Math.random() - 0.5) * 40; // deep z

      const randVal = Math.random();
      const c = randVal > 0.6 ? goldColor : randVal > 0.3 ? roseColor : wineColor;
      deepCol[i * 3] = c.r;
      deepCol[i * 3 + 1] = c.g;
      deepCol[i * 3 + 2] = c.b;
    }
    deepGeo.setAttribute('position', new THREE.BufferAttribute(deepPos, 3));
    deepGeo.setAttribute('color', new THREE.BufferAttribute(deepCol, 3));

    const deepMat = new THREE.PointsMaterial({
      size: 1.2,
      map: circleTexture,
      transparent: true,
      opacity: 0.45,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const deepParticles = new THREE.Points(deepGeo, deepMat);
    scene.add(deepParticles);

    // LAYER 2: Foreground Glowing Bokeh Particles
    const foreCount = isMobile ? 40 : 80;
    const foreGeo = new THREE.BufferGeometry();
    const forePos = new Float32Array(foreCount * 3);
    const foreCol = new Float32Array(foreCount * 3);

    for (let i = 0; i < foreCount; i++) {
      forePos[i * 3] = (Math.random() - 0.5) * 70;
      forePos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      forePos[i * 3 + 2] = 5 + Math.random() * 25; // near z

      const c = Math.random() > 0.6 ? goldColor : roseColor;
      foreCol[i * 3] = c.r;
      foreCol[i * 3 + 1] = c.g;
      foreCol[i * 3 + 2] = c.b;
    }
    foreGeo.setAttribute('position', new THREE.BufferAttribute(forePos, 3));
    foreGeo.setAttribute('color', new THREE.BufferAttribute(foreCol, 3));

    const foreMat = new THREE.PointsMaterial({
      size: 2.2,
      map: circleTexture,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const foreParticles = new THREE.Points(foreGeo, foreMat);
    scene.add(foreParticles);

    // LAYER 3: Translucent Floating Bokeh Rings
    const ringCount = isMobile ? 6 : 16;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      ringPos[i * 3] = (Math.random() - 0.5) * 65;
      ringPos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      ringPos[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));

    const ringMat = new THREE.PointsMaterial({
      size: 5.5,
      map: ringTexture,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ringParticles = new THREE.Points(ringGeo, ringMat);
    scene.add(ringParticles);

    // LAYER 4: Subtle Floating Mini Hearts (Upward slow drift)
    const heartCount = isMobile ? 10 : 24;
    const heartGeo = new THREE.BufferGeometry();
    const heartPos = new Float32Array(heartCount * 3);
    for (let i = 0; i < heartCount; i++) {
      heartPos[i * 3] = (Math.random() - 0.5) * 65;
      heartPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      heartPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    heartGeo.setAttribute('position', new THREE.BufferAttribute(heartPos, 3));

    const heartMat = new THREE.PointsMaterial({
      size: 2.4,
      map: heartTexture,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const heartParticles = new THREE.Points(heartGeo, heartMat);
    scene.add(heartParticles);

    // LAYER 5: Soft breathing translucent background spheres
    const lightSpheresGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(6, 16, 16);
    const sphereColors = [0x4d122f, 0x2b0a1a, 0x6e1d3d];

    const sphereMeshes: THREE.Mesh[] = [];
    sphereColors.forEach((col, idx) => {
      const sphereMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(
        (idx - 1) * 26,
        (Math.random() - 0.5) * 16,
        -18 + idx * 6
      );
      sphereMeshes.push(mesh);
      lightSpheresGroup.add(mesh);
    });
    scene.add(lightSpheresGroup);

    // Mouse tracking for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp parallax
      targetX += (mouseX * 1.8 - targetX) * 0.035;
      targetY += (mouseY * 1.4 - targetY) * 0.035;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate deep particles slowly
      deepParticles.rotation.y = elapsedTime * 0.015;
      deepParticles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.02;

      // Rotate foreground particles slightly faster for depth perception
      foreParticles.rotation.y = elapsedTime * 0.03;
      foreParticles.rotation.x = Math.cos(elapsedTime * 0.02) * 0.04;

      // Drift rings gently
      ringParticles.rotation.z = elapsedTime * 0.01;

      // Drift heart particles slowly upward
      const hPositions = heartGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < heartCount; i++) {
        hPositions[i * 3 + 1] += 0.022;
        if (hPositions[i * 3 + 1] > 28) {
          hPositions[i * 3 + 1] = -28;
          hPositions[i * 3] = (Math.random() - 0.5) * 65;
        }
      }
      heartGeo.attributes.position.needsUpdate = true;

      // Gently breathe light spheres
      sphereMeshes.forEach((mesh, i) => {
        mesh.position.y += Math.sin(elapsedTime * 0.45 + i) * 0.012;
        mesh.position.x += Math.cos(elapsedTime * 0.3 + i) * 0.012;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      deepGeo.dispose();
      deepMat.dispose();
      foreGeo.dispose();
      foreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      heartGeo.dispose();
      heartMat.dispose();
      sphereGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
