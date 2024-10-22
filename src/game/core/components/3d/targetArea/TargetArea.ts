import * as THREE from 'three';

export default class TargetArea extends THREE.Mesh {
  constructor(radius: number, color: number) {
    const geometry = new THREE.RingGeometry(radius - 0.1, radius, 32);
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.5,
    });
    super(geometry, material);

    this.rotation.x = -Math.PI / 2;
    this.position.y = 0.01; // Slightly above ground
  }
}
