<template>
<div class="row">
  <div class="col">
  <div class=" q-pa-sm" style="background-color: #a4ff01; font-weight: bold;color: black;font-size: large">Current Date : {{get_current_date}} </div>
  <div class=" q-pa-sm" style="background-color: #ffa400 ;font-weight: bold;color: black;font-size: large">Current Time : {{currentTime}}</div>
  </div>
  <div class="col text-center" style="background-color: #ee82ef">
     <div style="color: black" class="text-center font-bold q-ma-md">DHINESH BHAIS lottery</div>
  </div>
  <div class="col">
    <div class="row q-pa-sm" style="background-color: #a4ff01 ;font-weight: bold;color: black;font-size: large">
      Next Draw time : {{nextLotteryFormatted}}
    </div>
    <div style="background-color: #ffa400; font-weight: bold;color: black;font-size: large" class="row q-pa-sm">
      Left time : {{leftTime}}
    </div>
  </div>
</div>
</template>

<script>
import {getTimeZoneDate} from "src/common/utils";

export default {
  name: "TimeHeader",
  data(){
    return {
      leftTime:null,
      currentTime:null
    }
  },
  methods:{
    calculateCurrentTime() {
      var currentTime = new Date();
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330;   // IST offset UTC +5:30
      var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
      var hoursIST = ISTTime.getHours()
      var minutesIST = ISTTime.getMinutes()
      this.currentTime= "" + hoursIST + ":" + minutesIST + " " + ""
    },
    calculateLefttime(){
      try {
        var currentTime = this.$store.state.nextLottery.time;
        if (currentTime == null)
          this.leftTime= ''
        var msec = getTimeZoneDate(currentTime).getTime() - new Date().getTime();
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        this.leftTime=hh + ":" + mm + ":" + ss
      }
      catch (err) {
        this.leftTime =""
      }
    }
  },
  computed:{
    nextLotteryFormatted:function () {
      try {
        var currentTime = this.$store.state.nextLottery.time;
        if (currentTime == null)
          return ''
        var ISTTime = getTimeZoneDate(currentTime);
        var hoursIST = ISTTime.getHours()
        var minutesIST = ISTTime.getMinutes()
        var secondsIST = ISTTime.getSeconds()
        return "" + hoursIST + ":" + minutesIST + " " + secondsIST
      }
      catch (e) {
        return ''
      }
    },
    get_current_date:function (){
      var ISTTime = getTimeZoneDate(new Date())
      console.log(ISTTime)
      return ISTTime.toLocaleDateString("en-US")
    }
  },
  created() {
    const calculateLeft = this.calculateLefttime;
    const calculateCurrent = this.calculateCurrentTime;
    setInterval(function (){
        calculateLeft()
        calculateCurrent()
      }
      ,1000)
  }
}
</script>

<style scoped>

</style>
