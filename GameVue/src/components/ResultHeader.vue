<template>
<div class="row" style="background-color: red">

  <div class="col-2" style="">
    <div class=" text-center" style="font-size:x-large;border: solid 2px black;">2-D</div>
    <div class="text-center" style="font-size: large;border: solid 2px black;">{{resultTime[0]}}</div>
  </div>
  <div v-for="(key,value) in lastResult" :key="key" class="col bg-white">
      <div class="text-black text-bold q-ma-xs text-center" style="background-color:#ffb6c1;font-size: large ">{{value}}</div>
      <div class="text-black text-bold  q-ma-xs text-center" style="background-color:#ffb6c1; font-size: large ">{{key}}</div>
  </div>

</div>
</template>
<script>
export default {
name: "ResultHeader",
  methods:{
    logout: function () {
      this.$q.localStorage.set('token', '')
      // Notify.create({
      //   message: 'You have been logged out',
      //   position: 'top-right'
      // })
      return this.$router.push({path:'/Login'})
    },
  },
  data(){
  return {
    lastResult: {'A':'15', 'B':'8','C': '19','D': '12','E' :'14','F': '99','G': '44','H': '76','I': '23','J': '11'},
    resultTime: ['2:15pm']
  }
  }
}
</script>

<style scoped>

</style>
