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
    });
  }
}


let code = "";
    let reading = false;
    let final_barcode =""
    var elements = []
    var currentIndex = 0;
    setTimeout(function(){
      elements = document.getElementsByClassName("lottery_input");
      currentIndex = 0
      },1000)


  document.addEventListener('keydown', function (e){
   if (e.keyCode===13){
    elements  = document.getElementsByClassName('lottery_input')
    for(i=0;i<elements.length;i++){
      elements[i].value = ""
    }
    if(code.length == 33){
            final_barcode = code
            document.getElementById("final_barcode").value = final_barcode
            code = ""
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
      

  if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 117){    
    try{
      if(document.activeElement.id.includes("col") ){
        elements = document.getElementsByClassName("col_cards")
        currentIndex = parseInt(document.activeElement.id.substring(4)) - 1
        switch (e.keyCode) {
        case 37: //left
          console.log(currentIndex)
          currentIndex = (currentIndex == 0) ? currentIndex : currentIndex-1;
          elements[currentIndex].focus();
          
          break;
        case 39:  //right
        console.log(currentIndex)
          currentIndex = (currentIndex == 9) ? currentIndex : currentIndex+1;
          elements[currentIndex].focus();
          
          break;
        case 40: //down
          var element_to_focus = document.activeElement.id.substring(3)
          element_to_focus = element_to_focus[0] + (parseInt(document.activeElement.id.substring(4))-1)
          document.getElementById(element_to_focus).focus()
          break;
        case 38: //up

          var element_to_focus = document.activeElement.id.substring(3)
          element_to_focus = element_to_focus[0] + (parseInt(document.activeElement.id.substring(4)) + 90)
          document.getElementById(element_to_focus).focus()
          
          break;

      }








      }else{
         elements = document.getElementsByClassName("lottery_input")
        currentIndex = parseInt(document.activeElement.id.substring(1))
      
      switch (e.keyCode) {
        case 37: //left

          currentIndex = (currentIndex == 0 || currentIndex%10 == 0) ? currentIndex + 9 : currentIndex-1;
          elements[currentIndex].focus();
          
          break;
        case 39:  //right
          currentIndex = (currentIndex == 9 || currentIndex%10 == 9) ? currentIndex - 9 : currentIndex+1;
          elements[currentIndex].focus();
          
          break;
        case 40: //down
          currentIndex = (parseInt(currentIndex/10) >= 9) ? currentIndex - 90 : currentIndex+10;
          elements[currentIndex].focus();
          
          break;
        case 38: //up

          currentIndex = (parseInt(currentIndex/10) == 0) ? currentIndex + 90 : currentIndex-10;
          elements[currentIndex].focus();
          
          break;

      }
    }


}catch(err){console.log(err)}
      


  try{
    if (e.keyCode === 117) {
      console.log("here")
        document.getElementById("buy_button").click();
    }
  }catch(err){}
}
})
</script>
<!-- <script type="text/javascript">
  

</script> -->
