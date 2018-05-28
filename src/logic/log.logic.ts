import { Service } from 'justinject';
import { ARMIES } from '../db';
import * as _ from 'lodash';
import { SquadLogicService } from './squad.logic';

@Service()
export class LogLogicService {
    private colors: any;
    private allColors: any;

    constructor(private _squadLogic: SquadLogicService) {
        this.colors = {};

        this.allColors = [
            "\x1b[31m",
            "\x1b[32m",
            "\x1b[33m",
            "\x1b[34m",
            "\x1b[35m",
            "\x1b[36m"
        ];

        ARMIES.forEach((army) => {
            this.colors = {
                ...this.colors,
                [army.name]: _.sample(this.allColors),
            }
        })
    }

    public displayLogs(armyName: string, message: string, code?: string) {
        if (code) {
            console.log(this.colors[armyName] + code, `[${armyName}] ${message}`);
        } else {
            console.log(this.colors[armyName], `[${armyName}] ${message}`);
        }

    }

    public displayHealthLogs(armyName: string, att: boolean) {
        const health = this._squadLogic
            .squadsHealth(armyName);

        let armyType = 'Attacking squads health:';

        if(!att) {
            armyType = 'Defending squads health:';
        }

        if (process.env.LOGS_DETAILED) {
            this.displayLogs(armyName, `${armyType} ${health}`, "\x1b[2m");
        }
    }
}
