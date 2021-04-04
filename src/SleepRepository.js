class SleepRepository {
  constructor(sleepData, userData) {
    this.data = sleepData;
    this.userData = userData;
  }
  
// all users

  calculateAvgSleepQualityAllUsers() {
    const sleepQualityData = this.data.map(entry => entry.sleepQuality);    
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

    let userIDs = Object.keys(this.sleepData);
    
    // const index = sleeperLog.findIndex(entry => entry.date === startDate);
  }

  identifyBestSleeper() {
    let sleeper = this.data[0];
    this.data.forEach(entry => {
      if (entry.hoursSlept > sleeper.hoursSlept) {
        sleeper = entry;
      }
    });

    const bestSleepers = this.data.filter(entry =>
      entry.hoursSlept === sleeper.hoursSlept);
    
    bestSleepers.forEach(entry => {
      let id = entry.userID;
      entry.name = this.userData[id-1].name;
    })

    return bestSleepers;
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepRepository;
}