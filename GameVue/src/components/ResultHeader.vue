<template>
<div class="row">
  <div style=""><span style="font-size: xx-large">{{resultTime[0]}}</span></div>
  <q-btn v-for="result in lastResult"
         class="q-ml-sm"
         color="pink"
       :key="result">{{result}}</q-btn>
</div>
</template>
<script>
export default {
name: "ResultHeader",
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
