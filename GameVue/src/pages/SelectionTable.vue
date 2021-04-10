<template>
  <div class="row" style="">
      <div class="col-3" style="background-color: lightpink">
      <div class="row" style="background-color: white;height: 9.09%">
        <div class="q-ma-sm" style='background-color: #ba56d4; color: white;width: 400px' >
          <q-checkbox dense :value="true"></q-checkbox> Name
        </div>
      </div>
      <div class="row"  style="background-color: white;height: 9.09% " v-for="link in essentialLinks" :key="link.title" >
          <div class="q-ma-sm" v-bind:style="getStyleForButton(link)" @click="pushToPage(link)">
          <q-checkbox dense @input="changeMainSelectedStates()" v-model="selectedSets[link.alias]" :value="true"></q-checkbox> {{link.title}}
          </div>
      </div>
      </div>
      <div class="col-1 bg-light-green " style="" >
      <div class="row" style="background-color: white;height: 9.09%">
          <div class="col text-center font-bold" style="border: 1px solid black;"> Points</div>
          <div class="col text-center font-bold" style="border: 1px solid black;"> SR</div>
      </div>
      <div class="row"  style="background-color: white;height: 9.09% " v-for="link in essentialLinks" :key="link.title" >
          <div class="col text-center" style="border: 1px solid black;"> {{parseInt($store.state.setPoints[link.alias])*10}}</div>
          <div class="col text-center" style="border: 1px solid black;">{{link.alias}}</div>
      </div>
      </div>
      <div class="col" style="background-color: #eef8ff">
        <div class="row " v-for="i in 10" :key="i" >
          <div></div>
          <input style="height: 20px;width: 40px" @input="add_input(i*10+n-10-1)"/>
          <div class="" v-for="n in 10" :key="n">
          <q-card class="q-ml-sm q-mr-sm text-center" style="background-color: #eef8ff" flat>
            <div style=""> {{ i*10+n-10-1}} </div>
            <input class="text-center" v-bind:style="getStyleForInput(inputs[set][i*10+n-10-1])" v-model="inputs[set][i*10+n-10-1]" @input="add_input(i*10+n-10-1)"/>
          </q-card>
          </div>
        </div>
      </div>
      <div class="col-2 bg-light-green " style="" >
        <div class="row" style="background-color: white;height: 9.09%">
          <div class="col text-center font-bold" style="border: 1px solid black;"> Qty</div>
          <div class="col text-center font-bold" style="border: 1px solid black;"> Pts</div>
      </div>
      <div class="row"  style="background-color: white;height: 9.09% " v-for="link in essentialLinks" :key="link.title" >
          <div class="col text-center" style="border: 1px solid black; background-color: #7ffffe"> {{quantitySet[link.alias]}}</div>
          <div class="col text-center" style="border: 1px solid black; background-color: #fec0ff">{{priceSet[link.alias]}}</div>
      </div>

      </div>

  </div>
</template>
<script>

const linksData = [
  {
    title: 'Set A -1',
    icon: 'mdi-home',
    alias: 'A',
    link: 'A',
    mobile: true
  },
  {
    title: 'Set B -2',
    alias: 'B',
    icon: 'mdi-star',
    link: 'B',
    mobile: true
  },
  {
    title: 'Set C -3',
    icon: 'mdi-cart',
    alias: 'C',
    link: 'C',
    mobile: true
  },
  {
    title: 'Set D -4',
    icon: 'mdi-account',
    alias: 'D',
    link: 'D',
    mobile: true
  },
  {
    title: 'Set E -4',
    icon: 'mdi-account',
    alias: 'E',
    link: 'E',
    mobile: true
  },
  {
    title: 'Set F -4',
    icon: 'mdi-account',
    alias: 'F',
    link: 'F',
    mobile: true
  },
  {
    title: 'Set G -4',
    icon: 'mdi-account',
    alias: 'G',
    link: 'G',
    mobile: true
  },
  {
    title: 'Set H -4',
    icon: 'mdi-account',
    alias: 'H',
    link: 'H',
    mobile: true
  },
  {
    title: 'Set I -4',
    icon: 'mdi-account',
    alias: 'I',
    link: 'I',
    mobile: true
  },
  {
    title: 'Set J -4',
    icon: 'mdi-account',
    alias: 'J',
    link: 'J',
    mobile: true
  }
]
export default {
  name: "SelectionTable",
  props: ['set'],
  computed:{
    inputs:function(){
      return this.$store.state.inputs
    },
    quantitySet:function () {
      var quantity={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0}
      var setDict=this.$store.state.inputs;
      for (var key in setDict){
        for(var number in setDict[key]) {
          if(setDict[key][number] !== null && setDict[key][number])
            quantity[key] =parseInt(quantity[key]) + parseInt(setDict[key][number])
        }
      }
      return quantity;
    },
    priceSet:function(){
      var price={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0}
      var setDict=this.$store.state.inputs;
      for (var key in setDict){
        for(var number in setDict[key]) {
          if(setDict[key][number] !== null && setDict[key][number])
            price[key] = (parseInt(price[key]) + parseInt(setDict[key][number]))
        }
        price[key]=price[key]*this.$store.state.setPoints[key]
      }
      return price;
    }
  },
  data() {
    return {
      selectedSets:{A:false,B:false,C:false,D:false,E:false,F:false,G:false,H:false,I:false,J:false},
      essentialLinks: linksData,

    }
  },
  methods: {
    add_input:function (n){
      console.log(this.$store.state.selectionState)
      console.log(this.set+n +' '+ this.inputs[this.set][n])
      this.$store.dispatch('push_ticket',{ticket:this.set+(n),quantity:{quantity:parseInt(this.inputs[this.set][n]) , price:this.$store.state.price}})
      console.log(this.$store.state.selectionState);
    },
    changeMainSelectedStates:function () {
      console.log("changing state")
      this.$store.dispatch('change_selected_sets',this.selectedSets)
    },
    getStyleForButton:function (link){
      if(link.alias===this.set)
        return 'background-color: red; color: white;width: 400px'
      else
      return 'background-color: #ba56d4; color: white;width: 400px'

    },
    getStyleForInput(input)
    {
      // background-color:#882ce2;
      if(input && input!=0 && input!=null)
      return "height: 20px; width: 40px;  color:#c50a46; font-weight:bold "
      else
      return "height: 20px;width: 40px;"
    },
    pushToPage:function (link) {
      this.$router.push({
        path: 'SelectionTable/'+link.alias,
        name:'SelectionTable',
        params: {
          set: link.alias
        }
      })
    }
  },

}
</script>

<style scoped>

</style>
