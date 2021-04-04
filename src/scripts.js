// global variables

let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;
let currentUser;
let currentDate = "2019/09/22";

const mainPage = document.querySelector('#mainPage');
const headerBanner = document.querySelector('#headerBanner');
const headerMessage = document.querySelector('#headerMessage');

const homeGrid = document.querySelector('#homeGrid');
const userInfo = document.querySelector('#userInfo');
const picture = document.querySelector('#picture');
const stepGoal = document.querySelector('#stepGoal');

const hydrationGrid = document.querySelector('#hydrationGrid');
const dailyWater = document.querySelector('#dailyWater');
const weeklyWater = document.querySelector('#weeklyWater');

const sleepGrid = document.querySelector('#sleepGrid');
const dailySleep = document.querySelector('#dailySleep');
const weeklySleep = document.querySelector('#weeklySleep');
const avgSleep = document.querySelector('#avgSleep');

const activityGrid  = document.querySelector('#activityGrid');
const dailySteps = document.querySelector('#dailySteps');
const weeklyActivity = document.querySelector('#weeklyActivity');
const weeklySteps = document.querySelector('#weeklySteps');
const compareUsers = document.querySelector('#compareUsers');

const navBar = document.querySelector('#navBar');
const homeButton = document.querySelector('#homeButton');
const hydrationButton = document.querySelector('#hydrationButton');
const sleepButton = document.querySelector('#sleepButton');
const activityButton = document.querySelector('#activityButton');

// event listeners
homeButton.addEventListener('click', viewHome);
hydrationButton.addEventListener('click', viewHydration);
sleepButton.addEventListener('click', viewSleep);
activityButton.addEventListener('click', viewActivity);
window.addEventListener('load', loadPage);


// data model functions
function loadPage() {
  populateRepositories();
  currentUser = userRepo.userData[0];
  viewHome();
}

function populateRepositories() {
  userRepo = new UserRepository;
  hydrationRepo = new HydrationRepository;
  sleepRepo = new SleepRepository(userData);
  activityRepo = new ActivityRepository(userData);

  userRepo.populateUserData(userData);
  hydrationRepo.populateHydrationData(hydrationData);
  sleepRepo.populateSleepData(sleepData);
  activityRepo.populateActivityData(activityData);
}

// DOM functions

// HOME

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
}

// HYDRATION

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

// SLEEP

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
  // may need functionality to determine startDate of latest week
  const startDate = "2019/09/15";
  const weekHrsSlept = sleepRepo.retrieveUserPropertyByWeek(id, startDate, 'hoursSlept');
  const weekSleepQuality = sleepRepo.retrieveUserPropertyByWeek(id, startDate, 'sleepQuality');

  weeklySleep.innerHTML = `
    <h2 class="user-weekly-sleep">
      LATEST WEEK SLEEP DATA:
      Hours Slept Per Day: ${weekHrsSlept}
      Sleep Quality Per Day${weekSleepQuality}
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

// ACTIVITY

function displayUserActivityData() {
  const id = currentUser.id;

  headerMessage.innerText = `${currentUser.firstName}'s Activity Data`;

  // helper functions
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
    <h4 class="user-daily-activity" id="userDailyActivity">${userMinActive} min active</h4>`;

}

function displayWeeklyActivityStats(id) {
    const userWeeklySteps = activityRepo.retrieveUserPropertyByWeek(id, "2019/09/15", "numSteps" )
    const userMinActive = activityRepo.retrieveUserPropertyByWeek(id, "2019/09/15", "minutesActive")
    const userStairsClimbed = activityRepo.retrieveUserPropertyByWeek(id, "2019/09/15", "flightsOfStairs")
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





// HTML view togglers

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
