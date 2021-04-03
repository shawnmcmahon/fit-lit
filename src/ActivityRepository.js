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

  retrieveAvgWeeklyMinutesActive(id, startDate) {
    /* for each this.activityLog element between
    startDate and startDate + 7, accumulate minutesActive,
    divide by this.activityLog.length, and return */
    // const userLog = this.activityData.filter(entry => entry.id === id);
    // const index = userLog.findIndex(entry => entry.date === startDate);
    // const weekLog = userLog.slice(index, index + 7);
    // const activityLog = weekLog.map(entry => entry.minutesActive);
    // const totalMinutesActive = activityLog.reduce((sumMin, minActive) => {
    //
    //   return sumMin + minActive
    // });
    //
    // const avgMinutesActive = Math.round(totalMinutesActive / 7);
    //
    // return avgMinutesActive;

  }


  evaluateStepGoalSuccess(id, date) {
    /* identify element in this.activityLog by date,
    evaluate whether numSteps is >= dailyStepGoal,
    return Boolean */
    // const userLog = this.activityData.filter(enter => entry.id === id);
    // const entry = userLog.find(entry => entry.date === date);
    // const numSteps = entry.numSteps;
    // const userInfo = this.userData.filter(enter => entry.id === id);
    // const dailyStepGoal = userInfo.dailyStepGoal;
    //
    // if(numSteps >= dailyStepGoal) {
    //   return true;
    // } else {
    //   return false;
    // }

  }

  identifyDatesExceedingStepGoal(id) {
    /* filter() through activityLog array and evaluate/identify
    dates where numSteps > this.dailyStepGoal */
    // const userInfo = this.userData.filter(enter => entry.id === id);
    // const dailyStepGoal = userInfo.dailyStepGoal;
    // const userLog = this.activityData.filter(enter => entry.id === id);
    // const stepGoalExceededDays = userLog.filter(entry => entry.numSteps > dailyStepGoal);
    // const days = stepGoalExceededDays.map(entry => entry.date) ;
    //
    // return days;


  }

  retrieveMostFlightsClimbed(id) {
    /* declare let maxFlights variable and assign value of
    this.activityLog[0].flightsOfStairs, iterate through array and if
    this.activityLog[i].flightsOfStairs > maxFlights,
    maxFlights = this.ActivityArray[i].flightsOfStairs,
    then return maxFlights */
    // const userLog = this.activityData.filter(enter => entry.id === id);
    // let maxFlights = userLog.flightsOfStairs[0];
    // const newFlightBests = userLog.map(entry => entry.flightsOfStairs > maxFlights);
    // //does newFlightBests just have flightOfStairs or all data from that day?
    // maxFlights = Math.max(...newFlightBests);
    //
    // return maxFlights;

  }

  // all Users

  retrieveMinutesActive(id, date) {
    /* retrieve minuteActive property by provided user ID and date */
    // const userLog = this.activityData.filter(entry => entry.id === id);
    // const dateRequested = userLog.find(entry => entry.date === date);
    // const minutesActive = dateRequested.minutesActive;
    //
    // return minutesActive;

  }

  calculateAvgStairsClimbedByDate(date) {
    /* filter through activity.js dataset to identify
    all elements with provided date, accumulate value of
    flightsOfStairs for each, divide by number of elements
    within that date, return value */
    // const allUserLogs = this.activityData.filter(entry => entry.date === date);
    // const allUserStairs = allUserLogs.map(entry => entry.flightsOfStairs);
    // const totalStairsClimbed = allUserStairs.reduce((sum, stairs) => {
    //     return sum + stairs;
    // });
    //
    // const avgStairsClimbed = totalStairsClimbed / allUserStairs.length;
    //
    // return avgStairsClimbed;

  }

  calculateAvgStepsByDate(date) {
    /* filter through the activity.js dataset to identify
    all elements with provided date, accumulate value of
    numSteps for each, divide by the number of elements
    within that date, return value */
  }

  calculateAvgMinutesActiveByDate(date) {
    /* iterate through the activity.js dataset,
    and add minutes active from all users on a specific day,
    and divide by the number of users */
  }

}
if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
