<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const container = ref(null);

onMounted(() => {
  if (!container.value) return;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a1a); // Dark background

  // Camera
  const camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // --- Clipping Plane ---
  // This plane will cut our object
  const clippingPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);

  // Visualize the plane
  const planeHelper = new THREE.PlaneHelper(clippingPlane, 2, 0xffffff);
  scene.add(planeHelper);

  // --- Geometry ---
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const material = new THREE.MeshStandardMaterial({ 
    color: 0xff8c00, // Orange
    metalness: 0.3,
    roughness: 0.6,
    clippingPlanes: [clippingPlane], // Apply the clipping plane
    side: THREE.DoubleSide, // Render both sides to see the inside of the cut
    transparent: true,
    opacity: 0.5,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Enable clipping globally
  renderer.localClippingEnabled = true;

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  // Handle resize
  const handleResize = () => {
    if (container.value) {
      camera.aspect = container.value.clientWidth / container.value.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    }
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    // Clean up Three.js resources if needed
  });
});
</script>
