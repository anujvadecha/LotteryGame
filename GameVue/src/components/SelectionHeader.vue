<template>
<div class="row" style="background-color:#ffff00;color: black">
  <div class="col-5">
    <div class="row">
    <q-btn class="col" color="" unelevated outline>2D Coupon</q-btn>
    <q-btn class="col" color="" unelevated outline >JD</q-btn>
    <q-btn class="col" color="" unelevated outline >3D Coupon</q-btn>
    </div>
    <div class="row">
      <div class="col">
        <div class="row">
          <q-btn class="col" color="" unelevated outline>Point-2</q-btn>
          <q-btn class="col" color="" unelevated outline >Pointwise</q-btn>
        </div>
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
  </div>
  <div class="col" style="background-color: #eef8ff" >
    <div class="row"></div>
    <div class="row" style="background-color: #eef8ff">
    <div class="col-8">
      <q-option-group
        @input="change_selection_option()"
      v-model="group"
      :options="options"
      color="primary"
      inline
    />
  </div>
    <div class="col-2"></div>
      <div class="col-2"><q-checkbox v-model="fP" >FP</q-checkbox></div>
    </div>
  </div>
  <div class="col text-left">
    <div class="row">
    <q-btn class=" col" color="" unelevated outline @click="$router.push({path:'/Results'})">Results</q-btn>
    <q-btn class=" col" color="" unelevated outline @click="$router.push({path:'/MoreDraws'})">More Draws</q-btn>
      </div>
  </div>
</div>
</template>

<script>
export default {
name: "SelectionHeader",
  methods:{
    change_selection_option:function () {
      this.$store.dispatch('change_selection_option',this.group)
    },
    change_fp_selection:function (){
      this.$store.dispatch('fp_selection',this.fP)
    }
},
  data(){
  return {
      group: 'All',
      options: [
        {
          label: 'All',
          value: 'All'
        },
        {
          label: 'Even',
          value: 'Even'
        },
        {
          label: 'Odd',
          value: 'Odd'
        }
      ],
    fP:false
  }
  }
}
</script>

<style scoped>

</style>
