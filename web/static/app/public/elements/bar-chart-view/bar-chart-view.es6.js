(function() {
  Polymer({
    is: 'bar-chart-view',
    listeners: {
    },
    properties: {

    },
    ready: function() {

},
attached: function() {
  var data = [
  {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [20, 14, 23],
    type: 'bar'
  }
];

Plotly.newPlot('myDiv1', data);
}
  });
})()
