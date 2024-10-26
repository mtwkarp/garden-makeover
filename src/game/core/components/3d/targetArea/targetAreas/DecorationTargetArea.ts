import * as THREE from 'three';
import { injectable } from 'inversify';
import gsap from 'gsap';
import { DecorationTargetAreaI } from '../types/interfaces';

@injectable()
export default class DecorationTargetArea implements DecorationTargetAreaI {
  private targetArea: THREE.Mesh;

  public disabled: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.createTargetArea();
    this.runIdleAnimation();
  }

  private getShaderMaterial(): THREE.ShaderMaterial {
    const color1 = new THREE.Color(0xffc1c1);
    const color2 = new THREE.Color(0xfff8b8);
    const color3 = new THREE.Color(0xb8ffb8);
    const color4 = new THREE.Color(0xb8d8ff);
    const color5 = new THREE.Color(0xd8b8ff);

    return new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: color1 },
        color2: { value: color2 },
        color3: { value: color3 },
        color4: { value: color4 },
        color5: { value: color5 },
      },
      vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
      fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform vec3 color4;
    uniform vec3 color5;
    varying vec2 vUv;

    void main() {
      float angle = atan(vUv.y - 0.5, vUv.x - 0.5) + 3.1415926; // shift from -π to π -> 0 to 2π
      float normalizedAngle = angle / (2.0 * 3.1415926); // Normalize between 0 and 1

      vec3 gradientColor;

      if (normalizedAngle < 0.2) {
        gradientColor = mix(color1, color2, normalizedAngle / 0.2);
      } else if (normalizedAngle < 0.4) {
        gradientColor = mix(color2, color3, (normalizedAngle - 0.2) / 0.2);
      } else if (normalizedAngle < 0.6) {
        gradientColor = mix(color3, color4, (normalizedAngle - 0.4) / 0.2);
      } else if (normalizedAngle < 0.8) {
        gradientColor = mix(color4, color5, (normalizedAngle - 0.6) / 0.2);
      } else {
        gradientColor = mix(color5, color1, (normalizedAngle - 0.8) / 0.2); // Wrap back to the first color
      }

      gl_FragColor = vec4(gradientColor, 1.0);
    }
  `,
      side: THREE.DoubleSide,
    });
  }

  private getGeometry(): THREE.RingGeometry {
    const radius = 0.3;

    return new THREE.RingGeometry(radius - 0.1, radius, 64);
  }

  private createTargetArea(): void {
    const mesh = new THREE.Mesh(this.getGeometry(), this.getShaderMaterial());
    mesh.rotation.x = -Math.PI / 2;

    this.targetArea = mesh;
  }

  private runIdleAnimation(): void {
    gsap.to(this.targetArea.rotation, {
      z: '+=6.2832',
      duration: 4,
      ease: 'linear',
      repeat: -1,
    });

    gsap.to(this.targetArea.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  public getDecorationTargetArea(): THREE.Mesh {
    return this.targetArea;
  }

  public setPosition(position: { x: number; y: number; z: number }): void {
    this.targetArea.position.set(position.x, position.y, position.z);
  }

  public hide(): void {
    this.targetArea.visible = false;
  }

  public display(): void {
    if (this.disabled) {
      return;
    }

    this.targetArea.visible = true;
  }

  public disableForever(): void {
    this.hide();
    this.disabled = true;
  }

  public get position(): { x: number; y: number; z: number } {
    return this.targetArea.position;
  }
}
