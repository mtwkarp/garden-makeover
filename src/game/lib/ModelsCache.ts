import * as THREE from 'three';

export default class ModelsCache {
  private static models: Record<string, THREE.Group | THREE.Object3D> = {};

  public static addModel(model: THREE.Group | THREE.Object3D, modelName: string): void {
    ModelsCache.models[modelName] = model;
  }

  public static getModel(modelName: string): THREE.Group | THREE.Object3D | never {
    const model = ModelsCache.models[modelName];

    if (!model) {
      throw new Error(`No model with name - ${modelName} found`);
    }

    return model;
  }
}
