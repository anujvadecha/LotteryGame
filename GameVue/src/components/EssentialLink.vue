<template>
  <router-link style="text-decoration: none; " :to="link">
  <q-item
    clickable
    tag="a"
    target="_blank"
    :style="this.$route.path===this.link ? {backgroundColor:'#9c27b0',color:'white'}:{backgroundColor:'white',color:'black'}"
  >
    <q-item-section v-if="icon" avatar>
    <q-icon class="" :name="icon" />
    </q-item-section>
    <q-item-section class="" >
      {{ title }}
    </q-item-section>
  </q-item>
  </router-link>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods:{
    open_set: function (link) {

    },

  }
}
</script>
