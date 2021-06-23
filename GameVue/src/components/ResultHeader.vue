<template>
<div class="row" style="background-color: white">
  <div class="col-2" style="background-color: red">
    <div class=" text-center text-white" style="font-size:x-large;border: solid 2px black;font-family: 'Times New Roman'">2-D</div>
    <div class="text-center text-white"  style= "font-size: x-large;border: solid 2px black;font-family: 'Times New Roman'">
      {{ previousLotteryFormatted }}
    </div>
  </div>
  <div v-if="results" class="row" style="width: 83%" >
    <div v-for="(key,value) in results" :key="value" class="col bg-white">
        <div class="text-black text-bold text-center" style="background-color:#ffb6c1;font-size:x-large;margin: 5px ">{{value}}</div>
        <div class="text-black text-bold text-center" style="background-color:#ffb6c1; font-size:x-large ;margin: 5px;">{{ ("0"+key).slice(-2)}}</div>
    </div>
  </div>
  <div class="col-10 text-center flex flex-center" style="color: black;font-size: large" v-else>
    Loading ...
  </div>
</div>
</template>
<script>
import {getTimeZoneDate,getFormattedDateHHMM} from "src/common/utils";

export default {
name: "ResultHeader",
  created() {
    console.log("")
  },
  computed:{
    results:function(){
      if(this.$store.state.results===null||this.$store.state.results===undefined||this.$store.state.results==={})
        return null
      return this.$store.state.results
    },
    previousLotteryFormatted:function () {
        var currentTime = this.$store.state.previousLottery.time;
        if (currentTime == null)
          return ''
        return getFormattedDateHHMM(currentTime)
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
