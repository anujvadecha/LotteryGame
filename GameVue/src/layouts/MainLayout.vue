<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
<!--      <q-toolbar style="background-color: red">-->
        <ResultHeader></ResultHeader>
<!--      </q-toolbar>-->
      <TimeHeader></TimeHeader>
      <div style="background-color: black; color: red">
      <MarqueeText style="background-color: black; ">
        {{marquee}}
      </MarqueeText>
      </div>
      <OptionsHeader></OptionsHeader>
      <SelectionHeader></SelectionHeader>
<!--      <q-toolbar style="background-color: black">-->
<!--        <q-btn dense flat round icon="menu" @click="left = !left"/>-->
<!--        <q-btn color="orange">Results</q-btn>-->
<!--        <q-btn dense flat round icon="menu" @click="right = !right"/>-->
<!--      </q-toolbar>-->
    </q-header>

<!--    <q-drawer show-if-above v-model="right" side="right" bordered>-->
<!--    </q-drawer>-->
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer bordered class=" text-white">
      <Footer></Footer>
    </q-footer>

  </q-layout>
</template>

<script>

let code = "";
let reading = false;
let final_barcode =""
document.addEventListener('keypress', function (e){

   if (e.keyCode===13){
          if(code.length == 13){
            final_barcode = code
            console.log(final_barcode)
            document.getElementById("final_barcode").value = final_barcode
          }
          if(code.length>10){
            code="";
         }
    }else{
         code+=e.key;
    }

    if(!reading){
         reading=true;
         setTimeout(function(e){
          code="";
          reading=false;
      }, 200);}
      })




// import EssentialLink from 'components/EssentialLink.vue'

// import EssentialLink from "components/EssentialLink";
import ResultHeader from "components/ResultHeader";
import TimeHeader from "components/TimeHeader";
import TicketDetailDrawer from "components/TicketDetailDrawer";
import {get_lottery_previous, get_lottery_timings, get_winners} from "src/common/api_calls";

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
export default {
  name: 'MainLayout',
  components: {Footer, SelectionHeader, OptionsHeader, TimeHeader, ResultHeader,MarqueeText},
  // components: { EssentialLink },
  methods:{
    changeMainSelectedStates:function () {
      console.log("changing state")
      this.$store.dispatch('change_selected_sets',this.selectedSets)
    }
  },
  computed: {
    logged_in: function () {
      const token = this.$q.localStorage.getItem('token')
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
      marquee:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
      selectedSets:{A:false,B:false,C:false,D:false,E:false,F:false,G:false,H:false,I:false,J:false}
   }
  },
  created() {
    get_lottery_timings().then(lottery_timings => {
      console.log(lottery_timings)
      var timings = lottery_timings.lottery_objects.map(object => {
           object.time=new Date(object.time)
            return object
        }
      )
      lottery_timings.closest_lottery.time=new Date(lottery_timings.closest_lottery.time)
      this.$store.state.selected_lotteries.push(lottery_timings.closest_lottery)
      // this.$store.dispatch('set_lottery_timings', timings)
      // this.$store.dispatch('set_next_lottery', timings)
      // this.$store.dispatch('set_previous_lottery', timings)
      const nextLottery = this.$store.getters.get_next_lottery;
      console.log("next lottery is " + nextLottery)
      console.log({"lottery_time":nextLottery.getTime()});

      // get_winners({"lottery_time":nextLottery.getTime()}).then(
      //   res=>{
      //   console.log(res)
      //     this.$store.state.results = res.lottery_winners_ticket
      //   }
      // )
      //
      // get_lottery_previous({"lottery_time":getTimeZoneDate(nextLottery.getTime())}).then(
      //   res=>{
      //     console.log(res)
      //     this.$store.state.results = res.lottery_winners_ticket
      //   }
      // )
      //TODO
      // setInterval(function (){
      //
      // console.log(timings)
      // })
      // const store=this.$store;
    });
    if (this.logged_in) {

    } else {
      this.$router.push('Login')
    }
  }
}
</script>
