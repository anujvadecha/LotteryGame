<template>
<div class="row" style="background-color: #13fba5;color: black">
  <div class="col q-ma-sm">
    SHREE DINESH BHAIS LOTTERY
  </div>
  <div class="col q-ma-sm">
    Available points :{{points_available}}
  </div>
  <div class="col"></div>
  <div class="col"></div>
  <div class="col">
    <q-btn flat style="color: #033aca">My accounts</q-btn>
  </div>
  <div class="col">
    <q-btn flat  style="color: #033aca">Password</q-btn>
  </div>
</div>
</template>

<script>
export default {
name: "OptionsHeader",
data(){
  return {
    points_available:12
  }
}
}
</script>

<style scoped>

</style>
