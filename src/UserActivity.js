class UserActivity {
  constructor(user, activityData, usersData) {
    this.id = user.id;
    this.data = activityData.filter(entry => entry.userID === this.id);
    this.userData = usersData;
  }

  retrievePropByDate(date, property) {
    const dateRequested = this.data.find(entry => entry.date === date);

    return dateRequested[property];
  }

  retrievePropLogByWeek(startDate, property) {
    const index = this.data.findIndex(entry => entry.date === startDate);
    const weekLog = this.data.slice(index, index + 7);

    return weekLog.map(entry => entry[property]);
  }

  calculatePropAvg(property) {
    const dailySum = this.data.map(entry => entry[property]);
    const totalSum = dailySum.reduce((sum, num) => {
      return sum + num;
    });

    return Math.round(totalSum / dailySum.length);
  }

  calculatePropAvgByWeek(startDate, property) {
    const index = this.data.findIndex(entry => entry.date === startDate);
    const weekLog = this.data.slice(index, index + 7);
    const weeklyStats = weekLog.map(entry => entry[property]);
    const total = weeklyStats.reduce((sum, num) => {
      return sum + num;
    });

    return Math.round(total / 7);
  }

  calculateDailyMilesWalked(date) {
    const dateStats = this.data.find(entry => entry.date === date);
    dateStats.stride = this.userData[this.id - 1].strideLength;
    const feetWalked = dateStats.numSteps * dateStats.stride;
    const milesWalked = feetWalked / 5280;

    return parseFloat(milesWalked.toFixed(1));
  }

  evaluateStepGoalSuccess(date) {
    const dailyInfo = this.data.find(entry => entry.date === date);
    const userInfo = this.userData.find(entry => entry.id === this.id);

    return dailyInfo.numSteps >= userInfo.dailyStepGoal;
  }

  identifyDatesExceedingStepGoal() {
    const dailyStepGoal = this.userData[this.id - 1].dailyStepGoal;
    const stepGoalExceededDays = this.data.filter(entry => entry.numSteps > dailyStepGoal);

    return stepGoalExceededDays.map(entry => entry.date);
  }

  retrieveMaxFlightsClimbed() {
    const sortedEntries = this.data.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })
    const [ maxFlights ] = sortedEntries;

    return maxFlights.flightsOfStairs;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserActivity;
}
