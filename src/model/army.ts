import { ISquad } from './squad';

export interface IArmy {
    name: string;
    squads: ISquad[];
}