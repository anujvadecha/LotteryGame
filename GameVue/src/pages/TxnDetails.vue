<template>
  <div>
     <ResultHeader></ResultHeader>
  <div>
   
    <q-table
      title="Transaction Details"
      :data="tickets"
      :columns="columns"
      row-key="name"
      class = "q-ma-md"
    />
<q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
    </div>
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
      ]

    }
  },
  created() {
    get_tickets(null).then(
      res=>{
        console.log(res);
        this.tickets=res
      }
    )
  }
}

</script>

<style scoped>

</style>
