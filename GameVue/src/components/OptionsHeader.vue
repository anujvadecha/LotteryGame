<template>
<div class="row" style="background-color: #13fba5;color: black">
  <div class="col q-ma-sm">
    Terminal Id: {{$store.state.user.id}} &nbsp;&nbsp;{{first_name}}
  </div>
  <div class="col q-ma-sm" style="">
    Available points :<span style="font-weight: bold;font-size: medium;color: darkred">{{$store.state.balance_points}}</span>
  </div>
  <q-space></q-space>
  <div class="">
    <q-btn flat style="color: #033aca" @click="$router.push({path:'/MyAccounts'})">My accounts</q-btn>
  </div>
  <div class="">
    <q-btn flat  style="color: #033aca">Password </q-btn>
  </div>
  <div class="">
    <q-btn @click="logout()" flat  style="color: #033aca">Logout</q-btn>
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
  }
},
data(){
  return {
    points_available:12
  }
},
  methods:{
  logout(){
    this.$q.localStorage.set('token', '')
      Notify.create({
        message: 'You have been logged out',
        position: 'top-right'
      })
      return this.$router.push({path:'/Login'})
    }
  }
}
</script>

<style scoped>

</style>
