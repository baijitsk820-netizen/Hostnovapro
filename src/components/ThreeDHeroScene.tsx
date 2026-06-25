import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeDHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for WebGL compatibility
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff3e0, 2);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0xc19a6b, 3, 15);
    accentLight.position.set(-4, -2, 2);
    scene.add(accentLight);

    // Root group that holds everything so we can tilt the entire scene with the mouse
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc19a6b,
      metalness: 0.9,
      roughness: 0.15,
      name: "gold"
    });

    const coffeeMaterial = new THREE.MeshStandardMaterial({
      color: 0x6f4e37,
      metalness: 0.1,
      roughness: 0.6,
      name: "coffee"
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1e17,
      metalness: 0.8,
      roughness: 0.3,
      name: "darkMetal"
    });

    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      emissive: 0x1f140e,
      roughness: 0.1,
      metalness: 0.5,
    });

    // 1. Laptop Model (Procedural)
    const laptopGroup = new THREE.Group();
    
    // Laptop base
    const baseGeometry = new THREE.BoxGeometry(3.2, 0.1, 2.2);
    const base = new THREE.Mesh(baseGeometry, darkMetalMaterial);
    base.position.y = -0.05;
    laptopGroup.add(base);

    // Laptop keyboard area indentation (subtle visual detail)
    const kbGeom = new THREE.BoxGeometry(2.8, 0.02, 1.0);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x120c08, roughness: 0.8 });
    const kb = new THREE.Mesh(kbGeom, kbMat);
    kb.position.set(0, 0.02, 0.3);
    laptopGroup.add(kb);

    // Laptop Screen
    const screenChassisGeom = new THREE.BoxGeometry(3.2, 2.0, 0.08);
    const screenChassis = new THREE.Mesh(screenChassisGeom, darkMetalMaterial);
    screenChassis.position.set(0, 1.0, -1.05);
    screenChassis.rotation.x = -0.15; // slightly tilted open
    laptopGroup.add(screenChassis);

    // Laptop screen display texture simulation
    const displayGeom = new THREE.PlaneGeometry(3.0, 1.8);
    const displayMat = new THREE.MeshBasicMaterial({
      color: 0xf5f0eb,
      side: THREE.DoubleSide
    });
    const display = new THREE.Mesh(displayGeom, displayMat);
    display.position.set(0, 1.0, -1.0);
    display.rotation.x = -0.15;
    laptopGroup.add(display);

    // Add some premium mock components on the laptop display
    const mockWebGroup = new THREE.Group();
    mockWebGroup.position.set(0, 1.0, -0.99);
    mockWebGroup.rotation.x = -0.15;

    // Header bar on mock website
    const mockHeaderGeom = new THREE.PlaneGeometry(2.8, 0.2);
    const mockHeaderMat = new THREE.MeshBasicMaterial({ color: 0x6f4e37 });
    const mockHeader = new THREE.Mesh(mockHeaderGeom, mockHeaderMat);
    mockHeader.position.y = 0.7;
    mockWebGroup.add(mockHeader);

    // Graphic hero card on mock website
    const mockHeroCardGeom = new THREE.PlaneGeometry(1.2, 0.8);
    const mockHeroCardMat = new THREE.MeshBasicMaterial({ color: 0xc19a6b });
    const mockHeroCard = new THREE.Mesh(mockHeroCardGeom, mockHeroCardMat);
    mockHeroCard.position.set(-0.6, 0.1, 0.001);
    mockWebGroup.add(mockHeroCard);

    // Graphic content blocks on mock website
    const mockBlock1Geom = new THREE.PlaneGeometry(1.0, 0.12);
    const mockBlockMat = new THREE.MeshBasicMaterial({ color: 0x8b5e3c });
    const mockBlock1 = new THREE.Mesh(mockBlock1Geom, mockBlockMat);
    mockBlock1.position.set(0.7, 0.4, 0.001);
    mockWebGroup.add(mockBlock1);

    const mockBlock2Geom = new THREE.PlaneGeometry(1.0, 0.08);
    const mockBlock2 = new THREE.Mesh(mockBlock2Geom, mockBlockMat);
    mockBlock2.position.set(0.7, 0.2, 0.001);
    mockWebGroup.add(mockBlock2);

    const mockBlock3Geom = new THREE.PlaneGeometry(1.0, 0.08);
    const mockBlock3 = new THREE.Mesh(mockBlock3Geom, mockBlockMat);
    mockBlock3.position.set(0.7, 0.0, 0.001);
    mockWebGroup.add(mockBlock3);

    laptopGroup.add(mockWebGroup);

    laptopGroup.position.set(-1.2, -0.8, 0);
    laptopGroup.rotation.y = 0.4;
    mainGroup.add(laptopGroup);

    // 2. Mobile Phone (Procedural)
    const phoneGroup = new THREE.Group();

    const phoneBodyGeom = new THREE.BoxGeometry(1.0, 1.9, 0.08);
    const phoneBody = new THREE.Mesh(phoneBodyGeom, goldMaterial);
    phoneGroup.add(phoneBody);

    const phoneScreenGeom = new THREE.PlaneGeometry(0.92, 1.8);
    const phoneScreenMat = new THREE.MeshBasicMaterial({ color: 0x2a1e17 });
    const phoneScreen = new THREE.Mesh(phoneScreenGeom, phoneScreenMat);
    phoneScreen.position.z = 0.045;
    phoneGroup.add(phoneScreen);

    // Phone graphic display accent
    const phoneAccGeom = new THREE.PlaneGeometry(0.8, 0.6);
    const phoneAccMat = new THREE.MeshBasicMaterial({ color: 0xc19a6b });
    const phoneAcc = new THREE.Mesh(phoneAccGeom, phoneAccMat);
    phoneAcc.position.set(0, 0.3, 0.05);
    phoneGroup.add(phoneAcc);

    const phoneAccLineGeom = new THREE.PlaneGeometry(0.8, 0.1);
    const phoneAccLineMat = new THREE.MeshBasicMaterial({ color: 0xf5f0eb });
    const phoneAccLine = new THREE.Mesh(phoneAccLineGeom, phoneAccLineMat);
    phoneAccLine.position.set(0, -0.2, 0.05);
    phoneGroup.add(phoneAccLine);

    phoneGroup.position.set(2.4, -0.5, 1.5);
    phoneGroup.rotation.set(-0.2, -0.4, 0.1);
    mainGroup.add(phoneGroup);

    // 3. Floating Geometric Accents
    // Torus Knot (Latte Gold)
    const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.16, 100, 16);
    const goldTorusKnot = new THREE.Mesh(torusKnotGeometry, goldMaterial);
    goldTorusKnot.position.set(1.5, 1.8, -1.0);
    mainGroup.add(goldTorusKnot);

    // Small floating glass-like sphere
    const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const glassSphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.5,
    });
    const glassSphere = new THREE.Mesh(sphereGeometry, glassSphereMaterial);
    glassSphere.position.set(-2.2, 1.8, 0.5);
    mainGroup.add(glassSphere);

    // 4. Floating Procedural Coffee Beans
    const createCoffeeBean = () => {
      const beanGroup = new THREE.Group();
      
      // A coffee bean is basically an oval sphere with a seam
      const halfBeanGeom = new THREE.SphereGeometry(0.25, 16, 16);
      halfBeanGeom.scale(1.6, 1.0, 0.7); // make it bean-shaped
      
      const leftHalf = new THREE.Mesh(halfBeanGeom, coffeeMaterial);
      leftHalf.position.x = -0.06;
      beanGroup.add(leftHalf);
      
      const rightHalf = new THREE.Mesh(halfBeanGeom, coffeeMaterial);
      rightHalf.position.x = 0.06;
      beanGroup.add(rightHalf);

      // Add a tiny gold center cut for a premium branded look
      const cutGeom = new THREE.BoxGeometry(0.04, 0.7, 0.1);
      const cut = new THREE.Mesh(cutGeom, goldMaterial);
      cut.position.z = 0.1;
      beanGroup.add(cut);

      return beanGroup;
    };

    const beans: THREE.Group[] = [];
    const beanPositions = [
      { x: -2.8, y: -0.2, z: 1.5, scale: 1.2 },
      { x: 2.8, y: 1.2, z: -0.5, scale: 0.9 },
      { x: 0.2, y: 2.4, z: -1.8, scale: 0.8 },
      { x: -0.5, y: -2.0, z: 0.5, scale: 1.1 }
    ];

    beanPositions.forEach((pos) => {
      const bean = createCoffeeBean();
      bean.position.set(pos.x, pos.y, pos.z);
      bean.scale.setScalar(pos.scale);
      // Give random start rotation
      bean.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mainGroup.add(bean);
      beans.push(bean);
    });

    // 5. Floating Micro-particles
    const particleCount = 28;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xc19a6b,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });

    const starParticles = new THREE.Points(particlesGeometry, particlesMaterial);
    mainGroup.add(starParticles);

    // Mouse Tracking Mechanics
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();

      // Slow smooth rotation of geometric shapes
      goldTorusKnot.rotation.x = elapsedTime * 0.2;
      goldTorusKnot.rotation.y = elapsedTime * 0.35;
      
      glassSphere.rotation.y = elapsedTime * 0.15;
      glassSphere.position.y = 1.8 + Math.sin(elapsedTime * 1.2) * 0.25;

      // Make laptop float gently
      laptopGroup.position.y = -0.8 + Math.sin(elapsedTime * 0.8) * 0.15;
      laptopGroup.rotation.y = 0.4 + Math.cos(elapsedTime * 0.4) * 0.05;

      // Make phone float gently
      phoneGroup.position.y = -0.5 + Math.cos(elapsedTime * 1.1) * 0.12;
      phoneGroup.rotation.y = -0.4 + Math.sin(elapsedTime * 0.5) * 0.05;

      // Animate coffee beans
      beans.forEach((bean, idx) => {
        const offset = idx * 1.5;
        bean.position.y += Math.sin(elapsedTime * 1.5 + offset) * 0.004;
        bean.rotation.x += 0.003 * (idx % 2 === 0 ? 1 : -1);
        bean.rotation.y += 0.005 * (idx % 3 === 0 ? 1 : -1);
      });

      // Animate star particles rising up
      const positionsArr = starParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positionsArr.length; i += 3) {
        positionsArr[i] += 0.003; // float upwards
        if (positionsArr[i] > 5) {
          positionsArr[i] = -5; // reset at bottom
        }
      }
      starParticles.geometry.attributes.position.needsUpdate = true;

      // Mouse interactive tilt (smooth interpolation)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = targetX * 0.25;
      mainGroup.rotation.x = -targetY * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 500;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    });
    
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // dispose geometries/materials
      baseGeometry.dispose();
      kbGeom.dispose();
      screenChassisGeom.dispose();
      displayGeom.dispose();
      mockHeaderGeom.dispose();
      mockHeroCardGeom.dispose();
      mockBlock1Geom.dispose();
      mockBlock2Geom.dispose();
      mockBlock3Geom.dispose();
      phoneBodyGeom.dispose();
      phoneScreenGeom.dispose();
      phoneAccGeom.dispose();
      phoneAccLineGeom.dispose();
      torusKnotGeometry.dispose();
      sphereGeometry.dispose();
      particlesGeometry.dispose();
      
      goldMaterial.dispose();
      coffeeMaterial.dispose();
      darkMetalMaterial.dispose();
      screenMaterial.dispose();
      glassSphereMaterial.dispose();
      displayMat.dispose();
      kbMat.dispose();
      mockHeaderMat.dispose();
      mockHeroCardMat.dispose();
      mockBlockMat.dispose();
      phoneScreenMat.dispose();
      phoneAccMat.dispose();
      phoneAccLineMat.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div id="three-fallback" className="w-full h-full flex items-center justify-center relative bg-radial from-coffee-mocha/10 to-transparent rounded-3xl p-6">
        <div className="text-center relative max-w-md p-8 rounded-2xl glass-effect border border-coffee-gold/20">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coffee-gold/20 flex items-center justify-center text-coffee-primary animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-display font-semibold mb-2">Interactive 3D Preview</h3>
          <p className="text-sm text-coffee-mocha/80 mb-4">
            We render stunning 3D procedural geometries (devices & floating premium elements) directly in real-time. Turn on hardware acceleration in your browser to experience full interactive WebGL capabilities.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-coffee-gold/10 text-coffee-primary text-xs font-mono rounded-full border border-coffee-gold/20">Three.js Engine</span>
            <span className="px-3 py-1 bg-coffee-gold/10 text-coffee-primary text-xs font-mono rounded-full border border-coffee-gold/20">Framer Motion</span>
            <span className="px-3 py-1 bg-coffee-gold/10 text-coffee-primary text-xs font-mono rounded-full border border-coffee-gold/20">Responsive Mockups</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]" id="three-container-wrapper">
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" id="three-canvas-root" />
      
      {/* Decorative premium labels floating */}
      <div className="absolute top-4 left-4 glass-effect border border-coffee-gold/20 px-3 py-1.5 rounded-lg text-[10px] font-mono text-coffee-primary/70 pointer-events-none uppercase tracking-widest hidden sm:block">
        ✦ ENGINE: WebGL2 / THREE.JS
      </div>
      <div className="absolute bottom-4 right-4 glass-effect border border-coffee-gold/20 px-3 py-1.5 rounded-lg text-[10px] font-mono text-coffee-primary/70 pointer-events-none uppercase tracking-widest hidden sm:block">
        ✦ RENDERER: HostNovaPro Real-time 3D
      </div>
    </div>
  );
}
