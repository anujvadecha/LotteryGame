<template>
  <q-page class="row" style="">
      <div class="col-3" style="background-color: lightpink">
      <div class="row" style="background-color: white;height: 9.09%">
        <div class="q-ma-sm" style='background-color: #ba56d4; color: white;width: 400px' >
          <q-checkbox dense :value="true"></q-checkbox> Name
        </div>
      </div>
      <div class="row"  style="background-color: white;height: 9.09% " v-for="link in essentialLinks" :key="link.title" >
          <div class="q-ma-sm"  v-bind:style="getStyleForButton(link)" @click="pushToPage(link)">
            <q-checkbox dense @input="changeMainSelectedStates()" v-model="selectedSets[link.alias]" :value="true"></q-checkbox> {{link.title}}
          </div>
      </div>
      </div>
      <div class="col-1 bg-light-green " style="" >
      <div class="row" style="background-color: white;height: 9.09%">
          <div class="col text-center font-bold q-pa-sm" style="border: 1px solid black;;font-size: large;font-weight: bold">Pts</div>
          <div class="col text-center font-bold q-pa-sm" style="border: 1px solid black;;font-size: large;font-weight: bold"> SR</div>
      </div>
      <div class="row"  style="background-color: white;height: 9.09% " v-for="link in essentialLinks" :key="link.title" >
          <div class="col text-center q-pa-sm" style="border: 1px solid black;;font-size: large;font-weight: bold"> {{parseInt($store.state.setPoints[link.alias])*10}}</div>
          <div class="col text-center q-pa-sm" style="border: 1px solid black;;font-size: large;font-weight: bold">{{link.alias}}</div>
      </div>
      </div>
      <div class="col" style="background-color: #eef8ff">
          <div class="row" style="height: 9.09%">
          <!--     ALL POINTS CARD   -->
          <div class="" style="width: 9.09%;" >
          <q-card  class=" text-center q-pl-sm q-pr-sm" style="background-color: #eef8ff;" flat>
            <div style="" > SET </div>
            <div style="" > {{this.set}} </div>
          </q-card>
         </div>
            <!--     COLUMN CARDS   -->
            <div v-for="i in 10" :key="i" class="" style="width: 9.09%;" >
          <q-card  class=" text-center q-pl-xs q-pr-xs" style="background-color: #eef8ff;" flat>
            <div style="font-size: small"> &nbsp;</div>
            <input :id="'col'+set+i" class="text-center text-red" v-bind:style="'background-color:#882ce2;'.concat(';width:100%;height:100%')" @input="add_input_col(i)"/>
          </q-card>
         </div>
        </div>
        <div class="row " v-for="i in 10" style="height: 9.09%" :key="i" >
          <!--     ROW CARDS-->
         <div class="" style="width: 9.09%;" >
          <q-card class=" text-center q-pl-xs q-pr-xs" style="background-color: #eef8ff;" flat>
            <div  style="font-size: small"> &nbsp; </div>
            <input :id="'row'+set+i" class="text-center text-red q-pl-xs q-pr-xs" v-bind:style="'background-color:#882ce2;'.concat(';width:100%;height:100%')" @input="add_input_row(i)"/>
          </q-card>
         </div>
<!--          NUMBER CARDS     -->
          <div class="" v-for="n in 10" style="width: 9.09%;" :key="n">
          <q-card class=" text-center q-pl-xs q-pr-xs" style="background-color: #eef8ff;" flat>
            <div style="font-size: small"> {{ i*10+n-10-1}} </div>
            <input :id="set+(i*10+n-10-1)" class="text-center text-red "
                   v-bind:style="getStyleForInput(inputs[set][i*10+n-10-1]).concat(';width:100%;height:100%')"
                   :value="inputs[set][i*10+n-10-1]"
                   @input="add_input(i*10+n-10-1,true)"/>
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
          <div class="col text-center q-pa-sm" style="border: 1px solid black; background-color: #7ffffe;font-size: large;font-weight: bold"> {{quantitySet[link.alias]}}</div>
          <div class="col text-center q-pa-sm" style="border: 1px solid black; background-color: #fec0ff;font-size: large;font-weight: bold">{{priceSet[link.alias]}}</div>
      </div>
      </div>
  </q-page>
<!--    </q-page>-->
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
    inputs:{
      get () {
        return this.$store.state.inputs
      },
      set (value) {
        console.log(value)
        this.$store.commit('update_inputs',{set:this.set,value:value})
      }
    },
    quantitySet:function () {
      var quantity={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0}
      var setDict=this.$store.state.inputs;
      for (var key in setDict){
        for(var number in setDict[key]) {
          if(setDict[key][number] !== null && setDict[key][number])
            for(var i=0;i<this.$store.state.selected_lotteries.length;i++) {
              quantity[key] = parseInt(quantity[key]) + parseInt(setDict[key][number])
            }
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
            for(var i=0;i<this.$store.state.selected_lotteries.length;i++) {
              price[key] = (parseInt(price[key]) + parseInt(setDict[key][number]))
            }
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
    reverse_number(n) {
      if( n>=1&&n<=9 ) {
        n = '0'+n
      }
      const num = n;
      const reverse = (num) => parseInt(String(num)
      .split("")
      .reverse()
      .join(""), 10);
       return reverse(num);
    },
    add_input_fp:function (n) {
      var a= 0;
      var b= 0;
      var c= 0;
      var d= 0;
      if(n<50) {
        if (n % 10 <= 4) {
          a = n
          b = n + 5
          c = n + 50
          d = b + 50
        }
        if (n % 10 > 4) {
          a = n
          b = n - 5
          c = n - 50
          d = b - 50
        }
      }
      else if(n>=50) {
        if (n % 10 <= 4) {
          a = n
          b = n + 5
          c = n - 50
          d = b - 50
        }
        if (n % 10 > 4) {
          a = n
          b = n - 5
          c = n - 50
          d = b - 50
        }
      }
      console.log("A"+a +" B:"+b+" C: "+c+" D: "+d)

      var revA = this.reverse_number(a)
      var revB = this.reverse_number(b)
      var revC = this.reverse_number(c)
      var revD = this.reverse_number(d)

      console.log("Adding input")
      document.getElementById(this.set+c).value = document.getElementById(this.set+a).value
      document.getElementById(this.set+b).value = document.getElementById(this.set+a).value
      document.getElementById(this.set+d).value = document.getElementById(this.set+a).value
      this.add_input(a,false)
      this.add_input(b,false)
      this.add_input(c,false)
      this.add_input(d,false)
      document.getElementById(this.set+revA).value = document.getElementById(this.set+a).value
      document.getElementById(this.set+revB).value = document.getElementById(this.set+a).value
      document.getElementById(this.set+revC).value = document.getElementById(this.set+a).value
      document.getElementById(this.set+revD).value = document.getElementById(this.set+a).value
      this.add_input(revA,false)
      this.add_input(revB,false)
      this.add_input(revC,false)
      this.add_input(revD,false)
      // document.getElementById(this.set+a).value = document.getElementById(this.set+a).value
      // document.getElementById(this.set+b).value = 4
      // document.getElementById(this.set+a).value
      // this.inputs[this.set][c] = n
      // console.log(document.getElementById(this.set+(n+1)).value)
      // document.getElementById("A0").innerHTML = "Johny";
      // console.log(document.getElementById(this.set+n).value)
      // console.log(document.getElementById(this.set+b).value)
      // var a= new Array(10);
      // for(var i=0;i<10;i++){a[i]=[];}
      // FOR LOOP
      // for(var i=0;i<10;i++) {
      //   for(var j=0;j<10;j++) {
      //
      //   }
      // }
      // if(n)
    },
    add_input:function (n,fp){

      // console.log(this.$store.state.selectionState)
      // console.log(this.set+n +' '+ this.inputs[this.set][n])
      // document.getElementById(this.set+(n)).value = parseInt(this.inputs[set][n])
      // this.$store.state.inputs[this.set][n] =1
      // this.$store.dispatch('change_ticket_state',{set:this.set,number:n,quantity:document.getElementById(this.set+(n)).value})
      if(this.$store.state.fp === true && fp===true ) {
        this.add_input_fp(n)
      }
      this.$store.dispatch('add_input', {
        set: this.set,
        number: n,
        quantity: document.getElementById(this.set + n).value
      })
      this.$store.dispatch('push_ticket', {
        ticket: this.set + (n),
        quantity: {quantity: parseInt(this.inputs[this.set][n]), price: this.$store.state.setPoints[this.set]}
      })
    },
    add_input_col:function (n) {
      for(var i=0;i<10;i++) {
          // this.$store.dispatch('change_ticket_state',{set:this.set,number:n,quantity:document.getElementById('col'+this.set+n).value})
          if(this.$store.state.selection_group==='Even' && (i * 10 + (n - 1))%2 !==0 ) {
            continue
          }
          else if(this.$store.state.selection_group==='Odd' && (i * 10 + (n - 1))%2 ===0) {
            continue
          }
          // this.inputs[this.set][i * 10 + (n - 1)] = document.getElementById('col' + this.set + (n)).value;
          document.getElementById(this.set+ (i * 10 + (n - 1))).value = document.getElementById('col'+this.set+(n)).value
          this.add_input(i * 10 + (n-1),true);
      }
    },
    add_input_row:function (n) {
        for(var i=0;i<10;i++) {
          // console.log('row'+this.set+(n));
          // console.log('value of row is '+document.getElementById('row'+this.set+(n)).value)
          // this.$store.dispatch('change_ticket_state',{set:this.set,number:n,quantity:document.getElementById('col'+this.set+n).value})
          if(this.$store.state.selection_group==='Even' && (i +(n-1)*10)%2 !==0 ) {
            continue
          }
          else if(this.$store.state.selection_group==='Odd' && (i +(n-1)*10)%2 ===0) {
            continue
          }
          document.getElementById(this.set+(i +(n-1)*10)).value = document.getElementById('row'+this.set+(n)).value
          // this.inputs[this.set][i +(n-1)*10] = document.getElementById('row' + this.set + (n)).value;
          this.add_input(i +(n-1)*10,true);
        }
    },
    add_input_all:function (n) {

    },
    changeMainSelectedStates:function () {
      console.log("changing state")
      this.$store.dispatch('change_selected_sets',this.selectedSets)
    },
    getStyleForButton:function (link){
      if(link.alias===this.set)
        return 'background-color: red; color: white;width: 400px;font-size:medium'
      else
      return 'background-color: #ba56d4; color: white;width: 400px;font-size:medium'
    },
    getStyleForInput(input) {
      // background-color:#882ce2;
      if(input && input!=0 && input!=null)
      return "color:#c50a46; font-weight:bold "
      else
      return ""
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
  mounted() {
  },
  created() {
  },
  updated() {
  },
  watch : {
    'set': function (val) {
    }
  }
}

</script>

<style scoped>

</style>
