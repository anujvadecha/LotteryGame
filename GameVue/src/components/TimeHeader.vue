<template>
<div class="row">
  <div class="col">
  <div class=" " style="background-color: #a4ff01; font-weight: bold;color: black;font-size: large">Current Date{{get_current_date}} </div>
  <div class="" style="background-color: #ffa400 ;font-weight: bold;color: black;font-size: large">Current Time{{get_current_time}}</div>
  </div>
  <div class="col text-center" style="background-color: #ee82ef">
     <div style="color: black" class="text-center font-bold q-ma-md"> DHINESH BHAIS lottery</div>
  </div>
  <div class="col">
    <div class="row " style="background-color: #a4ff01 ;font-weight: bold;color: black;font-size: large">
      Next Draw time
    </div>
    <div style="background-color: #ffa400; font-weight: bold;color: black;font-size: large" class="row ">
      Left time
    </div>
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
