<template>
<div>
  <ResultHeader></ResultHeader>
  Results
  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
export default {
  name: "Results",
  components: {ResultHeader}
}
</script>

<style scoped>

</style>
