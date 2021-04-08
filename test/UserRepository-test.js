const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const userData = require('./test-data/user-data');

describe('UserRepository', function() {
  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepository(userData);
  });

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', function() {
    expect(userRepo).to.be.an.instanceof(UserRepository);
  });

  it('should store a userData array', function() {
    expect(userRepo.data).to.be.an('array');
  });

  it('should be able to store a User object', function() {
    expect(userRepo.data[0]).to.deep.equal({ id: 1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', strideLength: 4.3, dailyStepGoal: 10000, numOunces: 96, friends: [ 16, 4, 8 ] });
    expect(userRepo.data[1]).to.deep.equal({ id: 2, name: 'Jarvis Considine', address: '30086 Kathryn Port, Ciceroland NE 07273', email: 'Dimitri.Bechtelar11@gmail.com', strideLength: 4.5, dailyStepGoal: 5000, friends: [ 9, 18, 24, 19 ] });
    expect(userRepo.data[2]).to.deep.equal({ id: 3, name: 'Herminia Witting', address: '85823 Bosco Fork, East Oscarstad MI 85126-5660', email: 'Elwin.Tromp@yahoo.com', strideLength: 4.4, dailyStepGoal: 5000, friends: [ 19, 11, 42, 33 ] });
  });

  it('should be able to retrieve a User object', function() {
    expect(userRepo.retrieveUserData(1)).to.deep.equal({ id: 1, name: 'Luisa Hane', address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697', email: 'Diana.Hayes1@hotmail.com', strideLength: 4.3, dailyStepGoal: 10000, numOunces: 96, friends: [ 16, 4, 8 ] });
    expect(userRepo.retrieveUserData(2)).to.deep.equal({ id: 2, name: 'Jarvis Considine', address: '30086 Kathryn Port, Ciceroland NE 07273', email: 'Dimitri.Bechtelar11@gmail.com', strideLength: 4.5, dailyStepGoal: 5000, friends: [ 9, 18, 24, 19 ] });
    expect(userRepo.retrieveUserData(3)).to.deep.equal({ id: 3, name: 'Herminia Witting', address: '85823 Bosco Fork, East Oscarstad MI 85126-5660', email: 'Elwin.Tromp@yahoo.com', strideLength: 4.4, dailyStepGoal: 5000, friends: [ 19, 11, 42, 33 ] });
  });

  it('should have a default average step goal property', function() {
    expect(userRepo.avgStepGoal).to.equal(null);
  });
  
  it('should be able to calculate the average daily step goal for all users', function() {
    const avgStepGoal = userRepo.retrieveAvgStepGoal();
    
    expect(avgStepGoal).to.equal(6667);
  });

  it('should be able to update average step goal property', function() {
    userRepo.retrieveAvgStepGoal();
    
    expect(userRepo.avgStepGoal).to.equal(6667);
  });
});
