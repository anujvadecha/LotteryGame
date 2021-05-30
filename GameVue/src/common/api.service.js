import { CSRF_TOKEN } from './csrf_token.js'
import {LocalStorage, SessionStorage} from 'quasar'

function handleResponse (response) {
  if (response.status === 204) {
    return response
  } else if (response.status === 404) {
    return response
  } else if (response.status === 400) {
    return response
  } else if (response.status === 500) {
    return response
  } else {
    return response.data
  }
}

function apiService (endpoint, method, data) {
  // D.R.Y. code to make HTTP requests to the REST API backend using fetch
  // const store = this.$store.state.token
  // console.log('inside api service token is' + store)
  var axios = require('axios')
  if(method == "GET"){
    console.log("here")
    console.log(data)
    var config = {
    method: method,
    url: endpoint,
    headers: {
      Authorization: 'Token ' + SessionStorage.getItem('token'),
      'Content-Type': 'application/json',
       // 'X-CSRFTOKEN': CSRF_TOKEN
    },
    params: data
   }

  }
  else{
    var config = {
    method: method || 'GET',
    url: endpoint,
    headers: {
      Authorization: 'Token ' + SessionStorage.getItem('token'),
      'Content-Type': 'application/json',
       // 'X-CSRFTOKEN': CSRF_TOKEN
    },
    data: data
  }

  }
  return axios(config)
    .then(response => handleResponse(response))

}

export { apiService }
