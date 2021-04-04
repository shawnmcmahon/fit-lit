// const ActivityEntry = require('../src/ActivityEntry');

class ActivityRepository {
  constructor(dataset) {
    this.activityData = [];
    this.userData = dataset;
  }

  populateActivityData(dataset) {
    this.activityData = dataset.map(entry => new ActivityEntry(entry));
  }

  retrieveUserPropertyByDate(id, date, property) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    const dateRequested = userLog.find(entry => entry.date === date);
    const userStat = dateRequested[property];

    return userStat;
  }

  retrieveUserPropertyByDate(id, date, property) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    const dateRequested = userLog.find(entry => entry.date === date);
    const userStat = dateRequested[property];

    return userStat;
  }

  retrieveUserPropertyByWeek(id, startDate, property) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    const index = userLog.findIndex(entry => entry.date === startDate);
    const weekLog = userLog.slice(index, index + 7);
    const propertyLog = weekLog.map(entry => entry[property]);

    return propertyLog;
  }

  retrieveAvgWeeklyActivity(id, startDate) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    const index = userLog.findIndex(entry => entry.date === startDate);
    const weekLog = userLog.slice(index, index + 7);

    const avgMinutesActive = this.calculateUserWeeklyAvg('minutesActive', weekLog);
    const avgFlightsClimbed = this.calculateUserWeeklyAvg('flightsOfStairs', weekLog);
    const avgSteps = this.calculateUserWeeklyAvg('numSteps', weekLog);

    const avgActivity = { avgSteps: avgSteps, avgMinutesActive: avgMinutesActive, avgFlightsClimbed: avgFlightsClimbed };
    return avgActivity;
  }

  calculateUserWeeklyAvg(property, dataset) {
    const weeklyStats = dataset.map(entry => entry[property]);
    const total = weeklyStats.reduce((sum, num) => {
      return sum + num;
    });
    const avg = Math.round(total / 7);
    return avg;
  }

  calculateDailyMilesWalked(id, date) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    const dailyStats = userLog.find(entry => entry.date === date);
    dailyStats.stride = this.userData[id-1].strideLength;
    const feetWalked = dailyStats.numSteps * dailyStats.stride;
    const milesWalked = feetWalked / 5280;

    return parseFloat(milesWalked.toFixed(1));
  }

  evaluateStepGoalSuccess(id, date) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    const dailyInfo = userLog.find(entry => entry.date === date);
    const userInfo = this.userData.find(entry => entry.id === id);

    return dailyInfo.numSteps >= userInfo.dailyStepGoal;
  }

  identifyDatesExceedingStepGoal(id) {
    const dailyStepGoal = this.userData[id-1].dailyStepGoal;
    const userLog = this.activityData.filter(entry => entry.id === id);
    const stepGoalExceededDays = userLog.filter(entry => entry.numSteps > dailyStepGoal);
    const days = stepGoalExceededDays.map(entry => entry.date) ;

    return days;
  }

  retrieveMaxFlightsClimbed(id) {
    const userLog = this.activityData.filter(entry => entry.id === id);
    let maxFlights;
    const newFlightBests = userLog.map(entry => entry.flightsOfStairs);
    maxFlights = Math.max(...newFlightBests);

    return maxFlights;
  }

  calculateAllUserPropertyAvgByDate(date, property) {
    const dataLog = this.activityData.filter(entry => entry.date === date);
    const propertyLog = dataLog.map(entry => entry[property]);
    const total = propertyLog.reduce((sum, num) => {
        return sum + num;
    });
    const propertyAvg = Math.round(total / dataLog.length);

    return propertyAvg;
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
