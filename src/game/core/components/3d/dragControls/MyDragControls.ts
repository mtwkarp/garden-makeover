import * as THREE from 'three';
import TargetArea from '../targetArea/TargetArea';

export default class MyDragControls {
  private objects: THREE.Object3D[];

  private camera: THREE.Camera;

  private domElement: HTMLElement;

  private targetArea: TargetArea;

  private enabled: boolean = true;

  private selected: THREE.Object3D | null = null;

  private plane: THREE.Plane;

  private offset: THREE.Vector3;

  private intersection: THREE.Vector3;

  private raycaster: THREE.Raycaster;

  private mouse: THREE.Vector2;

  constructor(objects: THREE.Object3D[], camera: THREE.Camera, domElement: HTMLElement, targetArea: TargetArea) {
    this.objects = objects;
    this.camera = camera;
    this.domElement = domElement;
    this.targetArea = targetArea;

    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.offset = new THREE.Vector3();
    this.intersection = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.domElement.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
    this.domElement.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
    this.domElement.addEventListener('mouseup', this.onDocumentMouseUp.bind(this), false);
  }

  private onDocumentMouseDown(event: MouseEvent): void {
    event.preventDefault();

    this.updateMouse(event);

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, true);

    if (intersects.length > 0) {
      this.selected = intersects[0].object;

      this.plane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), this.selected.position);

      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        this.offset.copy(this.intersection).sub(this.selected.position);
      }
    }
  }

  private onDocumentMouseMove(event: MouseEvent): void {
    event.preventDefault();

    if (this.selected && this.enabled) {
      this.updateMouse(event);

      this.raycaster.setFromCamera(this.mouse, this.camera);

      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        const point = this.intersection.clone().sub(this.offset);

        const minX = -2;
        const maxX = 2;
        const minZ = -0.1;
        const maxZ = 1;

        if (point.x < minX) point.x = minX;
        if (point.x > maxX) point.x = maxX;
        if (point.z < minZ) point.z = minZ;
        if (point.z > maxZ) point.z = maxZ;

        this.selected.position.set(point.x, this.selected.position.y, point.z);
      }
    }
  }

  private onDocumentMouseUp(event: MouseEvent): void {
    event.preventDefault();

    if (this.selected) {
      const dx = this.selected.position.x - this.targetArea.position.x;
      const dz = this.selected.position.z - this.targetArea.position.z;
      const distance = Math.sqrt(dx * dx + dz * dz);

      const { outerRadius } = (this.targetArea.geometry as THREE.RingGeometry).parameters;

      if (distance <= outerRadius) {
        this.selected.position.set(this.targetArea.position.x, this.selected.position.y, this.targetArea.position.z);
      }

      this.selected = null;
    }
  }

  private updateMouse(event: MouseEvent): void {
    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }
}
