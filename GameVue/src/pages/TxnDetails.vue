<template>
  <div>
     <ResultHeader></ResultHeader>
  <div>
    <q-table
      title="Transaction Details"
      :data="tickets"
      :columns="columns"
      row-key="ticket_id"
      class = "q-ma-md"
      selection="single"
      :selected.sync="selected"
    />
      <q-card class="row" flat bordered>
         <q-btn class="col q-ma-md" color="blue"  unelevated @click="$router.push({path:'/'})">Back</q-btn>
         <q-btn class="col q-ma-md" color="orange"  unelevated @click="print_ticket()">Print</q-btn>
         <q-btn class="col q-ma-md" color="red"  unelevated @click="bet_details()">Bet Details</q-btn>
      </q-card>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_tickets} from "src/common/api_calls";
import {getTimeZoneDate} from "src/common/utils";
export default {
name: "TxnDetails",
components: {ResultHeader},
  data(){
    return {
      tickets:[],
      columns : [{
        name:'ticket_id',
        required: true,
        label: 'Ticket ID',
        align: 'left',
        field: row => row.ticket_id,
      },
      {
        name:'created_at',
        required: true,
        label: 'Time',
        align: 'left',
        field: row => row.created_at,
        format: val => getTimeZoneDate(new Date(val)).toLocaleDateString("en-IN").replaceAll("/","-")+" "+getTimeZoneDate(new Date(val)).getHours()+":"+getTimeZoneDate(new Date(val)).getMinutes(),
      },
      {
        name:'Total Price',
        required: true,
        label: 'Total Price',
        align: 'left',
        field: row => row.total_price,
      },
      ],
      selected:[]
    }
  },
  created() {
    get_tickets(null).then(
      res=>{
        console.log(res);
        this.tickets=res
      }
    )
  },
  methods:{
    print_ticket() {
      console.log(this.selected)
    },
    bet_details() {
      this.$router.push({
          name:"TicketDetails",
          path:"/TicketDetails/${this.selected[0].ticket_id}",
          params: {
            ticket: this.selected[0],
          }
        }
      )
    }
  },
}

</script>

<style scoped>

</style>
