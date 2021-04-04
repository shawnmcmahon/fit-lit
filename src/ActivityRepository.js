const ActivityEntry = require('../src/ActivityEntry');

class ActivityRepository {
  constructor(dataset) {
    this.activityData = [];
    this.userData = dataset;
  }

  populateActivityData(dataset) {
    this.activityData = dataset.map(entry => new ActivityEntry(entry));
  }

  // single user
  calculateDailyMilesWalked(id, date) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    const dailyStats = userLog.find(entry => entry.date === date);
    dailyStats.stride = this.userData[id-1].strideLength;
    const feetWalked = dailyStats.numSteps * dailyStats.stride;
    const milesWalked = feetWalked / 5280;


    return parseFloat(milesWalked.toFixed(1));

  }

  retrieveMinutesActive(id, date) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    const dateRequested = userLog.find(entry => entry.date === date);
    const minutesActive = dateRequested.minutesActive;
    return minutesActive;

  }

  retrieveAvgWeeklyActivity(id, startDate) {

  }

  evaluateStepGoalSuccess(id, date) {



  }

  identifyDatesExceedingStepGoal(id) {


  }

  retrieveMostFlightsClimbed(id) {

  }

  //All users
  calculateAvgStairsClimbedByDate(date) {

  }

  calculateAvgStepsByDate(date) {

  }

  calculateAvgMinutesActiveByDate(date) {

  }

}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
