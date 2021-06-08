<template>
<div class="">
<!--  <ResultHeader></ResultHeader>-->
  <TimeHeader v-if="!$q.platform.is.mobile"></TimeHeader>
  <q-card bordered flat class="row">
      <div class="q-ma-lg font-bold"  style="font-size:large">More draws</div>
    <q-space></q-space>
    <q-checkbox class="col-2 q-ma-md" style="font-size: large" v-model="select_all_button" color="blue" unelevated @input="select_all()">Select all</q-checkbox>
    <q-btn class="col-2 q-ma-md" color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
  </q-card>
  <div class="row">
  <q-card @click="select_lottery(option)" style="background-color: #fbb000;font-size: large" class="col-xs-4 col-sm-2 col-md-2 q-pa-lg q-ma-sm" v-for="option in options" :key="option.value.id">
    <q-checkbox :disable="option.disabled"  @input="add_selected()" dense v-model="option.selected" val="teal" :label="option.label" color="teal" />
  </q-card>
  </div>
</div>
</template>
<script>
import ResultHeader from "components/ResultHeader";
import {compareDate, getFormattedDateHHMM, isToday} from "src/common/utils";
import TimeHeader from "components/TimeHeader";
export default {
name: "MoreDraws",
  components: {TimeHeader},
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
    },
    select_all:function (){
      for(var i=0;i<this.options.length;i++) {
         this.options[i].selected=  this.select_all_button;
      }
      this.$store.dispatch('set_selected_lotteries',this.options.filter(option=>{return option.selected}).map(value=>value.value))
    }

  },
  data(){
    return{
      options:[],
      selected_lotteries: [],
      select_all_button:false
    }
  },
  computed:{

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
        // selected_ids.map(id=> {
        //     if(lottery.id===id) {
        //       this.selected_lotteries.push(lottery)
        //       selected = true;
        //     }
        //   }
        // )
        return {label:getFormattedDateHHMM(lottery.time),value:lottery,selected:selected}
      }
    )
  },

}
</script>

<style scoped>

</style>
