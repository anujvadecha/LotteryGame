<template>
  <div id="q-app" style="font-weight: bold">
    <div id="printdivcontent" style="border: 1px dotted black; text-align: center; padding: 5px;display: none;width:100%;height: fit-content;">  </div>

    <router-view />
  </div>
</template>
<script>

import {get_lottery_timings, get_user_details, get_winners} from "src/common/api_calls";
import {AppFullscreen} from "quasar";

export default {
  name: 'App',

  created() {
    this.$q.fullscreen.toggle().then(result => {
              if(window.screen.availHeight <= 800){
                document.body.style.zoom = "88%"
              }
            }) ;
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
              if(window.screen.availHeight <= 800){
                document.body.style.zoom = "88%"
              }
            }) ;

            // setTimeout(()=>{
            //   console.log(!(($(window).scrollTop() + $(window).innerHeight()) >= $(document).height()))
            //   var zoom = 100;
            //   while(!(($(window).scrollTop() + $(window).innerHeight()) >= $(document).height())) {
            //     console.log("zoom required")
            //     zoom = zoom - 5;
            //     document.body.style.zoom = zoom+'%'
            // }
            // },4000);



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

          currentIndex = (currentIndex == 0 || currentIndex%10 == 0) ? currentIndex -1 : currentIndex-1;
          elements[currentIndex].focus();

          break;
        case 39:  //right
          currentIndex = (currentIndex == 9 || currentIndex%10 == 9) ? currentIndex + 1 : currentIndex+1;
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
