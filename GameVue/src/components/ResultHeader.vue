<template>
<div class="row" style="background-color: white">
  <div class="col-2" style="background-color: red">
    <div class=" text-center text-white" style="font-size:x-large;border: solid 2px black;">2-D</div>
    <div class="text-center text-white" style="font-size: large;border: solid 2px black;">
      {{ previousLotteryFormatted }}
    </div>
  </div>
  <div v-if="results" class="row" style="width: 83%" >
    <div v-for="(key,value) in results" :key="value" class="col bg-white">
        <div class="text-black text-bold q-ma-xs text-center" style="background-color:#ffb6c1;font-size: large ">{{value}}</div>
        <div class="text-black text-bold  q-ma-xs text-center" style="background-color:#ffb6c1; font-size: large ">{{ ("0"+key).slice(-2)}}</div>
    </div>
  </div>
  <div class="col-10 text-center flex flex-center" style="color: black;font-size: large" v-else>
    Loading ...
  </div>
</div>
</template>
<script>
import {getTimeZoneDate} from "src/common/utils";

export default {
name: "ResultHeader",
  computed:{
    results:function(){
      if(this.$store.state.results===null||this.$store.state.results===undefined||this.$store.state.results==={}||!this.$store.state.results.A)
        return null
      console.log("calculating results")
      console.log(this.$store.state.results)
      return this.$store.state.results
    },
    previousLotteryFormatted:function () {
        var currentTime = this.$store.state.previousLottery.time;
        if (currentTime == null)
          return ''
        var ISTTime = getTimeZoneDate(currentTime);
        var hoursIST = ISTTime.getHours()
        var minutesIST = (ISTTime.getMinutes()<10)? "0"+ISTTime.getMinutes() : ISTTime.getMinutes()
        var secondsIST = ISTTime.getSeconds()
        var timestring =  hoursIST + ":" + minutesIST + ":" + secondsIST
        var H = +timestring.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? "AM" : "PM";
        timestring = h + timestring.substr(2, 3) + ampm;
        return timestring
        
    }
  },
  methods:{
    logout: function () {
      this.$q.localStorage.set('token', '')
      // Notify.create({
      //   message: 'You have been logged out',
      //   position: 'top-right'
      // })
      return this.$router.push({path:'/Login'})
    },
  },
  data(){
  return {
    resultTime: ['2:15pm']
  }
  }
}
</script>

<style scoped>

</style>
