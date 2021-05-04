<template>
<div>
  <ResultHeader></ResultHeader>
    Results




     <q-table
      title="Results"
      :data="results_data"
      :columns="columns"
      row-key="result_time"
      class = "q-ma-md"
      selection="single"
      :selected.sync="selected"
    />





  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">
    Back
  </q-btn>






</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_lottery_timings} from "src/common/api_calls";
import {getTimeZoneDate} from "src/common/utils";

export default {
  name: "Results",
  components: {ResultHeader},
  data() {
    return{
      results_data:[],
      columns : [
      {
        name:'Time',
        required: true,
        label: 'Time',
        align: 'left',
        field: row => row.time,
        format: val =>  getTimeZoneDate(new Date(val)).toLocaleDateString("en-IN").replaceAll("/","-")+" "+getTimeZoneDate(new Date(val)).getHours()+":"+getTimeZoneDate(new Date(val)).getMinutes(),
      },
      {
        name:'A_set',
        required: true,
        label: 'A',
        align: 'left',
        field: row => row.winners.A
      },{
        name:'B_set',
        required: true,
        label: 'B',
        align: 'left',
        field: row => row.winners.B
      },{
        name:'C_set',
        required: true,
        label: 'C',
        align: 'left',
        field: row => row.winners.C
      },{
        name:'D_set',
        required: true,
        label: 'D',
        align: 'left',
        field: row => row.winners.D
      },{
        name:'E_set',
        required: true,
        label: 'E',
        align: 'left',
        field: row => row.winners.E
      },{
        name:'F_set',
        required: true,
        label: 'F',
        align: 'left',
        field: row => row.winners.F
      },{
        name:'G_set',
        required: true,
        label: 'G',
        align: 'left',
        field: row => row.winners.G
      },{
        name:'H_set',
        required: true,
        label: 'H',
        align: 'left',
        field: row => row.winners.H
      },{
        name:'I_set',
        required: true,
        label: 'I',
        align: 'left',
        field: row => row.winners.I
      },{
        name:'J_set',
        required: true,
        label: 'J',
        align: 'left',
        field: row => row.winners.J
      }]
    }
  },
  created() {
    get_lottery_timings().then(
      res => {
          this.results_data = res.lottery_objects
          console.log(this.results_data)
      }
    )
  }
}
</script>

<style scoped>

</style>
