const userWeeklyWaterGraph = document.getElementById('userWeeklyWaterGraph');
const userWeeklySleepGraph = document.getElementById('userWeeklySleepGraph');

const userWeeklyWater = new Chart(userWeeklyWaterGraph, {
  type: 'bar',
  data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [{
            label: 'Ounces of Water',
            backgroundColor: 'lightblue',
            // borderColor: 'rgb(255, 99, 132)',
            data: [60, 50, 20, 30, 80, 70, 40],
            // data: userHydration.retrieveNumOzByWeek(weekStartDate);
        }]
  },
  options: {
    legend: {
      display: false
    },
  }
});

const userWeeklySleep = new Chart(userWeeklySleepGraph, {
  type: 'line',
     data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [{
            label: 'Hours of Sleep',
            backgroundColor: 'lightblue',
            data: [6.5, 4.7, 8.2, 7.0, 5.9, 6.9, 8.5],
            // data: userSleep.retrievePropByWeek(weekStartDate, 'hoursSlept');
        }]
  },
  options: {
    legend: {
      display: true
    },
  }
});