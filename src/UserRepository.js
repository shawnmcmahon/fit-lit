class UserRepository {
  constructor(userData) {
    this.data = userData;
    this.avgStepGoal = null;
  }

  retrieveUserData(id) {
    return this.data[id - 1];
  }

  retrieveAvgStepGoal() {
    const stepGoalLog = this.data.map(user => user.dailyStepGoal);
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