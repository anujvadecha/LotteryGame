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
    </q-card>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {getTimeZoneDate} from "src/common/utils";

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
