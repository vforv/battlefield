export interface IUnit {
    type: 'soldier' | 'vehicle';
    health: number;
    recharge: number;
    entity: ISoldier | IVehicles;
}

interface ISoldier {
    experience: number;
}

interface IVehicles {
    operators: number;
}