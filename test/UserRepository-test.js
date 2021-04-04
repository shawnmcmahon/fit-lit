const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const userData = require('./test-data/user-data');

describe('UserRepository', function() {
  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepository(userData);
  });

  it("should be a function", function() {
    console.log(UserRepository);
    expect(UserRepository).to.be.a('function');
  });

  it("should be an instance of UserRepository", function() {
    expect(userRepo).to.be.an.instanceof(UserRepository);
  });

  it("should store a userData array", function() {
    expect(userRepo.data).to.be.an('array');
  });

  it("should be able to store a User object", function() {
    expect(userRepo.data[0]).to.deep.equal({ id: 1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', strideLength: 4.3, dailyStepGoal: 10000, numOunces: 96, friends: [ 16, 4, 8 ] });
  });

  it("should be able to retrieve a User object", function() {
    expect(userRepo.retrieveUserData(1)).to.deep.equal({ id: 1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', strideLength: 4.3, dailyStepGoal: 10000, numOunces: 96, friends: [ 16, 4, 8 ] });
  });

  it("should have an average step goal property", function() {
    expect(userRepo.avgStepGoal).to.equal(null);
  });

  it("should calculate the average daily step goal for all users", function() {
    const avgStepGoal = userRepo.retrieveAvgStepGoal();

    expect(avgStepGoal).to.equal(6667);
  });
});
