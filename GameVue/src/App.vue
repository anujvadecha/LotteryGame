<template>
  <div id="q-app" style="font-weight: bold">
    <div id="printdivcontent" style="border: 1px dotted black; text-align: center; padding: 5px;display: none;width:100%;height: fit-content;">  </div>

    <router-view />
  </div>
</template>
<script>

import {get_lottery_timings, get_user_details, get_winners} from "src/common/api_calls";
import {AppFullscreen} from "quasar";
import VueBarcodeScanner from 'vue-barcode-scanner'
import Vue from 'vue'
Vue.use(VueBarcodeScanner,null)
export default {
  name: 'App',
  created() {
  this.$barcodeScanner.init(scan=>{
    document.getElementById("final_barcode").value = scan
    document.getElementById('claim_button').click()
  })

this.$q.notify({
        message: " Go fullscreen",
        color: 'primary',
        position:"center",
        timeout: 200000,
        html:true,
        actions: [
          { label: 'Go', color: 'white', handler: () => {

            console.log(document.body.style.zoom);
            this.$q.fullscreen.toggle().then(result => {
              if(!this.$q.platform.is.mobile){
              if(window.screen.availHeight <= 800){
                document.body.style.zoom = "88%"
              }
              }
            }) ;
          } },
          { label: 'Dismiss', color: 'white', handler: () => {  } },
        ]
      })
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
   if (e.keyCode === 13){
    // elements  = document.getElementsByClassName('lottery_input')
    // var i=0;
    //  for(i=0;i<elements.length;i++){
    //   elements[i].value = ""
    // }
    // if(code.length == 33){
    //         final_barcode = code
    //         document.getElementById("final_barcode").value = final_barcode
    //         document.getElementById('claim_button').click()
    //         code = ""
    //       }
    //       if(code.length>10){
    //         code="";
    //      }
    //
    // }else{
    //      code+=e.key;
    // }
    //
    // if(!reading){
    //      reading=true;
    //      setTimeout(function(e){
    //       code="";
    //       reading=false;
    //   }, 200);
  }


  if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 117){
    try{
      if(document.activeElement.id.includes("col") ){
        elements = document.getElementsByClassName("col_cards")
        currentIndex = parseInt(document.activeElement.id.substring(4)) - 1
        switch (e.keyCode) {
        case 37: //left
          currentIndex = (currentIndex == 0) ? currentIndex : currentIndex-1;
          elements[currentIndex].focus();
          break;
        case 39:  //right
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
      }
      else if(document.activeElement.id.includes("row")){
        elements = document.getElementsByClassName("row_cards")
        currentIndex = parseInt(document.activeElement.id.substring(4)) - 1
        switch (e.keyCode) {
        case 37: //left

          currentIndex = (currentIndex == 0) ? currentIndex : currentIndex-1;
          elements[currentIndex].focus();
          break;

        case 39:  //right
          var element_to_focus = document.activeElement.id.substring(3)
          element_to_focus = element_to_focus[0] + 10*(parseInt(document.activeElement.id.substring(4))-1)
          document.getElementById(element_to_focus).focus()
          break;
        case 40: //down
          currentIndex = (currentIndex == 9) ? "col" : currentIndex+1;
          if(currentIndex != "col"){
            elements[currentIndex].focus();
          }else{
            document.getElementById("col"+document.activeElement.id.charAt(3)+"1").focus()
          }

          break;
        case 38: //up
          currentIndex = (currentIndex == 0) ? currentIndex : currentIndex-1;
          elements[currentIndex].focus();
          break;
      }
      }

      else{
         elements = document.getElementsByClassName("lottery_input")
         currentIndex = parseInt(document.activeElement.id.substring(1))

      switch (e.keyCode) {
        case 37: //left
          currentIndex = (currentIndex == 0 || currentIndex%10 == 0) ? (parseInt(currentIndex)/10 + 1) +"col_" : currentIndex-1;
          try{

            if(Number.isInteger(currentIndex) == false){
              if(currentIndex.includes("col_")){
                currentIndex = currentIndex.split("col_")[0]
                console.log(document.activeElement.id.charAt(0))
              document.getElementById("row"+document.activeElement.id.charAt(0)+currentIndex).focus()

              }

            }else{
              elements[currentIndex].focus();
            }
          }catch(e){}

          break;
        case 39:  //right
          currentIndex = (currentIndex == 9 || currentIndex%10 == 9) ? (parseInt(currentIndex + 1)/10 +1)+"col_" : currentIndex+1;
          try{

            if(Number.isInteger(currentIndex) == false){
              if(currentIndex.includes("col_")){
                currentIndex = currentIndex.split("col_")[0]
              document.getElementById("row"+document.activeElement.id.charAt(0)+currentIndex).focus()
              }
            }else{
              elements[currentIndex].focus();
            }
          }catch(e){}

          break;
        case 40: //down

          currentIndex = (parseInt(currentIndex/10) >= 9) ? currentIndex - 90 + 2 + "col_" : currentIndex+10;

          try{

            if(Number.isInteger(currentIndex) == false){
              if(currentIndex.includes("col_")){
                currentIndex = currentIndex.split("col_")[0]
                console.log(document.activeElement.id.charAt(0))
              document.getElementById("col"+document.activeElement.id.charAt(0)+currentIndex).focus()

              }

            }else{
              elements[currentIndex].focus();
            }
          }catch(e){}




          break;
        case 38: //up

          currentIndex = (parseInt(currentIndex/10) == 0) ? currentIndex + 1 + "col_2" : currentIndex-10;
          try{

            if(Number.isInteger(currentIndex) == false){
              if(currentIndex.includes("col_")){
                currentIndex = currentIndex.split("col_")[0]
                console.log("col"+document.activeElement.id.charAt(0)+currentIndex)
              document.getElementById("col"+document.activeElement.id.charAt(0)+currentIndex).focus()

              }

            }else{
              elements[currentIndex].focus();
            }
          }catch(e){}

          // elements[currentIndex].focus();

          break;

      }
    }
}catch(err){console.log(err)}
  try{
    if (e.keyCode === 117) {
      console.log("here")
      document.getElementById("buy_button").click();
    }
    if(e.keyCode === 116) {
        document.getElementById("reset_all_btn").click();
    }
  }catch(err){}
}
})
</script>
<!-- <script type="text/javascript">


</script> -->
