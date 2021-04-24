<template>
<div>
  <ResultHeader></ResultHeader>
  More Draws
  <div class="row">
    <div class="" v-for="option in options" :key="option.value.id">
      <q-checkbox @input="add_selected()" dense v-model="option.selected" val="teal" :label="option.label" color="teal" />
    </div>
  </div>
  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {getFormattedDateHHMM} from "src/common/utils";
export default {
name: "MoreDraws",
  components: {ResultHeader},
  methods:{
    add_selected:function (){
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
    console.log(selected_ids)
    this.options = this.$store.state.lotteries.map(
      lottery=>{
        var selected=false;
        selected_ids.map(id=> {
            if(lottery.id===id) {
            this.selected_lotteries.push(lottery)
            selected=true;
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
