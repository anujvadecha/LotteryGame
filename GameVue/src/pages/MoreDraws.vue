<template>
<div>
  <ResultHeader></ResultHeader>
  More Draws
  <q-option-group
      v-model="$store.state.selected_lotteries"
      :options="options"
      color="green"
      type="checkbox"
      inline
      dense > </q-option-group>
  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {getFormattedDateHHMMSS} from "src/common/utils";
export default {
name: "MoreDraws",
  components: {ResultHeader},
  data(){
    return{
      options:[],
      selected_lotteries: []
    }
  },
  created() {
    this.options=this.$store.state.lotteries.map(
      lottery=>{
        return {label:getFormattedDateHHMMSS(lottery.time),value:lottery}
      }
    )
    this.selected_lotteries=this.$store.state.selected_lotteries
  },

}
</script>

<style scoped>

</style>
