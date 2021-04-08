const chai = require('chai');
const expect = chai.expect;

const ActivityRepository = require('../src/ActivityRepository');
const activityData = require('./test-data/activity-data');

describe('ActivityRepository', function() {
  let activityRepo;

  beforeEach(() => {
    activityRepo = new ActivityRepository(activityData);
  });

  it('should be a function', function() {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be an instance of ActivityRepository', function() {
    expect(activityRepo).to.be.an.instanceof(ActivityRepository);
  });

  it('should store an activity data array', function() {
    expect(activityRepo.data).to.be.an('array');
  });

  it('should be able to store an activity data entry', function() {
    expect(activityRepo.data[0]).to.deep.equal({ userID: 1, date: '2019/06/15', numSteps: 3577, minutesActive: 140, flightsOfStairs: 16 });
    expect(activityRepo.data[1]).to.deep.equal({userID: 2, date: '2019/06/15', numSteps: 4294, minutesActive: 138, flightsOfStairs: 10 });
    expect(activityRepo.data[2]).to.deep.equal({userID: 3, date: '2019/06/15', numSteps: 7402, minutesActive: 116, flightsOfStairs: 33 });
  });

  it('should retrieve the average steps taken by all users on a given date', function () {
    const avgStepsForAllUsers1 = activityRepo.calculatePropAvgByDate('2019/06/15', 'numSteps');
    const avgStepsForAllUsers2 = activityRepo.calculatePropAvgByDate('2019/06/17', 'numSteps');
    const avgStepsForAllUsers3 = activityRepo.calculatePropAvgByDate('2019/06/22', 'numSteps');

    expect(avgStepsForAllUsers1).to.equal(5091);
    expect(avgStepsForAllUsers2).to.equal(10875);
    expect(avgStepsForAllUsers3).to.equal(8412);
  })

  it('should retrieve the average minutes active for all users on a given date', function () {
    const avgMinForAllUsers1 = activityRepo.calculatePropAvgByDate('2019/06/19', 'minutesActive');
    const avgMinForAllUsers2 = activityRepo.calculatePropAvgByDate('2019/06/21', 'minutesActive');
    const avgMinForAllUsers3 = activityRepo.calculatePropAvgByDate('2019/06/23', 'minutesActive');

    expect(avgMinForAllUsers1).to.equal(235);
    expect(avgMinForAllUsers2).to.equal(169);
    expect(avgMinForAllUsers3).to.equal(193);
  });

  it('should retrieve the average flights climbed by all users on a given date', function () {
    const avgStairsForAllUsers1 = activityRepo.calculatePropAvgByDate('2019/06/15', 'flightsOfStairs');
    const avgStairsForAllUsers2 = activityRepo.calculatePropAvgByDate('2019/06/18', 'flightsOfStairs');
    const avgStairsForAllUsers3 = activityRepo.calculatePropAvgByDate('2019/06/20', 'flightsOfStairs');

    expect(avgStairsForAllUsers1).to.equal(20);
    expect(avgStairsForAllUsers2).to.equal(30);
    expect(avgStairsForAllUsers3).to.equal(23);
  })
});
