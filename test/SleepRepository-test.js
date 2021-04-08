const chai = require('chai');
const expect = chai.expect;

const SleepRepository = require('../src/SleepRepository');
const sleepData = require('./test-data/sleep-data');
const userData = require('./test-data/user-data');

describe('SleepRepository', function() {
  let sleepRepo;

  beforeEach(() => {
    sleepRepo = new SleepRepository(sleepData, userData);
  });

  it('should be a function', function() {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be an instance of SleepRepository', function() {
    expect(sleepRepo).to.be.an.instanceof(SleepRepository);
  });

  it('should store a sleep data array', function() {
    expect(sleepRepo.data).to.be.an('array');
  });

  it('should store a user data array', function() {
    expect(sleepRepo.userData).to.be.an('array');
  });

  it('should be able to store a sleep data entry', function() {
    expect(sleepRepo.data[0]).to.deep.equal({ userID: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2 });
    expect(sleepRepo.data[1]).to.deep.equal({ userID: 2, date: '2019/06/15', hoursSlept: 7, sleepQuality: 4.7 });
    expect(sleepRepo.data[2]).to.deep.equal({ userID: 3, date: '2019/06/15', hoursSlept: 10.8, sleepQuality: 4.7 });
  });

  it('should calculate the average sleep quality among all users', function() {
    const avgSleepQuality = sleepRepo.calculateAvgSleepQualityAllUsers();

    expect(avgSleepQuality).to.equal(3);
  });

  it('should be able to identify all users with an average sleep quality over 3 during a given week', function() {
    const bestQualitySleepers = sleepRepo.retrieveBestWeeklySleepers('2019/06/17', 'sleepQuality', 3);

    expect(bestQualitySleepers[0].id).to.equal(2);
    expect(bestQualitySleepers[0].name).to.equal('Jarvis Considine');
    expect(bestQualitySleepers[0].weeklyAvg).to.equal(3.1);
  });

  it('should be able to identify all users with at least 6 average hours of sleep during a given week', function() {
    const longestSleepers = sleepRepo.retrieveBestWeeklySleepers('2019/06/17', 'hoursSlept', 6);

    expect(longestSleepers[0].id).to.equal(1);
    expect(longestSleepers[1].name).to.equal('Jarvis Considine');
    expect(longestSleepers[2].weeklyAvg).to.equal(6.5);
  });

  it('should be able to find the user entry with the highest number of hours slept', function() {
    const bestSleepers = sleepRepo.identifyBestSleeper();

    expect(bestSleepers[0].name).to.equal('Herminia Witting');
    expect(bestSleepers[0].date).to.equal('2019/06/15');
    expect(bestSleepers[0].hoursSlept).to.equal(10.8);

    expect(bestSleepers[1].name).to.equal('Jarvis Considine');
    expect(bestSleepers[1].date).to.equal('2019/06/18');
    expect(bestSleepers[1].hoursSlept).to.equal(10.8);
  });
});