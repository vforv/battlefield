import { Service } from 'justinject';
import { ArmyLogicService } from './army.logic';
import { IArmy } from '../model/army';
import { random } from './helper';
import { ISquad } from '../model/squad';
import { SoldierLogicService } from './solider.logic';
import { ARMIES } from '../db';
import * as _ from 'lodash';

@Service()
export class SquadLogicService {

    constructor(private _armyLogic: ArmyLogicService, private _soldierLogic: SoldierLogicService) {

    }

    public squadAttack(squad: ISquad): { prob: number, damage: number } {
        const soldierProb = this._soldierLogic.soldierSum(squad.unit);
        return soldierProb;
    }

    public getRandomSquad(army: IArmy): ISquad {
        const maxNumber = army.squads.length;
        const rndNumber = random(1, maxNumber);

        return army.squads[rndNumber - 1];
    }

    public getWeakestSquad(army: IArmy): ISquad {
        let squadNew: any = {};
        let squads: any = {};

        army.squads
            .filter((squad) => squad.active)
            .forEach((squad) => {
                let strength = squad.unit.health + squad.unit.soldiers.length + this.squadAttack(squad).damage;

                squadNew[squad.name] = strength;

                squads = {
                    ...squads,
                    [squad.name]: squad,
                }

            });

        const squadName = Object.keys(squadNew).reduce((a, b) => squadNew[a] < squadNew[b] ? a : b);

        return squads[squadName];
    }

    public getStrongestSquad() {

    }

    public getDefendingSquad(attacker: IArmy): ISquad {
        const army = this._armyLogic.getDefendingArmy(attacker);

        return this.getWeakestSquad(army);
    }
}