import * as THREE from 'three';

export default class DraggableCube extends THREE.Mesh {
  public draggable: boolean;

  constructor(size: number, color: number) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color });
    super(geometry, material);

    this.position.set(0, size / 2, 0);
    this.draggable = true;
  }
}
