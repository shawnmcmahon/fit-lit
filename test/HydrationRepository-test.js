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
});