<template>
<div>
  <q-card-section>

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
  selection_state ()
  {
    return this.$store.state.selectionState
  },
  selection:function (){
    var output= [];
    var dictionary= this.$store.getters.get_selected;
    for (var key in dictionary) {
    if (dictionary.hasOwnProperty(key)) {
        output.push({number:key,price:dictionary[key]['price'],quantity:dictionary[key]['quantity']})
        console.log(key, dictionary[key]);
    }
    return output
}
    return this.$store.getters.get_selected
  }
},
  watch: {
    'this.$store.state.selectionState': function () {
      console.log("watcher received")
      console.log(val)
    }
  },
  created() {
  console.log(this.$store.getters.get_selected);
  }
}
</script>

<style scoped>

</style>
