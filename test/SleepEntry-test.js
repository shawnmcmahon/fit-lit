const chai = require('chai');
  const expect = chai.expect;

  const UserRepository = require('../src/UserRepository');
  const userData = require('./test-data/user-data');
  //const hydrationData = require('./test-data/hydration-data');
  const SleepEntry = require('../src/SleepEntry');
  const sleepData = require('./test-data/sleep-data');
  //const activityData = require('./test-data/activity-data');
