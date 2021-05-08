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
      <div class="col-3">
      From
        <br>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-11" >
            <p>SHREE ONLINE VIDEO GAME</p>
            <p>2/03/2021 21:32:48</p>
            <table>
              <tr>
                <td>From: 2/03/2021</td>
                <td>To: 2/03/2021 </td>
              </tr>

              <tr>
                <td>Play Points: </td>
                <td>{{total_debit}} </td>
              </tr>

              <tr>
                <td>Win Points</td>
                <td>{{total_credit}}</td>
              </tr>
              <tr>
                <td>End Points</td>
                <td>{{total_pending}}</td>
              </tr>

            </table>

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
      total_debit:"",
      total_credit:"",
      total_pending:"",
    }
  },
  methods:{
    fetch_transaction_according_to_date(){
      console.log(this.start_date)
      console.log(this.end_date)
      var date_dict = {"start_date":this.start_date,"end_date":this.end_date}
      get_total_points(date_dict).then(res=>{
        console.log(res)
        this.total_credit= res["outflow"];
        this.total_debit= res["inflow"];
        this.total_pending=res["balance_points"]
      })
    }
  },
  created() {
    console.log("created my accounts")
    get_total_points(null).then(res=>{
      console.log(res)
      this.total_credit= res["outflow"];
      this.total_debit= res["inflow"];
      this.total_pending=res["balance_points"]
    })
  }
}
</script>

<style scoped>

</style>
