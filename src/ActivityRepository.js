// const ActivityEntry = require('../src/ActivityEntry');

class ActivityRepository {
  constructor(dataset) {
    this.activityData = [];
    this.userData = dataset;
  }

  populateActivityData(dataset) {
    this.activityData = dataset.map(entry => new ActivityEntry(entry));
  }

  // single user

  calculateDailyMilesWalked(date) {
    /* identify element in this.activityLog by date,
    multiply numSteps by strideLength for distance in feet,
    convert to miles + remainder feet, and return */
  }

  retrieveAvgWeeklyMinutesActive(startDate) {
    /* for each this.activityLog element between
    startDate and startDate + 7, accumulate minutesActive,
    divide by this.activityLog.length, and return */
  }

  evaluateStepGoalSuccess(date) {
    /* identify element in this.activityLog by date,
    evaluate whether numSteps is >= dailyStepGoal,
    return Boolean */
  }

  identifyDatesExceedingStepGoal() {
    /* filter() through activityLog array and evaluate/identify
    dates where numSteps > this.dailyStepGoal */
  }

  retrieveMostFlightsClimbed() {
    /* declare let maxFlights variable and assign value of
    this.activityLog[0].flightsOfStairs, iterate through array and if
    this.activityLog[i].flightsOfStairs > maxFlights,
    maxFlights = this.ActivityArray[i].flightsOfStairs,
    then return maxFlights */
  }

  // all users

  retrieveMinutesActive(id, date) {
    /* retrieve minuteActive property by provided user ID and date */
  }

  calculateAvgStairsClimbedByDate(date) {
    /* filter through activity.js dataset to identify
    all elements with provided date, accumulate value of
    flightsOfStairs for each, divide by number of elements
    within that date, return value */
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