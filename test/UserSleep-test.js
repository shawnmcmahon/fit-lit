const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');
const UserSleep = require('../src/UserSleep');
const userData = require('./test-data/user-data');
const sleepData = require('./test-data/sleep-data');

describe('UserSleep', function() {
  let userRepo, user1, user2, user3, userSleep1, userSleep2, userSleep3;

  beforeEach(() => {
    userRepo = new UserRepository(userData);
    user1 = new User(userRepo.data[0]);
    user2 = new User(userRepo.data[1]);
    user3 = new User(userRepo.data[2]);
    userSleep1 = new UserSleep(user1, sleepData);
    userSleep2 = new UserSleep(user2, sleepData);
    userSleep3 = new UserSleep(user3, sleepData);
  });

  it('should be a function', function() {
    expect(UserSleep).to.be.a('function');
  });

  it("should be an instance of UserSleep", function() {
    expect(userSleep1).to.be.an.instanceof(UserSleep);
    expect(userSleep2).to.be.an.instanceof(UserSleep);
    expect(userSleep3).to.be.an.instanceof(UserSleep);
  });

  it("should store a sleep data array", function() {
    expect(userSleep1.data).to.be.an('array');
    expect(userSleep2.data).to.be.an('array');
    expect(userSleep3.data).to.be.an('array');
  });

  it("should calculate a user's average daily hours slept", function() {
    const avgHrsSlept1 = userSleep1.calculatePropAvg('hoursSlept');
    const avgHrsSlept2 = userSleep2.calculatePropAvg('hoursSlept');
    const avgHrsSlept3 = userSleep3.calculatePropAvg('hoursSlept');

    expect(avgHrsSlept1).to.equal(7.7);
    expect(avgHrsSlept2).to.equal(7.2);
    expect(avgHrsSlept3).to.equal(8.4);
  });

  it("should calculate a user's average daily sleep quality", function() {
    const avgSleepQuality1 = userSleep1.calculatePropAvg('sleepQuality');
    const avgSleepQuality2 = userSleep2.calculatePropAvg('sleepQuality');
    const avgSleepQuality3 = userSleep3.calculatePropAvg('sleepQuality');

    expect(avgSleepQuality1).to.equal(2.7);
    expect(avgSleepQuality2).to.equal(3.8);
    expect(avgSleepQuality3).to.equal(3.6);

  });

  it("should be able to retrieve the hours slept by a user on a specific date", function() {
    const hoursSlept1 = userSleep1.retrievePropByDate("2019/06/17", 'hoursSlept');
    const hoursSlept2 = userSleep2.retrievePropByDate("2019/06/19", 'hoursSlept');
    const hoursSlept3 = userSleep3.retrievePropByDate("2019/06/21", 'hoursSlept');

    expect(hoursSlept1).to.equal(8);
    expect(hoursSlept2).to.equal(9.6);
    expect(hoursSlept3).to.equal(8.9);
  });

  it("should be able to retrieve the sleep quality of a user on a specific date", function() {
    const sleepQuality1 = userSleep1.retrievePropByDate("2019/06/16", 'sleepQuality');
    const sleepQuality2 = userSleep2.retrievePropByDate("2019/06/21", 'sleepQuality');
    const sleepQuality3 = userSleep3.retrievePropByDate("2019/06/22", 'sleepQuality');

    expect(sleepQuality1).to.equal(3.8);
    expect(sleepQuality2).to.equal(4.8);
    expect(sleepQuality3).to.equal(2.1);
  });

  it("should be able to retrieve the hours slept data for a user throughout a given week", function() {
    const hoursSleptWeek1 = userSleep1.retrievePropByWeek("2019/06/15", 'hoursSlept');
    const hoursSleptWeek2 = userSleep2.retrievePropByWeek("2019/06/16", 'hoursSlept');
    const hoursSleptWeek3 = userSleep3.retrievePropByWeek("2019/06/16", 'hoursSlept');
    
    expect(hoursSleptWeek1).to.eql([ 6.1, 4.1, 8, 10.4, 10.7, 7.8, 7 ]);
    expect(hoursSleptWeek2).to.eql([ 7.5, 5.7, 10.8, 9.6, 4.3, 4.8, 8 ]);
    expect(hoursSleptWeek3).to.eql([ 10.7, 5.3, 9.8, 7.2, 8.9, 9.8, 4.7 ]);
  });

  it("should be able to retrieve the sleep quality data for a user throughout a given week", function() {
    const sleepQualityWeek1 = userSleep1.retrievePropByWeek("2019/06/15", 'sleepQuality');
    const sleepQualityWeek2 = userSleep2.retrievePropByWeek("2019/06/15", 'sleepQuality');
    const sleepQualityWeek3 = userSleep3.retrievePropByWeek("2019/06/16", 'sleepQuality');

    expect(sleepQualityWeek1).to.eql([ 2.2, 3.8, 2.6, 3.1, 1.2, 4.2, 3 ]);
    expect(sleepQualityWeek2).to.eql([ 4.7, 3.8, 3, 3.2, 2.5, 4.8, 3.3 ]);
    expect(sleepQualityWeek3).to.eql([ 3.4, 4.9, 2.6, 3.4, 3.7, 2.1, 3.9 ]);
  });


});
