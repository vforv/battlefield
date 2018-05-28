import * as chai from 'chai';
import { Container } from 'justinject';
import { SquadLogicService } from '../src/logic/squad.logic';
import { ARMY, SquadLogicServiceMock } from './mock';

const expect = chai.expect;

describe('Test squad', () => {
    it(`Get squads strength`, (done) => {

        Container.mock([{
           service: SquadLogicService,
           mockWith: SquadLogicServiceMock,
           override: false,
           type: 'default',
        }]);

        const squad = Container.resolve<SquadLogicService>(SquadLogicService);
        const allSquadsFromArmy = (squad as any).getSquadsStrength(ARMY);
        expect(allSquadsFromArmy[0].strength).to.be.equals(73);
        expect(allSquadsFromArmy[0].name).to.be.equals('Squad1');

        done();
    })


    it(`Get strongest squad`, (done) => {
        const squad = Container.resolve<SquadLogicService>(SquadLogicService);
        const strongest = (squad as any).getStrongestSquad(ARMY);
        expect(strongest.name).to.be.equals('Squad1');
        done();
    })

    it(`Get weakest squad`, (done) => {
        const squad = Container.resolve<SquadLogicService>(SquadLogicService);
        const weakest = (squad as any).getWeakestSquad(ARMY);
        expect(weakest.name).to.be.equals('Squad3');
        done();
    })
});