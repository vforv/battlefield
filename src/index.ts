import { Service, Container } from 'justinject';
import { SquadLogicService } from './logic/squad.logic';
import { ARMIES } from './db';
import { ArmyLogicService } from './logic/army.logic';
import * as Rx from 'rx';
import { IArmy } from './model/army';
import { ISquad } from './model/squad';
import * as _ from 'lodash';
import { SoldierLogicService } from './logic/soldier.logic';
import { Observable } from 'rx';

@Service()
class BattlefieldService {

    constructor(private _squadLogic: SquadLogicService, private _armyLogic: ArmyLogicService, private _soldierLogic: SoldierLogicService) { }

    public getWiner() {
        const winers: any = [];

        ARMIES.forEach((value) => {

            const squadHelth = value.squads.map((squad) => squad.unit.health);
            const activeSquads = squadHelth.filter((health: number) => health > 0)
            console.log(value.name + ' squads health: ' + squadHelth);
            if (activeSquads.length > 0) {
                winers.push(value);
            } else {
                value.active = false;
            }
        });

        if (winers.length === 1) {
            console.log(`Winmer is ${winers[0].name}`)
            process.exit(1)
        } else if (winers.length < 1) {
            console.log(`No Winner armies destroyed each other.`)
            process.exit(1)
        }
    }

    public attack() {
        const armies = Observable.from(ARMIES);
        const interval = Observable.interval(100);

        Observable.zip(
            armies,
            interval,
        )
            .repeat()
            .map((data: any) => data[0])
            .subscribe((army: any) => {
                this.getWiner();

                if (this._armyLogic.isActivateArmy(army)) {
                    const defendingArmy = this._armyLogic.getDefendingArmy(army);
                    const defendingSquad = this._squadLogic.getDefendingSquad(army);
                    const defenderData = this._squadLogic.squadAttack(defendingSquad);

                    const attackingSquad = this._squadLogic.getAttackingSquad(army);
                    const attackerData = this._squadLogic.squadAttack(attackingSquad);

                    this._squadLogic.damageSquad(
                        defendingArmy.name,
                        defendingSquad.name,
                        attackerData,
                        defenderData,
                    )
                        .then(() => {
                            this._soldierLogic.addSoldierExp(army.name, attackingSquad.name);
                            console.log(`${army.name} demaged ${defendingArmy.name} -> ${defendingSquad.name}`);
                        })
                        .catch(() => {

                        });
                }
            })
    }
}

const att = Container.resolve<BattlefieldService>(BattlefieldService);
att.attack();