const chai = require('chai');
const expect = chai.expect;

const SleepRepository = require('../src/SleepRepository');
const userData = require('./test-data/user-data');
const sleepData = require('./test-data/sleep-data');

describe('SleepRepository', function() {
  let sleepRepo;

  beforeEach(() => {
    sleepRepo = new SleepRepository(userData);
    sleepRepo.populateSleepData(sleepData);
  });

  it("should be a function", function() {
    expect(SleepRepository).to.be.a('function');
  });

  it("should be an instance of SleepRepository", function() {
    expect(sleepRepo).to.be.an.instanceof(SleepRepository);
  });

  it("should store a sleepData array", function() {
    expect(sleepRepo.sleepData).to.be.an('array');
  });

  it("should be able to store a SleepEntry instance", function() {
    expect(sleepRepo.sleepData[0]).to.deep.equal({ id: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2 });
  });

  it("should calculate the average daily hours slept by a user", function() {
    const avgHrsSlept = sleepRepo.calculateUserAvg(1, 'hoursSlept');

    expect(avgHrsSlept).to.equal(7.7);
  });

  it("should calculate a user's average daily sleep quality", function() {
    const avgSleepQuality = sleepRepo.calculateUserAvg(2, 'sleepQuality');

    expect(avgSleepQuality).to.equal(3.8);
  });

  it("should be able to retrieve the hours slept by a user on a specific date", function() {
    const hoursSlept1 = sleepRepo.retrieveUserPropertyByDate(1, "2019/06/17", 'hoursSlept');
    const hoursSlept2 = sleepRepo.retrieveUserPropertyByDate(2, "2019/06/19", 'hoursSlept');
    const hoursSlept3 = sleepRepo.retrieveUserPropertyByDate(3, "2019/06/21", 'hoursSlept');

    expect(hoursSlept1).to.equal(8);
    expect(hoursSlept2).to.equal(9.6);
    expect(hoursSlept3).to.equal(8.9);
  });

  it("should be able to retrieve the sleep quality of a user on a specific date", function() {
    const sleepQuality1 = sleepRepo.retrieveUserPropertyByDate(1, "2019/06/16", 'sleepQuality');
    const sleepQuality2 = sleepRepo.retrieveUserPropertyByDate(2, "2019/06/21", 'sleepQuality');
    const sleepQuality3 = sleepRepo.retrieveUserPropertyByDate(3, "2019/06/22", 'sleepQuality');

    expect(sleepQuality1).to.equal(3.8);
    expect(sleepQuality2).to.equal(4.8);
    expect(sleepQuality3).to.equal(2.1);
  });

  it("should be able to retrieve the hours slept data for a user throughout a given week", function() {
    const hoursSleptWeek1 = sleepRepo.retrieveUserPropertyByWeek(1, "2019/06/15", 'hoursSlept');
    const hoursSleptWeek2 = sleepRepo.retrieveUserPropertyByWeek(2, "2019/06/16", 'hoursSlept');
    const hoursSleptWeek3 = sleepRepo.retrieveUserPropertyByWeek(3, "2019/06/16", 'hoursSlept');
    
    expect(hoursSleptWeek1).to.eql([ 6.1,  4.1, 8, 10.4, 10.7, 7.8, 7 ]);
    expect(hoursSleptWeek2).to.eql([ 7.5, 5.7, 10.8, 9.6, 4.3, 4.8, 8 ]);
    expect(hoursSleptWeek3).to.eql([ 10.7, 5.3, 9.8, 7.2, 8.9, 9.8, 4.7 ]);
  });

  it("should be able to retrieve the sleep quality data for a user throughout a given week", function() {
    const sleepQualityWeek1 = sleepRepo.retrieveUserPropertyByWeek(1, "2019/06/15", 'sleepQuality');
    const sleepQualityWeek2 = sleepRepo.retrieveUserPropertyByWeek(2, "2019/06/15", 'sleepQuality');
    const sleepQualityWeek3 = sleepRepo.retrieveUserPropertyByWeek(3, "2019/06/16", 'sleepQuality');

    expect(sleepQualityWeek1).to.eql([ 2.2, 3.8, 2.6, 3.1, 1.2, 4.2, 3 ]);
    expect(sleepQualityWeek2).to.eql([ 4.7, 3.8, 3, 3.2, 2.5, 4.8, 3.3 ]);
    expect(sleepQualityWeek3).to.eql([ 3.4, 4.9, 2.6, 3.4, 3.7, 2.1, 3.9 ]);
  });

  it("should calculate the average sleep quality among all users", function() {
    const avgSleepQuality = sleepRepo.calculateAvgSleepQualityAllUsers();

    expect(avgSleepQuality).to.equal(3);
  });

  it.skip("should be able to identify all users with a sleep quality score greater than 3 during a given week", function() {
    const bestSleepers = sleepRepo.retrieveQualitySleepers("2019/06/17");

    // expect(bestSleepers[0]).to.equal(n);
  });

  it("should be able to find the user entry with the highest number of hours slept", function() {
    const bestSleepers = sleepRepo.identifyBestSleeper();


    // expect(bestSleepers[0].name).to.equal("Herminia Witting");
    // expect(bestSleepers[0].date).to.equal("2019/06/15");
    // expect(bestSleepers[0].hoursSlept).to.equal(10.8);

    // expect(bestSleepers[1].name).to.equal("Jarvis Considine");
    // expect(bestSleepers[1].date).to.equal("2019/06/18");
    // expect(bestSleepers[1].hoursSlept).to.equal(10.8);
  });
});