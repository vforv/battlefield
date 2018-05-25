export interface IUnit {
    health: number;
    recharge: number;
    soldiers: ISoldier[];
    vehicles: IVehicles[];
}

export interface ISoldier {
    type: 'soldier';
    experience: number;
}

export interface IVehicles {
    type: 'vehicle';
    operators: number;
}
