<template>
<div>
  <ResultHeader></ResultHeader>
    MyAccounts
  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
export default {
  name: "MyAccounts",
  components: {ResultHeader}
}
</script>

<style scoped>

</style>
