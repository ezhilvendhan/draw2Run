(function() {
  Polymer({
    is: "notification-view",
    properties: {
      selected: {
        type: Number,
        value: 0
      },
      componentWidth: {
        type: Number,
        value: 350
      },
      finished: {
        type: String,
        notify: true,
        value: "",
        observer: "_finishChange"
      },
      createdDate: {
        type: String,
        value: moment()
          .subtract(2, "days")
          .format("DD MMMM YYYY")
      },
      caseTabs: {
        type: Array,
        value: [
          "INTERPRETATION",
          "CLOSURE",
          "ACTIONS",
          "ANALYSIS",
          "EVIDENCE",
          "NOTES",
          "SIMILAR CASES",
          "MAINTENANCE"
        ]
      },
      contributors: {
        type: Array,
        value: [
          {
            name: "Yasser",
            img: "contributors",
            unit: "Salam Field Manager"
          },
          {
            name: "Abdalla",
            img: "contributors",
            unit: "Khalda Inventory"
          },
          {
            name: "Ahmed S",
            img: "contributors",
            unit: "EGPC"
          }
        ]
      }
    },
    ready: function() {},
    attached: function() {
      // Forces from JS to change style of tabs#container#first-child protected class
      const tabContainer = Polymer.dom(this.$.tabs).node.children[0];
      const tabContainerNav = tabContainer.children[0];
      tabContainer.style.height = "100%";
      tabContainer.style.width = "205px";
      tabContainerNav.style.height = "100%";
      tabContainerNav.style.padding = 0;
      tabContainerNav.style.display = "inline-block";
      tabContainerNav.style.borderBottom = "none";

      this.componentWidth = this.parentWidth;

      var refreshId = setInterval(function() {
        var coll = tabContainerNav.getElementsByTagName("px-tab");
        if (coll.length > 0) {
          clearInterval(refreshId);
          var elem_arr = Array.prototype.slice.call(coll);
          elem_arr.forEach(function(child) {
            if (child.children[0]) {
              child.children[0].style.textAlign = "right";
            }
          });
        }
      }, 10000);
    },
    _finishChange: function() {},
    _openMWOmodal: function(e){
      console.log('updated');
      let modal = document.getElementById('mwoView');
      let drawer = document.getElementById('drawer');
      drawer.opened = false;
      modal.openModal();
    },
  });
})();
