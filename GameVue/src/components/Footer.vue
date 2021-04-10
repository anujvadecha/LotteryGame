<template>
<div class="row">
    <div class="col-3">
      <input class="q-ml-md">
      <q-btn color="#9e0e6e" unelevated>CLAIM</q-btn>
    </div>
   <q-btn class="bg-purple q-ml-md" @click="place_ticket_order()">Buy</q-btn>
<!--  <q-btn class="bg-purple q-ml-md">Reset</q-btn>-->
<!--  <q-btn class="bg-purple q-ml-md">Transaction Detail</q-btn>-->
<!--  <q-btn class="bg-purple q-ml-md">Refresh</q-btn>-->
</div>
</template>

<script>

import {place_order} from "src/common/api_calls";
export default {
name: "Footer",
  components: {},
  methods:{
  place_ticket_order:function (){
   place_order(this.$store.state.selectionState).then(res=>{
     console.log(res)
   }).catch(err=>{
     console.log(err);
   });
  }
}
}
</script>

<style scoped>

</style>
