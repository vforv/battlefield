import { Service } from 'justinject';
import { ARMIES } from '../db';
import { random } from './helper';
import { IArmy } from '../model/army';

@Service('singleton')
export class ArmyLogicService {

    constructor() { }

    /**
     * This will return cound 
     * how many active armies is there
     */
    public getActivArmiesCount(): number {
        const winers: any = [];

        ARMIES.forEach((army) => {
            const activeSquads = army
                .squads
                .map((squad) => squad.unit.health)
                .filter((health: number) => health > 0);

            if (activeSquads.length > 0) {
                winers.push(army);
            } else {
                army.active = false;
            }
        });

        return winers.length;
    }

    public gameEnd(): boolean {
        if(this.getActivArmiesCount() > 1) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Return winner
     */
    public getBestArmy() {
        const armies = ARMIES.filter((army) => army.active);
        if(armies.length === 1) {
            return armies[0];
        }
    }

    /**
     * Cehck if some army activ
     * 
     * @param armyCurr army to check
     */
    public isActivateArmy(armyCurr: IArmy): boolean {
        const army: any = ARMIES
            .find((army) => armyCurr.name === army.name);

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
        const maxNumber = defenders.length;
        const rndArmy = random(1, maxNumber);
        const defendingArmy = defenders[rndArmy - 1];

        return defendingArmy;
    }

}