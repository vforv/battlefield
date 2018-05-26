import { Service } from 'justinject';
import { ARMIES } from '../db';
import { random } from './helper';
import { IArmy } from '../model/army';

@Service()
export class ArmyLogicService {

    constructor() { }

    public getDefendingArmy(attacker: IArmy) {
        const defenders = ARMIES.filter((army: IArmy) => army != attacker)

        const maxNumber = defenders.length - 1;
        const rndArmy = random(1, maxNumber);

        return ARMIES[rndArmy];
    }

}