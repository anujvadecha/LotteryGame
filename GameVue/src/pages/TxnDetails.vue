<template>
  <div>
<!--     <ResultHeader></ResultHeader>-->
<!--  <div>-->
    <q-table
      title="Transaction Details"
      :data="tickets"
      style="height:800px"
      virtual-scroll
      :pagination="pagination"
      :columns="columns"
      row-key="ticket_id"
      class = "q-ma-md row"
      selection="multiple"
      :selected.sync="selected"
      @row-click="click_row"
    />
    <router-view></router-view>
      <q-card class="row " flat bordered>
         <q-btn class="col q-ma-md" color="blue"  unelevated @click="$router.push({path:'/'})">Back</q-btn>
         <q-btn class="col q-ma-md" color="orange"  unelevated @click="print_ticket()">Print</q-btn>
         <q-btn class="col q-ma-md" color="red"  unelevated @click="bet_details()">Bet Details</q-btn>
      </q-card>
<!--  </div>-->

  </div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_tickets} from "src/common/api_calls";
import {getTimeZoneDate, print_div} from "src/common/utils";
export default {
name: "TxnDetails",
components: {},
  data(){
    return {
      tickets:[],
      pagination: {
        rowsPerPage: 0
      },
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
      {
        name:'Total winnings',
        required: true,
        label: 'Total winnings',
        align: 'left',
        field: row => row.inflow,
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
    click_row(event,row){
      console.log(row)
      console.log("row clicked"+row+event)
      this.selected.push(row)
      this.bet_details()
    },
    print_ticket() {
      console.log(this.selected)
      this.selected.map(ticket => {
          try{
            console.log(ticket)
            print_div(ticket)
          }catch (e){console.log(e)}

        });
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
