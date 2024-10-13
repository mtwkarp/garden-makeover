import 'reflect-metadata';
import dotenv from 'dotenv';
import { GameEntryI } from './game/gameEntry/types/interfaces';
import IoCDependenciesContainer from './game/IoC/IoCDependenciesContainer';
import { TYPES } from './game/IoC/Types';

const dependenciesContainer = new IoCDependenciesContainer();

function prepare(): void {
  dotenv.config();
  dependenciesContainer.loadDependencies();
}

function initializeGame(): GameEntryI {
  return dependenciesContainer.get<() => GameEntryI>(TYPES.GameEntryFactory)();
}

function runGame(): void {
  prepare();

  const gameEntry: GameEntryI = initializeGame();

  gameEntry.run();
}

document.addEventListener('DOMContentLoaded', () => {
  runGame();
});
