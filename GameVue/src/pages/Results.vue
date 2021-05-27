<template>
<div>
  <ResultHeader></ResultHeader>
    <div class="row">
      <div class="col-3"></div>
    <div class="q-pa-md col-3" style="max-width: 300px">
    <q-input filled v-model="start_date">
    <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="start_date" mask="YYYY-MM-DD">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    </div>
    <div class="q-pa-md col-3" style="max-width: 300px">
    <q-input filled v-model="end_date">
    <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="end_date" mask="YYYY-MM-DD">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    </div>

    <div class="col-1">
           <q-btn dense unelevated style="margin-top:25%;border: 1px solid black" class="bg-purple col " @click="fetch_winners_according_to_date()">Go -></q-btn>
      </div>

  </div>


     <q-table
      title="Results"
      :data="results_data"
      :columns="columns"
      row-key="result_time"
      class = "q-ma-md"
    />







  <q-card bordered flat class="row">
  <q-btn class="col-2 q-ma-md" color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
  </q-card>






</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_lottery_timings} from "src/common/api_calls";
import {getTimeZoneDate} from "src/common/utils";
import {get_current_date} from "src/common/utils";


export default {
  name: "Results",
  components: {ResultHeader},
  data() {
    return{
      start_date: get_current_date(),
      end_date: get_current_date(),
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
  methods:{
    fetch_winners_according_to_date(){
      console.log(this.start_date)
      console.log(this.end_date)
      var date_dict = {"start_date":this.start_date,"end_date":this.end_date}
      get_lottery_timings(date_dict).then(res=>{
        console.log(res.lottery_objects)
        this.results_data = res.lottery_objects
      })
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
