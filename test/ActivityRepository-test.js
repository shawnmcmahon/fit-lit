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

  it("should be able to calculate the miles walked by a user on a specific date", function() {
    const userMiles1 = activityRepo.calculateDailyMilesWalked(1, "2019/06/16");
    const userMiles2 = activityRepo.calculateDailyMilesWalked(2, "2019/06/21");
    const userMiles3 = activityRepo.calculateDailyMilesWalked(3, "2019/06/22");

    expect(userMiles1).to.equal(5.4);
    expect(userMiles2).to.equal(8.7);
    expect(userMiles3).to.equal(9.5);
  });

  it("should retrieve the number of steps for a user on a given date", function() {
    const numSteps1 = activityRepo.retrieveUserPropertyByDate(1, "2019/06/15", "numSteps");
    const numSteps2 = activityRepo.retrieveUserPropertyByDate(2, "2019/06/17", "numSteps");
    const numSteps3 = activityRepo.retrieveUserPropertyByDate(3, "2019/06/22", "numSteps");

    expect(numSteps1).to.equal(3577);
    expect(numSteps2).to.equal(13750);
    expect(numSteps3).to.equal(11342);
  });

  it("should retrieve minutes active for a user on a given date", function() {
    const minActive1 = activityRepo.retrieveUserPropertyByDate(1, "2019/06/15", "minutesActive");
    const minActive2 = activityRepo.retrieveUserPropertyByDate(2, "2019/06/17", "minutesActive");
    const minActive3 = activityRepo.retrieveUserPropertyByDate(3, "2019/06/22", "minutesActive");

    expect(minActive1).to.equal(140);
    expect(minActive2).to.equal(65);
    expect(minActive3).to.equal(53);
  });

  it("should retrieve the flights of stairs for a user on a given date", function() {
    const flights1 = activityRepo.retrieveUserPropertyByDate(1, "2019/06/15", "flightsOfStairs");
    const flights2 = activityRepo.retrieveUserPropertyByDate(2, "2019/06/17", "flightsOfStairs");
    const flights3 = activityRepo.retrieveUserPropertyByDate(3, "2019/06/22", "flightsOfStairs");

    expect(flights1).to.equal(16);
    expect(flights2).to.equal(4);
    expect(flights3).to.equal(17);
  });

  it("should retrieve the number of steps for a user throughout a given week", function() {
    const numStepsWeek1 = activityRepo.retrieveUserPropertyByWeek(1, "2019/06/15", 'numSteps');
    const numStepsWeek2 = activityRepo.retrieveUserPropertyByWeek(2, "2019/06/15", 'numSteps');
    const numStepsWeek3 = activityRepo.retrieveUserPropertyByWeek(3, "2019/06/16", 'numSteps');

    expect(numStepsWeek1).to.eql([ 3577,  6637, 14329, 4419, 8429, 14478, 6760 ]);
    expect(numStepsWeek2).to.eql([ 4294, 4112, 13750, 4662, 9858, 8153, 10225 ]);
    expect(numStepsWeek3).to.eql([ 12304,  4547,  2546, 10961,  5369,  7498, 11342 ]);
  });

  it("should retrieve the minutes active for a user throughout a given week", function() {
    const minutesActiveWeek1 = activityRepo.retrieveUserPropertyByWeek(1, "2019/06/15", 'minutesActive');
    const minutesActiveWeek2 = activityRepo.retrieveUserPropertyByWeek(2, "2019/06/16", 'minutesActive');
    const minutesActiveWeek3 = activityRepo.retrieveUserPropertyByWeek(3, "2019/06/16", 'minutesActive');

    expect(minutesActiveWeek1).to.eql([ 140, 175, 168, 165, 275, 140, 135 ]);
    expect(minutesActiveWeek2).to.eql([ 220, 65, 181, 243, 74, 174, 124 ]);
    expect(minutesActiveWeek3).to.eql([ 152, 97, 274, 188, 129, 199, 53 ]);
  });

  it("should retrieve the flights of stairs for a user throughout a given week", function() {
    const flightsWeek1 = activityRepo.retrieveUserPropertyByWeek(1, "2019/06/15", 'flightsOfStairs');
    const flightsWeek2 = activityRepo.retrieveUserPropertyByWeek(2, "2019/06/16", 'flightsOfStairs');
    const flightsWeek3 = activityRepo.retrieveUserPropertyByWeek(3, "2019/06/16", 'flightsOfStairs');

    expect(flightsWeek1).to.eql([ 16, 36, 18, 33, 2, 12, 6 ]);
    expect(flightsWeek2).to.eql([ 37, 4, 31, 44, 10, 26, 31 ]);
    expect(flightsWeek3).to.eql([ 8, 5, 26, 17, 46, 13, 17 ]);
  });

  it("should retrieve the average weekly minutes active", function() {
    const userAvg1 = activityRepo.retrieveAvgWeeklyActivity(1, "2019/06/16");
    const userAvg2 = activityRepo.retrieveAvgWeeklyActivity(2, "2019/06/16");
    const userAvg3 = activityRepo.retrieveAvgWeeklyActivity(3, "2019/06/16");

    expect(userAvg1.avgMinutesActive).to.equal(168);
    expect(userAvg2.avgMinutesActive).to.equal(154);
    expect(userAvg3.avgMinutesActive).to.equal(156);
  });

  it("should determine whether a user reached their step goal on a given date", function() {
    const userStepGoal1 = activityRepo.evaluateStepGoalSuccess(1, "2019/06/16");
    const userStepGoal2 = activityRepo.evaluateStepGoalSuccess(2, "2019/06/17");
    const userStepGoal3 = activityRepo.evaluateStepGoalSuccess(3, "2019/06/18");

    expect(userStepGoal1).to.equal(false); // 6637 / 10000
    expect(userStepGoal2).to.equal(true); // 13750 / 5000
    expect(userStepGoal3).to.equal(false); // 2546 / 5000
  });

  it("should identify dates when user exceeded step goal", function() {
    const userStepGoalExceeded1 = activityRepo.identifyDatesExceedingStepGoal(1);

    expect(userStepGoalExceeded1).to.eql(['2019/06/17', '2019/06/20', '2019/06/22', '2019/06/23']);
  });

  it("should retrieve the most flights climbed record for a user", function () {
    const userFlights1 = activityRepo.retrieveMaxFlightsClimbed(1);
    const userFlights2 = activityRepo.retrieveMaxFlightsClimbed(2);
    const userFlights3 = activityRepo.retrieveMaxFlightsClimbed(3);

    expect(userFlights1).to.equal(36);
    expect(userFlights2).to.equal(44);
    expect(userFlights3).to.equal(46);
  });

  it("should retrieve the average flights climbed by all users on a given date", function () {
    const avgStairsForAllUsers1 = activityRepo.calculateAvgStairsClimbedByDate("2019/06/15");
    const avgStairsForAllUsers2 = activityRepo.calculateAvgStairsClimbedByDate("2019/06/18");
    const avgStairsForAllUsers3 = activityRepo.calculateAvgStairsClimbedByDate("2019/06/20");

    expect(avgStairsForAllUsers1).to.equal(20);
    expect(avgStairsForAllUsers2).to.equal(30);
    expect(avgStairsForAllUsers3).to.equal(23);
  })

  it("should retrieve the average steps taken by all users on a given date", function () {
    const avgStepsForAllUsers1 = activityRepo.calculateAvgStepsByDate("2019/06/15");
    const avgStepsForAllUsers2 = activityRepo.calculateAvgStepsByDate("2019/06/17");
    const avgStepsForAllUsers3 = activityRepo.calculateAvgStepsByDate("2019/06/22");

    expect(avgStepsForAllUsers1).to.equal(5091);
    expect(avgStepsForAllUsers2).to.equal(10875);
    expect(avgStepsForAllUsers3).to.equal(8412);
  })

  it("should retrieve the average minutes active for all users on a given date", function () {
    const avgMinForAllUsers1 = activityRepo.calculateAvgMinutesActiveByDate("2019/06/19");
    const avgMinForAllUsers2 = activityRepo.calculateAvgMinutesActiveByDate("2019/06/21");
    const avgMinForAllUsers3 = activityRepo.calculateAvgMinutesActiveByDate("2019/06/23");

    expect(avgMinForAllUsers1).to.equal(235);
    expect(avgMinForAllUsers2).to.equal(169);
    expect(avgMinForAllUsers3).to.equal(193);
  });
});
