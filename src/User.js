class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.address = user.address;
    this.email = user.email;
    this.stride = user.strideLength;
    this.dailyStepGoal = user.dailyStepGoal;
    this.friends = user.friends;
  }

  returnFirstName() {
    const [ firstName, ...nameRemainder] = this.name.split(' ');
    return firstName;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}