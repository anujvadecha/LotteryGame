<template>
<div class="row" style="background-color: red">
  <div class="col-2" style="">
    <div class=" text-center text-white" style="font-size:x-large;border: solid 2px black;">2-D</div>
    <div class="text-center text-white" style="font-size: large;border: solid 2px black;">
      {{ previousLotteryFormatted }}
    </div>
  </div>
  <div v-for="(key,value) in results" :key="key" class="col bg-white">
      <div class="text-black text-bold q-ma-xs text-center" style="background-color:#ffb6c1;font-size: large ">{{value}}</div>
      <div class="text-black text-bold  q-ma-xs text-center" style="background-color:#ffb6c1; font-size: large ">{{key}}</div>
  </div>
</div>
</template>
<script>
import {getTimeZoneDate} from "src/common/utils";

export default {
name: "ResultHeader",
  computed:{
    results:function(){
      return this.$store.state.results
    },
    previousLotteryFormatted:function () {
      var currentTime = this.$store.state.previousLottery.time;
      if(currentTime==null)
        return ''
      var ISTTime = getTimeZoneDate(currentTime);
      var hoursIST = ISTTime.getHours()
      var minutesIST = ISTTime.getMinutes()
      return "" + hoursIST + ":" + minutesIST + " " + ""
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
