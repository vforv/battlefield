import { Service } from 'justinject';
import { ARMIES } from '../db';
import { random } from './helper';
import { IArmy } from '../model/army';

@Service('singleton')
export class ArmyLogicService {

    constructor() { }

    public getDefendingArmy(attacker: IArmy): IArmy {
        const defenders = ARMIES
            .filter((army: IArmy) => army.active)
            .filter((army: IArmy) => army != attacker);

        const maxNumber = defenders.length;
        const rndArmy = random(1, maxNumber);
        const defendingArmy = defenders[rndArmy - 1];
        return defendingArmy;
    }

}