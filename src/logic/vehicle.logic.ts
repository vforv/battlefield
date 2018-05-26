import { Service } from 'justinject';

@Service()
export class VehicleLogicService {
    public vehicleAttackProbabilty(health: number, experience: number): number {
        return 1;
    }

    public vehicleDamage(experience: number): number {
        return 1;
    }
}