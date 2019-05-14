function mopData(){
    var data = {};
    
    (function loadData(){
        $.ajax({
            url: "/api/data",
        }).done(function(result) {
            data = result;
        });
    })();
    /**
     * getForJSONPath returns filtered data from MOP data JSON
     * @param {String} expr - JsonPath expression to get the data
     *                      - reference : https://libraries.io/bower/JSONPath
     *                      - eg of expr : '$.production'
     *                                     '$.regions[?(@.name=="Western Desert")].production.oil.data'
     */
    function getForJSONPath(expr){                
        return jsonPath.eval(data,expr);
    }

    /**
     * getRawData returns copy of raw dataset
     */
    function getRawData(){
        return Object.assign({},data);
    }

    /**
     * shiftDates update dates of time-series data array
     * @param {[Object]} arr - input array of object
     * @param {String} field - field name that hold date information
     * @param {Integer} index - index of the element which timestamp needs to become today
     * @param {String} dateFormat - input and output date fomat string according to mometjs standards
     */
    function shiftDates(arr,field,index,dateFormat){
        if(!dateFormat)
            dateFormat ='DD/MM/YYYY';        
        let shift = moment().diff(moment(arr[index][field],dateFormat));
        arr.forEach((r,i)=>{
            r[field] = moment(r[field],dateFormat).add(shift).format(dateFormat);
        });        
        return arr;
    }

    return{                
        getForJSONPath:getForJSONPath,
        getRawData:getRawData,
        shiftDates:shiftDates
    }
}

window.mopData = mopData();
