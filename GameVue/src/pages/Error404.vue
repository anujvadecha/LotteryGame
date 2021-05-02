<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>
      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  created() {
    if(this.$route.path==="/TicketDetails/[object Object]") {
      this.$router.push({name:'TxnDetails'})
    }
  }
}
</script>
