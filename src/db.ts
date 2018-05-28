import { IArmy } from './model/army';
import { ISquad } from './model/squad';
import { ISoldier } from './model/unit';
import * as env from 'dotenv';
import * as uuid from 'uuid';
import * as _ from 'lodash';
import { random } from './logic/helper';
env.config();

let squads: any = [];
let armies: any = [];

function getSoldiers() {
    const soldiers = [];

    for (let i = 1; i <= process.env.SOLDIERS; i++) {

        let soldier: ISoldier = {
            type: 'soldier',
            experience: 0,
            recharge: random(100, 2000),
            health: random(1, 100),
        }
        
        // let vehicle: IVehicles = {
        //     type: 'vehicle',
        //     operators: 1,
        // }

        soldiers.push(soldier);
    }

    return soldiers;
}


for (let i = 1; i <= process.env.SQUADS; i++) {
    const soldiersNew: ISoldier[] = _.cloneDeep(getSoldiers());

    const soldiersHealths: number[] = soldiersNew.map((soldierNew) => soldierNew.health);

    const squadHealth = Math.max(...soldiersHealths);

    const soldiersRecharge: number[] = soldiersNew.map((soldierNew) => soldierNew.recharge);

    const squadRecharge = Math.max(...soldiersRecharge);

    let squad: ISquad = {
        id: uuid.v1(),
        name: `Squad${i}`,
        active: true,
        unit: {
            health: squadHealth,
            recharge: squadRecharge,
            soldiers: soldiersNew,
            vehicles: [],
        }
    }

    squads.push(squad);
}

for (let i = 1; i <= process.env.ARMIES; i++) {
    let strategy: any = 'random';

    if (process.env[`Army${i}`]) {
        strategy = process.env[`Army${i}`];
    }

    const squadsNew = _.cloneDeep(squads)

    let army: IArmy = {
        id: uuid.v1(),
        strategy,
        name: `Army${i}`,
        active: true,
        squads: squadsNew,
    }

    armies.push(army);
}

const armiesNew = _.cloneDeep(armies)

export const ARMIES: IArmy[] = armiesNew;
