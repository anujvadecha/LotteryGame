<template onunload="myFunction()">
<div>
  <div class="row" style="">
    <q-card class="col-5" style="" >
        <q-card-section>
          <div class="row">TXN: {{this.ticket.ticket_id}}</div>
          <div class="row">Ticket Date: {{get_ticket_time(ticket.created_at)}}</div>
          <div class="row">Skill game time: {{get_ticket_time(this.ticket.lottery.time)}}</div>
          <div class="row">Total points: {{this.ticket.total_price}}</div>
          <div class="row">Total quantity: {{this.ticket.total_quantity}}</div>
          <div class="row">Total winning: {{this.ticket.inflow}}</div>
        </q-card-section>
    </q-card>
    <div class="col-7" style="background-color: grey">
      <q-table
        class="row"
        style="height:80vh"
        virtual-scroll
        title="Transaction Details"
        :data="this.ticket.ticket_set"
        :virtual-scroll-item-size="10"
        :pagination="pagination"
        :rows-per-page-options="[0]" >
      </q-table>
    </div>
  </div>
    <q-card class="row " flat bordered>
         <q-btn class="col q-ma-md" color="blue"  unelevated @click="$router.push({path:'/TxnDetails'})">Back</q-btn>
         <q-btn class="col q-ma-md" color="orange"  unelevated @click="print_ticket()">Print</q-btn>
      <q-btn class="col q-ma-md" color="red"  unelevated @click="delete_ticket()">Cancel</q-btn>
    </q-card>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {getFormattedDateHHMM, getTimeZoneDate, print_div} from "src/common/utils";
import {delete_ticket_api} from "src/common/api_calls";
import {Notify} from "quasar";

// if( this.ticket===undefined||this.ticket===null ) {
//       this.$router.push({name:'TxnDetails'})
// }

export default {
  beforeMount() {
    console.log(`At this point, vm.$el has not been created yet.`)
  },
  methods:{
    myFunction(){
      console.log("window unloaded")
    },
    print_ticket(){
      console.log(this.ticket)
      print_div(this.ticket)
    },
    get_ticket_time:function (date_string) {
      var val=date_string
      return getTimeZoneDate(new Date(val)).toLocaleDateString("en-IN")+" "+getFormattedDateHHMM(new Date(val))
    },
    delete_ticket:function(){
      var ticket_id = this.ticket.ticket_id
      var data_to_send = {'cancelled_ticket_id':ticket_id}
      const store=this.$store;
      delete_ticket_api(data_to_send).then(res => {
          console.log(res)
          if(res.status_code == 200){
            store.dispatch('update_balance_points',res.balance_points)
            Notify.create({
              type: 'positive',
              progress: false,
              message: '<h6>Ticket: '+ this.ticket.ticket_id + " is cancelled</h6>",
              position: 'center',
              html:true,
              timeout: 5000,
              actions: [
                { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
              ]
            })
            this.$router.push({name:'TxnDetails'})
          }else if(res.status_code == 300) {
            Notify.create({
              type: 'info',
              progress: false,
              message: "<h6>Completed skill game ticket cannot be cancelled.</h6>",
              html:true,
              position: 'center',
              timeout: 5000,
              actions: [
                {
                  label: 'Dismiss', color: 'white', handler: () => { /* ... */
                  }
                }
              ]
            })
          }else{
             Notify.create({
              type: 'negative',
              progress: false,
              message: '<h6>There seems to be some problem '+res['message']+'</h6>',
              position: 'center',
               html:true,
              timeout: 5000,
              actions: [
                { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
              ]
            })
          }
      })
    }
  },
  data(){
    return{
      pagination: {
        rowsPerPage: 0
      },
    }
  },
  created() {
    console.log(" Created")
    if( this.ticket===undefined||this.ticket===null ) {
      this.$router.push({name:'TxnDetails'})
    }
  },
  updated() {
    console.log("Updated")

  },
  name: "TicketDetails",
  components: {},
  props:["ticket"]
}
</script>

<style scoped>

</style>
