(function() {
  Polymer({
    is: 'hbar-chart-view',
    listeners: {
    },
    properties: {

    },
    ready: function() {

},
attached: function() {
  var data = [{
    type: 'bar',
    x: [20, 14, 23],
    y: ['giraffes', 'orangutans', 'monkeys'],
    orientation: 'h'
  }];

  Plotly.newPlot('myDivH1', data);
}
  });
})()
