import * as chai from 'chai';
import { Container } from 'justinject';
import { SoldierLogicService } from '../src/logic/soldier.logic';
import { ARMIES } from '../src/db';

const expect = chai.expect;
const assert = chai.assert;

describe('Test soldier', () => {

    it(`Sum soldier EXPs`, (done) => {
        const soldier = Container.resolve<SoldierLogicService>(SoldierLogicService);
        ARMIES[0].squads[0].unit.soldiers[0].experience = 11;
        ARMIES[0].squads[0].unit.soldiers[1].experience = 22;

        const EXP = soldier.soldierExpSum(ARMIES[0].squads[0].unit.soldiers);
        expect(EXP).to.be.equals(33);
        done();
    })
});