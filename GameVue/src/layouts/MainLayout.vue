<template>
  <q-layout style="" view="hHh lpR fFf">
<!--    <q-drawer show-if-above v-model="right" side="right" bordered>-->
<!--    </q-drawer>-->
<!--    <q-header >-->
<!--        <q-toolbar style="" class="shadow-2">-->
<!--          <ResultHeader></ResultHeader>-->
<!--        </q-toolbar>-->
<!--    </q-header>-->

    <q-header style="font-family:Times New Roman" v-if="$q.platform.is.mobile">
      <q-toolbar style="" class="shadow-2 bg-purple"><q-toolbar-title>
        <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu"/>
        Star skill game</q-toolbar-title></q-toolbar>
      <q-expansion-item header-style="background-color:white; color:black;"
                            class="text-dark col-12 bg-white justify-evenly" style="font-weight: bold">
            <template v-slot:header>
              Total
             <div class="col text-center text-black" style=" background-color: white;font-weight: bold"> Quantity {{quantitySet}}</div>
             <div class="col text-center text-black" style=" background-color: white;font-weight: bold">  Price {{priceSet}}</div>
            </template>
            <ResultHeader ></ResultHeader>
      <TimeHeader ></TimeHeader>
      <OptionsHeader></OptionsHeader>
      </q-expansion-item>
    </q-header>
    <q-header v-if="!$q.platform.is.mobile">
      <ResultHeader v-if="currentRouteName!=='DiceRotation'"></ResultHeader>
      <TimeHeader v-if="currentRouteName==='SelectionTable'" ></TimeHeader>
        <div v-if="currentRouteName==='SelectionTable'" style="background-color: black; color: red">
          <marquee style="font-size: large;color: #41c32c;font-weight: bolder">{{ marquee }}</marquee>
        </div>
      <OptionsHeader v-if="currentRouteName==='SelectionTable'"></OptionsHeader>
      <SelectionHeader v-if="currentRouteName==='SelectionTable'"></SelectionHeader>
    </q-header>
    <q-drawer v-if="$q.platform.is.mobile"  v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">

        <EssentialLink title="Results" link="/Results" ></EssentialLink>
        <EssentialLink title="My accounts" link="/MyAccounts" ></EssentialLink>
        <EssentialLink title="More Draws" link="/MoreDraws" ></EssentialLink>
        <EssentialLink title="Logout" link="/Login" ></EssentialLink>

      </q-scroll-area>
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
            </q-avatar>
            <div class="text-weight-bold">  Terminal Id: {{user_id}} &nbsp;&nbsp;{{first_name}}</div>
            <div>Available points :<span style="font-weight: bold;font-size: medium;color: darkred">{{$store.state.balance_points}}</span></div>

          </div>
        </q-img>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer bordered class=" text-white">
      <Footer></Footer>
    </q-footer>

  </q-layout>

</template>

<script>





// import EssentialLink from 'components/EssentialLink.vue'

// import EssentialLink from "components/EssentialLink";
import ResultHeader from "components/ResultHeader";
import TimeHeader from "components/TimeHeader";
import TicketDetailDrawer from "components/TicketDetailDrawer";
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
import MarqueeText from 'vue-marquee-text-component'
import OptionsHeader from "components/OptionsHeader";
import SelectionHeader from "components/SelectionHeader";
import Footer from "components/Footer";
import {getTimeZoneDate} from "src/common/utils";
import {get_lottery_timings, get_user_details} from "src/common/api_calls";

import EssentialLink from "components/EssentialLink";
export default {
  name: 'MainLayout',
  components: {SelectionHeader, EssentialLink,  OptionsHeader, TimeHeader, ResultHeader, Footer},
  methods:{
    changeMainSelectedStates:function () {
      console.log("changing state")
      this.$store.dispatch('change_selected_sets',this.selectedSets)
    }
  },
  computed: {
    marquee: function () {
      var text = '';
      this.$store.state.announcements.map(message => {
        text += message + ', '
      })
      text = text.slice(0, -2)
      return text
    },
    quantitySet:function () {
      var quantity=0
      var setDict=this.$store.state.inputs;
      for (var key in setDict){
        for(var number in setDict[key]) {
          if(setDict[key][number] !== null && setDict[key][number])
            for(var i=0;i<this.$store.state.selected_lotteries.length;i++) {
              quantity= parseInt(quantity) + parseInt(setDict[key][number])
          }
        }
      }
      return quantity;
    },
    priceSet:function(){
      var price = {A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0}
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
      var totalPrice = 0;
      // for (const [key, value] of Object.entries(totalPrice)) {
        // console.log(key)
        // console.log(value)
        totalPrice += key
      // }
      return price.A+price.B+price.C+price.D+price.E+price.F+price.G+price.H+price.I+price.J;
    },
  first_name(){
    if(this.$store.state.user!=null) {
      return this.$store.state.user.first_name
    }
    else{
      return ''
    }
  },
    user_id(){
    if(this.$store.state.user!=null) {
      return this.$store.state.user.id
    }
    else{
      return ''
    }
    },
    logged_in: function () {
      const token = this.$q.sessionStorage.getItem('token')
      if (token === '' || token === null || token === 'null') {
        return false
      } else {
        return true
      }
    },
    currentRouteName: function () {
      return this.$route.name
    }
  },
  data() {
    return {
      essentialLinks: linksData,
      left: true,
      right: false,
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      selectedSets:{A:false,B:false,C:false,D:false,E:false,F:false,G:false,H:false,I:false,J:false}
   }
  },
  created() {

    if (this.logged_in) {
    const store = this.$store;
    get_lottery_timings().then(lottery_timings => {
      console.log(lottery_timings)
      var timings = lottery_timings.lottery_objects.map(object => {
              object.time=new Date(object.time)
              return object
        }
    )
    lottery_timings.closest_lottery.time = new Date(lottery_timings.closest_lottery.time)
    this.$store.dispatch('set_lottery_timings', timings)
    this.$store.dispatch('set_next_lottery')
    const nextLottery = this.$store.getters.get_next_lottery;
    this.$store.dispatch('set_selected_lotteries',[nextLottery])
    setInterval(function (){
    //   var current_next_lottery =  store.state.nextLottery;
        store.dispatch('set_next_lottery')
    },500)
    get_user_details().then(
      res=>{
        store.dispatch('update_user_details',res)
      }
    )
    });
    } else {
      this.$router.push({name:'Login'})
    }
  }
}
</script>
