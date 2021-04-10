<template>
  <div>
    <div style="" class="row" >
      <div class="col-2 bg-light-green " style="" >{{$store.state.selectionState}}</div>
      <div class="col">
        <div class="row " v-for="i in 10" :key="i" >
        <div class="" v-for="n in 10" :key="n">
          <q-card class="q-ml-sm q-mr-sm text-center" flat>
            <div style=""> {{ i*10+n-10}} </div>
            <input style="height: 20px;width: 40px" v-model="inputs[set][i*10+n-10]" @input="add_input(i*10+n-10)"/>
          </q-card>
          </div>
        </div>
      </div>
      <div class="col-2 bg-light-green " style="" >{{$store.state.selectionState}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectionTable",
  props: ['set'],
  computed:{
    inputs:function(){
      return this.$store.state.inputs
    },
  },
  data() {
    return {

    }
  },
  methods: {
    add_input:function (n){
      console.log(this.set+n +' '+ this.inputs[this.set][n])
      this.$store.dispatch('push_ticket',{ticket:this.set+(n),quantity:{quantity:parseInt(this.inputs[this.set][n]) , price:this.$store.state.price}})
      console.log(this.$store.state.selectionState);
    }
  },

}
</script>

<style scoped>

</style>
