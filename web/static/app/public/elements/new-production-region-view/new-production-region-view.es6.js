(function() {
  Polymer({
    is: "new-production-region-view",
    properties: {
      analysisData: {
        type: Array,
        value: function value() {
          return [
            { x: "All", y: 99000 },
            { x: "E1", y: 96500 },
            { x: "E2", y: 96800 },
            { x: "E3", y: 96800 },
            { x: "E-21256 G/H", y: 97000 },
            { x: "E-21255 D/E", y: 96700 },
            { x: "E-21266 A/B", y: 98000 },
            { x: "E-21268", y: 98100 },
            { x: "E-21258 A/B", y: 98400 }
          ];
        }
      },
      analysisAxisCfg: {
        type: Array,
        value: function value() {
          return {
            x: {
              tickFormat: "",
              gridColor: "steelblue",
              selectionColor: "lightgray",
              series: [
                {
                  color: "steelblue"
                },
                {
                  color: "steelblue"
                },
                {
                  color: "steelblue"
                },
                {
                  color: "steelblue"
                },
                {
                  color: "steelblue"
                }
              ],
              axisColor: "#95a5ae"
            },
            y: {
              tickFormat: ".3s",
              start: 0,
              ticks: 6,
              gridColor: "steelblue",
              axisColor: "#95a5ae",
              unitPadding: 0
            }
          };
        }
      },
      chartData: {
        type: Object,
        value: {
          values: [162.18, 498.46, 619.15, 252.36, 66.81, 19, 51.42],
          labels: [
            "Gulf of Suez",
            "Mediterranean",
            "Western Desert",
            "Nile Delta",
            "Eastern Desert",
            "Upper Egypt",
            "Sinai"
          ],
          unit: "BOE/D"
        }
      },
      regionData: {
        type: Object,
        value: {
          Sinai: {
            values: [10.28, 10.28, 10.28, 10.28, 10.28],
            labels: [
              "Company 1",
              "Company 2",
              "Company 3",
              "Company 4",
              "Company 5"
            ],
            unit: "BOE/D"
          },
          "Upper Egypt": {
            values: [3.8, 3.8, 3.8, 3.8, 3.8],
            labels: [
              "Company 1",
              "Company 2",
              "Company 3",
              "Company 4",
              "Company 5"
            ],
            unit: "BOE/D"
          },
          "Eastern Desert": {
            values: [13.36, 13.36, 13.36, 13.36, 13.36],
            labels: [
              "Company 1",
              "Company 2",
              "Company 3",
              "Company 4",
              "Company 5"
            ],
            unit: "BOE/D"
          },
          "Nile Delta": {
            values: [50.47, 50.47, 50.47, 50.47, 50.47],
            labels: [
              "Company 1",
              "Company 2",
              "Company 3",
              "Company 4",
              "Company 5"
            ],
            unit: "BOE/D"
          },
          "Western Desert": {
            values: [123.83, 123.83, 123.83, 123.83, 123.83],
            labels: [
              "Company 1",
              "Company 2",
              "Company 3",
              "Company 4",
              "Company 5"
            ],
            unit: "BOE/D"
          },
          Mediterranean: {
            values: [99.69, 99.69, 99.69, 99.69, 99.69],
            labels: [
              "Company 1",
              "Company 2",
              "Company 3",
              "Company 4",
              "Company 5"
            ],
            unit: "BOE/D"
          },
          "Gulf of Suez": {
            values: [32.43, 32.43, 32.43, 32.43, 32.43],
            labels: [
              "Company 1",
              "Company 2",
              "Company 3",
              "Company 4",
              "Company 5"
            ],
            unit: "BOE/D"
          }
        }
      },
      regionList1: {
        type: Array,
        value: [{ key: 1, val: "Egypt" }]
      },
      selectedRegion1: {
        type: Object,
        value: "1",
        observer: "onSelectRegion1"
      }
    },
    // _onLoadChart: function(event, req) {
    //   //  alert("hello1");
    //   //    alert(req.response);
    //   //let data = [];
    //   //data.push(req.response);
    //   this.chartData = req.response;
    //   //      alert("hello2");
    //   //this._quickFixes();
    // },
    _updateData: function(event, req) {
      if (event.detail.selected) {
        if (event.detail.key == "2") {
          //  this.$.topPerformerOilChartDataAjax.generateRequest();
          this.$.topPerformerGasChartDataAjax.generateRequest();
        } else {
          this.$.topPerformerGasChartDataAjax.generateRequest();
        }
      }

      //this._quickFixes();
    },
    ready: function() {
      // console.log(this.$.plotRow.offsetWidth, this.$.plotRow.offsetHeight);
      // this._renderPlotlyPie();
      // this._renderPlotlyVBar();
      // this._renderPlotlyHBar();
      // this._renderPlotlyTreePlot("regions");
      let tmpRegions = window.mopData.getForJSONPath("$.regions[*]");
      tmpRegions.forEach((r, i) => {
        this.regionList1.push({ key: i + 2, val: r.name });
      });
      this.regionList1 = this.regionList1.slice();
    },
    attached: function() {
      // console.log(
      //   "this.$.plotlyTreeMap 12",
      //   this.$.plotlyTreeMap.offsetWidth,
      //   this.$.plotlyTreeMap.offsetHeight
      // );
      this._renderPlotlyTreePlot("regions");
    },
    _renderPlotlyPie: function() {
      let json = {
        type: "pie",
        textinfo: "value+percent",
        hole: 0.4,
        opacity: 0.7,
        textfont: { color: "#000" }
      };
      json.values = this.chartData.values;
      json.labels = this.chartData.labels;
      let layout = {
        height: 450,
        width: 700,
        margin: {
          l: 10,
          r: 10,
          b: 10,
          t: 15,
          pad: 0
        },
        showlegend: true,
        legend: { orientation: "h" }
        // ,
        // annotations: [
        //   {
        //     font: {
        //       size: 20
        //     },
        //     showarrow: false,
        //     text: "in thousands<br>BOE/D",
        //     x: 0.5,
        //     y: 0.5
        //   }
        // ]
      };
      Plotly.newPlot(this.$.plotlyDonut, [json], layout, {
        displayModeBar: false
      });
    },
    _renderPlotlyVBar: function() {
      let barplot = {
        x: this.chartData.labels,
        y: this.chartData.values,
        type: "bar",
        text: this.chartData.values,
        textposition: "auto",
        hoverinfo: "none",
        marker: {
          color: "rgb(158,202,225)",
          opacity: 0.9
          // ,
          // line: {
          //   color: "rbg(8,48,107)",
          //   width: 1.5
          // }
        }
      };
      // let scatterValues = [];
      // this.chartData.values.forEach(function(item) {
      //   scatterValues.push(item + 10);
      // });
      let scatterplot = {
        x: this.chartData.labels,
        y: this.chartData.values,
        type: "scatter",
        // mode: "lines+markers+text",
        text: this.chartData.values,
        textposition: "auto",
        hoverinfo: "none",
        marker: {
          color: "rgb(31, 119, 180)"
          // opacity: 0.9
          // ,
          // line: {
          //   color: "rbg(8,48,107)",
          //   width: 1.5
          // }
        }
      };
      let layout = {
        height: 450,
        width: 700,
        margin: {
          l: 50,
          r: 10,
          b: 100,
          t: 15,
          pad: 0
        },
        showlegend: false,
        xaxis: {
          tickangle: -45,
          fixedrange: true
        },
        yaxis: {
          fixedrange: true
        }
      };
      Plotly.newPlot(this.$.plotlyVBar, [barplot, scatterplot], layout, {
        displayModeBar: false
      });
    },
    _renderPlotlyHBar: function() {
      let barplot = {
        x: this.chartData.values,
        y: this.chartData.labels,
        type: "bar",
        // text: this.chartData.values,
        // textposition: "auto",
        hoverinfo: "none",
        orientation: "h",
        width: 0.15,
        marker: {
          color: "rgb(158,202,225)",
          opacity: 0.9
          // ,
          // line: {
          //   color: "rbg(8,48,107)",
          //   width: 1.5
          // }
        }
      };
      // let scatterValues = [];
      // this.chartData.values.forEach(function(item) {
      //   scatterValues.push(item + 10);
      // });
      let scatterplot = {
        x: this.chartData.labels,
        y: this.chartData.values,
        type: "scatter",
        // mode: "lines+markers+text",
        text: this.chartData.values,
        textposition: "auto",
        hoverinfo: "none",
        marker: {
          color: "rgb(31, 119, 180)"
          // opacity: 0.9
          // ,
          // line: {
          //   color: "rbg(8,48,107)",
          //   width: 1.5
          // }
        }
      };
      let layout = {
        height: 450,
        width: 700,
        margin: {
          l: 100,
          r: 10,
          b: 100,
          t: 15,
          pad: 4
        },
        showlegend: false,
        annotations: [],
        yaxis: {
          fixedrange: true
        },
        xaxis: {
          fixedrange: true
        }
        // ,
        // yaxis: {
        //   tickangle: -45
        // }
      };
      let pdom = this;
      this.chartData.values.forEach(function(item, index) {
        var result = {
          xref: "x1",
          yref: "y1",
          x: item + 30,
          y: pdom.chartData.labels[index],
          text: item,
          font: {
            // family: "Arial",
            size: 12
            // color: "rgb(50, 171, 96)"
          },
          showarrow: false
        };
        layout.annotations.push(result);
      });

      Plotly.newPlot(this.$.plotlyHBar, [barplot], layout, {
        displayModeBar: false
      });
    },
    _renderPlotlyTreePlot: function(region) {
      // console.log("data", data);
      // // Generating Trace for Hover Text
      // var trace0 = {
      //   x: x_trace,
      //   y: y_trace,
      //   text: text,
      //   mode: "text",
      //   type: "scatter",
      //   textfont: { color: "#000" }
      //   // showlegend: true,
      //   // name: "XXX",
      //   // legend: { orientation: "h" },
      //   // legendgroup: "group"
      //   // textposition: "top",
      //   // hoverinfo: "text+x+y"
      //   // ,
      //   // marker: { opacity: 0.6 }
      // };

      let plotInfo = this._getTreePlotData(region);
      if (plotInfo) {
        let treePlot = this.$.plotlyTreeMap;
        // var WIDTH_IN_PERCENT_OF_PARENT = 99;
        // treePlot.style.width = WIDTH_IN_PERCENT_OF_PARENT + "%";

        // var  HEIGHT_IN_PERCENT_OF_PARENT = 50;
        // treePlot.style.marginLeft =
        //   (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + "%";
        // treePlot.style.height = HEIGHT_IN_PERCENT_OF_PARENT + "vh";
        // treePlot.style.marginTop =
        //   (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + "vh";

        plotInfo.layout.height = treePlot.offsetHeight - 20;
        plotInfo.layout.width = treePlot.offsetWidth;
        Plotly.newPlot(treePlot, plotInfo.data, plotInfo.layout, {
          displayModeBar: false
        });

        // console.log(
        //   "before resize!",
        //   treePlot.offsetWidth,
        //   treePlot.offsetHeight
        // );

        let point_texts = treePlot.querySelectorAll("g.pointtext");
        if (point_texts && point_texts.length > 0) {
          point_texts.forEach(function(elem, index) {
            elem.style.display = "none";
          });
        }

        let point_markers = treePlot.querySelectorAll("path.point");
        if (point_markers && point_markers.length > 0) {
          point_markers.forEach(function(elem, index) {
            elem.style.display = "none";
          });
        }

        let pdom = this;
        treePlot.on("plotly_click", function(eventData) {
          let ptregion;
          eventData.points.forEach(function(pt) {
            ptregion = pt.data.name;
          });
          pdom._renderPlotlyTreePlot(ptregion);
        });
        treePlot.on("plotly_doubleclick", function(eventData) {
          if (region !== "regions") {
            pdom._renderPlotlyTreePlot("regions");
          }
        });

        // Plotly.Plots.resize(treePlot);
        // console.log("resize!", treePlot.offsetWidth);

        window.addEventListener(
          "resize",
          function() {
            // console.log("resize!", treePlot.offsetWidth, treePlot.offsetHeight);
            Plotly.relayout(treePlot, {
              width: treePlot.offsetWidth,
              height: treePlot.offsetHeight
            });
          },
          true
        );

        // window.onResize = function(e) {
        //   console.log(e.currentTarget.innerWidth);
        // };

        // window.onresize = function() {
        //   console.log(treePlot.offsetWidth, treePlot.offsetHeight);
        //   //Plotly.Plots.resize(treePlot);
        // };
      }
    },
    _getTreePlotData: function(level) {
      let values = [];
      let labels = [];
      let units = [];
      let jsonData = [];

      if (level === "regions") {
        jsonData = mopData.getForJSONPath("$.regions[*]");

        // values = this.chartData.values;
        // labels = this.chartData.labels;
        // unit = this.chartData.unit;
      } else {
        jsonData = mopData.getForJSONPath(
          '$.regions[?(@.name=="' + level + '")].companies[*]'
        );
        // let regionData = this.regionData[level];
        // if (!regionData) {
        //   return null;
        // }
        // values = regionData.values;
        // labels = regionData.labels;
        // unit = regionData.unit;
      }

      let loop_counter = 0;
      jsonData.sort(function(a, b) {
        return b.totalProduction.value - a.totalProduction.value;
      });
      jsonData.every(function(item, index) {
        if (item.totalProduction.value > 0) {
          loop_counter++;
          labels.push(item.name);
          values.push(Math.round(item.totalProduction.value));
          units.push(item.totalProduction.unit);
        }
        return loop_counter < 7;
      });

      if (values.length === 0) {
        return null;
      }

      // values.sort(function(a, b) {
      //   return b - a;
      // });

      // declaring arrays
      var shapes = [];
      var annotations = [];
      var counter = 0;

      // For Hover Text
      var x_trace = [];
      var y_trace = [];
      var text = [];
      var data = [];

      //colors
      // var colors = [
      //   "rgb(166,206,227)",
      //   "rgb(31,120,180)",
      //   "rgb(178,223,138)",
      //   "rgb(51,160,44)",
      //   "rgb(251,154,153)",
      //   "rgb(227,26,28)",
      //   "rgb(253,191,111)",
      //   "rgb(255,127,0)",
      //   "rgb(202,178,214)",
      //   "rgb(106,61,154)",
      //   "rgb(255,255,153)",
      //   "rgb(177,89,40)"
      // ];

      var colors = d3.scale.category10();

      // Generate Rectangles using Treemap-Squared
      // var values = this.chartData.values; //[500, 433, 78, 25, 25, 7];
      var newrange = this._scaleBetweenRange(values, 1, 100);
      // console.log("new", newrange);
      var rectangles = Treemap.generate(newrange, 100, 100);
      // let pdom = this;

      for (var i in rectangles) {
        x_trace = [];
        y_trace = [];
        // text = [];

        var shape = {
          type: "rect",
          x0: rectangles[i][0],
          y0: rectangles[i][1],
          x1: rectangles[i][2],
          y1: rectangles[i][3],
          line: {
            width: 0.5,
            color: "white"
          },
          fillcolor: colors(counter),
          opacity: 0.5
        };
        shapes.push(shape);
        var annotation = {
          x: (rectangles[i][0] + rectangles[i][2]) / 2,
          y: (rectangles[i][1] + rectangles[i][3]) / 2,
          text: String(values[counter].toLocaleString()),
          showarrow: false
        };
        annotations.push(annotation);

        // For Hover Text
        x_trace.push((rectangles[i][0] + rectangles[i][2]) / 2);
        y_trace.push((rectangles[i][1] + rectangles[i][3]) / 2);
        // text.push(pdom.chartData.labels[counter]);

        // Generating Trace for Hover Text
        var trace = {
          x: x_trace,
          y: y_trace,
          text: text,
          mode: "markers+text",
          type: "scatter",
          textfont: { color: "#000" },
          name: labels[counter],
          showlegend: true,
          marker: {
            symbol: "square",
            color: colors(counter),
            // line: { color: "transparent" },
            size: 10,
            opacity: 0.7
          },
          hoverinfo: "name"
          // ,
          // legend: {
          //   bgcolor: colors(counter)
          // }
        };

        data.push(trace);

        // Incrementing Counter
        counter++;
      }
      var layout = {
        // height: 450,
        // width: 770,
        shapes: shapes,
        hovermode: "closest",
        annotations: annotations,
        xaxis: {
          showgrid: false,
          zeroline: false,
          fixedrange: true,
          showticklabels: false,
          title: "Units are in thousands " + units[0]
        },
        yaxis: {
          showgrid: false,
          zeroline: false,
          fixedrange: true,
          showticklabels: false
        },
        margin: {
          l: 10,
          r: 0,
          b: 10,
          t: 20,
          pad: 0
        },
        showlegend: true,
        legend: {
          orientation: "h",
          xanchor: "center",
          y: -0.2,
          x: 0.5
        }
      };

      return { layout: layout, data: data };
    },
    _scaleBetweenRange: function(array, min, max) {
      var lowest = Math.min.apply(Math, array);
      var highest = Math.max.apply(Math, array);
      if (!array || array.length === 0 || !min || !max) {
        return [];
      } else if (array.length === 1) {
        return array;
      } else {
        return array.map(elem =>
          Math.round((max - min) * (elem - lowest) / (highest - lowest) + min)
        );
      }
    },
    onSelectRegion: function(e) {
      // console.log("production region view", e);
      //  alert(e.id);
      //  this.selectedRegion=e.id;
      //  this.selectedRegion1=e.id;
      this.selectedRegion1 = e.id;
      if (e.id == 1) {
        this._renderPlotlyTreePlot("regions");
      } else {
        this._renderPlotlyTreePlot(e.name);
      }
    },
    onSelectRegion1: function(e) {
      // console.log("production region view1", e);
      //  alert("222");
      //  alert(e.name);
      var selected = {};
      this.regionList1.forEach(r => {
        if (r.key == e) selected = r;
      });
      //  alert(selected.val);
      if (e == 1) {
        this._renderPlotlyTreePlot("regions");
      } else {
        this._renderPlotlyTreePlot(selected.val);
      }
      //  alert("hello");
      //  alert(e.id);
      //  this.selectedRegion1=5;
    }
  });
})();
