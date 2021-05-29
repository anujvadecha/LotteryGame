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

function get_current_date(){
      var ISTTime = getTimeZoneDate(new Date())
      console.log(ISTTime)
      var Year = ISTTime.getFullYear()
      var Day = ISTTime.getDay()
      var month = ISTTime.getMonth()
      var minutesIST = ISTTime.getMinutes()
      return ISTTime.toLocaleDateString("zh-Hans-CN").replaceAll("/","-")
    }

function isToday(someDate) {

  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

function print_div(res,claim=false) {
       console.log(res)
       document.getElementById("printdivcontent").innerHTML += "Star Skill Game<br/>"
       //console.log(res["created_at"])

        // document.getElementById("printdivcontent").innerHTML += store.user.first_name + "<br/>"

       document.getElementById("printdivcontent").innerHTML += `Created date: ${getTimeZoneDate(new Date(res["created_at"])).toLocaleDateString("en-IN").replaceAll("/","-")+" "+getTimeZoneDate(new Date(res["created_at"])).getHours()+":"+getTimeZoneDate(new Date(res["created_at"])).getMinutes()} <br/>`

      document.getElementById("printdivcontent").innerHTML += `Draw date: ${getTimeZoneDate(new Date(res["lottery"]["time"])).toLocaleDateString("en-IN").replaceAll("/","-")+" "+getTimeZoneDate(new Date(res["lottery"]["time"])).getHours()+":"+getTimeZoneDate(new Date(res["lottery"]["time"])).getMinutes()} <br/>`


      document.getElementById("printdivcontent").innerHTML += `Ticket set: <br/>`

      var ticket_details = ""
      res["ticket_set"].map(res => {
         ticket_details+= `${res["set_ticket"]} - ${res["price"]} - ${res["quantity"]},`
      })
      document.getElementById("printdivcontent").innerHTML += ticket_details.slice(0,-1)
      document.getElementById("printdivcontent").innerHTML += `<br>Total quantity ${res["total_quantity"]}<br/>`

      document.getElementById("printdivcontent").innerHTML += `Total price ${res["total_price"]}<br/>`

      if(claim == true){
        document.getElementById("printdivcontent").innerHTML += `Total wins ${res["inflow"]}<br/>`
      }

      document.getElementById("printdivcontent").innerHTML += `<svg id="barcode" style=""></svg>`

      JsBarcode('#barcode',res["ticket_id"])
      var divContents = document.getElementById("printdivcontent").innerHTML;
       // var printWindow = window.open('', '', 'height=200,width=400');
      var printWindow = window.open();
       printWindow.document.write();
       printWindow.document.write('</head><body style="font-size: 30px">');
       printWindow.document.write(divContents);
       printWindow.document.write('</body></html>');
       printWindow.document.close();
       printWindow.print();
       printWindow.close();
       document.getElementById("printdivcontent").innerHTML = ""
      console.log(store.user)
    }


import store from "src/store/index";

export {
  compareDate,
  getTimeZoneDate,
  getFormattedDateHHMMSS,
  getFormattedDateHHMM,
  get_current_date,
  isToday,
  print_div
}
