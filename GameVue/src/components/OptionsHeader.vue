<template>
<div v-if="!$q.platform.is.mobile" class="row" style="background-color: #13fba5;color: black">
  <div class="col" style="padding: 5px;font-family: 'Times New Roman'">
    Terminal Id: {{user_id}} &nbsp;&nbsp;{{first_name}}
  </div>
  <div class="col " style="padding: 5px;font-weight: bolder;">
    Available points :<span style="font-weight: bold;color: darkred">{{$store.state.balance_points}}</span>
  </div>
  <q-space></q-space>
  <div class="q-ml-md" style="">
    <q-btn dense flat style="color: #033aca;background-color: greenyellow" @click="$router.push({path:'/MyAccounts'})">My accounts</q-btn>
  </div>
  <div class="q-ml-md">
    <q-btn dense  style="color: #033aca;background-color: greenyellow">Password </q-btn>
  </div>
  <div class="q-ml-md">
    <q-btn  dense @click="logout()" flat  style="color: #033aca;background-color: greenyellow">Logout</q-btn>
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
      return this.$store.state.user.terminal_id
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
        message: '<h6>You have been logged out</h6>',
        html:true,
        position: 'center'
      })
      return this.$router.push({path:'/Login'})
    }
  }
}
</script>

<style scoped>

</style>
