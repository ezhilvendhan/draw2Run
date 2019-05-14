(function() {
  Polymer({
    is: 'pie-chart-view',
    listeners: {
    },
    properties: {
      elementid:{
        type: String
      }
    },
    ready: function() {

},
attached: function() {
  var data = [{
values: [19, 26, 55],
labels: ['Residential', 'Non-Residential', 'Utility'],
type: 'pie'
}];

var layout = {
height: 400,
width: 500
};

Plotly.newPlot(this.elementid, data, layout);
}
  });
})()
