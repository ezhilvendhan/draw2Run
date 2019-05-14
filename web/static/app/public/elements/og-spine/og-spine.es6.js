(function() {
  Polymer({
    is: "og-spine",
    properties: {
      isFinished: {
        type: String,
        notify: true,
        value: ""
      }
    },
    ready: function() {},
    attached: function() {},
    _toggleCases: function(evt) {
      this.fire("toggleNotification", {
        headerHeight: document.getElementById("main-div").offsetHeight
      });
    }
  });
})();
