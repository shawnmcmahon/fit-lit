const chai = require('chai');
const expect = chai.expect;

const HydrationRepository = require('../src/HydrationRepository');
const hydrationData = require('./test-data/hydration-data');

describe('HydrationRepository', function() {
  let hydrationRepo;

  beforeEach(() => {
    hydrationRepo = new HydrationRepository();
    hydrationRepo.populateHydrationData(hydrationData);
  });

  it("should store a hydrationData array", function() {
    expect(hydrationRepo.hydrationData).to.be.an('array');
  });

  it("should be able to store a HydrationEntry instance", function() {
    expect(hydrationRepo.hydrationData[0]).to.deep.equal({ id: 1, date: '2019/06/15', numOunces: 37 });
  });

  it("should calculate the average daily water intake for all users", function() {
    const avgDailyWater = hydrationRepo.calculateAvgDailyWater();

    expect(avgDailyWater).to.equal(61);
  });

  it("should be able to retrieve the ounces drank by a user on a specific date", function() {
    const numOunces1 = hydrationRepo.retrieveNumOuncesByDate(1, '2019/06/18');
    const numOunces2 = hydrationRepo.retrieveNumOuncesByDate(2, '2019/06/16');
    const numOunces3 = hydrationRepo.retrieveNumOuncesByDate(3, '2019/06/20');

    expect(numOunces1).to.equal(61);
    expect(numOunces2).to.equal(91);
    expect(numOunces3).to.equal(51);
  });

  it("should calculate the average daily water intake for a user over the course of a week", function() {
    const avgWeeklyWater1 = hydrationRepo.calculateAvgWeeklyWater(1, '2019/06/15');
    const avgWeeklyWater2 = hydrationRepo.calculateAvgWeeklyWater(2, '2019/06/16');
    const avgWeeklyWater3 = hydrationRepo.calculateAvgWeeklyWater(3, '2019/06/17');

    expect(avgWeeklyWater1).to.equal(65);
    expect(avgWeeklyWater2).to.equal(70);
    expect(avgWeeklyWater3).to.equal(51);
  });
});