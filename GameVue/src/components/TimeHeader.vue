<template>
<div class="row">
  <div class="col-4">
  <q-card-section class="row " style="background-color: #a4ff01; font-weight: bold;color: black;font-size: large">Current Date<q-space/>{{get_current_date}} </q-card-section>
  <q-card-section class="row " style="background-color: #ffa400 ;font-weight: bold;color: black;font-size: large">Current Time<q-space></q-space>{{get_current_time}}</q-card-section>
  </div>
  <div class="col-4 text-center flex flex-center" style="background-color: #ee82ef">
     <span style="font-size: xx-large;color: black" class="q-ma-md"> Nayan jains lottery</span>
  </div>
  <div class="col-4">
    <q-card-section class="row " style="background-color: #a4ff01 ;font-weight: bold;color: black;font-size: large">
      Next Draw time
    </q-card-section>
    <q-card-section style="background-color: #ffa400; font-weight: bold;color: black;font-size: large" class="row ">
      Left time
    </q-card-section>
  </div>
</div>
</template>

<script>
export default {
  name: "TimeHeader",
  computed:{
    get_current_time:function (){
      var currentTime = new Date();
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330;   // IST offset UTC +5:30
      var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
      var hoursIST = ISTTime.getHours()
      var minutesIST = ISTTime.getMinutes()
      return "" + hoursIST + ":" + minutesIST + " " + ""
    },
    get_current_date:function (){
      var currentTime = new Date();
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330;   // IST offset UTC +5:30
      var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
      var Year=ISTTime.getFullYear()
      var Day=ISTTime.getDay()
      var month = ISTTime.getMonth()
      var minutesIST = ISTTime.getMinutes()
      return "" + Year + "/" + month + " /" + Day
    }
  }
}
</script>

<style scoped>

</style>
