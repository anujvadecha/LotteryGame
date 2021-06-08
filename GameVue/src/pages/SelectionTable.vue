<template>
  <div>
    <q-page class="row" style="width: 100%;margin: 0">
<!--      <q-header v-if="!$q.platform.is.mobile">-->
<!--        <ResultHeader></ResultHeader>-->
<!--      <TimeHeader ></TimeHeader>-->
<!--        <div style="background-color: black; color: red">-->
<!--          <marquee style="font-size: medium">{{ marquee }}</marquee>-->
<!--        </div>-->
<!--        <OptionsHeader></OptionsHeader>-->
<!--      <SelectionHeader></SelectionHeader>-->
<!--        </q-header>-->
      <div class="col-2 flex" style="background-color: lightpink">
        <div class="row" style="background-color: white;width: 100%">
          <div @click=";all_sets=!all_sets;all_set_call()" class="q-ma-xs" style='background-color: #ba56d4; color: white;width: 100%;'>
            <q-checkbox dense @input="all_set_call()" v-model="all_sets"></q-checkbox>
            Name
          </div>
        </div>
        <div class="row" style="background-color: white;cursor: default;width: 100%"
             v-for="link in essentialLinks" :key="link.title">
          <div class="q-ma-xs"  v-bind:style="getStyleForButton(link)" @click="pushToPage(link)">
            <q-checkbox dense @click="pushToPage(link)" @input="changeMainSelectedStates(link)"
                        v-model="selectedSets[link.alias]" :value="true"></q-checkbox>
            {{ link.title }}
          </div>
        </div>
      </div>
      <div v-if="!$q.platform.is.mobile" class="col-1 bg-light-green " style="">
        <div class="row" style="background-color: white;height: 9.09%">
          <div class="col text-center font-bold "
               style="border: 1px solid black;;font-size: large;font-weight: bold">Pts
          </div>
          <div class="col text-center font-bold "
               style="border: 1px solid black;;font-size: large;font-weight: bold"> SR
          </div>
        </div>
        <div class="row" style="background-color: white;height: 9.09% " v-for="link in essentialLinks"
             :key="link.title">
          <div class="col text-center" style="border: 1px solid black;;font-size: large;font-weight: bold">
            {{ parseInt($store.state.setPoints[link.alias]) * 10 }}
          </div>
          <div class="col text-center " style="border: 1px solid black;;font-size: large;font-weight: bold">
            {{ link.alias }}
          </div>
        </div>
      </div>
      <div class="col flex flex-shrink" style="background-color: #eef8ff;">
        <div class="row">
<!--               ALL POINTS CARD   -->
          <div class="" style="width: 9.09%;">
            <q-card class=" text-center q-pl-sm q-pr-sm" style="background-color: #eef8ff;" flat>
              <div style="">{{ this.set }}</div>
            </q-card>
          </div>
<!--               COLUMN CARDS   -->
          <div v-for="i in 10" :key="i" class="" style="width: 9.09%;">
            <q-card class=" text-center" style="background-color: #eef8ff;margin-right: 2px;margin-left: 2px;margin-top: 2px " flat>
              <input  onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                      type="text"
                      :id="'col'+set+i"
                      class="text-center text-red col_cards"
                     v-bind:style="'background-color:#882ce2;width:100%;height:20%'"
                     @input="add_input_col(i)"/>
            </q-card>
          </div>
        </div>
        <div class="row" v-for="i in 10" style="" :key="i">
<!--               ROW CARDS -->
          <div class="" style="width: 9.09%;">
            <div class=" text-center " style="background-color: #eef8ff;" flat>
              <div style="font-size: small"> &nbsp;</div>
              <input  onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" type="text" :id="'row'+set+i" class="text-center text-red q-pl-xs q-pr-xs row_cards"
                     v-bind:style="'background-color:#882ce2;width:100%;height:100%'"
                     @input="add_input_row(i)"/>
            </div>
          </div>
<!--                    NUMBER CARDS     -->
          <div class="" v-for="n in 10" style="width: 9.09%" :key="n">
            <div class="text-center " style="background-color: #eef8ff;margin-left: 2px;margin-right: 2px;" flat>
              <div style="font-size: small;font-family: Sans-Serif"> {{ ("0" + (i * 10 + n - 10 - 1)).slice(-2) }}</div>
              <input onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"  type="text" :id="set+(i*10+n-10-1)" class="text-center text-red lottery_input"
                     v-bind:style="getStyleForInput(inputs[set][i*10+n-10-1]).concat(';width:100%;')"
                     :value="inputs[set][i*10+n-10-1]"
                     @input="add_input(i*10+n-10-1,true)" autocomplete="off"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!$q.platform.is.mobile" class="col-2 bg-light-green flex" style="">
        <div class="row" style="background-color: white;width: 100%">
          <div class="col text-center font-bold" style="border: 1px solid black;"> Qty</div>
          <div class="col text-center font-bold" style="border: 1px solid black;"> Pts</div>
        </div>
        <div class="row" style="background-color: white; width: 100%;font-size: 1.5vw;" v-for="link in essentialLinks"
             :key="link.title">
          <div class="col text-right q-pr-sm"
               style="border: 1px solid black; background-color: #7ffffe;font-weight: bold">
            {{ quantitySet[link.alias] }}
          </div>
          <div class="col text-right q-pr-sm"
               style="border: 1px solid black; background-color: #fec0ff;font-weight: bold">
            {{ priceSet[link.alias] }}
          </div>
        </div>
      </div>
    </q-page>
    </div>

  <!--    </q-page>-->
</template>

<script>

import ResultHeader from "components/ResultHeader";
import TimeHeader from "components/TimeHeader";
import OptionsHeader from "components/OptionsHeader";
import SelectionHeader from "components/SelectionHeader";

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
    title: 'Set E -5',
    icon: 'mdi-account',
    alias: 'E',
    link: 'E',
    mobile: true
  },
  {
    title: 'Set F -6',
    icon: 'mdi-account',
    alias: 'F',
    link: 'F',
    mobile: true
  },
  {
    title: 'Set G -7',
    icon: 'mdi-account',
    alias: 'G',
    link: 'G',
    mobile: true
  },
  {
    title: 'Set H -8',
    icon: 'mdi-account',
    alias: 'H',
    link: 'H',
    mobile: true
  },
  {
    title: 'Set I -9',
    icon: 'mdi-account',
    alias: 'I',
    link: 'I',
    mobile: true
  },
  {
    title: 'Set J -10',
    icon: 'mdi-account',
    alias: 'J',
    link: 'J',
    mobile: true
  }
]
export default {
  name: "SelectionTable",
  components: { },
  props: ['set'],
  computed: {
    marquee: function () {
      var text = '';
      this.$store.state.announcements.map(message => {
        text += message + ', '
      })
      text = text.slice(0, -2)
      return text
    },
    inputs: {
      get() {
        return this.$store.state.inputs
      },
      set(value) {
        this.$store.commit('update_inputs', {set: this.set, value: value})
      }
    },
    quantitySet: function () {
      var quantity = {A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0}
      var setDict = this.$store.state.inputs;
      for (var key in setDict) {
        for (var number in setDict[key]) {
          if (setDict[key][number] !== null && setDict[key][number])
            for (var i = 0; i < this.$store.state.selected_lotteries.length; i++) {
              quantity[key] = parseInt(quantity[key]) + parseInt(setDict[key][number])
            }
        }
      }
      return quantity;
    },
    priceSet: function () {
      var price = {A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0}
      var setDict = this.$store.state.inputs;
      for (var key in setDict) {
        for (var number in setDict[key]) {
          if (setDict[key][number] !== null && setDict[key][number])
            for (var i = 0; i < this.$store.state.selected_lotteries.length; i++) {
              price[key] = (parseInt(price[key]) + parseInt(setDict[key][number]))
            }
        }
        price[key] = price[key] * this.$store.state.setPoints[key]
      }
      return price;
    },
    selectedSets: {
      get() {
        return this.$store.state.selectedSets
      },
      set(value) {
        this.$store.commit('update_inputs', {set: this.set, value: value})
      }
    }
  },
  data() {
    return {
      essentialLinks: linksData,
      all_sets: false,
    }
  },
  methods: {
    all_set_call() {

      for (const [key, value] of Object.entries(this.selectedSets)) {
        this.selectedSets[key] = this.all_sets
      }
      this.$store.dispatch('change_selected_sets',{selectedSets:this.selectedSets,currentSet:this.set} )

    },
    reverse_number(n) {
      if (n >= 1 && n <= 9) {
        n = '0' + n
      }
      const num = n;
      const reverse = (num) => parseInt(String(num)
        .split("")
        .reverse()
        .join(""), 10);
      return reverse(num);
    },
    add_input_fp: function (n) {
      var a = 0;
      var b = 0;
      var c = 0;
      var d = 0;
      if (n < 50) {
        if (n % 10 <= 4) {
          a = n
          b = n + 5
          c = n + 50
          d = b + 50
        }
        if (n % 10 > 4) {
          a = n
          b = n - 5
          c = n + 50
          d = b + 50
        }
      } else if (n >= 50) {
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
      var revA = this.reverse_number(a)
      var revB = this.reverse_number(b)
      var revC = this.reverse_number(c)
      var revD = this.reverse_number(d)
      document.getElementById(this.set + c).value = document.getElementById(this.set + a).value
      document.getElementById(this.set + b).value = document.getElementById(this.set + a).value
      document.getElementById(this.set + d).value = document.getElementById(this.set + a).value
      this.add_input(a, false)
      this.add_input(b, false)
      this.add_input(c, false)
      this.add_input(d, false)
      document.getElementById(this.set + revA).value = document.getElementById(this.set + a).value
      document.getElementById(this.set + revB).value = document.getElementById(this.set + a).value
      document.getElementById(this.set + revC).value = document.getElementById(this.set + a).value
      document.getElementById(this.set + revD).value = document.getElementById(this.set + a).value
      document.getElementById(this.set + a).classList.add("fp_selected");
      document.getElementById(this.set + b).classList.add("fp_selected");
      document.getElementById(this.set + c).classList.add("fp_selected");
      document.getElementById(this.set + d).classList.add("fp_selected");
      document.getElementById(this.set + revA).classList.add("fp_selected");
      document.getElementById(this.set + revB).classList.add("fp_selected");
      document.getElementById(this.set + revC).classList.add("fp_selected");
      document.getElementById(this.set + revD).classList.add("fp_selected");
      this.add_input(revA, false)
      this.add_input(revB, false)
      this.add_input(revC, false)
      this.add_input(revD, false)
    },
    add_input: function (n, fp) {
      if (this.$store.state.fp === true && fp === true) {
        this.add_input_fp(n)
      }
      if(this.$store.state.fp===false) {
        document.getElementById(this.set + n).classList.remove('fp_selected')
      }
      for (const [key, value] of Object.entries(this.selectedSets)) {
        if (value === true) {
          this.$store.dispatch('add_input', {
            set: key,
            number: n,
            quantity: document.getElementById(this.set + n).value
          })
        }
      }
      this.$store.dispatch('add_input', {
        set: this.set,
        number: n,
        quantity: document.getElementById(this.set + n).value
      })
    },
    add_input_col: function (n) {
      for (var i = 0; i < 10; i++) {
        if (this.$store.state.selection_group === 'Even' && (i * 10 + (n - 1)) % 2 !== 0) {
          continue
        } else if (this.$store.state.selection_group === 'Odd' && (i * 10 + (n - 1)) % 2 === 0) {
          continue
        }
        document.getElementById(this.set + (i * 10 + (n - 1))).value = document.getElementById('col' + this.set + (n)).value
        this.add_input(i * 10 + (n - 1), true);
      }
    },
    add_input_row: function (n) {
      for (var i = 0; i < 10; i++) {
        if (this.$store.state.selection_group === 'Even' && (i + (n - 1) * 10) % 2 !== 0) {
          continue
        } else if (this.$store.state.selection_group === 'Odd' && (i + (n - 1) * 10) % 2 === 0) {
          continue
        }
        document.getElementById(this.set + (i + (n - 1) * 10)).value = document.getElementById('row' + this.set + (n)).value
        this.add_input(i + (n - 1) * 10, true);
      }
    },
    add_input_all: function (n) {

    },
    changeMainSelectedStates: function (link) {
      this.$store.dispatch('change_selected_sets',{selectedSets:this.selectedSets,currentSet:this.set} )
      this.$router.push({
        path: 'SelectionTable/' + link.alias,
        name: 'SelectionTable',
        params: {
          set: link.alias
        }
      })
    },
    getStyleForButton: function (link) {
      if (link.alias === this.set || this.selectedSets[link.alias] === true)
        return 'background-color: red; color: white;width: 100%;'
      else
        return 'background-color: #ba56d4; color: white;width: 100%'
    },
    getStyleForInput(input) {
      // background-color:#882ce2;
      return 'background-color:white;border 1px solid black;font-size: small'
        // return " background-color:white;font-size:small"
    },
    pushToPage: function (link) {
      // this.selectedSets[link.alias] = true
      this.$router.push({
        path: 'SelectionTable/' + link.alias,
        name: 'SelectionTable',
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
  watch: {
    'set': function (val) {
    }
  }
}

$(function () {
    var focusedElement;
    $(document).on('focus', 'input', function () {
        if (focusedElement == this) return; //already focused, return so user can now place cursor at specific point in input.
        focusedElement = this;
        setTimeout(function () { focusedElement.select(); }, 100); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.
    });
});
// var elements = []
// var currentIndex = 0;
// setTimeout(function(){
//   elements = document.getElementsByClassName("lottery_input");
//   currentIndex = 0
//   },2000)
// try{
//  document.addEventListener('keypress', function (e){
//       currentIndex = parseInt(document.activeElement.id.substring(1))
//       switch (e.keyCode) {
//         case 37:
//           currentIndex = (currentIndex == 0 || currentIndex%10 == 0) ? currentIndex + 9 : currentIndex-1;
//           console.log(currentIndex)
//           elements[currentIndex].focus();

//           break;
//         case 39:
//           currentIndex = (currentIndex == 9 || currentIndex%10 == 9) ? currentIndex - 9 : currentIndex+1;
//           console.log(currentIndex)
//           elements[currentIndex].focus();

//           break;
//         case 40: //down
//           currentIndex = (parseInt(currentIndex/10) >= 9) ? currentIndex - 90 : currentIndex+10;
//           console.log(currentIndex)
//           elements[currentIndex].focus();

//           break;
//         case 38:

//           currentIndex = (parseInt(currentIndex/10) == 0) ? currentIndex + 90 : currentIndex-10;
//           console.log(currentIndex)
//           elements[currentIndex].focus();

//           break;

//       }

//     });
// }catch(err){}


</script>

<style scoped>
.fp_selected {
  background-color: rgb(19, 251, 165);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
