<template>
<div>
<!--  <ResultHeader></ResultHeader>-->
    <div class="row" v-if="!$q.platform.is.mobile">
    <div class="q-pa-md" style="">
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
    <div class="q-pa-md" style="">
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

    <q-btn  unelevated style="" color="primary" class="q-ma-md" @click="fetch_winners_according_to_date()">Go</q-btn>

  </div>

  <div class="row" v-if="$q.platform.is.mobile">
    <div class="q-pa-md col-5" style="">
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
    <div class="q-pa-md col-5" style="">
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

    <q-btn  unelevated style="" color="primary" class="col-2" @click="fetch_winners_according_to_date()">Go</q-btn>

  </div>
     <q-table
      title="Results"
      :data="results_data"
      :columns="columns"
      row-key="name"
      virtual-scroll
      :pagination="pagination"
      style="height: 70vh"
      class = "q-ma-md" card-container-style="border: 1px solid black">
        <template v-slot:header="props">
        <q-tr class="text-left" :props="props">
          <q-th style="font-size: large" v-for="col in props.cols" :key="col.label">
            {{col.label}}
          </q-th>
<!--          <q-td style="font-size: x-large" v-for="[key,value] of Object.entries(props.row.winners)" :key="key+'_set'" :props="props">-->
<!--              {{value}}-->
<!--            </q-td>-->
         </q-tr>
      </template>

<template v-slot:body="props">

  <q-tr :props="props">
    <q-td style="font-size: x-large" class=""  key="Time" :props="props">
      {{getFormattedResultDate(new Date(props.row.time))}}
    </q-td>
    <q-td style="font-size: x-large" v-for="[key,value] of Object.entries(props.row.winners)" :key="key+'_set'" :props="props">
      {{value}}
    </q-td>
  </q-tr>
</template>
     </q-table>
  <q-card bordered flat class="row">
  <q-btn class="col-2 q-ma-md" color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
  </q-card>






</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_lottery_timings} from "src/common/api_calls";
import {getFormattedDateHHMM, getTimeZoneDate} from "src/common/utils";
import {get_current_date} from "src/common/utils";
import {convert_to_twelve_hour_clock} from "src/common/utils";


export default {
  name: "Results",
  components: {},
  computed:{

  },
  data() {
    return{
      pagination: {
        rowsPerPage: 0
      },
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
        field: row => (row.winners.A || row.winners.A == 0 || row.winners.A == "0")? ("0"+row.winners.A).slice(-2):''
      },{
        name:'B_set',
        required: true,
        label: 'B',
        align: 'left',
        field: row =>(row.winners.B || row.winners.B == 0 || row.winners.B == "0")? ("0"+row.winners.B).slice(-2):''
      },{
        name:'C_set',
        required: true,
        label: 'C',
        align: 'left',
        field: row => (row.winners.C || row.winners.C == 0 || row.winners.C == "0")? ("0"+row.winners.C).slice(-2):''
      },{
        name:'D_set',
        required: true,
        label: 'D',
        align: 'left',
        field: row => (row.winners.D || row.winners.D == 0 || row.winners.D == "0")? ("0"+row.winners.D).slice(-2):''
      },{
        name:'E_set',
        required: true,
        label: 'E',
        align: 'left',
        field: row => (row.winners.E || row.winners.E == 0 || row.winners.E == "0")? ("0"+row.winners.E).slice(-2):''
      },{
        name:'F_set',
        required: true,
        label: 'F',
        align: 'left',
        field: row => (row.winners.F || row.winners.F == 0 || row.winners.F == "0")? ("0"+row.winners.F).slice(-2):''
      },{
        name:'G_set',
        required: true,
        label: 'G',
        align: 'left',
        field: row => (row.winners.G || row.winners.G == 0 || row.winners.G == "0")?("0"+row.winners.G).slice(-2):''
      },{
        name:'H_set',
        required: true,
        label: 'H',
        align: 'left',
        field: row =>(row.winners.H || row.winners.H == 0 || row.winners.H == "0")? ("0"+row.winners.H).slice(-2):''
      },{
        name:'I_set',
        required: true,
        label: 'I',
        align: 'left',
        field: row => (row.winners.I || row.winners.I == 0 || row.winners.I == "0")? ("0"+row.winners.I).slice(-2):''
      },{
        name:'J_set',
        required: true,
        label: 'J',
        align: 'left',
        field: row =>(row.winners.J || row.winners.J == 0 || row.winners.J == "0")? ("0"+row.winners.J).slice(-2):''
      }]
    }
  },
  methods:{
    fetch_winners_according_to_date(){
      var date_dict = {"start_date":this.start_date,"end_date":this.end_date}
      get_lottery_timings(date_dict).then(res=>{
        this.results_data = res.lottery_objects
      })
    },
    getFormattedResultDate:function (date){
      console.log(date)
      return getTimeZoneDate(new Date(date)).toLocaleDateString("en-IN").replaceAll("/","-")+"  "+getFormattedDateHHMM(date)
    }
  },
  created() {
    get_lottery_timings().then(
      res => {
          this.results_data = res.lottery_objects
      }
    )
  }
}
</script>

<style>

</style>
