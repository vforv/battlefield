import { IArmy } from '../src/model/army';
import { SquadLogicService } from '../src/logic/squad.logic';

export const ARMY: IArmy = {
    id: 'f8eabf00-625b-11e8-98be-150dc1528374',
    strategy: 'weakest',
    name: 'Army1',
    active: true,
    squads:
        [{
            id: 'f8ea49d0-625b-11e8-98be-150dc1528374',
            name: 'Squad1',
            active: true,
            unit: {
                health: 69,
                recharge: 1253,
                soldiers: [
                    { type: 'soldier', experience: 0, recharge: 1153, health: 33 },
                    { type: 'soldier', experience: 0, recharge: 1253, health: 55 },
                    { type: 'soldier', experience: 0, recharge: 13, health: 12 },
                    { type: 'soldier', experience: 0, recharge: 253, health: 69 },
                ],
                vehicles: []
            }
        },
        {
            id: 'f8ea70e0-625b-11e8-98be-150dc1528374',
            name: 'Squad2',
            active: true,
            unit: {
                health: 33,
                recharge: 1253,
                soldiers: [
                    { type: 'soldier', experience: 0, recharge: 113, health: 22 },
                    { type: 'soldier', experience: 0, recharge: 213, health: 33 },
                    { type: 'soldier', experience: 0, recharge: 1253, health: 11 },
                    { type: 'soldier', experience: 0, recharge: 1122, health: 11 },
                ],
                vehicles: []
            }
        },
        {
            id: 'f8ea70e0-625b-11e8-98be-150dc1528374',
            name: 'Squad3',
            active: true,
            unit: {
                health: 3,
                recharge: 1253,
                soldiers: [
                    { type: 'soldier', experience: 0, recharge: 113, health: 1 },
                    { type: 'soldier', experience: 0, recharge: 213, health: 3 },
                    { type: 'soldier', experience: 0, recharge: 1253, health: 2 },
                    { type: 'soldier', experience: 0, recharge: 1122, health: 1 },
                ],
                vehicles: []
            }
        },]
}

export class SquadLogicServiceMock extends SquadLogicService {
    public squadAttack(squad: any): { prob: number, damage: number } {
        return {
            prob: 0,
            damage: 0,
        };
    }
}