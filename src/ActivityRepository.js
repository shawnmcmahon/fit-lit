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
    const userLog = this.activityData.filter(entry => entry.id === id);
    const index = userLog.findIndex(entry => entry.date === startDate);
    const weekLog = userLog.slice(index, index + 7);
    const weeklyMinutesActive = weekLog.map(entry => entry.minutesActive);
    const weeklyStairsClimbed = weekLog.map(entry => entry.flightsOfStairs);
    const weeklyStepsTaken = weekLog.map(entry => entry.numSteps);
    const totalMinutesActive = weeklyMinutesActive.reduce((sumMin, minActive) => {
      return sumMin + minActive
    });
    const avgMinutesActive = Math.round(totalMinutesActive / 7);
    const totalStairsClimbed = weeklyStairsClimbed.reduce((sumStairs, stairs) => {
      return sumStairs + stairs
    });
    const avgStairsClimbed = Math.round(totalStairsClimbed / 7);
    const totalStepsTaken = weeklyStepsTaken.reduce((sumSteps, steps) => {
      return sumSteps + steps
    });
    const avgStepsTaken = Math.round(totalStepsTaken / 7);
    const avgActivity = {avgMinutes: avgMinutesActive, avgStairs: avgStairsClimbed, avgSteps: avgStepsTaken};
    return avgActivity;

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
