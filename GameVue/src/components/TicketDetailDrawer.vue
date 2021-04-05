<template>
<div>
  <q-card-section>
    {{selectionState}}
<!--    <div class="row" v-for="(item,ticket) in $store.state.selectionState" :key="ticket">-->
<!--      {{item}} {{ticket}}-->
<!--    </div>-->

<!--    <div class="row" v-for="n in $store.state.selectionState" :key="n">-->
<!--      {{n}}-->
<!--    </div>-->
  </q-card-section>
</div>
</template>

<script>
export default {
name: "TicketDetailDrawer",
computed :{
  selection:function (){
    return this.$store.getters.get_instruments()
  }

  }
}
</script>

<style scoped>

</style>
