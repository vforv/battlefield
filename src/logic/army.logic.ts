import { Service } from 'justinject';
import { ARMIES } from '../db';
import { random } from './helper';

@Service()
export class ArmyLogic {
    private maxNumber: number;

    constructor() {
        this.maxNumber = ARMIES.length;
    }

    public getDefendingArmy() {
        const rndArmy = random(1, this.maxNumber);
        // if not ally add 
        return ARMIES[rndArmy];
    }

}