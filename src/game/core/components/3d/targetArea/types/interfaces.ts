import * as THREE from 'three';

export interface DecorationTargetAreaI {
  getDecorationTargetArea(): THREE.Mesh;
  setPosition(position: { x: number; y: number; z: number }): void;
  displayHint(): void;
  hideHint(): void;
  hide(): void;
  display(): void;
  disabled: boolean;
  disableForever(): void;
}

export interface DecorationTargetAreasControllerI {
  getDecorationTargetAreas(): DecorationTargetAreaI[];
  displayTargetAreas(): void;
  hideTargetAreas(): void;
  getNumberOfActiveTargetAreas(): number;
  displayHint(): void;
  hideHint(): void;
}