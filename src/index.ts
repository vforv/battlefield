import { ARMIES } from './db';
import { Service } from 'justinject';

@Service()
class Battlefield {

    public getWiner(name: string) {
        return false;
    }

    public attack() {
        while(!this.getWiner('')) {
            ARMIES.forEach((attackingArmy) => {
                attackingArmy.squads.forEach((squad) => {

                    const attackingSquadSuccessProbability = squadAttackProbabilty(squad.unit);
                    const defendingSquadSuccessProbability = squadAttackProbabilty(squad.unit);
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