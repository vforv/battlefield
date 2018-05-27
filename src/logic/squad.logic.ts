import { Service } from 'justinject';
import { ArmyLogicService } from './army.logic';
import { IArmy } from '../model/army';
import { random } from './helper';
import { ISquad } from '../model/squad';
import { SoldierLogicService } from './soldier.logic';
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

    public damageSquad(armyName: string, squadName: string, attackerData: { prob: number, damage: number }, defenderData: { prob: number, damage: number }): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            if (attackerData.prob > defenderData.prob) {

                const army: any = ARMIES.find((army) => army.name === armyName);
                const activeSquads = army.squads.map((squad: ISquad) => squad.active);
                const squad: ISquad = army.squads.find((squad: ISquad) => squad.name === squadName);

                if (squad.unit.health > 0) {
                    squad.unit.health -= attackerData.damage + 95;
                    resolve(true);
                }
            } else {
                reject(false);
            }
        });
    }

    private returnNextSquad(army: any): any {
        let s: any;
        army.squads.forEach((squad: any) => {
            if (squad.unit.health > 0) {
                s = squad;
            }
        })

        return s;
    }

    public getRandomSquad(army: IArmy): any {
        const maxNumber = army.squads.length;
        const rndNumber = random(1, maxNumber);
        const squad = army.squads[rndNumber - 1];

        if (squad.unit.health <= 0) {
            return army.squads.filter((squad) => squad.unit.health > 0)[0];
        } else {
            return squad;
        }
    }

    public getWeakestSquad(army: IArmy): ISquad {
        let squadNew: any = {};
        let squads: any = {};

        army.squads
            .filter((squad) => squad.unit.health > 0)
            .forEach((squad) => {
                let strength = this._soldierLogic.soldierExpSum(squad.unit.soldiers) + squad.unit.health + squad.unit.soldiers.length + this.squadAttack(squad).damage;

                squadNew[squad.name] = strength;

                squads = {
                    ...squads,
                    [squad.name]: squad,
                }

            });

        const squadName = Object.keys(squadNew).reduce((a, b) => squadNew[a] < squadNew[b] ? a : b);

        return squads[squadName];
    }

    public getStrongestSquad(army: IArmy) {
        let squadNew: any = {};
        let squads: any = {};

        army.squads
            .filter((squad) => squad.unit.health > 0)
            .forEach((squad) => {
                let strength = this._soldierLogic.soldierExpSum(squad.unit.soldiers) + squad.unit.health + squad.unit.soldiers.length + this.squadAttack(squad).damage;

                squadNew[squad.name] = strength;

                squads = {
                    ...squads,
                    [squad.name]: squad,
                }

            });

        const squadName = Object.keys(squadNew).reduce((a, b) => squadNew[a] > squadNew[b] ? a : b);

        return squads[squadName];
    }

    /**
     * Return random | weakest | strongest squad
     * by env var
     * 
     * @param attacker Attacker army
     */
    public getDefendingSquad(attacker: IArmy): ISquad {
        const army = this._armyLogic.getDefendingArmy(attacker);

        switch (attacker.strategy) {
            case 'random':
                return this.getRandomSquad(army);
            case 'weakest':
                return this.getWeakestSquad(army);
            case 'strongest':
                return this.getStrongestSquad(army);
            default:
                return this.getRandomSquad(army);
        }
    }

    public getAttackingSquad(attacker: IArmy): ISquad {
        return this.getRandomSquad(attacker);
    }
}