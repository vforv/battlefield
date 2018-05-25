import { Service } from 'justinject';
import { random } from './helper';

@Service()
export class SoldierLogic {

    public soldierAttackProbabilty(health: number, experience: number): number {
        return 0.5 * (1 + health / 100) * random(30 + experience, 100) / 100;
    }

    public soldierDamage(experience: number): number {
        return 0.05 + experience / 100;
    }

}