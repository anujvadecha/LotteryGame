<template>
<div class="">
<!--  <ResultHeader></ResultHeader>-->
  <div class="q-ma-lg font-bold"  style="font-size:large">More draws</div>
  <div class="row">
  <q-card @click="select_lottery(option)" class="col-2 q-pa-lg q-ma-sm" v-for="option in options" :key="option.value.id">
    <q-checkbox :disable="option.disabled"  @input="add_selected()" dense v-model="option.selected" val="teal" :label="option.label" color="teal" />
  </q-card>
  </div>
  <q-card bordered flat class="row">
  <q-btn class="col-2 q-ma-md" color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
    </q-card>
</div>
</template>
<script>
import ResultHeader from "components/ResultHeader";
import {compareDate, getFormattedDateHHMM, isToday} from "src/common/utils";
export default {
name: "MoreDraws",
  // components: {ResultHeader},
  methods:{
    add_selected:function (){
      this.$store.dispatch('set_selected_lotteries',this.options.filter(option=>{return option.selected}).map(value=>value.value))
    },
    select_lottery:function (lottery){
      for(var i=0;i<this.options.length;i++) {
        if(this.options[i].label===lottery.label) {
          this.options[i].selected=  !this.options[i].selected;
        }
      }
      this.$store.dispatch('set_selected_lotteries',this.options.filter(option=>{return option.selected}).map(value=>value.value))
    }

  },
  data(){
    return{
      options:[],
      selected_lotteries: []
    }
  },
  created() {
    var selected_ids = this.$store.state.selected_lotteries.map(lottery=>{return lottery.id});
    var filtered_ids = [];

    console.log(selected_ids)
    this.options = this.$store.state.lotteries.
    filter(
      lottery=> {
          return compareDate(new Date(), lottery.time) <= 0 && isToday(lottery.time);
      }
    ).
    map(
      lottery=>{
        var selected = false;
        selected_ids.map(id=> {
            if(lottery.id===id) {
              this.selected_lotteries.push(lottery)
              selected = true;
            }
          }
        )
        return {label:getFormattedDateHHMM(lottery.time),value:lottery,selected:selected}
      }
    )
  },

}
</script>

<style scoped>

</style>
