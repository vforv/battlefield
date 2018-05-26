import * as chai from 'chai';
import { Container } from 'justinject';
import { ArmyLogicService } from '../src/logic/army.logic';
import { ARMIES } from '../src/db';

const expect = chai.expect;
const assert = chai.assert;

describe('Test army', () => {

    it(`Select random non allay army`, (done) => {
        const recursive = (n: number) => {
            if (n > 15) {
                done();
                return;
            }
            
            const army = Container.resolve<ArmyLogicService>(ArmyLogicService);
            const defendingArmy = army.getDefendingArmy(ARMIES[0]);
            expect(defendingArmy.name).exist;
            expect(defendingArmy.name).to.not.be.equals('Army1');

            recursive(n + 1);
        }

        recursive(1);
    })
});