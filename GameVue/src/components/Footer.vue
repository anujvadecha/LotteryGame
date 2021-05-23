<template>
<div class="row" style="background-color: white">
    <div style="border: 1px solid black" class="col-3">
      <input v-model="barCodeNumber" style="width: 50%" class="q-ml-md" id="final_barcode">
      <q-btn unelevated style="border: 1px solid black;" class="bg-purple col q-ml-lg " @click="claim_result()">Claim</q-btn>
    </div>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="update_results()">Update Results</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="$router.push({path:'/TxnDetails'})">Txn Details</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="reset_all()">Reset all</q-btn>
   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="place_ticket_order()">Buy</q-btn>
    <div class="col text-center q-pa-sm text-black" style="font-weight: bold;font-size: large">Grand Total</div>
    <div class="col-2">
      <div class="row"  style="background-color: white;height: 100%" >
          <div class="col text-center text-black" style="border: 1px solid black; background-color: white;font-size: large;font-weight: bold"> {{quantitySet}}</div>
          <div class="col text-center text-black" style="border: 1px solid black; background-color: white;font-size: large;font-weight: bold"> {{priceSet}}</div>
      </div>
    </div>
</div>
</template>

<script>
// import {JsBarcode} from 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.4/dist/JsBarcode.all.min.js';
import {claim_ticket_api, get_winners, place_order} from "src/common/api_calls";
import {Notify} from "quasar";
import {print_div} from "src/common/utils";

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
      var price = {A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0}
      var setDict=this.$store.state.inputs;
      for (var key in setDict){
        for(var number in setDict[key]) {
          if(setDict[key][number] !== null && setDict[key][number])
            for(var i=0;i<this.$store.state.selected_lotteries.length;i++) {
              price[key] = (parseInt(price[key]) + parseInt(setDict[key][number]))
            }
        }
        price[key]=price[key]*this.$store.state.setPoints[key]
      }
      var totalPrice = 0;
      // for (const [key, value] of Object.entries(totalPrice)) {
        // console.log(key)
        // console.log(value)
        totalPrice += key
      // }
      return price.A+price.B+price.C+price.D+price.E+price.F+price.G+price.H+price.I+price.J;
    }
  },

  methods:{
  claim_result: function(){
      var ticket_id_input = document.getElementById("final_barcode").value
      var data = {'ticket_id': ticket_id_input}
      claim_ticket_api(data).then(
           res=> {
              console.log(res)
              if(res.status_code == 200){

                Notify.create({
                    type: 'positive',
                    progress: true,
                    message: 'Ticket can be claimed',
                    position: 'top-right',
                    timeout: 5000,
                    actions: [
                      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                    ]
                  })
                print_div(res["ticket"],true)
              }else{
                Notify.create({
                    type: 'negative',
                    progress: true,
                    message: res["status_message"],
                    position: 'top-right',
                    timeout: 5000,
                    actions: [
                      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                    ]
                  })
              }

            }
          )
  },
  place_ticket_order:function (){

    var order={
      selected_lotteries: this.$store.state.selected_lotteries.map(lottery=>{ return lottery.id}),
      selection:this.$store.state.selectionState
    }
    console.log(order)
    const  store=this.$store;
    place_order(order).then(res=>{
      if(res.status_code===200)
      {
        console.log(res)
        store.dispatch('update_balance_points',res.balance_points)
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
        res.tickets.map(ticket => {
          print_div(ticket)
        });
        return ticket.ticket_id})
        this.$store.dispatch('reset_all')
        }
      else{
        Notify.create({
          type: 'negative',
          progress: true,
          message: 'Ticket could not be booked due to error '+res.message,
          position: 'top-right',
          timeout: 5000,
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
      })
      }
   })
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
    update_results(){
          this.$router.push({name:'DiceRotation'})
          get_winners({"lottery_id":this.$store.state.nextLottery.id}).then(
           res=> {
              this.$store.dispatch("set_results",res.lottery_winners_ticket)
              this.$store.dispatch('set_announcements',res.announcements)
            }
          )
    }



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
