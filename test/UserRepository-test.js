const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const userData = require('./test-data/user-data');
const sleepData = require('./test-data/sleep-data');
const activityData = require('./test-data/activity-data');

describe('UserRepository', function() {
  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepository();
    userRepo.populateUserData(userData);
    userRepo.populateHydrationData(hydrationData);
    userRepo.populateSleepData(sleepData);
    userRepo.populateActivityData(activityData);
  });

  it("should be a function", function() {
    expect(UserRepository).to.be.a('function');
  });

  it("should be an instance of UserRepository", function() {
    expect(userRepo).to.be.an.instanceof(UserRepository);
  });

  it("should store a userData array", function() {
    expect(userRepo.userData).to.be.an('array');
  });

  it("should be able to store a User object", function() {
    expect(userRepo.userData[0]).to.deep.equal({ id: 1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', stride: 4.3, dailyStepGoal: 10000, friends: [ 16, 4, 8 ] });
  });

  it("should be able to retrieve a User object", function() {
    expect(userRepo.retrieveUserData(1)).to.deep.equal({ id: 1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', stride: 4.3, dailyStepGoal: 10000, friends: [ 16, 4, 8 ] });
  });

  
  it("should store a sleepData array", function() {
    expect(userRepo.sleepData).to.be.a('array');
  });

  it("should be able to store a sleepEntry instance", function() {
    expect(userRepo.sleepData[0]).to.deep.equal({ id: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2 });
  });

  it("should store an activityData array", function() {
    expect(userRepo.activityData).to.be.a('array');
  });

  it("should be able to store an activityEntry instance", function() {
    expect(userRepo.activityData[0]).to.deep.equal({ id: 1, date: '2019/06/15', numSteps: 3577, minutesActive: 140, flightsOfStairs: 16 });
  });

  it("should have an average step goal property", function() {
    expect(userRepo.avgStepGoal).to.equal(null);
  });

  it("should calculate the average daily step goal for all users", function() {
    const avgStepGoal = userRepo.retrieveAvgStepGoal();

    expect(avgStepGoal).to.equal(6667);
  });

  // sleepData

  it("should calculate the average daily hours slept by a user", function() {
    const avgDailyHrsSlept = userRepo.calculateAvgHrsSleptByUser(1);

    expect(avgDailyHrsSlept).to.equal(7.7);
  });

  it("should calculate a user's average daily sleep quality", function() {
    const avgSleepQuality = userRepo.calculateAvgSleepQualityByUser(2);

    expect(avgSleepQuality).to.equal(3.8);
  });

  it("should be able to retrieve the hours slept by a user on a specific date", function() {
    const hoursSlept1 = userRepo.calculateHrsSleptByDate(1, "2019/06/17");
    const hoursSlept2 = userRepo.calculateHrsSleptByDate(2, "2019/06/19");
    const hoursSlept3 = userRepo.calculateHrsSleptByDate(3, "2019/06/21");

    expect(hoursSlept1).to.equal(8);
    expect(hoursSlept2).to.equal(9.6);
    expect(hoursSlept3).to.equal(8.9);
  });

  it("should be able to retrieve the sleep quality of a user on a specific date", function() {
    const sleepQuality1 = userRepo.calculateSleepQualityByDate(1, "2019/06/16");
    const sleepQuality2 = userRepo.calculateSleepQualityByDate(2, "2019/06/21");
    const sleepQuality3 = userRepo.calculateSleepQualityByDate(3, "2019/06/22");

    expect(sleepQuality1).to.equal(3.8);
    expect(sleepQuality2).to.equal(4.8);
    expect(sleepQuality3).to.equal(2.1);
  });

  it("should be able to retrieve the hours slept data for a user throughout a given week", function() {
    const hoursSleptWeek1 = userRepo.retrieveWeekOfSleepQuality(1, "2019/06/15");
    const hoursSleptWeek2 = userRepo.retrieveWeekOfSleepQuality(2, "2019/06/16");
    const hoursSleptWeek3 = userRepo.retrieveWeekOfSleepQuality(3, "2019/06/16");

    expect(hoursSleptWeek1).to.eql([ 2.2, 3.8, 2.6, 3.1, 1.2, 4.2, 3 ]);
    expect(hoursSleptWeek2).to.eql([ 3.8, 3, 3.2, 2.5, 4.8, 3.3, 4.9 ]);
    expect(hoursSleptWeek3).to.eql([ 3.4, 4.9, 2.6, 3.4, 3.7, 2.1, 3.9 ]);
  });

  it("should be able to retrieve the sleep quality data for a user throughout a given week", function() {
    const sleepQualityWeek1 = userRepo.retrieveWeekOfSleepQuality(1, "2019/06/15");
    const sleepQualityWeek2 = userRepo.retrieveWeekOfSleepQuality(2, "2019/06/15");
    const sleepQualityWeek3 = userRepo.retrieveWeekOfSleepQuality(3, "2019/06/16");

    expect(sleepQualityWeek1).to.eql([ 2.2, 3.8, 2.6, 3.1, 1.2, 4.2, 3 ]);
    expect(sleepQualityWeek2).to.eql([ 4.7, 3.8, 3, 3.2, 2.5, 4.8, 3.3 ]);
    expect(sleepQualityWeek3).to.eql([ 3.4, 4.9, 2.6, 3.4, 3.7, 2.1, 3.9 ]);
  });

  it("should calculate the average sleep quality among all users", function() {
    const avgSleepQuality = userRepo.calculateAvgSleepQualityAllUsers();

    expect(avgSleepQuality).to.equal(3);
  });

  it.skip("should be able to identify all users with a sleep quality score greater than 3 during a given week", function() {
    const bestSleepers = userRepo.retrieveQualitySleepers("2019/06/17");

    // expect(bestSleepers[0]).to.equal(n);
  });

  it("should be able to find the user entry with the highest number of hours slept", function() {
    const bestSleepers = userRepo.identifyBestSleeper();

    expect(bestSleepers[0].name).to.equal("Herminia Witting");
    expect(bestSleepers[0].date).to.equal("2019/06/15");
    expect(bestSleepers[0].hoursSlept).to.equal(10.8);

    expect(bestSleepers[1].name).to.equal("Jarvis Considine");
    expect(bestSleepers[1].date).to.equal("2019/06/18");
    expect(bestSleepers[1].hoursSlept).to.equal(10.8);
  });
});
