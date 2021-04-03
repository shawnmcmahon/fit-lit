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
});
