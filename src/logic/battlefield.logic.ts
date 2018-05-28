import { Service } from 'justinject';
import { Observable } from 'rx';
import { SquadLogicService } from './squad.logic';
import { ARMIES } from '../db';
import { ArmyLogicService } from './army.logic';
import { SoldierLogicService } from './soldier.logic';
import { IArmy } from '../model/army';
import { LogLogicService } from './log.logic';

@Service()
export class BattlefieldService {
    private zip: any;
    private armies: Observable<IArmy>;
    private interval: Observable<any>;

    constructor(
        private _squadLogic: SquadLogicService,
        private _armyLogic: ArmyLogicService,
        private _soldierLogic: SoldierLogicService,
        private _logService: LogLogicService,
    ) {
        this.armies = Observable.from(ARMIES);
        this.interval = Observable.interval(process.env.SIMULATION_SPEED);
    }

    /**
     * This is where all starts
     * Here can be while loop as well
     * But I used Rx to show I am familiar 
     * with reactive programming too
     * 
     * isActivateArmy function use to check
     * if army defeated, because I cannot do it
     * with Observable cose it not catch mutation 
     * on my 'database' ARMIES array
     */
    public startSimulation() {
        this.zip = Observable.zip(
            this.armies,
            this.interval,
        )
            .repeat()
            .map((data: any) => data[0])
            .subscribe((army: any) => {
                this.getWinner();

                if (this._armyLogic.isActivateArmy(army) && !this._armyLogic.gameEnd()) {
                    const defendingArmy = this._armyLogic.getDefendingArmy(army);
                    const defendingSquad = this._squadLogic.getDefendingSquad(army);
                    const defenderData = this._squadLogic.squadAttack(defendingSquad);

                    const attackingSquad = this._squadLogic.getAttackingSquad(army);
                    const attackerData = this._squadLogic.squadAttack(attackingSquad);

                    setTimeout(() => {
                        this._squadLogic.damageSquad(
                            defendingArmy.name,
                            defendingSquad.name,
                            attackerData,
                            defenderData,
                        )
                            .then(() => {
                                this._soldierLogic.addSoldierExp(army.name, attackingSquad.name);
                                this._logService.displayHealthLogs(defendingArmy.name, false);
                                this._logService.displayHealthLogs(army.name, true);
                                this._logService.displayLogs(army.name, `Demaged army: ${defendingArmy.name} | Demaged squad: ${defendingSquad.name}`);
                            })
                            .catch(() => {
                                if (process.env.LOGS_DETAILED) {
                                    this._logService.displayLogs(army.name, `Unsuccessful attack on army: ${defendingArmy.name}`, "\x1b[2m");
                                }
                            });
                    }, attackingSquad.unit.recharge)
                }
            })
    }

    private getWinner() {
        const armiesCount = this._armyLogic.getActivArmiesCount();

        if (armiesCount === 1) {
            const winner: any = this._armyLogic.getBestArmy();
            this._logService.displayLogs(winner.name, `${winner.name} is won!!!`, '\x1b[1m');
            this.zip.dispose();
            process.exit(0);
        } else if (armiesCount < 1) {
            this.zip.dispose();
            process.exit(0);
        }
    }
}
