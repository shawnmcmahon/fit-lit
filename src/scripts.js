const currentDate = "2019/09/22";
const weekStartDate = "2019/09/15";

// CLASS INSTANTIATIONS

let currentUser;
let userRepo;
let userHydration;
let userSleep;
let userActivity;
let sleepRepo;
let activityRepo;

// QUERY SELECTORS

const mainPage = document.getElementById('mainPage');
const headerBanner = document.getElementById('headerBanner');
const headerMessage = document.getElementById('headerMessage');

const homeGrid = document.getElementById('homeGrid');
const userInfo = document.getElementById('userInfo');
const picture = document.getElementById('picture');
const stepGoal = document.getElementById('stepGoal');

const hydrationGrid = document.getElementById('hydrationGrid');
const dailyWater = document.getElementById('dailyWater');
const weeklyWater = document.getElementById('weeklyWater');

const sleepGrid = document.getElementById('sleepGrid');
const dailySleep = document.getElementById('dailySleep');
const weeklySleep = document.getElementById('weeklySleep');
const avgSleep = document.getElementById('avgSleep');

const activityGrid  = document.getElementById('activityGrid');
const dailySteps = document.getElementById('dailySteps');
const weeklyActivity = document.getElementById('weeklyActivity');
const weeklySteps = document.getElementById('weeklySteps');
const compareUsers = document.getElementById('compareUsers');

const navBar = document.getElementById('navBar');
const homeButton = document.getElementById('homeButton');
const hydrationButton = document.getElementById('hydrationButton');
const sleepButton = document.getElementById('sleepButton');
const activityButton = document.getElementById('activityButton');

// EVENT LISTENERS

window.addEventListener('load', loadPage);
homeButton.addEventListener('click', viewHome);
hydrationButton.addEventListener('click', viewHydration);
sleepButton.addEventListener('click', viewSleep);
activityButton.addEventListener('click', viewActivity);

// FUNCTIONS

function loadPage() {
  userRepo = new UserRepository(userData);
  currentUser = new User(userRepo.retrieveUserData(getRandomIndex(userData)));
  userHydration = new UserHydration(currentUser, hydrationData);
  userSleep = new UserSleep(currentUser, sleepData);
  userActivity = new UserActivity(currentUser, activityData, userData);
  sleepRepo = new SleepRepository(sleepData, userData);
  activityRepo = new ActivityRepository(activityData);
  
  viewHome();
}

function getRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
}

// DOM MANIPULATION

// home

function displayUserHomeData() {
  currentUser.firstName = currentUser.returnFirstName();
  const avgStepGoal = userRepo.retrieveAvgStepGoal();

  headerMessage.innerText = `Welcome ${currentUser.firstName}`;

  userInfo.innerHTML = `
    <p class="name" id="name">${currentUser.name}</p>
    <p class="address" id="address">${currentUser.address}</p>
    <p class="email" id="email">${currentUser.email}</p>
    <p class="stride" id="stride">stride length: ${currentUser.stride}</p>`;

  stepGoal.innerHTML = `
    <p class="user-step-goal" id="userStepGoal">
      Your goal is ${currentUser.dailyStepGoal} steps</p>
    <p class="avg-step-goal" id="avgStepGoal">
      The average user's goal is ${avgStepGoal}</p>`;

  picture.innerHTML = `
    <p>Today's Date: ${currentDate}</p> 
  `;
}

// hydration

function displayUserHydrationData() {
  // will need input for user to choose startDate
  const startDate = "2019/06/15";

  headerMessage.innerText = `${currentUser.firstName}'s Hydration Data`;

  const dailyOz = userHydration.retrieveNumOuncesByDate(currentDate);
  const weeklyOz = userHydration.calculateAvgWeeklyWater(startDate);

  dailyWater.innerText = `You've had ${dailyOz} ounces of water today!`;
  weeklyWater.innerText = `You've had ${weeklyOz} ounces of water on average during the week of ${startDate}`;
}

// sleep

function displayUserSleepData() {
  headerMessage.innerText = `${currentUser.firstName}'s Sleep Data`;

  displayLastDaySleepData();
  displayLastWeekSleepData();
  displayAvgSleepData();
}

function displayLastDaySleepData() {
  const hoursSlept = userSleep.retrievePropByDate(currentDate, 'hoursSlept');
  const sleepQuality = userSleep.retrievePropByDate(currentDate, 'sleepQuality');

  dailySleep.innerHTML = `
    <p class="user-daily-sleep-time" id="userDailySleepTime">
      You last slept for ${hoursSlept} hours</p>
    <p class="user-daily-sleep-quality" class="userDailySleepQuality">
      Your sleep quality was ${sleepQuality}/5<p>`;
}

function displayLastWeekSleepData() {
  const userHoursSlept = userSleep.retrievePropByWeek(weekStartDate, "hoursSlept");
  const userAvgSleepQuality = userSleep.retrievePropByWeek(weekStartDate, "sleepQuality");

  weeklySleep.innerHTML = `
    <p class="user-weekly-sleep">
    Steps_D1: ${userHoursSlept[0]} hours slept, ${userAvgSleepQuality[0]} sleep quality rating;
    Steps_D2: ${userHoursSlept[1]} hours slept, ${userAvgSleepQuality[1]} sleep quality rating;
    Steps_D3: ${userHoursSlept[2]} hours slept, ${userAvgSleepQuality[2]} sleep quality rating;
    Steps_D4: ${userHoursSlept[3]} hours slept, ${userAvgSleepQuality[3]} sleep quality rating;
    Steps_D5: ${userHoursSlept[4]} hours slept, ${userAvgSleepQuality[4]} sleep quality rating;
    Steps_D6: ${userHoursSlept[5]} hours slept, ${userAvgSleepQuality[5]} sleep quality rating;
    Steps_D7: ${userHoursSlept[6]} hours slept, ${userAvgSleepQuality[6]} sleep quality rating;
    </p>`;
}

function displayAvgSleepData() {
  const avgHoursSlept = userSleep.calculatePropAvg('hoursSlept');
  const avgSleepQuality = userSleep.calculatePropAvg('sleepQuality');

  avgSleep.innerHTML = `
    <p class="user-avg-sleep-hours" id="userAvgSleepHours">
      AVERAGE HOURS SLEPT: ${avgHoursSlept}</p>
    <p class="user-avg-sleep-quality" id="userAvgSleepQuality">
      AVERAGE SLEEP QUALITY: ${avgSleepQuality}</p>`;
}

// activity

function displayUserActivityData() {
  headerMessage.innerText = `${currentUser.firstName}'s Activity Data`;

  displayDailySteps();
  displayMinutesActive();
  displayWeeklyActivityStats();
  displayDailyStatComparison();
}

function displayDailySteps() {
  const userDailySteps = userActivity.retrievePropByDate(currentDate, "numSteps");
  const userDistance = userActivity.calculateDailyMilesWalked(currentDate);
  dailySteps.innerHTML = `
    <p class="user-daily-steps" id="userDailySteps">
      ${userDailySteps} avg daily steps</p>
    <p class="user-daily-distance" id="userDailyDistance">
      ${userDistance} avg daily miles walked</p>`;
}

function displayMinutesActive() {
  const userMinActive = userActivity.retrievePropByDate(currentDate, "minutesActive");
  dailyActivity.innerHTML = `
    <p class="user-daily-activity" id="userDailyActivity">
      ${userMinActive} min active</p>`;
}

function displayWeeklyActivityStats() {
    const userWeeklySteps = userActivity.retrievePropLogByWeek("2019/09/15", "numSteps" )
    const userMinActive = userActivity.retrievePropLogByWeek("2019/09/15", "minutesActive");
    const userStairsClimbed = userActivity.retrievePropLogByWeek("2019/09/15", "flightsOfStairs");

  weeklyActivity.innerHTML = `
    <p class="user-weekly-activity" id="userWeeklyActivity">
      Steps_D1: ${userWeeklySteps[0]} steps, ${userMinActive[0]} min active, ${userStairsClimbed[0]} flights climbed,
      Steps_D2: ${userWeeklySteps[1]} steps, ${userMinActive[1]} min active, ${userStairsClimbed[1]} flights climbed,
      Steps_D3: ${userWeeklySteps[2]} steps, ${userMinActive[2]} min active, ${userStairsClimbed[2]} flights climbed,
      Steps_D4: ${userWeeklySteps[3]} steps, ${userMinActive[3]} min active, ${userStairsClimbed[3]} flights climbed,
      Steps_D5: ${userWeeklySteps[4]} steps, ${userMinActive[4]} min active, ${userStairsClimbed[4]} flights climbed,
      Steps_D6: ${userWeeklySteps[5]} steps, ${userMinActive[5]} min active, ${userStairsClimbed[5]} flights climbed,
      Steps_D7: ${userWeeklySteps[6]} steps, ${userMinActive[6]} min active, ${userStairsClimbed[6]} flights climbed,
    </p> `;
}

function displayDailyStatComparison() {
  const userDailySteps = userActivity.retrievePropByDate(currentDate, "numSteps");
  const userDailyMinActive = userActivity.retrievePropByDate(currentDate, "minutesActive");
  const userDailyStairs = userActivity.retrievePropByDate(currentDate, "flightsOfStairs");

  const allUserDailySteps = activityRepo.calculatePropAvgByDate(currentDate, "numSteps");
  const allUserDailyMinActive = activityRepo.calculatePropAvgByDate(currentDate, "minutesActive");
  const allUserDailyStairs = activityRepo.calculatePropAvgByDate(currentDate, "flightsOfStairs");

  const stepComparison = Math.round((userDailySteps / allUserDailySteps) * 100);
  const minComparison = Math.round((userDailyMinActive / allUserDailyMinActive) * 100);
  const stairComparison = Math.round((userDailyStairs / allUserDailyStairs) * 100);

  compareUsers.innerHTML = `
    <p class="compare-user-activity" id="compareUserActivity">
      Steps: ${stepComparison}%,
      Min: ${minComparison}%,
      Stairs: ${stairComparison}%</p>`;
}

// HTML TOGGLING

function viewHome() {
  displayUserHomeData()
  homeGrid.classList.remove('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.add('hidden');
};

function viewHydration() {
  displayUserHydrationData();
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.remove('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.add('hidden');
};

function viewSleep() {
  displayUserSleepData()
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.remove('hidden');
  activityGrid.classList.add('hidden');
};

function viewActivity() {
  displayUserActivityData()
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.remove('hidden');
};