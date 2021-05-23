<template onunload="myFunction()">
<div>
  <ResultHeader>
  </ResultHeader>
  <div class="row" style="">
    <q-card class="col-5" style="" >
        <q-card-section>
          <div class="row">TXN: {{this.ticket.ticket_id}}</div>
          <div class="row">Ticket Date: {{get_ticket_time(ticket.created_at)}}</div>
          <div class="row">Lottery time: {{get_ticket_time(this.ticket.lottery.time)}}</div>
        </q-card-section>
    </q-card>
    <div class="col-7" style="background-color: grey">
      <q-table
        class="row"
        style="height: 600px"
        virtual-scroll
        title="Transaction Details"
        :data="this.ticket.ticket_set"
        :virtual-scroll-item-size="10"
        :pagination="pagination"
        :rows-per-page-options="[0]">
      </q-table>
    </div>
  </div>
    <q-card class="row" flat bordered>
         <q-btn class="col q-ma-md" color="blue"  unelevated @click="$router.push({path:'/TxnDetails'})">Back</q-btn>
         <q-btn class="col q-ma-md" color="orange"  unelevated @click="print_ticket()">Print</q-btn>
      <q-btn class="col q-ma-md" color="red"  unelevated @click="delete_ticket()">Cancel</q-btn>
    </q-card>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {getTimeZoneDate} from "src/common/utils";
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
    get_ticket_time:function (date_string) {
      var val=date_string
      return getTimeZoneDate(new Date(val)).toLocaleDateString("en-IN").replaceAll("/","-")+" "+getTimeZoneDate(new Date(val)).getHours()+":"+getTimeZoneDate(new Date(val)).getMinutes()
    },
    delete_ticket:function(){
      var ticket_id = this.ticket.ticket_id
      var data_to_send = {'cancelled_ticket_id':ticket_id}
      delete_ticket_api(data_to_send).then(res => {
          console.log(res)
          if(res.status_code == 200){
            Notify.create({
              type: 'positive',
              progress: false,
              message: 'Ticket: '+ this.ticket.ticket_id + " is cancelled",
              position: 'top-right',
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
              message: "Completed lottery ticket cannot be cancelled.",
              position: 'top-right',
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
              message: 'There seems to be some problem, please report this error',
              position: 'top-right',
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
  components: {ResultHeader},
  props:["ticket"]
}
</script>

<style scoped>

</style>
