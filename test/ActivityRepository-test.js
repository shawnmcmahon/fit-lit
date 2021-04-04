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

  it("should retrieve the average weekly minutes active", function() {
    const userAvgMin1 = activityRepo.retrieveAvgWeeklyActivity(1, "2019/06/16");
    const userAvgMin2 = activityRepo.retrieveAvgWeeklyActivity(2, "2019/06/16");
    const userAvgMin3 = activityRepo.retrieveAvgWeeklyActivity(3, "2019/06/16");

    expect(userAvgMin1.avgMinutes).to.equal(168);
    expect(userAvgMin2.avgMinutes).to.equal(154);
    expect(userAvgMin3.avgMinutes).to.equal(156);

  });

  it("should identify whether the provided date reached the user's step goal", function() {
    const userStepGoal1 = activityRepo.evaluateStepGoalSuccess(1, "2019/06/16");
    const userStepGoal2 = activityRepo.evaluateStepGoalSuccess(2, "2019/06/17");
    const userStepGoal3 = activityRepo.evaluateStepGoalSuccess(2, "2019/06/18");

    expect(userStepGoal1).to.equal(false); // 6637 / 10000
    expect(userStepGoal2).to.equal(true); // 13750 / 5000
    expect(userStepGoal3).to.equal(false); // 2546 / 5000

  });

  it("should retrieve the most flights climbed record for a user", function () {
  const userFlightRecord1 = activityRepo.retrieveMostFlightsClimbed(1);
  const userFlightRecord2 = activityRepo.retrieveMostFlightsClimbed(2);
  const userFlightRecord3 = activityRepo.retrieveMostFlightsClimbed(3);

  expect(userFlightRecord1).to.equal(36);
  expect(userFlightRecord2).to.equal(44);
  expect(userFlightRecord3).to.equal(46);

  });

  it("should retrieve the average flights climbed on a given date for all users", function () {
    const avgStairsForAllUsers1 = activityRepo.calculateAvgStairsClimbedByDate("2019/06/15");
    const avgStairsForAllUsers2 = activityRepo.calculateAvgStairsClimbedByDate("2019/06/18");
    const avgStairsForAllUsers3 = activityRepo.calculateAvgStairsClimbedByDate("2019/06/20");

    expect(avgStairsForAllUsers1).to.equal(20);
    expect(avgStairsForAllUsers2).to.equal(30);
    expect(avgStairsForAllUsers3).to.equal(23);

  })

  it("should retrieve the average steps taken on a given date for all users", function () {
  const avgStepsForAllUsers1 = activityRepo.calculateAvgStepsByDate("2019/06/15");
  const avgStepsForAllUsers2 = activityRepo.calculateAvgStepsByDate("2019/06/17");
  const avgStepsForAllUsers3 = activityRepo.calculateAvgStepsByDate("2019/06/22");

  expect(avgStepsForAllUsers1).to.equal(5091);
  expect(avgStepsForAllUsers2).to.equal(10875);
  expect(avgStepsForAllUsers3).to.equal(8412);

  })

  it("should retrieve the average minutes active on a given date for all users", function () {
    const avgMinForAllUsers1 = activityRepo.calculateAvgMinutesActiveByDate("2019/06/19");
    const avgMinForAllUsers2 = activityRepo.calculateAvgMinutesActiveByDate("2019/06/21");
    const avgMinForAllUsers3 = activityRepo.calculateAvgMinutesActiveByDate("2019/06/23");

    expect(avgMinForAllUsers1).to.equal(235);
    expect(avgMinForAllUsers2).to.equal(169);
    expect(avgMinForAllUsers3).to.equal(193);

  })







});
