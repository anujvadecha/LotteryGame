<template>
  <q-layout view="hHh lpR fFf">
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
export default {
  name: 'MainLayout',
  components: {Footer},
  methods:{
    changeMainSelectedStates:function () {
      console.log("changing state")
      this.$store.dispatch('change_selected_sets',this.selectedSets)
    }
  },
  computed: {
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
      this.$router.push('Login')
    }
  }
}
</script>
