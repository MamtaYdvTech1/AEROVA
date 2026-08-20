import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Product } from '../../types/product';
import { createCanTexture } from './TextureGenerator';

interface CanCanvasProps {
  product: Product;
  enableMouseFollow?: boolean;
  interactiveDrag?: boolean;
  autoRotate?: boolean;
  scale?: number;
  wireframe?: boolean;
  showParticles?: boolean;
  className?: string;
  onCanClick?: () => void;
}

export const CanCanvas: React.FC<CanCanvasProps> = ({
  product,
  enableMouseFollow = true,
  interactiveDrag = false,
  autoRotate = true,
  scale = 1.0,
  wireframe = false,
  showParticles = true,
  className = 'w-full h-full',
  onCanClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const canGroupRef = useRef<THREE.Group | null>(null);
  const bodyMeshRef = useRef<THREE.Mesh | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);

  // Mouse & Spring Physics state
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const drag = useRef({ isDragging: false, prevX: 0, prevY: 0, rotX: 0, rotY: 0 });
  const animFrameId = useRef<number>(0);
  const clock = useRef(new THREE.Clock());

  // 1. Initialize Scene & 3D Objects
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x2d1b4e, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(4, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    // Dynamic Rim Spotlight matching product color
    const rimLight = new THREE.PointLight(new THREE.Color(product.accentColor), 5.0, 15);
    rimLight.position.set(0, 2, -3.5);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const spotLight = new THREE.SpotLight(new THREE.Color(product.themeColor), 4.0, 20, Math.PI / 4, 0.4, 1);
    spotLight.position.set(3, 5, 2);
    scene.add(spotLight);
    spotLightRef.current = spotLight;

    // --- Build Realistic Beverage Can Geometry ---
    const canGroup = new THREE.Group();
    canGroup.scale.set(scale, scale, scale);

    // Aluminum Material for Rims and Lid
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8e0ea,
      metalness: 0.94,
      roughness: 0.22,
      wireframe,
    });

    // Darker Bevel Material
    const bevelMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.35,
      wireframe,
    });

    // 1. Can Body Cylinder (Middle)
    const bodyGeo = new THREE.CylinderGeometry(1.0, 1.0, 2.7, 64, 1, true);
    const texture = createCanTexture(product);
    const bodyMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.25,
      metalness: 0.75,
      wireframe,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 0;
    canGroup.add(bodyMesh);
    bodyMeshRef.current = bodyMesh;

    // 2. Top Taper Neck
    const topTaperGeo = new THREE.CylinderGeometry(0.84, 1.0, 0.28, 64, 1, false);
    const topTaperMesh = new THREE.Mesh(topTaperGeo, bevelMaterial);
    topTaperMesh.position.y = 1.35 + 0.14;
    canGroup.add(topTaperMesh);

    // 3. Top Rim Lip
    const topRimGeo = new THREE.TorusGeometry(0.85, 0.045, 16, 64);
    const topRimMesh = new THREE.Mesh(topRimGeo, aluminumMaterial);
    topRimMesh.rotation.x = Math.PI / 2;
    topRimMesh.position.y = 1.35 + 0.28;
    canGroup.add(topRimMesh);

    // 4. Can Lid Top Disc
    const lidGeo = new THREE.CircleGeometry(0.84, 64);
    const lidMesh = new THREE.Mesh(lidGeo, aluminumMaterial);
    lidMesh.rotation.x = -Math.PI / 2;
    lidMesh.position.y = 1.35 + 0.27;
    canGroup.add(lidMesh);

    // 5. Pull Tab Ring Geometry
    const tabGeo = new THREE.BoxGeometry(0.24, 0.02, 0.45);
    const tabMesh = new THREE.Mesh(tabGeo, aluminumMaterial);
    tabMesh.position.set(0, 1.35 + 0.285, 0.18);
    canGroup.add(tabMesh);

    // 6. Bottom Taper
    const botTaperGeo = new THREE.CylinderGeometry(1.0, 0.86, 0.22, 64, 1, false);
    const botTaperMesh = new THREE.Mesh(botTaperGeo, bevelMaterial);
    botTaperMesh.position.y = -1.35 - 0.11;
    canGroup.add(botTaperMesh);

    // 7. Bottom Rim Base
    const botRimGeo = new THREE.TorusGeometry(0.86, 0.04, 16, 64);
    const botRimMesh = new THREE.Mesh(botRimGeo, aluminumMaterial);
    botRimMesh.rotation.x = Math.PI / 2;
    botRimMesh.position.y = -1.35 - 0.22;
    canGroup.add(botRimMesh);

    // 8. Soft Floating Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      sGrad.addColorStop(0.4, 'rgba(0, 0, 0, 0.25)');
      sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.6;
    scene.add(shadowMesh);

    // 9. Floating Zero-G Ambient Particles
    let particleSystem: THREE.Points | null = null;
    if (showParticles) {
      const particleCount = 75;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let p = 0; p < particleCount; p++) {
        const radius = 1.6 + Math.random() * 2.8;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 5.5;

        positions[p * 3] = Math.cos(theta) * radius;
        positions[p * 3 + 1] = y;
        positions[p * 3 + 2] = Math.sin(theta) * radius;
        scales[p] = Math.random() * 0.08 + 0.02;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Particle sprite
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 64;
      pCanvas.height = 64;
      const pCtx = pCanvas.getContext('2d');
      if (pCtx) {
        const radGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        radGrad.addColorStop(0, '#FFFFFF');
        radGrad.addColorStop(0.3, product.accentColor);
        radGrad.addColorStop(1, 'transparent');
        pCtx.fillStyle = radGrad;
        pCtx.fillRect(0, 0, 64, 64);
      }
      const pTexture = new THREE.CanvasTexture(pCanvas);

      const pMat = new THREE.PointsMaterial({
        size: 0.18,
        map: pTexture,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      particleSystem = new THREE.Points(particleGeo, pMat);
      scene.add(particleSystem);
    }

    scene.add(canGroup);
    canGroupRef.current = canGroup;

    // --- Mouse & Touch Event Handlers ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.current.targetX = nx;
      mouse.current.targetY = ny;

      if (drag.current.isDragging && interactiveDrag) {
        const deltaX = e.clientX - drag.current.prevX;
        const deltaY = e.clientY - drag.current.prevY;
        drag.current.rotY += deltaX * 0.01;
        drag.current.rotX += deltaY * 0.01;
        drag.current.prevX = e.clientX;
        drag.current.prevY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactiveDrag) return;
      drag.current.isDragging = true;
      drag.current.prevX = e.clientX;
      drag.current.prevY = e.clientY;
    };

    const handleMouseUp = () => {
      drag.current.isDragging = false;
    };

    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const nx = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.current.targetX = nx;
        mouse.current.targetY = ny;

        if (drag.current.isDragging && interactiveDrag) {
          const deltaX = touch.clientX - drag.current.prevX;
          const deltaY = touch.clientY - drag.current.prevY;
          drag.current.rotY += deltaX * 0.01;
          drag.current.rotX += deltaY * 0.01;
          drag.current.prevX = touch.clientX;
          drag.current.prevY = touch.clientY;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!interactiveDrag || e.touches.length === 0) return;
      drag.current.isDragging = true;
      drag.current.prevX = e.touches[0].clientX;
      drag.current.prevY = e.touches[0].clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause rendering when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Render Loop with Zero Gravity Physics
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisible) return; // Skip render when not visible in viewport!

      const elapsedTime = clock.current.getElapsedTime();

      // Smooth Spring interpolation for cursor tilt
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

      if (canGroupRef.current) {
        // Zero-G vertical float wave
        const floatY = Math.sin(elapsedTime * 1.3) * 0.16 + Math.cos(elapsedTime * 0.7) * 0.05;
        canGroupRef.current.position.y = floatY;

        // Auto rotation + interactive rotation
        if (autoRotate && !drag.current.isDragging) {
          canGroupRef.current.rotation.y += 0.007;
        }

        if (interactiveDrag) {
          canGroupRef.current.rotation.y += (drag.current.rotY - canGroupRef.current.rotation.y) * 0.1;
          canGroupRef.current.rotation.x = drag.current.rotX + mouse.current.y * 0.15;
        } else if (enableMouseFollow) {
          // Subtle realistic tilt & yaw reaction
          const targetTiltZ = -mouse.current.x * 0.22;
          const targetTiltX = mouse.current.y * 0.22;
          canGroupRef.current.rotation.z += (targetTiltZ - canGroupRef.current.rotation.z) * 0.06;
          canGroupRef.current.rotation.x += (targetTiltX - canGroupRef.current.rotation.x) * 0.06;
        }

        // Floating shadow responds to float height
        shadowMesh.position.y = -2.6 + floatY * 0.5;
        shadowMesh.scale.setScalar(1 - floatY * 0.4);
      }

      // Orbit particles slowly
      if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.04;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.2) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId.current);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [interactiveDrag, autoRotate, enableMouseFollow, scale, wireframe, showParticles]);

  // 2. Update Texture & Lighting when product changes smoothly
  useEffect(() => {
    if (bodyMeshRef.current) {
      const newTexture = createCanTexture(product);
      (bodyMeshRef.current.material as THREE.MeshStandardMaterial).map = newTexture;
      (bodyMeshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
    }
    if (rimLightRef.current) {
      rimLightRef.current.color.set(new THREE.Color(product.accentColor));
    }
    if (spotLightRef.current) {
      spotLightRef.current.color.set(new THREE.Color(product.themeColor));
    }
  }, [product]);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      onClick={onCanClick}
      data-cursor={interactiveDrag ? 'DRAG' : 'VIEW'}
    />
  );
};
