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
           <q-btn dense unelevated style="margin-top:20px;border: 1px solid black" class="bg-purple col " @click="fetch_transaction_according_to_date()">Go -></q-btn>
      </div>
      </div>

    <div class="row">
      <div class="col-3">
      </div>
      <div class="col-6">
      From
        <br>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-11" >
            <p>SHREE ONLINE VIDEO GAME</p>
            <p>2/03/2021 21:32:48</p>
              <div class= "row">
                <div class="col">From: 2/03/2021</div>
                <div class="col">To: 2/03/2021 </div>
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
                <div class="col">{{total_inflow*(commission/100)}}</div>
              </div>

              <div v-if="this.user_type==='AGENT'" class= "row">
                <div class="col"> Net To Pay Points </div>
                <div class="col">{{ (total_inflow-total_outflow)-total_inflow*(commission/100)}}</div>
              </div>


          </div>
        </div>


    </div>
    </div>

  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
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
    fetch_transaction_according_to_date(){
      console.log(this.start_date)
      console.log(this.end_date)
      var date_dict = {"start_date":this.start_date,"end_date":this.end_date}
      get_total_points(date_dict).then(res=>{
        console.log(res)
<<<<<<< HEAD
        this.total_credit= res["outflow"];
        this.total_debit= res["inflow"];
        this.total_pending=res["balance_points"]
=======
        this.user_type = res.user.user_type
        this.total_inflow = res.outflow;
        this.total_outflow = res.inflow;
        this.total_pending = res.balance_points
>>>>>>> e19b5644424594be8e0d8da2de39f5f9476b2632
      })
      console.log(this.total_inflow)
    }
  },
  created() {
    console.log("created my accounts")
    get_total_points(null).then(res=>{
<<<<<<< HEAD
      console.log(res)
      this.total_credit= res["outflow"];
      this.total_debit= res["inflow"];
      this.total_pending=res["balance_points"]
=======
      this.user_type = res.user.user_type
      this.total_inflow = res.outflow;
      this.total_outflow = res.inflow;
      this.total_pending = res.balance_points
      this.commission=res.commission
>>>>>>> e19b5644424594be8e0d8da2de39f5f9476b2632
    })
  }
}
</script>

<style scoped>

</style>
