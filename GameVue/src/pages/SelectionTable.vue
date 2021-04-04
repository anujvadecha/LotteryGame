<template>
  <div>
    <q-card-section> Set {{ set }}</q-card-section>
    <div class="row q-ma-md">
        <div v-for="n in 100" :key="n">
          <q-card class="q-ma-sm col-2" flat>
            <div style="">{{ n }}</div>
            <input style="height: 50px;width: 50px" v-model="A0" @change="log_change()"/>
          </q-card>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectionTable",
  props: ['set'],
  data() {
    return {
      'A0': 0
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
