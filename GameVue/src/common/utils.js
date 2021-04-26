function inRange(d,start,end) {
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
function convert(d) {
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
  }
function compareDate(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=convert(a).valueOf()) &&
            isFinite(b=convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
}
function getTimeZoneDate(date) {
      var currentTime = date;
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330;   // IST offset UTC +5:30
      var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
      return ISTTime
}
function getFormattedDateHHMMSS(date) {
      var ISTTime = date;
      var hoursIST = ISTTime.getHours()
      var minutesIST = ISTTime.getMinutes()
      var secondsIST = ISTTime.getSeconds()
      return "" + hoursIST + ":" + minutesIST + " " + secondsIST
}

function getFormattedDateHHMM(date) {
      var ISTTime = date;
      var hoursIST = ISTTime.getHours()
      var minutesIST = ISTTime.getMinutes()
      var secondsIST = ISTTime.getSeconds()
      return "" + hoursIST + ":" + minutesIST
}



export {
  compareDate,
  getTimeZoneDate,
  getFormattedDateHHMMSS,
  getFormattedDateHHMM
}
