const chai = require('chai');
const expect = chai.expect;

const ActivityRepository = require('../src/ActivityRepository');
const userData = require('./test-data/user-data');
const activityData = require('./test-data/activity-data');

describe('ActivityRepository', function() {
  let activityRepo;

  beforeEach(() => {
    activityRepo = new ActivityRepository(userData);
    activityRepo.populateActivityData(activityData);
  });

  it("should be a function", function() {
    expect(ActivityRepository).to.be.a('function');
  });

  it("should be an instance of ActivityRepository", function() {
    expect(activityRepo).to.be.an.instanceof(ActivityRepository);
  });

  it("should store an activityData array", function() {
    expect(activityRepo.activityData).to.be.an('array');
  });

  it("should be able to store an ActivityEntry instance", function() {
    expect(activityRepo.activityData[0]).to.deep.equal({ id: 1, date: '2019/06/15', numSteps: 3577, minutesActive: 140, flightsOfStairs: 16 });
  });
});