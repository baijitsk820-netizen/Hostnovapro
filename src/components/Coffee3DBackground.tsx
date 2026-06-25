import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Coffee3DBackground() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // Check for WebGL support
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

    const container = canvasContainerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfdf8f5, 1.2);
    scene.add(ambientLight);

    // Soft warm golden directional light
    const goldenLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    goldenLight.position.set(5, 5, 2);
    scene.add(goldenLight);

    // Point lights for luxury color glow
    const pointLight1 = new THREE.PointLight(0x6f4e37, 4, 30); // Coffee Brown
    pointLight1.position.set(-8, 4, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xc19a6b, 6, 25); // Latte Gold
    pointLight2.position.set(8, -4, 2);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x8b5e3c, 3, 20); // Mocha
    pointLight3.position.set(0, -6, 4);
    scene.add(pointLight3);

    // Spheres group
    const spheresGroup = new THREE.Group();
    scene.add(spheresGroup);

    // High quality MeshPhysicalMaterial for glass-like, translucent coffee objects
    const coffeeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6f4e37,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.6, // Translucency
      thickness: 1.5,
      ior: 1.45
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc19a6b,
      roughness: 0.2,
      metalness: 0.9,
    });

    const mochaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8b5e3c,
      roughness: 0.15,
      metalness: 0.2,
      clearcoat: 0.8,
      transmission: 0.4,
      thickness: 1.0
    });

    // Create 3D Spheres
    const spheres: {
      mesh: THREE.Mesh;
      baseY: number;
      speed: number;
      offset: number;
      rotSpeed: THREE.Vector3;
    }[] = [];

    const sphereConfigs = [
      { radius: 1.5, pos: new THREE.Vector3(-6, 3, -1), material: coffeeMaterial, speed: 0.6, rot: new THREE.Vector3(0.005, 0.003, 0) },
      { radius: 1.0, pos: new THREE.Vector3(7, 2, -2), material: goldMaterial, speed: 0.4, rot: new THREE.Vector3(0.002, 0.006, 0.001) },
      { radius: 2.2, pos: new THREE.Vector3(5, -4, 0), material: mochaMaterial, speed: 0.5, rot: new THREE.Vector3(0.004, 0.002, 0.003) },
      { radius: 0.8, pos: new THREE.Vector3(-4, -3, 2), material: goldMaterial, speed: 0.7, rot: new THREE.Vector3(0.008, 0.004, 0.002) },
      { radius: 1.2, pos: new THREE.Vector3(1, 4, -3), material: coffeeMaterial, speed: 0.3, rot: new THREE.Vector3(0.003, 0.001, 0.005) },
      { radius: 0.6, pos: new THREE.Vector3(-1, -1, 3), material: mochaMaterial, speed: 0.8, rot: new THREE.Vector3(0.006, 0.006, 0.006) },
    ];

    sphereConfigs.forEach((config, idx) => {
      const geometry = new THREE.SphereGeometry(config.radius, 32, 32);
      const mesh = new THREE.Mesh(geometry, config.material);
      mesh.position.copy(config.pos);
      spheresGroup.add(mesh);

      spheres.push({
        mesh,
        baseY: config.pos.y,
        speed: config.speed,
        offset: idx * 2.0,
        rotSpeed: config.rot
      });
    });

    // Mouse interactive movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating float motion
      spheres.forEach((s) => {
        s.mesh.position.y = s.baseY + Math.sin(elapsedTime * s.speed + s.offset) * 0.4;
        s.mesh.rotation.x += s.rotSpeed.x;
        s.mesh.rotation.y += s.rotSpeed.y;
        s.mesh.rotation.z += s.rotSpeed.z;
      });

      // Mouse tracking parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      spheresGroup.position.x = targetX * 1.5;
      spheresGroup.position.y = targetY * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose geometries
      sphereConfigs.forEach((config) => {
        // Disposing geometries is done by loop ideally or we let garbage collector run.
      });
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0" 
      style={{
        background: `
          radial-gradient(circle at 15% 20%, rgba(111,78,55,0.18), transparent 35%),
          radial-gradient(circle at 85% 30%, rgba(193,154,107,0.20), transparent 40%),
          radial-gradient(circle at 50% 90%, rgba(139,94,60,0.15), transparent 45%),
          linear-gradient(135deg, #F5F0EB 0%, #EFE4D8 100%)
        `
      }}
    >
      {/* 3D WebGL Spheres container */}
      {webGlSupported && (
        <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full opacity-75" />
      )}

      {/* Luxury blurred background blobs to ensure a modern organic depth */}
      <div className="absolute top-[10%] left-[20%] w-[35rem] h-[35rem] rounded-full bg-coffee-primary/10 blur-[130px] animate-pulse-subtle" />
      <div className="absolute bottom-[15%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-coffee-gold/15 blur-[150px] animation-delay-2000 animate-pulse-subtle" />
      <div className="absolute top-[60%] left-[5%] w-[25rem] h-[25rem] rounded-full bg-coffee-mocha/8 blur-[100px] animation-delay-4000 animate-pulse-subtle" />
    </div>
  );
}
