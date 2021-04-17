<template>
<div class="row" style="background-color: white">
    <div style="border: 1px solid black" class="col-3">
      <input v-model="this.barCodeNumber" class="q-ml-md">
      <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col q-ml-lg ">Claim</q-btn>
    </div>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="place_ticket_order()">Update Results</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="$router.push({path:'/TxnDetails'})">Txn Details</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="place_ticket_order()">Reset all</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="place_ticket_order()">Buy</q-btn>
    <div class="col text-center q-pa-sm text-black" style="font-weight: bold;font-size: large">Grand Total</div>
    <div class="col-2">
      <div class="row"  style="background-color: white;height: 100%" >
          <div class="col text-center text-black" style="border: 1px solid black; background-color: white;font-size: large;font-weight: bold"> 0</div>
          <div class="col text-center text-black" style="border: 1px solid black; background-color: white;font-size: large;font-weight: bold"> 0</div>
      </div>
    </div>
<!--  <q-btn class="bg-purple q-ml-md">Reset</q-btn>-->
<!--  <q-btn class="bg-purple q-ml-md">Transaction Detail</q-btn>-->
<!--  <q-btn class="bg-purple q-ml-md">Refresh</q-btn>-->
</div>
</template>

<script>

import {place_order} from "src/common/api_calls";
export default {
name: "Footer",
  components: {},
  methods:{
  place_ticket_order:function (){
   place_order(this.$store.state.selectionState).then(res=>{
     console.log(res)
   }).catch(err=>{
     console.log(err);
   });
  },
  data(){
    return {
      barCodeNumber: ""
    }
  }
}
}
</script>

<style scoped>

</style>
