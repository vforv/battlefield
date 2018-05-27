import { Service } from 'justinject';
import { ARMIES } from '../db';
import { random } from './helper';
import { IArmy } from '../model/army';
import * as _ from 'lodash';

@Service('singleton')
export class ArmyLogicService {

    constructor() { }

    public isActivateArmy(armyCurr: IArmy): boolean {
        const army: any = ARMIES.find((army) => armyCurr.name === army.name);

        return army.active;
    }

    /**
     * Get random defender army if
     * army is not our and if that army is still in game
     * 
     * @param attacker Attacker army
     */
    public getDefendingArmy(attacker: IArmy): IArmy {
        const defenders = ARMIES
            .filter((army: IArmy) => army.active)
            .filter((army: IArmy) => army != attacker);
        // console.log(defenders)
        const maxNumber = defenders.length;
        const rndArmy = random(1, maxNumber);
        const defendingArmy = defenders[rndArmy - 1];

        return defendingArmy;
    }

}