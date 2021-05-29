<template>
<div>
<div class="window-height window-width row justify-center items-center" style="">
    <div class="column q-pa-lg">
      <q-card-section style="">
            <div class="row">
            <q-img
            :src="imageSrc"
            transition="scale-transition"
            width="50px"
            />
             <strong class="text-h6 q-ml-md q-my-md">Star skill game</strong>
            </div>
          </q-card-section>
          <q-separator color="orange" size="5px"></q-separator>
          <q-card-section>
            <q-form class="q-gutter-y-md">
              <q-input color="primary" outlined v-model="email" type="email" label="Mobile">
                <template v-slot:prepend>
                  <q-icon name="mdi-account" />
                </template>
              </q-input>
              <q-input color="primary" outlined v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="mdi-lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn @click="login_action()" unelevated size="lg" color="primary" class="full-width text-white" label="Sign In" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6"> Forgot your password? </p>
            <p>Not a registered user ? Register <router-link to="/register">here</router-link></p>
          </q-card-section>
    </div>
</div>
</div>
</template>

<script>
import { Notify } from 'quasar'
import { base_url } from 'src/common/api_calls'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      imageSrc: 'logo.png'
    }
  },
  methods: {
    login_action: function () {
      console.log(this.email + this.password)
      this.connect_jwt()
    },
    connect_jwt: function () {
      const store = this.$store
      const router = this.$router
      var axios = require('axios')
      var data = { username: this.email, password: this.password }
      var config = {
        method: 'post',
        url: base_url + '/api/rest-auth/login/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }
      // Notify.create({
      //   message: config.url,
      //   position: 'top',
      //   timeout: 5000
      // })
      const quasar_q = this.$q
      axios(config)
        .then(function (response) {
          quasar_q.localStorage.set('token', response.data.key)
          router.push({path:'/'})
        }).catch(function (error) {
          console.log(error.response.data)
          Notify.create({
            message: error.response.data.non_field_errors[0],
            position: 'top',
            timeout: 5000
          })
        })
    }
  }
}
</script>

<style scoped>
.q-card {
  width: 360px;
}
</style>
