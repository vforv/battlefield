import { IUnit } from './unit';

export interface ISquad {
    id: string;
    name: string;
    active: boolean;
    unit: IUnit;
}
