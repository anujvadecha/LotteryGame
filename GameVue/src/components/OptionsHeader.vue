<template>
<div class="row" style="background-color: #13fba5;color: black">
  <div class="col q-ma-sm">
    {{first_name}}
  </div>
  <div class="col q-ma-sm">
    Available points :{{$store.state.balance_points}}
  </div>
  <div class="col"></div>
  <div class="col"></div>
  <div class="col">
    <q-btn flat style="color: #033aca" @click="$router.push({path:'/MyAccounts'})">My accounts</q-btn>
  </div>
  <div class="col">
    <q-btn flat  style="color: #033aca">Password </q-btn>
  </div>
  <div class="col">
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
