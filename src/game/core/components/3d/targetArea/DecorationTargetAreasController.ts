import { inject, injectable } from 'inversify';
import { DecorationTargetAreaI, DecorationTargetAreasControllerI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { DecorationTargetAreasCollection } from './types/types';

@injectable()
export default class DecorationTargetAreasController implements DecorationTargetAreasControllerI {
  private readonly targetAreas: DecorationTargetAreasCollection;

  private readonly targetAreasPositions: { x: number; y: number; z: number }[] = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
  ];

  constructor(@inject(TYPES.DecorationTargetAreaCollection) targetAreas: DecorationTargetAreasCollection) {
    this.targetAreas = targetAreas;
  }

  public getDecorationTargetAreas(): DecorationTargetAreaI[] {
    for (let i = 0; i < this.targetAreasPositions.length; i++) {
      const targetArea = this.targetAreas[i];
      const targetAreaPosition = this.targetAreasPositions[i];

      if (!targetArea) {
        throw new Error('Number of positions and target areas are not even.');
      }

      targetArea.setPosition(targetAreaPosition);
    }

    return this.targetAreas;
  }
}
