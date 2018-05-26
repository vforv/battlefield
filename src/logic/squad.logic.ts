import { Service } from 'justinject';
import { ArmyLogicService } from './army.logic';
import { IArmy } from '../model/army';
import { random } from './helper';
import { ISquad } from '../model/squad';
import { SoldierLogicService } from './solider.logic';

@Service()
export class SquadLogicService {

    constructor(private _armyLogic: ArmyLogicService, private _soldierLogic: SoldierLogicService) {

    }

    public squadAttackProbabilty(squad: ISquad): number {
        const soldierProb = this._soldierLogic.soldierAttackProbabiltySum(squad.unit);
        return soldierProb;
    }

    public squadDamage(experience: number): number {
        return 1;
    }

    public getRandomSquad(army: IArmy): ISquad {
        const maxNumber = army.squads.length - 1;
        const rndNumber = random(1, maxNumber);

        return army.squads[rndNumber];
    }

    public getWeakestSquad() {

    }

    public getStrongestSquad() {

    }

    public getDefendingSquad(attacker: IArmy): ISquad {
        const army = this._armyLogic.getDefendingArmy(attacker);

        return this.getRandomSquad(army);
    }
}