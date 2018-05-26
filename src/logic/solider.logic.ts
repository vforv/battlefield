import { Service } from 'justinject';
import { random } from './helper';
import { ISoldier, IUnit } from '../model/unit';

@Service()
export class SoldierLogicService {

    public soldierAttackProbabilty(health: number, experience: number): number {
        return 0.5 * (1 + health / 100) * random(30 + experience, 100) / 100;
    }

    public soldierAttackProbabiltySum(unit: IUnit): number {
        let sum = 0;

        unit.soldiers.forEach((soldier: ISoldier) => {
            sum += this.soldierAttackProbabilty(unit.health, soldier.experience);
        })

        return sum;
    }

    public soldierDamage(experience: number): number {
        return 0.05 + experience / 100;
    }

}