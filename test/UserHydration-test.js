const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');
const UserHydration = require('../src/UserHydration');
const userData = require('./test-data/user-data');
const hydrationData = require('./test-data/hydration-data');

describe('UserHydration', function() {
  let userRepo, user1, user2, user3, userHydration1, userHydration2, userHydration3;

  beforeEach(() => {
    userRepo = new UserRepository(userData);
    user1 = new User(userRepo.data[0]);
    user2 = new User(userRepo.data[1]);
    user3 = new User(userRepo.data[2]);
    userHydration1 = new UserHydration(user1, hydrationData);
    userHydration2 = new UserHydration(user2, hydrationData);
    userHydration3 = new UserHydration(user3, hydrationData);
  });

  it('should be a function', function() {
    expect(UserHydration).to.be.a('function');
  });

  it('should be an instance of UserHydration', function() {
    expect(userHydration1).to.be.an.instanceof(UserHydration);
    expect(userHydration2).to.be.an.instanceof(UserHydration);
    expect(userHydration3).to.be.an.instanceof(UserHydration);
  });

  it('should store a user's id', function() {
    expect(userHydration1.id).to.equal(1);
    expect(userHydration2.id).to.equal(2);
    expect(userHydration3.id).to.equal(3);
  });

   it('should store a hydration data array', function() {
    expect(userHydration1.data).to.be.an('array');
    expect(userHydration2.data).to.be.an('array');
    expect(userHydration3.data).to.be.an('array');
  });

  it('should calculate the average daily water intake for a user', function() {
    const avgDailyWater1 = userHydration1.calculateAvgDailyWater();
    const avgDailyWater2 = userHydration2.calculateAvgDailyWater();
    const avgDailyWater3 = userHydration3.calculateAvgDailyWater();

    expect(avgDailyWater1).to.equal(60);
    expect(avgDailyWater2).to.equal(68);
    expect(avgDailyWater3).to.equal(56);
  });

  it('should be able to retrieve the ounces drank by a user on a specific date', function() {
    const numOunces1 = userHydration1.retrieveNumOuncesByDate('2019/06/18');
    const numOunces2 = userHydration2.retrieveNumOuncesByDate('2019/06/16');
    const numOunces3 = userHydration3.retrieveNumOuncesByDate('2019/06/20');

    expect(numOunces1).to.equal(61);
    expect(numOunces2).to.equal(91);
    expect(numOunces3).to.equal(51);
  });

  it('should calculate the average daily water intake for a user over the course of a week', function() {
    const avgWeeklyWater1 = userHydration1.calculateAvgWeeklyWater('2019/06/15');
    const avgWeeklyWater2 = userHydration2.calculateAvgWeeklyWater('2019/06/16');
    const avgWeeklyWater3 = userHydration3.calculateAvgWeeklyWater('2019/06/17');

    expect(avgWeeklyWater1).to.equal(65);
    expect(avgWeeklyWater2).to.equal(70);
    expect(avgWeeklyWater3).to.equal(51);
  });

  it('should be able to retrieve the daily water intake for a user over the course of a week', function() {
    const numOuncesWeek1 = userHydration1.retrieveNumOzByWeek('2019/06/15');
    const numOuncesWeek2 = userHydration2.retrieveNumOzByWeek('2019/06/16');
    const numOuncesWeek3 = userHydration3.retrieveNumOzByWeek('2019/06/17');

    expect(numOuncesWeek1).to.eql([ 37, 69, 96, 61, 91, 50, 50 ]);
    expect(numOuncesWeek2).to.eql([ 91, 96, 70, 76, 71, 27, 58 ]);
    expect(numOuncesWeek3).to.eql([ 28, 40, 85, 51, 41, 78, 35 ]);
  });
});