var path = require('path');

var allWells=[];

let getStaticData = function(req,res){
  let subRoute = req.params.path
    , returnData = null
    , jsonPath = ""
    , json = {};

  switch (subRoute) {
    case "all-wells":
      if(allWells.length==0){
        let allWellsPath ="../sample-data/all-wells/";
        for(var i=1; i<21; i++){
          let wellInfo = require(path.resolve(__dirname, allWellsPath+"well"+i+".json"));
          wellInfo.oil = +(wellInfo.oil*10).toFixed(1);
          wellInfo.gasInjectRate = +(wellInfo.gasInjectRate*10).toFixed(1);
          wellInfo.optimized.oil = +(wellInfo.optimized.oil*10).toFixed(1);
          wellInfo.optimized.gasInjectRate = +(wellInfo.optimized.gasInjectRate*10).toFixed(1)
          wellInfo.reoptimized.oil = +(wellInfo.reoptimized.oil*10).toFixed(1);
          wellInfo.reoptimized.gasInjectRate = +(wellInfo.reoptimized.gasInjectRate*10).toFixed(1)
          allWells.push(wellInfo);
        }
      }
      returnData = res.json(allWells);
      break;
    // case "well2":
    //   let well2 = require(path.resolve(__dirname,"../sample-data/well2.json"));
    //
    //   well2.data.forEach((w)=>{
    //     w.x = w.x*5 +200;
    //     w.y = w.y*187- 1635.18 ;
    //   });
    //   returnData = res.json(well2);
    //   break;
    case "intake-pressure-temp":
    case "discharge-pressure-temp":
    case "compressor-rpm":
      jsonPath ="../sample-data/"+subRoute+".json";
      json = require(path.resolve(__dirname, jsonPath));
      // preProcessData(subRoute, json);
      returnData = res.json(setDateToToday(json));
      break;
    case "wellProdChart":
    case "plantProdChart":
      jsonPath ="../sample-data/"+subRoute+".json";
      json = require(path.resolve(__dirname, jsonPath));
      // preProcessData(subRoute, json);
      returnData = res.json(setDateToToday2(json));
      break;
    default:
      jsonPath ="../sample-data/"+subRoute+".json";
      json = require(path.resolve(__dirname, jsonPath));
      preProcessData(subRoute, json);
      returnData = res.json(json);
  }

  return returnData;
  // if(subRoute == "all-wells"){
  //   let allWellsPath ="../sample-data/all-wells/"
  //     , allWells = []; //"+subRoute+".json";
  //
  //   for(var i=1; i<21; i++){
  //     allWells.push(require(path.resolve(__dirname, allWellsPath+"well"+i+".json")))
  //   }
  //
  //   return res.json(allWells);
  // }
  // else{
  //   let jsonPath ="../sample-data/"+subRoute+".json";
  //   let json = require(path.resolve(__dirname, jsonPath));
  //   preProcessData(subRoute, json);
  //   return res.json(json);
  // }
}

let setDateToToday = (arr) => {
  let today = new Date()
    , tmp = []
    ,  monthNames = [
          "Jan", "Feb", "Mar",
          "Apr", "May", "Jun", "Jul",
          "Aug", "Sep", "Oc",
          "Nov", "Dec"
        ];
  for(let i=(arr.length-1); i>=0; i--){
    let month = monthNames[today.getMonth()];// + 1;

    month = month < 10 ? "0" + month : month;

    arr[i].date = today.getDate() + "-" + month + "-" + today.getFullYear().toString().substring(2);

    // tmp.push(Object.assign({}, arr[i], {date: today.getFullYear() + "-" + month + "-" + today.getDate() + "T00:00:00.000Z"}));
    // tmp.push({"date": new Date(today.getFullYear(), month, today.getDate()), y2:arr[i].y2, y1:arr[i].y1 })
    today.setDate(today.getDate() - 1);
  }
  // return tmp;
  return arr;
};

let setDateToToday2 = (arr) => {
  let today = new Date()
    , tmp = []
    ,  monthNames = [
          "Jan", "Feb", "Mar",
          "Apr", "May", "Jun", "Jul",
          "Aug", "Sep", "Oc",
          "Nov", "Dec"
        ];
  for(let i=(arr.length-1); i>=0; i--){
    let month = today.getMonth() + 1;

    month = month < 10 ? "0" + month : month;

    arr[i].date = today.getFullYear() + "-" + month + "-" + today.getDate() + "T00:00:00.000Z";

    // tmp.push(Object.assign({}, arr[i], {date: today.getFullYear() + "-" + month + "-" + today.getDate() + "T00:00:00.000Z"}));
    // tmp.push({"date": new Date(today.getFullYear(), month, today.getDate()), y2:arr[i].y2, y1:arr[i].y1 })
    today.setDate(today.getDate() - 1);
  }
  // return tmp;
  return arr;
};

let preProcessData = function(dataSetName,data){
  if(dataSetName=='plantProdChart'){
    data = injectDates(data,30);
  }
}

let injectDates = (arr, since, key) => {
  let sinceDate = new Date();
  key = key ? key : "date";
  sinceDate.setDate(sinceDate.getDate() - since);
  //2017-08-29T00:00:00.000Z
  if (arr && arr.length) {
    arr.map((_rec, idx) => {
      let month = sinceDate.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let _dateStr = sinceDate.getFullYear() + "-" +
        month + "-" + sinceDate.getDate() + "T00:00:00.000Z";

      _rec[key] = _dateStr;
      sinceDate.setDate(sinceDate.getDate() + 1);
    });
  }
  return arr;
};

let roundOffVal =(arr,keys,decimals)=>{
  arr.forEach((o)=>{
    keys.forEach((key)=>{
      if(o[key] && !isNaN(o[key]) && o[key].toFixed){
        o[key] = o[key].toFixed(decimals);
      }
    });
  });
}

module.exports={
  getStaticData:getStaticData
};
