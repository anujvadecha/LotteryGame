<template>
 <div>
  <ResultHeader></ResultHeader>
    <div class="row">
      <div class="col-3"></div>
<div class="q-pa-md col-3" style="max-width: 300px">
 <q-input filled v-model="date">
   <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
 </q-input>
</div>
  <div class="q-pa-md col-3" style="max-width: 300px">
 <q-input filled v-model="date">
   <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
 </q-input>
</div>
      <div class="col-1">
           <q-btn dense unelevated style="margin-top:20px;border: 1px solid black" class="bg-purple col " @click="fetch_transaction_according_to_date()">Go -></q-btn>
      </div>
      </div>

    <div class="row">
      <div class="col-3">
      </div>
      <div class="col-3">
      From
        <br>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-11" >
            <p>SHREE ONLINE VIDEO GAME</p>
            <p>2/03/2021 21:32:48</p>
            <table>
              <tr>
                <td>From: 2/03/2021</td>
                <td>To: 2/03/2021 </td>
              </tr>

              <tr>
                <td>Play Points: </td>
                <td>3000 </td>
              </tr>

              <tr>
                <td>Win Points</td>
                <td>5000</td>
              </tr>

              <tr>
                <td>End Points</td>
                <td>4800</td>
              </tr>

            </table>

          </div>
        </div>


    </div>
    </div>

  Transaction details
  <q-btn color="blue" unelevated @click="$router.push({path:'/'})">Back</q-btn>
</div>
</template>

<script>
import ResultHeader from "components/ResultHeader";
export default {
  name: "MyAccounts",
  components: {ResultHeader},
  data () {
  return {
      date: '2019-02-01 12:44'
    }
  },
  methods:{
    fetch_transaction_according_to_date(){
      console.log("here")
    }
  }
}
</script>

<style scoped>

</style>
