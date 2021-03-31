const service = {
  getDateForSymbol: function(time)
    { 
        switch(window.dataSetInfo.timestamp) {
            case 'Years':
                if(time % 1 != 0)
                {
                    let d = new Date(0)
                    let rest = (time % 1) * 12;
                    let t = Math.floor(time)
                    d.setFullYear(t);
                    d.setMonth(rest)
                    return d
                }
                let d = new Date(0)
                d.setFullYear(time);
                return d;
            case 'Months':
                if(time % 1 != 0)
                {
                    let rest = (time % 1) * 31;
                    let m = Math.floor(time)
                    return new Date(0,Math.floor(time),rest);
                }
                return new Date(0,time);
            case 'Days':
                if(time % 1 != 0)
                {
                    let rest = (time % 1) * 24;
                    return new Date(0,0,time,rest);
                }
                return new Date(0,0,time);
                break;
            case 'Hours':
                if(time % 1 != 0)
                {
                    let rest = (time % 1) * 60;
                    return new Date(0,0,0,time,rest);
                }
                return new Date(0,0,0,time);
            case 'Minutes':
                if(time % 1 != 0)
                {
                    let rest = (time % 1) * 60;
                    return new Date(0,0,0,0,Math.floor(time),rest);
                }
                return new Date(0,0,0,0,time);
            case 'Seconds':
                return new Date(0,0,0,0,0,time);
      }
  },

  getDiffBetweenDates: function(date1, date2, to_add_timestamp){

    let _MS_PER_DAY = 1000 * 60 * 60 * 24 * 30 *12;
    //let utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(),date1.getDate(),date1.getHours(), date1.getMinutes(), date1.getSeconds());
    //let utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(),date2.getDate(),date2.getHours(), date2.getMinutes(), date2.getSeconds());
    let utc1 = date1.getTime()
    let utc2 = date2.getTime()
    let ans = 0.0
    switch (window.dataSetInfo.timestamp) {
        case 'Years':

              
                ans =  Math.floor((utc2 - utc1) / _MS_PER_DAY);
                //ans = (date2.getYear() - date1.getYear())
                if (to_add_timestamp)
                    return ans;
                return ans + " " + window.dataSetInfo.timestamp
        case 'Months':
            _MS_PER_DAY = 1000 * 60 * 60 * 24 * 30.5;
            // d1 = date1.getMonth();
            // d2 = date2.getMonth();
            // ans = d2 - d1;
            //     ans = ans + (date2.getYear() - date1.getYear())*12

        //   a = (utc2 - utc1)
        //   a2 = ((utc2 - utc1) / _MS_PER_DAY);
            ans =  Math.floor((utc2 - utc1) / _MS_PER_DAY);
            if (to_add_timestamp)
            return ans;
                return ans + " " + window.dataSetInfo.timestamp;
        case 'Days':
                // d1 = date1.getDay();
                // d2 = date2.getDay();
                // ans = d2 - d1;
                //ans = ans + (date2.getMonth() - date1.getMonth())*31 + (date2.getYear() - date1.getYear())*365
                _MS_PER_DAY = 1000 * 60 * 60 * 24;

                
                ans =  Math.floor( (utc2 - utc1) /_MS_PER_DAY);
                if (to_add_timestamp)
                return ans;
                return ans + " " + window.dataSetInfo.timestamp
        case 'Hours':
                _MS_PER_DAY = 1000 * 60 * 60 ;
                ans =  Math.floor((utc2 - utc1) / _MS_PER_DAY);
                // d1 = date1.getHours();
                // d2 = date2.getHours();
                // ans = d2 - d1;
                //ans = ans + (date2.getDay() - date1.getDay())*24 + (date2.getMonth() - date1.getMonth())*31 + (date2.getYear() - date1.getYear())*365
                if (to_add_timestamp)
                    return ans;
                return ans + " " + window.dataSetInfo.timestamp
        case 'Minutes':
                _MS_PER_DAY = 1000 * 60;
                let a = (utc2 - utc1);
                ans =  Math.floor((utc2 - utc1) / _MS_PER_DAY);
                // d1 = date1.getMinutes();
                // d2 = date2.getMinutes();
                // ans = d2 - d1;
                //ans = ans + (date2.getHours() - date1.getHours())*60 + (date2.getDay() - date1.getDay())*24 + (date2.getMonth() - date1.getMonth())*31 + (date2.getYear() - date1.getYear())*365
                if (to_add_timestamp)
                    return ans;
                return ans + " " + window.dataSetInfo.timestamp
        case 'Seconds':
                _MS_PER_DAY = 1000;
                ans =  Math.floor((utc2 - utc1) / _MS_PER_DAY);
                if (to_add_timestamp)
                    return ans;
                return ans + " " + window.dataSetInfo.timestamp
                // d1 = date1.getSeconds();
                // d2 = date2.getSeconds();
                // ans = d2 - d1;
                //ans = ans + (date2.getMinutes() - date1.getMinutes())*60 + (date2.getHours() - date1.getHours())*60 + (date2.getDay() - date1.getDay())*24 + (date2.getMonth() - date1.getMonth())*31 + (date2.getYear() - date1.getYear())*365
                //return (Math.floor((date2 - date1) / (1000))).toString()+ " " + $rootScope.selcetedDataSet.timestamp
    }
}
}
export default service;