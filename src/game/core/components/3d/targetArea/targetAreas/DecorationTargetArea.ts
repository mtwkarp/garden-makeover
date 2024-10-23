import * as THREE from 'three';
import { injectable } from 'inversify';
import { DecorationTargetAreaI } from '../types/interfaces';

@injectable()
export default class DecorationTargetArea implements DecorationTargetAreaI {
  private targetArea: THREE.Mesh;

  constructor() {
    this.createTargetArea();
  }

  private createTargetArea(): void {
    const color = new THREE.Color(0xff0000);
    const radius = 0.3;
    const geometry = new THREE.RingGeometry(radius - 0.1, radius, 32);
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      emissive: new THREE.Color(color),
      emissiveIntensity: 1,
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.x = -Math.PI / 2;

    this.targetArea = mesh;
  }

  public getDecorationTargetArea(): THREE.Mesh {
    return this.targetArea;
  }

  public setPosition(position: { x: number; y: number; z: number }): void {
    this.targetArea.position.set(position.x, position.y, position.z);
  }

  public displayHint(): void {}

  public hideHint(): void {}

  public hide(): void {
    this.targetArea.visible = false;
  }

  public display(): void {
    this.targetArea.visible = true;
  }
}
