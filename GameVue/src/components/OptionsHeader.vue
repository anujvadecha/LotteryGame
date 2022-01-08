<template>
<div v-if="!$q.platform.is.mobile" class="row" style="background-color: #13fba5;color: black">
  <div class="col" style="padding: 5px;font-family: 'Times New Roman'">
    Terminal Id: {{user_id}} &nbsp;&nbsp;{{first_name}}
  </div>
  <div class="col " style="padding: 5px;font-weight: bolder;">
    Available points :<span style="font-weight: bold;color: darkred">{{ show_points ? Math.round($store.state.balance_points * 100)/100 : "****"}}</span>
      <q-btn dense class="q-ml-sm" size="small"   style="color: #033aca;background-color: greenyellow" @click="invert_show_points()"> {{show_points ? "Hide" : "Show"}} </q-btn>

  </div>
  <q-space></q-space>
  <div class="q-ml-md" style="">
    <q-btn dense  style="color: #033aca;background-color: greenyellow" @click="$router.push({path:'/MyAccounts'})">My accounts</q-btn>
  </div>
  <div class="q-ml-md">
    <q-btn dense  style="color: #033aca;background-color: greenyellow">Password </q-btn>
  </div>
  <div class="q-ml-md">
    <q-btn
      dense
      style="color: #033aca;background-color: greenyellow"
      @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
    />
  </div>
  <div class="q-ml-md">
    <q-btn  dense @click="logout()"   style="color: #033aca;background-color: greenyellow">Logout</q-btn>
  </div>
</div>
</template>

<script>
import {Notify} from "quasar";

export default {
name: "OptionsHeader",
computed:{
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
  }
},
data(){
  return {
    points_available:12,
    show_points:false
  }
},
  methods:{
  logout(){
    this.$q.localStorage.set('token', '')
      Notify.create({
        message: '<h6>You have been logged out</h6>',
        html:true,
        position: 'center'
      })
      return this.$router.push({path:'/Login'})
    },
  invert_show_points(){
  this.show_points = !this.show_points
  },
  },
}
</script>

<style scoped>

</style>
