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
    userActivity1 = new UserActivity(user1, activityData);
    userActivity2 = new UserActivity(user2, activityData);
    userActivity3 = new UserActivity(user3, activityData);
  });

  it('should be a function', function() {
    expect(UserActivity).to.be.a('function');
  });

  it("should be an instance of UserActivity", function() {
    expect(userActivity1).to.be.an.instanceof(UserActivity);
    expect(userActivity2).to.be.an.instanceof(UserActivity);
    expect(userActivity3).to.be.an.instanceof(UserActivity);
  });

  it("should store an activity data array", function() {
    expect(userActivity1.data).to.be.an('array');
    expect(userActivity2.data).to.be.an('array');
    expect(userActivity3.data).to.be.an('array');
  });

});