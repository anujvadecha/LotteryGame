<template>
  <div>
<!--     <ResultHeader></ResultHeader>-->
<!--  <div>-->
  <div class="row" v-if="!$q.platform.is.mobile">
    <div class="q-pa-md" style="">
    <q-input filled v-model="start_date">
    <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="start_date" mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    </div>
    <div class="q-pa-md" style="">
    <q-input filled v-model="end_date">
    <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="end_date" mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    </div>

    <q-btn  unelevated style="" color="primary" class="q-ma-md" @click="fetch_transactions_according_to_date()">Go</q-btn>

  </div>

  <div class="row" v-if="$q.platform.is.mobile">
    <div class="q-pa-md col-5" style="">
    <q-input filled v-model="start_date">
    <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="start_date" mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    </div>
    <div class="q-pa-md col-5" style="">
    <q-input filled v-model="end_date">
    <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="end_date" mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    </div>

    <q-btn  unelevated style="" color="primary" class="col-2" @click="fetch_transactions_according_to_date()">Go</q-btn>

  </div>



    <q-table
      title="Transaction Details"
      :data="tickets"
      style="height:60vh"
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
      <q-card class="row" flat bordered v-if="!$q.platform.is.mobile">
         <q-btn class="col q-ma-md" color="blue"  unelevated @click="$router.push({path:'/'})">Back</q-btn>
          <q-btn class="col q-ma-md" color="orange" unelevated @click="print_ticket()">Print</q-btn>
         <q-btn class="col q-ma-md" color="red"  unelevated @click="bet_details()">Bet Details</q-btn>
      </q-card>

      <q-card class="row" flat bordered v-else>
         <q-btn class="col q-ma-md" color="blue"  unelevated @click="$router.push({path:'/'})">Back</q-btn>
         <q-btn class="col q-ma-md" color="red"  unelevated @click="bet_details()">Bet Details</q-btn>
      </q-card>
<!--  </div>-->

  </div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_tickets} from "src/common/api_calls";
import {getTimeZoneDate, print_div} from "src/common/utils";
import { Platform } from 'quasar'
import {get_current_date, convert_to_yyyy_mm_dd, getFormattedDateHHMM} from "src/common/utils";
export default {
name: "TxnDetails",
components: {},
  data(){
    return {
      start_date: get_current_date(),
      end_date: get_current_date(),
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
        format: val => getTimeZoneDate(new Date(val)).toLocaleDateString("en-IN")+" "+getFormattedDateHHMM(new Date(val)),
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
      {
        name:'Cancelled',
        required: true,
        label: 'Is Cancelled',
        align: 'left',
        field: row => row.cancelled,
      }
      ],
      selected:[]
    }
  },
  created() {
    get_tickets(null).then(
      res=>{
        this.tickets=res
      }
    )
  },
  methods:{
    fetch_transactions_according_to_date(){
      var start_date = this.start_date
      var end_date = this.end_date
      start_date = convert_to_yyyy_mm_dd(this.start_date)
      end_date = convert_to_yyyy_mm_dd(this.end_date)
      var date_dict = {"start_date":start_date,"end_date":end_date}
      get_tickets(date_dict).then(res=>{
        this.tickets = res
      })
    },
    click_row(event,row){
      this.selected.push(row)
      this.bet_details()
    },
    print_ticket() {
      this.selected.map(ticket => {
          try{
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
