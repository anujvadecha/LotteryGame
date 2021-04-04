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
<!--      <q-tabs align="left">-->
<!--        <q-route-tab to="/page1" label="Page One" />-->
<!--        <q-route-tab to="/page2" label="Page Two" />-->
<!--        <q-route-tab to="/page3" label="Page Three" />-->
<!--      </q-tabs>-->
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit">
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
        </q-scroll-area>
    </q-drawer>
   <q-drawer show-if-above v-model="right" side="right" bordered>
     <TicketDetailDrawer></TicketDetailDrawer>
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
  }]

export default {
  name: 'MainLayout',
  components: {TicketDetailDrawer, TimeHeader, ResultHeader, FooterButtons, EssentialLink},
  // components: { EssentialLink },
  data () {
    return {
      essentialLinks: linksData,
      left: false,
      right: false
    }
  }
}
</script>
