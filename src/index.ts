import { Container } from 'justinject';
import { BattlefieldService } from './logic/battlefield.logic';

const game = Container.resolve<BattlefieldService>(BattlefieldService);
game.startSimulation();
