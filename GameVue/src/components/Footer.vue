<template>
<div class="row" style="background-color: white">
    <div style="border: 1px solid black" class="col-3">
      <input v-model="barCodeNumber" class="q-ml-md" id="final_barcode">
      <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col q-ml-lg ">Claim</q-btn>
    </div>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="place_ticket_order()">Update Results</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="$router.push({path:'/TxnDetails'})">Txn Details</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="reset_all()">Reset all</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="place_ticket_order()">Buy</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="logout()">Logout</q-btn>
    <div class="col text-center q-pa-sm text-black" style="font-weight: bold;font-size: large">Grand Total</div>
    <div class="col-2">
      <div class="row"  style="background-color: white;height: 100%" >
          <div class="col text-center text-black" style="border: 1px solid black; background-color: white;font-size: large;font-weight: bold"> {{quantitySet}}</div>
          <div class="col text-center text-black" style="border: 1px solid black; background-color: white;font-size: large;font-weight: bold"> {{priceSet}}</div>
      </div>
    </div>
<!--  <q-btn class="bg-purple q-ml-md">Reset</q-btn>-->
<!--  <q-btn class="bg-purple q-ml-md">Transaction Detail</q-btn>-->
<!--  <q-btn class="bg-purple q-ml-md">Refresh</q-btn>-->
</div>
</template>

<script>

import {place_order} from "src/common/api_calls";
import {Notify} from "quasar";
export default {
name: "Footer",
  components: {},
  computed:{
  quantitySet:function () {
      var quantity=0
      var setDict=this.$store.state.inputs;
      for (var key in setDict){
        for(var number in setDict[key]) {
          if(setDict[key][number] !== null && setDict[key][number])
            for(var i=0;i<this.$store.state.selected_lotteries.length;i++) {
              quantity= parseInt(quantity) + parseInt(setDict[key][number])
            }
        }
      }
      return quantity;
    },
    priceSet:function(){
      var price={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0}
      var totalPrice=0;
      var setDict=this.$store.state.inputs;
      for (var key in setDict){
        for(var number in setDict[key]) {
          if(setDict[key][number] !== null && setDict[key][number])
            for(var i=0;i<this.$store.state.selected_lotteries.length;i++) {
              price[key] = (parseInt(price[key]) + parseInt(setDict[key][number]))
            }
        }
        price[key] = price[key]*this.$store.state.setPoints[key]
      }
      for (let [key, value] of Object.entries(price)) {
           console.log(totalPrice+=value);
      }
      return totalPrice;
    }
  },

  methods:{
  place_ticket_order:function (){
    var order={
      selected_lotteries: this.$store.state.selected_lotteries.map(lottery=>{ return lottery.id}),
      selection:this.$store.state.selectionState
    }
    console.log(order)
   place_order(order).then(res=>{
     console.log(res)
      var tickets_booked = res.tickets.map(ticket=>{
      Notify.create({
          type: 'positive',
          progress: true,
          message: 'Ticket booked '+ticket.ticket_id+ ' Points '+ticket.total_price+ ' Qty '+ticket.total_quantity,
          position: 'top-right',
          timeout: 5000,
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
      })
      return ticket.ticket_id})
     this.$store.dispatch('reset_all')
   }).catch(err=>{
     console.log(err);
     Notify.create({
          type: 'negative',
          progress: true,
          message: 'Ticket could not be booked due to error ',
          position: 'top-right',
          timeout: 5000,
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
      })
   });
  },
    logout(){
    this.$q.localStorage.set('token', '')
      // Notify.create({
      //   message: 'You have been logged out',
      //   position: 'top-right'
      // })
      return this.$router.push({path:'/Login'})
    },
    reset_all(){
    this.$store.dispatch('reset_all')
    },


  },
  data(){
    return {
      barCodeNumber: ""
    }
}
}
</script>

<style scoped>

</style>
