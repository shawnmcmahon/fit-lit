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

  it("should be able to calculate the miles walked of a user on a specific date", function() {
    const userMiles1 = activityRepo.calculateDailyMilesWalked(1, "2019/06/16");
    const userMiles2 = activityRepo.calculateDailyMilesWalked(2, "2019/06/21");
    const userMiles3 = activityRepo.calculateDailyMilesWalked(3, "2019/06/22");

    expect(userMiles1).to.equal(5.4);
    expect(userMiles2).to.equal(8.7);
    expect(userMiles3).to.equal(9.5);
  });

  it("should retrieve minutes active for a given day for a user", function() {
    const minActive1 = activityRepo.retrieveMinutesActive(1, "2019/06/15");
    const minActive2 = activityRepo.retrieveMinutesActive(2, "2019/06/17");
    const minActive3 = activityRepo.retrieveMinutesActive(3, "2019/06/22");

    expect(minActive1).to.equal(140);
    expect(minActive2).to.equal(65);
    expect(minActive3).to.equal(53);

  })



});
