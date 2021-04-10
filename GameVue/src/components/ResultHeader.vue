<template>
<div class="row">
  <div style=""><span style="font-size: xx-large">{{resultTime[0]}}</span></div>
  <q-btn unelevated v-for="result in lastResult"
         class="q-ml-sm"
         color="orange"
       :key="result">{{result}}</q-btn>
  <q-btn @click="logout()">Logout</q-btn>
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
