"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

function buildLabelTexture(renderer: THREE.WebGLRenderer) {
  const width = 1024;
  const height = 900;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.Texture();
  }

  ctx.fillStyle = "#efe6cf";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#cc3a20";
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.42, height * 0.28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#111";
  ctx.font = "bold 180px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("OIISHI", width * 0.5, height * 0.06);

  ctx.font = "bold 90px Arial, Helvetica, sans-serif";
  ctx.textBaseline = "bottom";
  ctx.fillText("JAPANESE", width * 0.5, height * 0.86 - 140);
  ctx.fillText("YAKINIKU SAUCE", width * 0.5, height * 0.86);

  ctx.font = "48px Arial, Helvetica, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("NET 8.5 FL OZ | 250 mL", width * 0.5, height - 36);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

export default function BottleCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const exportRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const exportButton = exportRef.current;
    if (!container || !canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f5f1ea");

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(4.2, 3.2, 6);

    const hemi = new THREE.HemisphereLight(0xffffff, 0xd9cbb6, 0.9);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1.05);
    dir.position.set(5, 8, 4);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    scene.add(dir);

    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.18 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.25;
    ground.receiveShadow = true;
    scene.add(ground);

    const bottle = new THREE.Group();
    scene.add(bottle);

    const matBody = new THREE.MeshPhysicalMaterial({
      color: "#2a2c26",
      roughness: 0.5,
      metalness: 0.05,
      clearcoat: 0.25,
      sheen: 0.25
    });
    const matCap = new THREE.MeshPhysicalMaterial({
      color: "#cfd1d2",
      roughness: 0.8,
      metalness: 0
    });
    const matRing = new THREE.MeshStandardMaterial({
      color: "#b9bbbc",
      roughness: 0.6,
      metalness: 0.1
    });

    const profile = [
      new THREE.Vector2(0.0, -1.2),
      new THREE.Vector2(1.25, -1.2),
      new THREE.Vector2(1.28, -1.1),
      new THREE.Vector2(1.24, -0.5),
      new THREE.Vector2(1.22, 0.6),
      new THREE.Vector2(1.07, 1.05),
      new THREE.Vector2(0.88, 1.34),
      new THREE.Vector2(0.86, 1.65),
      new THREE.Vector2(0.9, 1.68)
    ];
    const bodyGeometry = new THREE.LatheGeometry(profile, 192);
    const bodyMesh = new THREE.Mesh(bodyGeometry, matBody);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bottle.add(bodyMesh);

    const baseGeometry = new THREE.CylinderGeometry(0.95, 0.95, 0.25, 96);
    const baseMesh = new THREE.Mesh(baseGeometry, matBody);
    baseMesh.position.y = -0.6;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    bottle.add(baseMesh);

    const capGeometry = new THREE.CylinderGeometry(0.75, 0.75, 0.5, 96);
    const capMesh = new THREE.Mesh(capGeometry, matCap);
    capMesh.position.y = 1.95;
    capMesh.castShadow = true;
    bottle.add(capMesh);

    const tipGeometry = new THREE.ConeGeometry(0.22, 0.5, 96);
    const tipMesh = new THREE.Mesh(tipGeometry, matCap);
    tipMesh.position.y = 2.35;
    tipMesh.castShadow = true;
    bottle.add(tipMesh);

    const ringMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i += 1) {
      const ringGeometry = new THREE.TorusGeometry(0.75, 0.03, 8, 80);
      const ringMesh = new THREE.Mesh(ringGeometry, matRing);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 1.76 + i * 0.03;
      ringMesh.castShadow = true;
      bottle.add(ringMesh);
      ringMeshes.push(ringMesh);
    }

    const labelTexture = buildLabelTexture(renderer);
    const labelGeometry = new THREE.PlaneGeometry(2.25, 2.05);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.85,
      metalness: 0
    });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    const radiusMid = 1.22;
    labelMesh.position.set(0, 0.1, radiusMid + 0.018);
    bottle.add(labelMesh);

    const frameGeometry = new THREE.PlaneGeometry(2.27, 2.07);
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: "#e5dcc7",
      roughness: 0.9,
      metalness: 0
    });
    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    frameMesh.position.set(0, 0.1, radiusMid + 0.014);
    frameMesh.renderOrder = -1;
    bottle.add(frameMesh);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0.6, 0);

    const exporter = new GLTFExporter();

    let animationFrame = 0;
    const animate = () => {
      bottle.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(resize)
      : null;

    if (resizeObserver) {
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    animate();

    const handleExport = () => {
      exporter.parse(
        scene,
        (result) => {
          const blob = new Blob([result as ArrayBuffer], {
            type: "model/gltf-binary"
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "oishii_bottle.glb";
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 0);
        },
        { binary: true, onlyVisible: true } as any
      );
    };

    exportButton?.addEventListener("click", handleExport);

    return () => {
      cancelAnimationFrame(animationFrame);
      exportButton?.removeEventListener("click", handleExport);
      controls.dispose();
      renderer.dispose();
      matBody.dispose();
      matCap.dispose();
      matRing.dispose();
      labelTexture.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
      bodyGeometry.dispose();
      capGeometry.dispose();
      tipGeometry.dispose();
      baseGeometry.dispose();
      labelGeometry.dispose();
      labelMaterial.dispose();
      frameGeometry.dispose();
      frameMaterial.dispose();
      ringMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
      });

      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", resize);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-visual">
      <canvas ref={canvasRef} aria-hidden="true" />
      <button ref={exportRef} type="button" className="hero-export">
        Export .glb
      </button>
    </div>
  );
}
