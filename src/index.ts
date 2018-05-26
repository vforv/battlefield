import { Service, Container } from 'justinject';
import { SquadLogicService } from './logic/squad.logic';
import { ARMIES } from './db';

@Service()
class BattlefieldService {

    constructor(private _squadLogic: SquadLogicService) {

    }

    public getWiner(name: string) {
        return false;
    }

    public attack() {
        while (!this.getWiner('')) {
            ARMIES.forEach((attackingArmy) => {
                attackingArmy.squads.forEach((squad) => {
                    const attackingSquadSuccessProbability = this._squadLogic.squadAttackProbabilty(squad);
                    const defendingSquadSuccessProbability = this._squadLogic.squadAttackProbabilty(this._squadLogic.getDefendingSquad(attackingArmy));

                    if (attackingSquadSuccessProbability > defendingSquadSuccessProbability) {
                        console.log("Damage dealt from to")
                    }
                    // squad.unit.vehicles.forEach((vehicle) => {
                    //     // Logic for soldier
                    // })

                })
            })
        }
    }
}

const att = Container.resolve<BattlefieldService>(BattlefieldService);
att.attack();