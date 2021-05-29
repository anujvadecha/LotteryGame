<template>
 <div>
  <ResultHeader></ResultHeader>
    <q-card bordered flat class="row justify-end">
 <q-input dense class="q-pa-md " filled v-model="start_date">
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

 <q-input dense class="q-pa-md " filled v-model="end_date">
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
    <q-btn color="primary"   unelevated style="" class="q-ma-md" @click="fetch_transaction_according_to_date()"> Go </q-btn>
    </q-card>

    <div id="account_details" >
      <q-card-section class="row" style="font-size: x-large;">
      SHREE ONLINE VIDEO GAME
      </q-card-section>
      <q-card-section style="font-size: large">
      <div class= "row">
        <div class="col">From: {{this.start_date}}</div>
        <div class="col">To: {{this.end_date}} </div>
      </div>
      <div class= "row">
        <div class="col">Play Points: </div>
        <div class="col">{{ total_inflow }}</div>
      </div>
      <div class= "row">
        <div class="col">Win Points</div>
        <div class="col">{{ total_outflow }}</div>
      </div>
      <div v-if="this.user_type==='AGENT'" class= "row">
        <div class="col">End Points</div>
        <div class="col">{{total_inflow-total_outflow}}</div>
      </div>
      <div v-if="this.user_type==='AGENT'"  class= "row">
        <div class="col"> Profit </div>
        <div class="col">{{Math.round(total_inflow*(commission/100))}}</div>
      </div>

      <div v-if="this.user_type==='AGENT'" class= "row">
        <div class="col"> Net To Payable Points </div>
        <div class="col">{{ Math.round(total_inflow-total_outflow)-total_inflow*(commission/100)}}</div>
      </div>
      </q-card-section>
  </div>
  <q-card bordered flat class="row absolute-bottom">
  <q-btn class="col-2 q-ma-md" color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
  <q-btn class="col-2 q-ma-md" color="orange" unelevated @click="print_account()">Print</q-btn>
    </q-card>

   </div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_total_points} from "src/common/api_calls";
import {get_current_date} from "src/common/utils";

export default {
  name: "MyAccounts",
  components: {ResultHeader},
  data () {
  return {
      start_date: get_current_date(),
      end_date: get_current_date(),
      total_outflow:"",
      total_inflow:"",
      total_pending:"",
      commission:0,
      user_type:"PLAYER"
    }
  },
  methods:{
    print_account(){
     var printContents = document.getElementById('account_details').innerHTML;
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
    },
    fetch_transaction_according_to_date(){
      console.log(this.start_date)
      console.log(this.end_date)
      var date_dict = {"start_date":this.start_date,"end_date":this.end_date}
      get_total_points(date_dict).then(res=>{
        console.log(res)

        this.user_type = res.user.user_type
        this.total_inflow = res.outflow;
        this.total_outflow = res.inflow;
        this.total_pending = res.balance_points
      })
      console.log(this.total_inflow)
    }
  },
  created() {
    console.log("created my accounts")
    get_total_points(null).then(res=>{
      this.user_type = res.user.user_type
      this.total_inflow = res.outflow;
      this.total_outflow = res.inflow;
      this.total_pending = res.balance_points
      this.commission=res.commission
    })
  }
}
</script>

<style scoped>

</style>
