// const User = require('./User');

class UserRepository {
  constructor() {
    this.userData = [];
    this.avgStepGoal = null;
  }

  populateUserData(dataset) {
    this.userData = dataset.map(user => new User(user));
  }

  retrieveUserData(id) {
    return this.userData[id - 1];
  }

  retrieveAvgStepGoal() {
    const stepGoalLog= this.userData.map(user => user.dailyStepGoal);
    const stepGoalSum = stepGoalLog.reduce((sum, goal) => {
      return sum + goal;
    });

    this.avgStepGoal = Math.round(stepGoalSum / stepGoalLog.length);

    return this.avgStepGoal;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}