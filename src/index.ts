import { ARMIES } from './db';
import { Service } from 'justinject';
import { SquadLogic } from './logic/squad.logic';

@Service()
class Battlefield {
    
    constructor(private _squadLogic: SquadLogic) {

    }

    public getWiner(name: string) {
        return false;
    }

    public attack() {
        while(!this.getWiner('')) {
            ARMIES.forEach((attackingArmy) => {
                attackingArmy.squads.forEach((squad) => {

                    const attackingSquadSuccessProbability = this._squadLogic.squadAttackProbabilty(squad);
                    const defendingSquadSuccessProbability = this._squadLogic.squadAttackProbabilty(this._squadLogic.getDefendingSquad());

                    if(attackingSquadSuccessProbability > defendingSquadSuccessProbability) {
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

const att = new Battlefield();
att.attack();