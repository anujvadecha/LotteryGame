<template>
  <div id="q-app">
    <div id="printdivcontent" style="border: 1px dotted black; text-align: center; padding: 5px;display: none;width:100%">  </div>
    <router-view />
  </div>
</template>
<script>

import {get_lottery_timings, get_user_details} from "src/common/api_calls";
import {AppFullscreen} from "quasar";

export default {
  name: 'App',

  created() {
    this.$q.notify({
        message: " Go fullscreen",
        color: 'primary',
        position:"center",
        timeout: 200000,
        html:true,
        actions: [
          { label: 'Go', color: 'white', handler: () => { this.$q.fullscreen.toggle() } },
        ]
      })
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
    const store=this.$store;
    get_lottery_timings().then(lottery_timings => {
      console.log(lottery_timings)
      var timings = lottery_timings.lottery_objects.map(object => {
              object.time=new Date(object.time)
              return object
        }
    )
    lottery_timings.closest_lottery.time = new Date(lottery_timings.closest_lottery.time)
    this.$store.dispatch('set_lottery_timings', timings)
    this.$store.dispatch('set_next_lottery')
    const nextLottery = this.$store.getters.get_next_lottery;
    this.$store.dispatch('set_selected_lotteries',[nextLottery])
    console.log("next lottery is " + nextLottery)
    setInterval(function (){
    //   var current_next_lottery =  store.state.nextLottery;
        store.dispatch('set_next_lottery')
    },500)

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
