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
    const userLog = this.activityData.filter(entry => entry.id === id);
    const dailyInfo = userLog.find(entry => entry.date === date);
    const numSteps = dailyInfo.numSteps;
    const userInfo = this.userData.find(entry => entry.id === id);
    const dailyStepGoal = userInfo.dailyStepGoal;

    if(numSteps >= dailyStepGoal) {
      return true;
    } else {
      return false;
    }

  }

  identifyDatesExceedingStepGoal(id) {
    const userInfo = this.userData.filter(enter => entry.id === id);
    const dailyStepGoal = userInfo.dailyStepGoal;
    const userLog = this.activityData.filter(enter => entry.id === id);
    const stepGoalExceededDays = userLog.filter(entry => entry.numSteps > dailyStepGoal);
    const days = stepGoalExceededDays.map(entry => entry.date) ;

    return days;


  }

  retrieveMostFlightsClimbed(id) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    let maxFlights;
    const newFlightBests = userLog.map(entry => entry.flightsOfStairs);
    maxFlights = Math.max(...newFlightBests);

    return maxFlights;

  }

  //All users
  calculateAvgStairsClimbedByDate(date) {
    const allUserLogs = this.activityData.filter(entry => entry.date === date);
    const allUserStairs = allUserLogs.map(entry => entry.flightsOfStairs);
    const totalStairsClimbed = allUserStairs.reduce((sum, stairs) => {
        return sum + stairs;
    });
    const avgStairsClimbed = Math.round(totalStairsClimbed / allUserStairs.length);

    return avgStairsClimbed;

  }

  calculateAvgStepsByDate(date) {
    const allUserLogs = this.activityData.filter(entry => entry.date === date);
    const allUserSteps = allUserLogs.map(entry => entry.numSteps);
    const totalStepsTaken = allUserSteps.reduce((sum, steps) => {
        return sum + steps;
    });
    const avgStepsTaken = Math.round(totalStepsTaken / allUserSteps.length);

    return avgStepsTaken;

  }

  calculateAvgMinutesActiveByDate(date) {

  }

}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
