const userWeeklyWaterGraph = document.querySelector('#user-weekly-water-graph');


const userWeeklyWater = new Chart(userWeeklyWaterGraph, {
  type: 'line',
  data: {
    labels: Object.keys(userHydration.retrievePropByWeek(userHydration.data[userHydration.data.length - 7] , 'numOunces')),
    datasets: [{
      label: 'Weekly Water Intake',
      data: Object.values(userHydration.retrievePropByWeek(userHydration.data[userHydration.data.length - 7] , 'numOunces'))

    }]
  },
  options: {
    legend: {
      display: false
    },
  }
});
