const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');
const UserActivity = require('../src/UserActivity');
const userData = require('./test-data/user-data');
const activityData = require('./test-data/activity-data');

describe('ActivityEntry', function() {
  let userRepo, user1, user2, user3, userActivity1, userActivity2, userActivity3;

  beforeEach(() => {
    userRepo = new UserRepository(userData);
    user1 = new User(userRepo.data[0]);
    user2 = new User(userRepo.data[1]);
    user3 = new User(userRepo.data[2]);
    userActivity1 = new UserActivity(user1, activityData, userData);
    userActivity2 = new UserActivity(user2, activityData, userData);
    userActivity3 = new UserActivity(user3, activityData, userData);
  });

  it('should be a function', function() {
    expect(UserActivity).to.be.a('function');
  });

  it('should be an instance of UserActivity', function() {
    expect(userActivity1).to.be.an.instanceof(UserActivity);
    expect(userActivity2).to.be.an.instanceof(UserActivity);
    expect(userActivity3).to.be.an.instanceof(UserActivity);
  });

  it('should store an activity data array', function() {
    expect(userActivity1.data).to.be.an('array');
    expect(userActivity2.data).to.be.an('array');
    expect(userActivity3.data).to.be.an('array');
  });

  it('should retrieve the number of steps for a user on a given date', function() {
    const numSteps1 = userActivity1.retrievePropByDate('2019/06/15', 'numSteps');
    const numSteps2 = userActivity2.retrievePropByDate('2019/06/17', 'numSteps');
    const numSteps3 = userActivity3.retrievePropByDate('2019/06/22', 'numSteps');

    expect(numSteps1).to.equal(3577);
    expect(numSteps2).to.equal(13750);
    expect(numSteps3).to.equal(11342);
  });

  it('should retrieve minutes active for a user on a given date', function() {
    const minActive1 = userActivity1.retrievePropByDate('2019/06/15', 'minutesActive');
    const minActive2 = userActivity2.retrievePropByDate('2019/06/17', 'minutesActive');
    const minActive3 = userActivity3.retrievePropByDate('2019/06/22', 'minutesActive');

    expect(minActive1).to.equal(140);
    expect(minActive2).to.equal(65);
    expect(minActive3).to.equal(53);
  });

  it('should retrieve the flights of stairs for a user on a given date', function() {
    const flights1 = userActivity1.retrievePropByDate('2019/06/15', 'flightsOfStairs');
    const flights2 = userActivity2.retrievePropByDate('2019/06/17', 'flightsOfStairs');
    const flights3 = userActivity3.retrievePropByDate('2019/06/22', 'flightsOfStairs');

    expect(flights1).to.equal(16);
    expect(flights2).to.equal(4);
    expect(flights3).to.equal(17);
  });

  it('should retrieve the number of steps for a user throughout a given week', function() {
    const numStepsWeek1 = userActivity1.retrievePropLogByWeek('2019/06/15', 'numSteps');
    const numStepsWeek2 = userActivity2.retrievePropLogByWeek('2019/06/15', 'numSteps');
    const numStepsWeek3 = userActivity3.retrievePropLogByWeek('2019/06/16', 'numSteps');

    expect(numStepsWeek1).to.eql([ 3577,  6637, 14329, 4419, 8429, 14478, 6760 ]);
    expect(numStepsWeek2).to.eql([ 4294, 4112, 13750, 4662, 9858, 8153, 10225 ]);
    expect(numStepsWeek3).to.eql([ 12304,  4547,  2546, 10961,  5369,  7498, 11342 ]);
  });

  it('should retrieve the minutes active for a user throughout a given week', function() {
    const minutesActiveWeek1 = userActivity1.retrievePropLogByWeek('2019/06/15', 'minutesActive');
    const minutesActiveWeek2 = userActivity2.retrievePropLogByWeek('2019/06/16', 'minutesActive');
    const minutesActiveWeek3 = userActivity3.retrievePropLogByWeek('2019/06/16', 'minutesActive');

    expect(minutesActiveWeek1).to.eql([ 140, 175, 168, 165, 275, 140, 135 ]);
    expect(minutesActiveWeek2).to.eql([ 220, 65, 181, 243, 74, 174, 124 ]);
    expect(minutesActiveWeek3).to.eql([ 152, 97, 274, 188, 129, 199, 53 ]);
  });

  it('should retrieve the flights of stairs for a user throughout a given week', function() {
    const flightsWeek1 = userActivity1.retrievePropLogByWeek('2019/06/15', 'flightsOfStairs');
    const flightsWeek2 = userActivity2.retrievePropLogByWeek('2019/06/16', 'flightsOfStairs');
    const flightsWeek3 = userActivity3.retrievePropLogByWeek('2019/06/16', 'flightsOfStairs');

    expect(flightsWeek1).to.eql([ 16, 36, 18, 33, 2, 12, 6 ]);
    expect(flightsWeek2).to.eql([ 37, 4, 31, 44, 10, 26, 31 ]);
    expect(flightsWeek3).to.eql([ 8, 5, 26, 17, 46, 13, 17 ]);
  });

  it('should calculate a user\'s average daily steps', function() {
    const avgNumSteps1 = userActivity1.calculatePropAvg('numSteps');
    const avgNumSteps2 = userActivity2.calculatePropAvg('numSteps');
    const avgNumSteps3 = userActivity3.calculatePropAvg('numSteps');

    expect(avgNumSteps1).to.equal(9205);
    expect(avgNumSteps2).to.equal(6979);
    expect(avgNumSteps3).to.equal(7404);
  });

  it('should calculate a user\'s average daily minutes active', function() {
    const avgMinutes1 = userActivity1.calculatePropAvg('minutesActive');
    const avgMinutes2 = userActivity2.calculatePropAvg('minutesActive');
    const avgMinutes3 = userActivity3.calculatePropAvg('minutesActive');

    expect(avgMinutes1).to.equal(171);
    expect(avgMinutes2).to.equal(151);
    expect(avgMinutes3).to.equal(159);
  });

  it('should calculate a user\'s average daily flights of stairs', function() {
    const avgFlights1 = userActivity1.calculatePropAvg('flightsOfStairs');
    const avgFlights2 = userActivity2.calculatePropAvg('flightsOfStairs');
    const avgFlights3 = userActivity3.calculatePropAvg('flightsOfStairs');

    expect(avgFlights1).to.equal(17);
    expect(avgFlights2).to.equal(21);
    expect(avgFlights3).to.equal(19);
  });  

  it('should calculate the average steps taken by a user during a given week', function() {
    const avgSteps1 = userActivity1.calculatePropAvgByWeek('2019/06/16', 'numSteps');
    const avgSteps2 = userActivity2.calculatePropAvgByWeek('2019/06/15', 'numSteps');
    const avgSteps3 = userActivity3.calculatePropAvgByWeek('2019/06/16', 'numSteps');

    expect(avgSteps1).to.equal(9334);
    expect(avgSteps2).to.equal(7865);
    expect(avgSteps3).to.equal(7795);
  });

  
  it('should calculate the average minutes active for a user during a given week', function() {
    const avgMinutes1 = userActivity1.calculatePropAvgByWeek('2019/06/15', 'minutesActive');
    const avgMinutes2 = userActivity2.calculatePropAvgByWeek('2019/06/16', 'minutesActive');
    const avgMinutes3 = userActivity3.calculatePropAvgByWeek('2019/06/15', 'minutesActive');
    
    expect(avgMinutes1).to.equal(171);
    expect(avgMinutes2).to.equal(154);
    expect(avgMinutes3).to.equal(165);
  });
  
  it('should calculate the average flights climbed by a user during a given week', function() {
    const avgFlights1 = userActivity1.calculatePropAvgByWeek('2019/06/15', 'flightsOfStairs');
    const avgFlights2 = userActivity2.calculatePropAvgByWeek('2019/06/16', 'flightsOfStairs');
    const avgFlights3 = userActivity3.calculatePropAvgByWeek('2019/06/16', 'flightsOfStairs');

    expect(avgFlights1).to.equal(18);
    expect(avgFlights2).to.equal(26);
    expect(avgFlights3).to.equal(19);
  });

  it('should be able to calculate the miles walked by a user on a specific date', function() {
    const userMiles1 = userActivity1.calculateDailyMilesWalked('2019/06/16');
    const userMiles2 = userActivity2.calculateDailyMilesWalked('2019/06/21');
    const userMiles3 = userActivity3.calculateDailyMilesWalked('2019/06/22');

    expect(userMiles1).to.equal(5.4);
    expect(userMiles2).to.equal(8.7);
    expect(userMiles3).to.equal(9.5);
  });

  it('should determine whether a user reached their step goal on a given date', function() {
    const userStepGoal1 = userActivity1.evaluateStepGoalSuccess('2019/06/16');
    const userStepGoal2 = userActivity2.evaluateStepGoalSuccess('2019/06/17');
    const userStepGoal3 = userActivity3.evaluateStepGoalSuccess('2019/06/18');

    expect(userStepGoal1).to.equal(false);
    expect(userStepGoal2).to.equal(true);
    expect(userStepGoal3).to.equal(false);
  });

  it('should identify dates when user exceeded step goal', function() {
    const userStepGoalDays1 = userActivity1.identifyDatesExceedingStepGoal();
    const userStepGoalDays2 = userActivity2.identifyDatesExceedingStepGoal();
    const userStepGoalDays3 = userActivity3.identifyDatesExceedingStepGoal();

    expect(userStepGoalDays1).to.eql(['2019/06/17', '2019/06/20', '2019/06/22', '2019/06/23']);
    expect(userStepGoalDays2).to.eql(['2019/06/17', '2019/06/19', '2019/06/20', '2019/06/21']);
    expect(userStepGoalDays3).to.eql(['2019/06/15','2019/06/16', '2019/06/19', '2019/06/20', '2019/06/21', '2019/06/22']);
  });

  it('should retrieve the most flights climbed record for a user', function () {
    const maxFlights1 = userActivity1.retrieveMaxFlightsClimbed();
    const maxFlights2 = userActivity2.retrieveMaxFlightsClimbed();
    const maxFlights3 = userActivity3.retrieveMaxFlightsClimbed();

    expect(maxFlights1).to.equal(36);
    expect(maxFlights2).to.equal(44);
    expect(maxFlights3).to.equal(46);
  });
});