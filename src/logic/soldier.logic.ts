import { Service } from 'justinject';
import { random } from './helper';
import { ISoldier, IUnit } from '../model/unit';
import { ARMIES } from '../db';
import { ISquad } from '../model/squad';

@Service()
export class SoldierLogicService {

    /**
     * This function will calculate prob and dmg
     * for each solider and sum it
     * 
     * @param unit 
     */
    public soldierAttackingData(unit: IUnit): { prob: number, damage: number } {
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

    /**
     * This function adding exp
     * to soldier if attack is succesful
     * 
     * @param armyName 
     * @param squadName 
     */
    public addSoldierExp(armyName: string, squadName: string) {
        const army: any = ARMIES
            .find((army) => army.name === armyName);

        const squad: ISquad = army
            .squads
            .find((squad: ISquad) => squad.name === squadName);

        squad.unit.soldiers.forEach((soldier) => {
            soldier.experience += 1;
        })
    }

    public soldierExpSum(soldiers: ISoldier[]): any {
        const exp = soldiers
            .map((soldier) => soldier.experience)
            .reduce((prev: number, next: number) => {
                return prev + next;
            });

        return exp;
    }

    private soldierDamage(experience: number): number {
        return 0.05 + experience / 100;
    }

    private soldierAttackProbabilty(health: number, experience: number): number {
        return 0.5 * (1 + health / 100) * random(30 + experience, 100) / 100;
    }

}
