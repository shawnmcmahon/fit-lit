class UserHydration {
  constructor(user, dataset) {
    this.id = user.id;
    this.data = dataset.filter(entry => entry.userID === this.id);
  }
    
  calculateAvgDailyWater() {
    const dailyOunces = this.data.map(entry => entry.numOunces);
    const totalOunces = dailyOunces.reduce((sumOz, numOz) => {
      return sumOz + numOz;
    });
    const avgOunces = Math.round(totalOunces / this.data.length);

    return avgOunces;
  }

  retrieveNumOuncesByDate(date) {
    const entry = this.data.find(entry => entry.date === date)
    return entry.numOunces;
  }

  calculateAvgWeeklyWater(startDate) {
    const index = this.data.findIndex(entry => entry.date === startDate);   
    const weekLog = this.data.slice(index, index + 7);
    const waterLog = weekLog.map(entry => entry.numOunces);
    const totalOunces = waterLog.reduce((sumOz, numOz) => {
      return sumOz + numOz;
    });
    const avgOunces = Math.round(totalOunces / 7);

    return avgOunces;
  }

  retrieveNumOzByWeek(startDate) {
    const index = this.data.findIndex(entry => entry.date === startDate);
    const weekLog = this.data.slice(index, index + 7);
    const ozLog = weekLog.map(entry => entry.numOunces);

    return ozLog;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserHydration;
}