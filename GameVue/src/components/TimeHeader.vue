<template>
<div class="row">
  <div class="col-4">
  <q-card-section class="row bg-light-green">Current Date</q-card-section>
  <q-card-section class="row bg-orange">Current Time</q-card-section>
  </div>
  <div class="col-4 text-center flex flex-center" style="background-color: purple">
     <span style="font-size: xx-large;" class="q-ma-md"> Nayan jains lottery</span>
  </div>
  <div class="col-4">
    <q-card-section class="row bg-light-green">
      Next Draw time
    </q-card-section>
    <q-card-section class="row bg-orange">
      Left time
    </q-card-section>
  </div>
</div>
</template>

<script>
export default {
  name: "TimeHeader"
}
</script>

<style scoped>

</style>
