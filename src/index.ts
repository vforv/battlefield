import { Service, Container } from 'justinject';
import { SquadLogicService } from './logic/squad.logic';
import { ARMIES, DAMAGE } from './db';
import { ArmyLogicService } from './logic/army.logic';
import * as Rx from 'rx';
import { IArmy } from './model/army';
import { ISquad } from './model/squad';
import * as _ from 'lodash';
import { SoldierLogicService } from './logic/solider.logic';

@Service()
class BattlefieldService {
    private defendingSquad: any;
    private army: any;

    constructor(private _squadLogic: SquadLogicService, private _armyLogic: ArmyLogicService, private _soldierLogic: SoldierLogicService) { }

    public getWiner() {
        const winer: any = [];
        ARMIES.forEach((value) => {
            value.squads.forEach((val) => {
                if (DAMAGE[value.name + val.name] && val.unit.health > 0) {
                    val.unit.health = val.unit.health - DAMAGE[value.name + val.name];
                }

                if (val.unit.health <= 0) {
                    val.active = false;
                }
            })

            const activeSquads = value.squads.map((squad) => squad.active);
            console.log(value.name + ' squads left: ' + activeSquads);
            if (_.default.includes(activeSquads, true)) {
                winer.push(value);
            } else {
                value.active = false;
            }
        })
        
        if (winer.length === 1) {
            console.log(`Winer is ${winer[0].name}`)
            process.exit(1)
        }
    }

    public attack() {
        Rx.Observable
            .interval(200)
            .switchMap(() => ARMIES)
            .switchMap((army: any) => {
                this.getWiner();
                this.defendingSquad = this._squadLogic.getDefendingSquad(army);
                this.army = army;
                console.log(`${army.name} attacking ${this._armyLogic.getDefendingArmy(army).name}`);
                return army.squads;
            })
            .subscribe((squad: ISquad) => {
                const attacker = this._squadLogic.squadAttack(squad);
                const defender = this._squadLogic.squadAttack(this.defendingSquad);

                const attackingSquadSuccessProbability = attacker.prob;
                const defendingSquadSuccessProbability = defender.prob;

                if (attackingSquadSuccessProbability > defendingSquadSuccessProbability) {
                    console.log(`${squad.name} demaged ${this.defendingSquad.name}`);
                    this._soldierLogic.addSoldierExp(this.army.name, squad.name);
                    if (!DAMAGE[this.army.name + this.defendingSquad.name]) {
                        DAMAGE[this.army.name + this.defendingSquad.name] = attacker.damage;
                    } else {
                        DAMAGE[this.army.name + this.defendingSquad.name] = DAMAGE[this.army.name + this.defendingSquad.name] + attacker.damage;
                    }
                } else {
                    console.log('Unsuccesful attack.')
                }
            })
    }
}

const att = Container.resolve<BattlefieldService>(BattlefieldService);
att.attack();