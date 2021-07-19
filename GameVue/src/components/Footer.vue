<template>
<div class="row" style="background-color: white">
    <div v-if="!$q.platform.is.mobile" style="border: 1px solid black" class="col-3">
      <div class="row" >
      <div class="col" >
        <input @keydown.enter="claim_result()" placeholder="Please enter barcode here" dense outlined style="border: 1px solid black;height: 100%;width:100%" class="col-8" id="final_barcode">
      </div>
        <q-btn id="claim_button" dense unelevated style="padding: 2px" class="col-4 bg-purple col" @click="claim_result()">Claim</q-btn>
      </div>
      </div>
<!--   <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="update_results()">Update Results</q-btn>-->
       <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="$router.push({path:'/TxnDetails'})">Txn Details</q-btn>
       <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " id="reset_all_btn" @click="reset_all()">Reset all</q-btn>
       <q-btn dense unelevated style="border: 1px solid black" class="bg-purple col " @click="place_ticket_order()" id="buy_button">Buy</q-btn>
        <div v-if="!$q.platform.is.mobile" class="col text-center q-pa-sm text-black" style="font-weight: bold;font-size: large">Total</div>
        <div v-if="!$q.platform.is.mobile"  class="col-2">
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
import {ClickHereToPrint, print_div, PrintDiv} from "src/common/utils";

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
    var ticket_id_input = document.getElementById('final_barcode').value
    console.log(ticket_id_input)
    var data = {'ticket_id': ticket_id_input}
    const store = this.$store;
    claim_ticket_api(data).then(
           res=> {
              console.log(res)
              if(res.status_code == 200){
                print_div(res["ticket"],true,store.state.user.first_name)
                store.dispatch('update_balance_points',res.balance_points)
                Notify.create({
                    type: 'positive',
                    progress: true,
                    message: '<h6>You have won '+res["ticket"]["inflow"]+' points for '+res['ticket']['ticket_id']+'</h6>',
                    position: 'center',
                    timeout: 8000,
                    html:true,
                    actions: [
                      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                    ]
                  })
               // try{document.getElementById("final_barcode").value='';}catch (e){}
              }else{
                Notify.create({
                    type: 'negative',
                    progress: true,
                    message: "<h6>"+data['ticket_id']+":  "+ res["status_message"]+"</h6>",
                    position: 'center',
                    html:true,
                    timeout: 8000,
                    actions: [
                      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                    ]
                  })
                  // try{document.getElementById("final_barcode").value='';}catch (e){}
              }

            }
          )
  },
  place_ticket_order:function (){
    var selected_lotteries =this.$store.state.selected_lotteries.map(lottery=>{ return lottery.id});
    console.log(selected_lotteries)
    if(selected_lotteries.length===0) {
      selected_lotteries = [this.$store.state.nextLottery.id]
    }
    var selection = {}
    var inputs=this.$store.state.inputs
    for (const [set, set_inputs] of Object.entries(inputs)) {
      for (const [num, value] of Object.entries(set_inputs)) {
        if(value!=null) {
          var ticket = set + num
          selection[ticket] = {quantity: parseInt(value), price: this.$store.state.setPoints[set]}
        }
        }
    }
    var order={
      selected_lotteries: selected_lotteries,
      selection:selection
    }
    const  store=this.$store;
    // const router = this.$router
    const q=this.$q;
    const router = this.$router;
    console.log(order)
    place_order(order).then(res=>{
      if(res.status_code===200) {
        console.log(res["tickets"][0]["ticket_set"]);
        store.dispatch('update_balance_points',res.balance_points)
        var tickets_booked = res.tickets.map(ticket=>{
        Notify.create({
          type: 'positive',
          progress: true,
          message: '<h6>Ticket booked '+ticket.ticket_id+ ' Points '+ticket.total_price+ ' Qty '+ticket.total_quantity+'</h6>',
          html:true,
          position: 'center',
          timeout: 5000,
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
        })
        try{
        if(document.getElementById("all_set_checkbox").checked){
          document.getElementById("all_set_checkbox").click()
        }}
        catch (e){}
        router.push({
          path: '/SelectionTable',
          name:'SelectionTable',
          params: {
            set: 'A'
          }
        })

        return ticket.ticket_id})
        res.tickets.map(ticket => {
          if(!this.$q.platform.is.mobile) {
            ticket.ticket_set=ticket.ticket_set.sort(function(a, b) {
            var keyA = a.set_ticket,
              keyB = b.set_ticket;
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });
            print_div(ticket,false,store.state.user.first_name)
            // ClickHereToPrint()
            // PrintDiv()
          }
        });
        this.$store.dispatch('reset_all')
        q.fullscreen.request().then(() => { // v1.5.0+
          console.log("Success")
        })
        //   this.$q.notify({
        // message: " Go fullscreen",
        // color: 'primary',
        // position:"center",
        // timeout: 20000,
        // html:true,
        // actions: [
        //   { label: 'Go', color: 'white', handler: () => {
        //     console.log(document.body.style.zoom);
        //
        //     this.$q.fullscreen.toggle().then(result => {
        //       if(window.screen.availHeight <= 800){
        //         document.body.style.zoom = "88%"
        //       }
        //     }) ;

          // } },
          // { label: 'Dismiss', color: 'white', handler: () => {  } },
        // ]
      // })
  .catch(err => { // v1.5.0+
    console.log(err)
  });
        store.dispatch('reset_all')

        }
      else{
        Notify.create({
          type: 'negative',
          progress: true,
          message: '<h6>Ticket could not be booked due to error '+res.message+'</h6>',
          position: 'center',
          html:true,
          timeout: 5000,
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
      })
      }
   })
  },
    logout(){
    this.$q.sessionStorage.set('token', '')
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
          get_winners({"lottery_id":this.$store.state.previousLottery.id}).then(
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
