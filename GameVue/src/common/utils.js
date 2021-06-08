import store from "src/store/index";
import { AppFullscreen } from 'quasar'

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

function convert_to_twelve_hour_clock(timestring){
    var H = +timestring.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timestring = h + timestring.substr(2, 3) + ampm;
    return timestring
}


function getFormattedDateHHMMSS(date) {
      var ISTTime = date;
      var hoursIST = ISTTime.getHours()
      var minutesIST = (ISTTime.getMinutes()<10)? "0"+ISTTime.getMinutes() : ISTTime.getMinutes()
      var secondsIST = ISTTime.getSeconds()
      var timestring = hoursIST + ":" + minutesIST + ":" + secondsIST
      timestring = convert_to_twelve_hour_clock(timestring)
      return timestring
}

function getFormattedDateHHMM(date) {
      var ISTTime = date;
      var hoursIST = ISTTime.getHours()
      var minutesIST = (ISTTime.getMinutes()<10)? "0"+ISTTime.getMinutes() : ISTTime.getMinutes()
      var secondsIST = ISTTime.getSeconds()
      var timestring = hoursIST + ":" + minutesIST + ":" + secondsIST
      timestring = convert_to_twelve_hour_clock(timestring)
      return timestring
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

function print_div(res,claim=false,user=null) {
  document.getElementById("printdivcontent").innerHTML += "Star Skill Game<br/>"
  if (claim == false) {
    document.getElementById("printdivcontent").innerHTML += user + "<br/>"
    //console.log(res["created_at"])

    // document.getElementById("printdivcontent").innerHTML += store.user.first_name + "<br/>"

    document.getElementById("printdivcontent").innerHTML += `Created date: ${getTimeZoneDate(new Date(res["created_at"])).toLocaleDateString("en-IN").replaceAll("/", "-") + " " + getTimeZoneDate(new Date(res["created_at"])).getHours() + ":" + getTimeZoneDate(new Date(res["created_at"])).getMinutes()} <br/>`
  }
  document.getElementById("printdivcontent").innerHTML += `Draw date: ${getTimeZoneDate(new Date(res["lottery"]["time"])).toLocaleDateString("en-IN").replaceAll("/", "-") + " " + getTimeZoneDate(new Date(res["lottery"]["time"])).getHours() + ":" + getTimeZoneDate(new Date(res["lottery"]["time"])).getMinutes()} <br/>`

  if (claim === false) {
    document.getElementById("printdivcontent").innerHTML += `Ticket set: <br/>`

    var ticket_details = ""
    res["ticket_set"].map(res => {
      ticket_details += `${res["set_ticket"]} - ${res["price"]} - ${res["quantity"]},`
    })

    document.getElementById("printdivcontent").innerHTML += ticket_details.slice(0, -1)

    document.getElementById("printdivcontent").innerHTML += `<br>Total quantity ${res["total_quantity"]}<br/>`

    document.getElementById("printdivcontent").innerHTML += `Total price ${res["total_price"]}<br/>`
  }

  if (claim == true) {
    document.getElementById("printdivcontent").innerHTML += `Total wins ${res["inflow"]}<br/>`
    document.getElementById("printdivcontent").innerHTML += `Ticket: ${res["ticket_id"]}<br/>`
  }
  if (claim == false) {
    document.getElementById("printdivcontent").innerHTML += `<svg id="barcode" style=""></svg>`

    JsBarcode('#barcode', res["ticket_id"])
  }
  var divContents = document.getElementById("printdivcontent").innerHTML;
  // var printWindow = window.open('', '', 'height=200,width=400');
  var printWindow = window.open('');
  printWindow.document.write();
  printWindow.document.write('</head><body style="font-size: medium;font-weight:bold">');
  printWindow.document.write(divContents);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
  document.getElementById("printdivcontent").innerHTML = ""
}

  function ClickHereToPrint(){
    try{
      var oIframe = document.createElement('iframe');
      var oContent = document.getElementById('printdivcontent');
      console.log(oContent);
      var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
      console.log(oDoc)
      if (oDoc.document) oDoc = oDoc.document;
      oDoc.write('<head><title>title</title>');
      oDoc.write('</head><body onload="this.focus(); this.print();">');
      oDoc.write(oContent + '</body>');
      oDoc.close();
    } catch(e){
      console.log(e)
      self.print();
    }
  }


function PrintDiv() {
    var contents = document.getElementById('printdivcontent').innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
     frameDoc.document.write(`<html><head><title>Star skill game</title>`);
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
}

export {
  compareDate,
  getTimeZoneDate,
  getFormattedDateHHMMSS,
  getFormattedDateHHMM,
  get_current_date,
  isToday,
  print_div,
  ClickHereToPrint,
  PrintDiv
}
