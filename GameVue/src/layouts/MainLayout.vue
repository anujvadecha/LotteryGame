<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar style="background-color: red" >
          <ResultHeader></ResultHeader>
      </q-toolbar>
      <TimeHeader>
      </TimeHeader>
      <q-toolbar style="background-color: black">
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <q-avatar>
          </q-avatar>
          Lottery game
        </q-toolbar-title>
        <q-btn color="orange">Results</q-btn>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit">
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
        </q-scroll-area>
    </q-drawer>
    <q-drawer show-if-above v-model="right" side="right" bordered>
   </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class=" text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
<!--            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">-->
          </q-avatar>
          Lottery game
        </q-toolbar-title>
        <FooterButtons></FooterButtons>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

import EssentialLink from "components/EssentialLink";
import FooterButtons from "components/FooterButtons";
import ResultHeader from "components/ResultHeader";
import TimeHeader from "components/TimeHeader";
import TicketDetailDrawer from "components/TicketDetailDrawer";
import {get_lottery_timings} from "src/common/api_calls";
const linksData = [
  {
    title: 'Set A -1',
    icon: 'mdi-home',
    alias: 'A',
    link:'A',
    mobile: true
  },
  {
    title: 'Set B -2',
    alias: 'B',
    icon: 'mdi-star',
    link:'B',
    mobile: true
  },
  {
    title: 'Set C -3',
    icon: 'mdi-cart',
    alias: 'C',
    link:'C',
    mobile: true
  },
  {
    title: 'Set D -4',
    icon: 'mdi-account',
    alias: 'D',
    link:'D',
    mobile: true
  },
  {
    title: 'Set E -4',
    icon: 'mdi-account',
    alias: 'E',
    link:'E',
    mobile: true
  },
  {
    title: 'Set F -4',
    icon: 'mdi-account',
    alias: 'F',
    link:'F',
    mobile: true
  },
  {
    title: 'Set G -4',
    icon: 'mdi-account',
    alias: 'G',
    link:'G',
    mobile: true
  },
  {
    title: 'Set H -4',
    icon: 'mdi-account',
    alias: 'H',
    link:'H',
    mobile: true
  },
  {
    title: 'Set I -4',
    icon: 'mdi-account',
    alias: 'I',
    link:'I',
    mobile: true
  },
  {
    title: 'Set J -4',
    icon: 'mdi-account',
    alias: 'J',
    link:'J',
    mobile: true
  }
  ]

export default {
  name: 'MainLayout',
  components: {TimeHeader, ResultHeader, FooterButtons, EssentialLink},
  // components: { EssentialLink },
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
  data () {
    return {
      essentialLinks: linksData,
      left: false,
      right: false
    }
  },
  created() {
    get_lottery_timings().then(lottery_timings => {
      this.$store.state.lotteryTimings=lottery_timings;
    })
    console.log(this.$store.getters.get_next_lottery)
    console.log("Lottery timings are "+this.$store.state.lotteryTimings)
    if(this.logged_in) {

    }
    else{
      this.$router.push('Login')
    }
  }
}
</script>
