// GLOBAL VARIABLES

let currentDate = "2019/09/22";
let weekStartDate = "2019/09/15";

// CLASS INSTANTIATIONS

let userRepo;
let currentUser;
let hydrationRepo;
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
  console.log(currentUser);
  viewHome();
}

function getRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
}

// function populateRepositories() {
  // hydrationRepo = new HydrationRepository;
  // sleepRepo = new SleepRepository(userData);
  // activityRepo = new ActivityRepository(userData);

  // userRepo.populateUserData(userData);
  // hydrationRepo.populateHydrationData(hydrationData);
  // sleepRepo.populateSleepData(sleepData);
  // activityRepo.populateActivityData(activityData);
// }

// DOM MANIPULATION

// home

function displayUserHomeData() {
  currentUser.firstName = currentUser.returnFirstName();
  const avgStepGoal = userRepo.retrieveAvgStepGoal();

  headerMessage.innerText = `Welcome ${currentUser.firstName}`;

  userInfo.innerHTML = `
    <h4 class="name" id="name">${currentUser.name}</h4>
    <h4 class="address" id="address">${currentUser.address}</h4>
    <h4 class="email" id="email">${currentUser.email}</h4>
    <h4 class="stride" id="stride">stride length: ${currentUser.stride}</h4>`;

  stepGoal.innerHTML = `
    <h2 class="user-step-goal" id="userStepGoal">
      Your goal is ${currentUser.dailyStepGoal} steps</h2>
    <h2 class="avg-step-goal" id="avgStepGoal">
      The average user's goal is ${avgStepGoal}</h2>`;

  picture.innerHTML = `
    <p>Today's Date: </p> 
  `;
}

// hydration

function displayUserHydrationData() {
  // will need input for user to choose startDate
  const startDate = "2019/06/15";

  headerMessage.innerText = `${currentUser.firstName}'s Hydration Data`;

  const id = currentUser.id
  const dailyOz = hydrationRepo.retrieveNumOuncesByDate(id, currentDate);
  const weeklyOz = hydrationRepo.calculateAvgWeeklyWater(id, startDate);

  dailyWater.innerText = `You've had ${dailyOz} ounces of water today!`;
  weeklyWater.innerText = `You've had ${weeklyOz} ounces of water on average during the week of ${startDate}`;
}

// sleep

function displayUserSleepData() {
  const id = currentUser.id;

  headerMessage.innerText = `${currentUser.firstName}'s Sleep Data`;

  displayLastDaySleepData(id);
  displayLastWeekSleepData(id);
  displayAvgSleepData(id);
}

function displayLastDaySleepData(id) {
  const hoursSlept = sleepRepo.retrieveUserPropertyByDate(id, currentDate, 'hoursSlept');
  const sleepQuality = sleepRepo.retrieveUserPropertyByDate(id, currentDate, 'sleepQuality');

  dailySleep.innerHTML = `
    <h4 class="user-daily-sleep-time" id="userDailySleepTime">
      You last slept for ${hoursSlept} hours</h4>
    <h4 class="user-daily-sleep-quality" class="userDailySleepQuality">
      Your sleep quality was ${sleepQuality}/5<h4>`;
}

function displayLastWeekSleepData(id) {
  const userHoursSlept = sleepRepo.retrieveUserPropertyByWeek(id, weekStartDate, "hoursSlept" )
  const userAvgSleepQuality = sleepRepo.retrieveUserPropertyByWeek(id, weekStartDate, "sleepQuality")

  weeklySleep.innerHTML = `
    <h2 class="user-weekly-sleep">
    Steps_D1: ${userHoursSlept[0]} hours slept, ${userAvgSleepQuality[0]} sleep quality rating;
    Steps_D2: ${userHoursSlept[1]} hours slept, ${userAvgSleepQuality[1]} sleep quality rating;
    Steps_D3: ${userHoursSlept[2]} hours slept, ${userAvgSleepQuality[2]} sleep quality rating;
    Steps_D4: ${userHoursSlept[3]} hours slept, ${userAvgSleepQuality[3]} sleep quality rating;
    Steps_D5: ${userHoursSlept[4]} hours slept, ${userAvgSleepQuality[4]} sleep quality rating;
    Steps_D6: ${userHoursSlept[5]} hours slept, ${userAvgSleepQuality[5]} sleep quality rating;
    Steps_D7: ${userHoursSlept[6]} hours slept, ${userAvgSleepQuality[6]} sleep quality rating;
    </h2>`;
}

function displayAvgSleepData(id) {
  const avgHoursSlept = sleepRepo.calculateUserAvg(id, 'hoursSlept');
  const avgSleepQuality = sleepRepo.calculateUserAvg(id, 'sleepQuality');

  avgSleep.innerHTML = `
    <h4 class="user-avg-sleep-hours" id="userAvgSleepHours">
      AVERAGE HOURS SLEPT: ${avgHoursSlept}</h4>
    <h4 class="user-avg-sleep-quality" id="userAvgSleepQuality">
      AVERAGE SLEEP QUALITY: ${avgSleepQuality}</h4>`;
}

// activity

function displayUserActivityData() {
  const id = currentUser.id;

  headerMessage.innerText = `${currentUser.firstName}'s Activity Data`;

  displayDailySteps(id);
  displayMinutesActive(id);
  displayWeeklyActivityStats(id);
}

function displayDailySteps(id) {
  const userDailySteps = activityRepo.retrieveUserPropertyByDate(id, currentDate, "numSteps");
  const userDistance = activityRepo.calculateDailyMilesWalked(id, currentDate);
  dailySteps.innerHTML = `
    <h4 class="user-daily-steps" id="userDailySteps">
      ${userDailySteps} steps</h4>
    <h4 class="user-daily-distance" id="userDailyDistance">
      ${userDistance} distance</h4>`
}

function displayMinutesActive(id) {
  const userMinActive = activityRepo.retrieveUserPropertyByDate(id, currentDate, "minutesActive");
  dailyActivity.innerHTML = `
    <h4 class="user-daily-activity" id="userDailyActivity">
      ${userMinActive} min active</h4>`;
}

function displayWeeklyActivityStats(id) {
    const userWeeklySteps = activityRepo.retrieveUserPropertyByWeek(id, weekStartDate, "numSteps" )
    const userMinActive = activityRepo.retrieveUserPropertyByWeek(id, weekStartDate, "minutesActive")
    const userStairsClimbed = activityRepo.retrieveUserPropertyByWeek(id, weekStartDate, "flightsOfStairs")
  weeklyActivity.innerHTML = `
    <h4 class="user-weekly-activity" id="userWeeklyActivity">
    Steps_D1: ${userWeeklySteps[0]} steps, ${userMinActive[0]} min active, ${userStairsClimbed[0]} flights climbed,
    Steps_D2: ${userWeeklySteps[1]} steps, ${userMinActive[1]} min active, ${userStairsClimbed[1]} flights climbed,
    Steps_D3: ${userWeeklySteps[2]} steps, ${userMinActive[2]} min active, ${userStairsClimbed[2]} flights climbed,
    Steps_D4: ${userWeeklySteps[3]} steps, ${userMinActive[3]} min active, ${userStairsClimbed[3]} flights climbed,
    Steps_D5: ${userWeeklySteps[4]} steps, ${userMinActive[4]} min active, ${userStairsClimbed[4]} flights climbed,
    Steps_D6: ${userWeeklySteps[5]} steps, ${userMinActive[5]} min active, ${userStairsClimbed[5]} flights climbed,
    Steps_D7: ${userWeeklySteps[6]} steps, ${userMinActive[6]} min active, ${userStairsClimbed[6]} flights climbed,
     </h4> `;
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