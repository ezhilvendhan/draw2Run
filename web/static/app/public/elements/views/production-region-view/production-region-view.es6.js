(function() {
  Polymer({
    is: "production-region-view",
    properties: {
      dropdownItems: {
        type: Array,
        value: [
          {
            key: "1",
            val: "Gasoline 80",
            selected: true
          },
          {
            key: "2",
            val: "Gasoline 92"
          },
          {
            key: "3",
            val: "Gasoline 95"
          },
          {
            key: "4",
            val: "Mazut"
          },
          {
            key: "5",
            val: "Diesel"
          }
        ]
      }
    },
    ready: function() {
      this._renderPlotlyBubbleTime();
    },
    attached: function() {
      this._renderPlotlyBubbleTime();

      let treePlot = this.$.plotlyBubbleTime;

      window.addEventListener(
        "resize",
        function() {
          // console.log("resize!", treePlot.offsetWidth, treePlot.offsetHeight);
          Plotly.relayout(treePlot, {
            width: treePlot.offsetWidth - 10,
            height: treePlot.offsetHeight
          });
        },
        true
      );
    },
    _renderPlotlyBubbleTime: function() {
      let y = [
        "Alexandria",
        "Giza",
        "Sharqyea",
        "Cairo",
        "Behera",
        ""
        // "Assiut",
        // "Behera",
        // "Daqahleya",
        // "Fayoum",
        // "Monofeya",
        // "Menya",
        // "Sohag",
        // "Kafr Sheikh",
        // "Damietta",
        // "Ismaliya"
      ];
      //let x = [772, 1177, 550, 2221, 535, 228, 506, 468, 173, 335, 207, 193, 212, 183, 235];
      let x = [417, 457, 410, 627, 401, 400];
      var trace1 = {
        x: x,
        y: y,
        mode: "markers+text",
        textposition: "top center",
        textfont: {
          size: 12
        },
        hoverinfo: "x",
        text: [
          y[0] + "<br>" + x[0],
          y[1] + "<br>" + x[1],
          y[2] + "<br>" + x[2],
          y[3] + "<br>" + x[3],
          y[4] + "<br>" + x[4],
          ""
        ],
        marker: {
          size: [41, 45, 41, 62, 40, 0],
          color: [
            "rgba(10, 110, 180, .8)",
            "rgba(10, 120, 0, .8)",
            "rgba(10, 18, 180, .8)",
            "rgba(0, 180, 180, .8)",
            "rgba(10, 180, 10, .8)",
            "rgba(10, 180, 10, 1)"
          ]
        }
      };

      // var trace2 = {
      //   x: ['Gulf of Suez', 'Mediterranean','Western Desert','Nile Delta','Eastern Desert','Upper Egypt','Sinai','Total'],
      //   y: [122.18, 218.46, 649.15, 242.36, 61.81, 119, 151.42,  1564.38 ],
      //   mode: "markers+text",
      //   textposition: "auto",
      //   hoverinfo: "none",
      //   marker: {
      //     size: [16,46,64,28,8,3,6,180]
      //   }
      // };

      var data = [trace1];
      // var months = [
      //   "Dec 16",
      //   "Jan 17",
      //   "Feb 17",
      //   "Mar 17",
      //   "Apr 17",
      //   "May 17",
      //   "Jun 17",
      //   "July 17",
      //   "Aug 17",
      //   "Sep 17",
      //   "Oct 17",
      //   "Nov 17",
      //   "Dec 17",
      //   "Jan 18",
      //   "Feb 18",
      //   "Mar 18",
      //   "Apr 18"
      // ];
      // var stepsVar = [];
      // months.forEach(function(value) {
      //   stepsVar.push({
      //     label: value,
      //     method: "animate",
      //     args: [
      //       [value],
      //       {
      //         mode: "immediate",
      //         frame: {
      //           redraw: false,
      //           duration: 500
      //         },
      //         transition: {
      //           duration: 500
      //         }
      //       }
      //     ]
      //   });
      // });

      let bubbePlot = this.$.plotlyBubbleTime;
      let newHeight =
        bubbePlot.offsetHeight - 20 < 430 ? 430 : bubbePlot.offsetHeight - 20;
      let fallbackWidth =  window.innerWidth*0.3-40;

      let layout = {
        barmode: "stack",
        type: "scatter",
        hovermode: "closest",
        // showlegend: true,
        // legend: { orientation: "h" },
        height: newHeight,
        width: bubbePlot.offsetWidth||fallbackWidth,
        margin: {
          l: 20,
          r: 10,
          b: 60,
          t: 0,
          pad: 0
        },
        yaxis: {
          showticklabels: false,
          fixedrange: true
        },
        xaxis: {
          //autotick: false,
          //tick0: 0,
          //tickwidth: 4,
          title: "Units are in million tonnes/year",
          fixedrange: true
        }
        // sliders: [
        //   {
        //     pad: {
        //       t: 30
        //     },
        //     x: 0.05,
        //     len: 0.95,
        //     currentvalue: {
        //       xanchor: "right",
        //       prefix: "Month: ",
        //       font: {
        //         size: 20
        //       }
        //     },
        //     transition: {
        //       duration: 500
        //     },
        //     // By default, animate commands are bound to the most recently animated frame:
        //     steps: stepsVar
        //   }
        // ]
      };
      // The slider itself does not contain any notion of timing, so animating a slider
      // must be accomplished through a sequence of frames. Here we'll change the color
      // and the data of a single trace:

      // let frames = [
      //   {
      //     name: "Dec 16",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 43725],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 43725]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Jan 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 42625],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 42625]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Feb 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 44521],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 44521]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Mar 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41812],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41812]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Apr 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41324],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41324]
      //       }
      //     ]
      //   },
      //   {
      //     name: "May 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41342],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41342]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Jun 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41234],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41234]
      //       }
      //     ]
      //   },
      //   {
      //     name: "July 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 43125],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 43125]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Aug 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 40721],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 40721]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Sep 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41145],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41145]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Oct 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 45425],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 45425]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Nov 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41245],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41245]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Dec 17",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41455],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41455]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Jan 18",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41345],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41345]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Feb 18",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41535],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41535]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Mar 18",
      //     data: [
      //       {
      //         y: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41543],
      //         text: [4154.5, 13450, 16475, 6100, 4950, 3675, 4675, 41543]
      //       }
      //     ]
      //   },
      //   {
      //     name: "Apr 18",
      //     data: [
      //       {
      //         y: [4054.5, 12450, 15475, 6300, 4050, 3975, 3675, 41725],
      //         text: [4054.5, 12450, 15475, 6300, 4050, 3975, 3675, 41725]
      //       }
      //     ]
      //   }
      // ];

      let config = {
        displayModeBar: false
      };

      Plotly.newPlot(this.$.plotlyBubbleTime, {
        data,
        layout,
        config
        //frames
      });
    }
  });
})();
