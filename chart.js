const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: 'Sample Data',
      data: [12, 19, 3],
      backgroundColor: ['red', 'blue', 'yellow']
    }]
  }
});
