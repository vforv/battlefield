import { Service } from 'justinject';
import { ArmyLogic } from './army.logic';
import { IArmy } from '../model/army';
import { random } from './helper';
import { ISquad } from '../model/squad';
import { SoldierLogic } from './solider.logic';

@Service()
export class SquadLogic {

    constructor(private _armyLogic: ArmyLogic, private _soldierLogic: SoldierLogic) {

    }

    public squadAttackProbabilty(squad: ISquad): number {
        const soldierProb = this._soldierLogic.soldierAttackProbabiltySum(squad.unit);
        return soldierProb;
    }

    public squadDamage(experience: number): number {
        return 1;
    }

    public getRandomSquad(army: IArmy): ISquad {
        const maxNumber = army.squads.length;
        const rndNumber = random(1, maxNumber);

        return army.squads[rndNumber];
    }

    public getWeakestSquad() {

    }

    public getStrongestSquad() {

    }

    public getDefendingSquad(): ISquad {
        const army = this._armyLogic.getDefendingArmy();

        return this.getRandomSquad(army);
    }
}