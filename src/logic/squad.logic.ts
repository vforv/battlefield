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

    constructor(
        private _armyLogic: ArmyLogicService,
        private _soldierLogic: SoldierLogicService,
    ) { }

    /**
     * this will calculate squad porbability
     * and squad damage
     * 
     * @param squad for this squad we want to get power
     */
    public squadAttack(squad: ISquad): { prob: number, damage: number } {
        const soldierProb = this._soldierLogic
            .soldierAttackingData(squad.unit);

        // Sum it with Vehicle here

        return soldierProb;
    }

    /**
     * This will comapre prob and do damage to defending squad
     * 
     * @param armyName Defending army
     * @param squadName Defending squad
     * @param attackerData Attacker damage and prob
     * @param defenderData Defender damage and prob
     */
    public damageSquad(
        armyName: string,
        squadName: string,
        attackerData: { prob: number, damage: number },
        defenderData: { prob: number, damage: number },
    ): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            if (attackerData.prob > defenderData.prob) {
                const army: any = ARMIES
                    .find((army) => army.name === armyName);

                const squad: ISquad = army
                    .squads
                    .find((squad: ISquad) => squad.name === squadName);

                if (squad.unit.health > 0) {
                    squad.unit.health -= Math.ceil(attackerData.damage) + process.env.ADDITIONAL_DAMAGE;

                    if (squad.unit.health < 0) {
                        squad.unit.health = 0;
                    }

                    resolve(true);
                }
            } else {
                reject(false);
            }
        });
    }

    public squadsHealth(armyName: string) {
        const army: any = ARMIES
            .find((army) => army.name === armyName);

        const squadHealth = army
            .squads
            .map((squad: ISquad) => squad.unit.health);

        return squadHealth;
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

    private getRandomSquad(army: IArmy): any {
        const maxNumber = army.squads.length;
        const rndNumber = random(1, maxNumber);
        const squad = army.squads[rndNumber - 1];

        if (squad.unit.health <= 0) {
            return army.squads.filter((squad) => squad.unit.health > 0)[0];
        } else {
            return squad;
        }
    }

    private getWeakestSquad(army: IArmy): ISquad {
        const squadsStrength = this.getSquadsStrength(army);

        const squad: any = _.minBy(squadsStrength, 'strength');

        return squad;
    }

    private getStrongestSquad(army: IArmy): ISquad {
        const squadsStrength = this.getSquadsStrength(army);

        const squad: any = _.maxBy(squadsStrength, 'strength');
        return squad;
    }

    /**
     * This returns array of strength for each active squad
     * 
     * @param army 
     */
    private getSquadsStrength(army: IArmy): any {
        let squads: any = [];

        army.squads
            .filter((squad) => squad.unit.health > 0)
            .filter((squad) => squad.active)
            .forEach((squad) => {
                let strength = this._soldierLogic.soldierExpSum(squad.unit.soldiers)
                    + squad.unit.health
                    + squad.unit.soldiers.length
                    + this.squadAttack(squad).damage;

                const squadstr = {
                    ...squad,
                    strength,
                }

                squads.push(squadstr)

            });

        return squads;
    }
}
