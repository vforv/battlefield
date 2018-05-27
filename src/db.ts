import { IArmy } from './model/army';
import { ISquad } from './model/squad';
import { ISoldier, IVehicles } from './model/unit';
import * as env from 'dotenv';
import * as uuid from 'uuid';
import * as _ from 'lodash';
env.config();

let squads: any = [];
let armies: any = [];
let soldiers: any = [];
let vehicles: any = [];

for (let i = 1; i <= process.env.SOLDIERS; i++) {

    let soldier: ISoldier = {
        type: 'soldier',
        experience: 0,
    }

    let vehicle: IVehicles = {
        type: 'vehicle',
        operators: 1,
    }

    vehicles.push(vehicle);
    soldiers.push(soldier);
}

for (let i = 1; i <= process.env.SQUADS; i++) {
    const soldiersNew = _.default.cloneDeep(soldiers);
    const vehiclesNew = _.default.cloneDeep(vehicles);

    let squad: ISquad = {
        id: uuid.v1(),
        name: `Squad${i}`,
        active: true,
        unit: {
            health: 100,
            recharge: 1000,
            soldiers: soldiersNew,
            vehicles: vehiclesNew,
        }
    }

    squads.push(squad);
}

for (let i = 1; i <= process.env.ARMIES; i++) {
    let strategy: any = 'random';

    if (process.env[`Army${i}`]) {
        strategy = process.env[`Army${i}`];
    }

    const squadsNew = _.default.cloneDeep(squads)

    let army: IArmy = {
        id: uuid.v1(),
        strategy,
        name: `Army${i}`,
        active: true,
        squads: squadsNew,
    }

    armies.push(army);
}

const armiesNew = _.default.cloneDeep(armies)

export const ARMIES: IArmy[] = armiesNew;