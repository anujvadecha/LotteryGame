<template>
  <div>
    <q-table
      title="Treats"
      :data="tickets"
      row-key="name"
    />
<q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
    </div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_tickets} from "src/common/api_calls";

export default {
name: "TxnDetails",
  data(){
    return {
      tickets:[]
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
