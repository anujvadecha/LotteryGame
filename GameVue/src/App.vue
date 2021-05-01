<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>

import {get_lottery_timings, get_total_points, get_user_details, get_winners} from "src/common/api_calls";

export default {
  name: 'App',

  created() {
    let code = "";
let reading = false;
let final_barcode =""
document.addEventListener('keypress', function (e){
   if (e.keyCode===13){
          if(code.length == 13){
            final_barcode = code
            console.log(final_barcode)
            document.getElementById("final_barcode").value = final_barcode
          }
          if(code.length>10){
            code="";
         }
    }else{
         code+=e.key;
    }

    if(!reading){
         reading=true;
         setTimeout(function(e){
          code="";
          reading=false;
      }, 200);}
      })
    get_total_points(null).then(res=>{
      console.log(res);
    })
    get_lottery_timings().then(lottery_timings => {
      console.log(lottery_timings)
      var timings = lottery_timings.lottery_objects.map(object => {
              object.time=new Date(object.time)
              return object
        }
    )
    lottery_timings.closest_lottery.time=new Date(lottery_timings.closest_lottery.time)
      this.$store.dispatch('set_lottery_timings', timings)
      this.$store.dispatch('set_next_lottery', timings)
      const nextLottery = this.$store.getters.get_next_lottery;
      this.$store.dispatch('set_selected_lotteries',[nextLottery])
      console.log("next lottery is " + nextLottery)
      setInterval(function (){

        var current_next_lottery =  store.state.nextLottery;
        get_winners({"lottery_time":nextLottery.time.getTime()}).then(
        res=>{
          if(res.status_code===200) {
            console.log(res)
            store.dispatch('set_results',res.lottery_winners_ticket)
            }
          }
        )
      },6000)

      const store=this.$store;
      get_user_details().then(
        res=>{
          store.dispatch('update_user_details',res)
        }
      )
          //
      // get_lottery_previous({"lottery_time":getTimeZoneDate(nextLottery.getTime())}).then(
      //   res=>{
      //     console.log(res)
      //     this.$store.state.results = res.lottery_winners_ticket
      //   }
      // )
      //TODO
      // const store=this.$store;
    });
  }
}
</script>
