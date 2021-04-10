<template>
<div class="row" style="background-color: red">

  <div class="col-2" style="">
    <div class=" text-center" style="font-size:x-large;border: solid 2px black;">2-D</div>
    <div class="text-center" style="font-size: large;border: solid 2px black;">{{nextLotteryFormatted}}</div>
  </div>
  <div v-for="(key,value) in results" :key="key" class="col bg-white">
      <div class="text-black text-bold q-ma-xs text-center" style="background-color:#ffb6c1;font-size: large ">{{value}}</div>
      <div class="text-black text-bold  q-ma-xs text-center" style="background-color:#ffb6c1; font-size: large ">{{key}}</div>
  </div>

</div>
</template>
<script>
export default {
name: "ResultHeader",
  computed:{
    results:function(){
      return this.$store.state.results
    },
    nextLotteryFormatted:function () {
      var currentTime = this.$store.state.previousLottery;
      if(currentTime==null)
        return ''
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330;   // IST offset UTC +5:30
      var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
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
