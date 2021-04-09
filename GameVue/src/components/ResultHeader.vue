<template>
<div class="row">
  <div class="" style=""><span style="font-size: xx-large">{{resultTime[0]}}</span></div>

  <div  v-for="result in lastResult"
         class="text-black bg-white"
          style="height: 100%; "
       :key="result">
    <div class="q-ma-sm q-pa-sm" style="background-color: lightpink; ;font-size: x-large" >{{result}}</div>
    <div class="q-ma-sm q-pa-sm" style="background-color: lightpink; ;font-size: x-large" >
      {{result }}</div>
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
    lastResult: ['A15', 'B8', 'C19', 'D12', 'E12', 'F99', 'G44', 'H76', 'I23', 'J11'],
    resultTime: ['2:15pm']
  }
  }
}
</script>

<style scoped>

</style>
