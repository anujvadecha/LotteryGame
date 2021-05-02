<template>
<div>
  <ResultHeader></ResultHeader>
    Results
  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">
    Back
  </q-btn>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
import {get_lottery_timings} from "src/common/api_calls";
export default {
  name: "Results",
  components: {ResultHeader},
  data() {
    return{

    }
  },
  created() {
    get_lottery_timings().then(
      res => {
        console.log(
          res
        )
      }
    )
  }
}
</script>

<style scoped>

</style>
