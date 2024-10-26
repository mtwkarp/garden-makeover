import { inject, injectable } from 'inversify';
import { DecorationTargetAreaI, DecorationTargetAreasControllerI } from './types/interfaces';
import { TYPES } from '../../../../IoC/Types';
import { DecorationTargetAreasCollection } from './types/types';

@injectable()
export default class DecorationTargetAreasController implements DecorationTargetAreasControllerI {
  private readonly targetAreas: DecorationTargetAreasCollection;

  private readonly targetAreasPositions: { x: number; y: number; z: number }[] = [
    { x: 1, y: 0.05, z: -0.2 },
    { x: -1, y: 0.06, z: -0.3 },
    { x: -2, y: 0.04, z: -0.4 },
  ];

  constructor(@inject(TYPES.DecorationTargetAreaCollection) targetAreas: DecorationTargetAreasCollection) {
    this.targetAreas = targetAreas;
  }

  public displayTargetAreas(): void {
    this.targetAreas.forEach((targetArea) => {
      targetArea.display();
    });
  }

  public hideTargetAreas(): void {
    this.targetAreas.forEach((targetArea) => targetArea.hide());
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

  public getNumberOfActiveTargetAreas(): number {
    return this.targetAreas.filter((targetArea) => !targetArea.disabled).length;
  }
}
