<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="open_set(link)">
    <q-item-section v-if="icon" avatar>
    <q-icon class="text-primary" :name="icon" />
    </q-item-section>
    <q-item-section class="text-primary" >{{ title }}</q-item-section>
  </q-item>

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
      this.$router.push({
        name: 'SelectionTable',
        params: {
          set: link
        }
      })
    }
  }
}
</script>
