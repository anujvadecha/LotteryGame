<template>
  <q-page class="">
  </q-page>
</template>
<script>
export default {
  name: 'PageIndex',
  created() {
    this.$router.push({
        path: 'SelectionTable/'+'A',
        name:'SelectionTable',
        params: {
          set: A
        }
      })
  }
}
</script>
