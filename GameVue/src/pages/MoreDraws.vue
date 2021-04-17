<template>
<div>
  <ResultHeader></ResultHeader>
  More Draws
  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
export default {
name: "MoreDraws",
  components: {ResultHeader}
}
</script>

<style scoped>

</style>
