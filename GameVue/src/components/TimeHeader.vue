<template>
<div class="row" style="font-family: 'Times New Roman'">
  <div v-if="!$q.platform.is.mobile" class="col" >
  <div class="q-pl-md" style="background-color: #a4ff01; font-weight: bold;color: black;font-size: x-large">Current Date : {{get_current_date}} </div>
  <div class="q-pl-md " style="background-color: #ffa400 ;font-weight: bold;color: black;font-size: x-large">Current Time : {{currentTime}}</div>
  </div>
  <div v-if="!$q.platform.is.mobile" class="col text-center" style="background-color: #ed92f1">
     <div style="color: black;font-size: xx-large;" class="text-center font-bold">STAR SKILL GAME</div>
  </div>
  <div v-if="!$q.platform.is.mobile"  class="col">
    <div class="row q-pl-md" style="background-color: #a4ff01 ;font-weight: bold;color: black;font-size: x-large">
      Next Draw Time : {{nextLotteryFormatted}}
    </div>
    <div style="background-color: #ffa400; font-weight: bold;color: black;font-size: x-large" class="row q-pl-md" id="left-time">
      Left Time :<span style=""> {{leftTime}}</span>
    </div>
  </div>
  <div v-else class="col">
    <div class="row">
    <div class="col q-pa-sm" style="background-color: #a4ff01 ;font-weight: bold;color: black;font-size: medium">
      Next Draw Time : {{nextLotteryFormatted}}
    </div>
    <div style="background-color: #ffa400; font-weight: bold;color: black;font-size: medium" class="col q-pa-sm" id="left-time">
      Left Time : {{leftTime}}
    </div>
      </div>
  </div>
</div>
</template>

<script>
import {getTimeZoneDate, convert_to_twelve_hour_clock, getFormattedDateHHMM} from "src/common/utils";

export default {
  name: "TimeHeader",
  data(){
    return {
      leftTime:null,
      currentTime:null,
      next_lottery_time:""
    }
  },
  methods:{
    calculateCurrentTime() {
      this.currentTime = getFormattedDateHHMM(new Date())
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

        mm = (mm<10)?"0"+mm : mm
        msec = (msec<10)?"0"+msec : msec
        this.leftTime = "0"+hh + ":" + mm + ":" + ss

        // left time in red
        if(parseInt(mm) == 0 && parseInt(ss)<=30){
          document.getElementById("left-time").style.color = "red";
        }else{
          document.getElementById("left-time").style.color = "black";
        }

      }
      catch (err) {
        this.leftTime = ""
      }
    }
  },
  computed:{
    nextLotteryFormatted:function () {
      try {
        var currentTime = this.$store.state.nextLottery.time;
        return getFormattedDateHHMM(currentTime)
      }
      catch (e) {
        return ''
      }
    },
    get_current_date:function (){
      var ISTTime = getTimeZoneDate(new Date())
      return ISTTime.toLocaleDateString("en-IN")
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
