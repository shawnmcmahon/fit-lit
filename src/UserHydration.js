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
  
    return Math.round(totalOunces / this.data.length);
  }

  calculateAvgWeeklyWater(startDate) {
    const index = this.data.findIndex(entry => entry.date === startDate);   
    const weekLog = this.data.slice(index, index + 7);
    const waterLog = weekLog.map(entry => entry.numOunces);
    const totalOunces = waterLog.reduce((sumOz, numOz) => {
      return sumOz + numOz;
    });

    return Math.round(totalOunces / 7);
  }

  retrieveNumOzByDate(date) {
    const entry = this.data.find(entry => entry.date === date)
    
    return entry.numOunces;
  }

  retrieveNumOzByWeek(startDate) {
    const index = this.data.findIndex(entry => entry.date === startDate);
    const weekLog = this.data.slice(index, index + 7);

    return weekLog.map(entry => entry.numOunces);
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserHydration;
}