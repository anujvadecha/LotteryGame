<template>
  <div style="font-size: x-large" class="flex flex-center">
  <img src="dicerotation.gif" height="30%" width="30%"/>
    <div id="lottery_results">Skill game results for {{formattedNextLottery}}</div>
      <div v-if="results" class="row" style="width: 83%" >
        <div v-for="(key,value) in results" :key="value" class="col bg-white">
            <div class="text-black text-bold q-ma-xs text-center" style="background-color:#00ffff;font-size: large ">{{value}}</div>
            <div class="text-black text-bold  q-ma-xs text-center" style="background-color:#3cffe0; font-size: large ">{{key}}</div>
         </div>
      </div>
  </div>
</template>

<script>
import {getFormattedDateHHMM, getTimeZoneDate} from "src/common/utils";

export default {
name: "DiceRotation",
  data(){
  return{
    results:null
  }
  },
  computed:{
  formattedNextLottery:function (){
    return getTimeZoneDate(new Date(this.$store.state.previousLottery.time)).toLocaleDateString("en-IN")
      .replaceAll("/","-")+"  "
      +getFormattedDateHHMM(this.$store.state.previousLottery.time)
  }
  },
  created() {
        const this_pointer = this;
        setInterval(function (){
          this_pointer.results = this_pointer.$store.state.results
          },2000);
        const router = this.$router;
        const store = this.$store;
        setTimeout(function(){
              store.dispatch('reset_all')
          store.dispatch('set_selected_lotteries',[store.state.nextLottery])
          router.push({
            path: '/SelectionTable',
            name:'SelectionTable',
            params: {
              set: 'A'
            }
          })
          }, 5000);

  }
}
</script>

<style scoped>

</style>
