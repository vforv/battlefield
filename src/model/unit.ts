export interface IUnit {
    health: number;
    recharge: number;
    soldiers: ISoldier[];
    vehicles: IVehicles[];
}

interface ISoldier {
    type: 'soldier';
    experience: number;
}

interface IVehicles {
    type: 'vehicle';
    operators: number;
}
