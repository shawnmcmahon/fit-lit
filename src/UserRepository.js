// const User = require('../src/User');

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
    const stepGoalArray = this.userData.map(user => user.dailyStepGoal);
    const stepGoalSum = stepGoalArray.reduce((sum, goal) => {
      return sum + goal;
    });

    this.avgStepGoal = Math.round(stepGoalSum / this.userData.length);

    return this.avgStepGoal;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}