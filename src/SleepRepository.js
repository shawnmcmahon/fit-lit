class SleepRepository {
  constructor(sleepData, userData) {
    this.data = sleepData;
    this.userData = userData;
  }

  calculateAvgSleepQualityAllUsers() {
    const sleepQualityData = this.data.map(entry => entry.sleepQuality);    
    const total = sleepQualityData.reduce((sum, sleepQuality) => {
      return sum + sleepQuality;
    });
    const avgSleepQuality = Math.round(total / sleepQualityData.length);

    return avgSleepQuality;
  }

  calculatePropAvgByWeek(startDate, property) {
    const userIDs = this.data.map(user => user.userID);
    const numUsers = Math.max(...userIDs);
    const index = this.data.findIndex(entry => entry.date === startDate);
    const weekLog = this.data.slice(index, index + (7 * numUsers));

    const userAvgs = weekLog.reduce((avgAcc, entry) => {
      if (!avgAcc[entry.userID]) {
        avgAcc[entry.userID] = entry[property] / 7;
      } else {
        avgAcc[entry.userID] += entry[property] / 7;
      }
      return avgAcc;
    }, {});

    return userAvgs;
  }

  retrieveBestWeeklySleepers(startDate, property, minAmt) {
    const userAvgs = this.calculatePropAvgByWeek(startDate, property);
    const userKeys = Object.keys(userAvgs);
    const bestSleeperIDs = userKeys.filter(key => userAvgs[key] > minAmt);
    const bestSleepers = [];

    bestSleeperIDs.forEach(id => {
      let userID = parseInt(id);
      let avg = parseFloat(userAvgs[id].toFixed(1));
      let User = { 
        id: userID, 
        name: this.userData[id - 1].name, 
        weeklyAvg: avg,
      };
      bestSleepers.push(User);
    });

    return bestSleepers;
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
      entry.name = this.userData[id - 1].name;
    })

    return bestSleepers;
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepRepository;
}