import { ISquad } from './squad';

export interface IArmy {
    name: string;
    active: boolean;
    squads: ISquad[];
}