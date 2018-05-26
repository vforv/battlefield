import { Service } from 'justinject';
import { random } from './helper';
import { ISoldier, IUnit } from '../model/unit';
import { ARMIES } from '../db';

@Service()
export class SoldierLogicService {

    public soldierAttackProbabilty(health: number, experience: number): number {
        return 0.5 * (1 + health / 100) * random(30 + experience, 100) / 100;
    }

    public soldierSum(unit: IUnit): any {
        let prob = 0;
        let damage = 0;

        unit.soldiers.forEach((soldier: ISoldier) => {
            prob += this.soldierAttackProbabilty(unit.health, soldier.experience);
            damage += this.soldierDamage(soldier.experience);
        })

        return {
            prob,
            damage,
        };
    }

    public addSoldierExp(armyName: string, squadName: string) {
        ARMIES.forEach((army) => {
            if (army.name === armyName) {
                army.squads.forEach((squad) => {
                    if (squad.name === squadName) {
                        squad.unit.soldiers.forEach((soldier) => {
                            soldier.experience += 1;
                        })
                    }
                })
            }
        })
    }

    public soldierDamage(experience: number): number {
        return 0.05 + experience / 100;
    }

}