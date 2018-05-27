import { ISquad } from './squad';

export interface IArmy {
    id: string;
    name: string;
    strategy: "random" | "weakest" | "strongest";
    active: boolean;
    squads: ISquad[];
}
