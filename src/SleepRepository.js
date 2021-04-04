const SleepEntry = require('../src/SleepEntry');

class SleepRepository {
  constructor(dataset) {
    this.sleepData = [];
    this.userData = dataset;
  }

  populateSleepData(dataset) {
    this.sleepData = dataset.map(entry => new SleepEntry(entry));
  }

  // single user

  calculateUserAvg(id, property) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const dailySum = userLog.map(entry => entry[property]);
    const totalSum = dailySum.reduce((sum, num) => {
      return sum + num;
    });
    const avgAmount = totalSum / dailySum.length;

    return parseFloat(avgAmount.toFixed(1));
  }

  retrieveUserPropertyByDate(id, date, property) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const entry = userLog.find(entry => entry.date === date)
    return entry[property];
  }

  retrieveUserPropertyByWeek(id, startDate, property) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const index = userLog.findIndex(entry => entry.date === startDate);
    const weekLog = userLog.slice(index, index + 7);
    const propertyLog = weekLog.map(entry => entry[property]);

    return propertyLog;
  }
  
// all users

  calculateAvgSleepQualityAllUsers() {
    const sleepQualityData = this.sleepData.map(entry => entry.sleepQuality);    
    const total = sleepQualityData.reduce((sum, sleepQuality) => {
      return sum + sleepQuality;
    });
    const avgSleepQuality = Math.round(total / sleepQualityData.length);

    return avgSleepQuality;
  }

  retrieveQualitySleepers(startDate) {
    /* map data, and count the number of users. 
    identify starting index by date match, then
    slice out entries starting with index and 
    spanning the index + the number of users * 7.
    use reduce() on new array to figure out average
    sleep quality for each user and store.
    for any users with avg  > 3,
    store name in new array and return */
    
    // const index = sleeperLog.findIndex(entry => entry.date === startDate);
  }

  identifyBestSleeper() {
    let sleeper = this.sleepData[0];
    this.sleepData.forEach(entry => {
      if (entry.hoursSlept > sleeper.hoursSlept) {
        sleeper = entry;
      }
    });
    const bestSleepers = this.sleepData.filter(entry =>
      entry.hoursSlept === sleeper.hoursSlept);
    
    bestSleepers.forEach(entry => {
      let id = entry.id;
      entry.name = this.userData[id-1].name;
    })

    return bestSleepers;
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepRepository;
}