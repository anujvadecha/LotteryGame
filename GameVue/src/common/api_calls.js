import { apiService } from './api.service'
const base_url = 'http://127.0.0.1:8000'
const base_websocket_url = 'localhost:8000'

function place_order (order) {
  const endpoint = base_url + '/gamemaster/buy_ticket/'
  return apiService(endpoint, 'POST', order)
}

function get_tickets_for_user () {
  const endpoint = base_url + '/gamemaster/tickets'
  return apiService(endpoint, 'GET',null)
}

function get_lottery_timings(){
  const endpoint = base_url + '/gamemaster/lottery_timings/'
  return apiService(endpoint, 'GET',null)
}

function get_winners(data){
  //TO SEND UNIX TIME TO {'lottery_time':1213213213}
  const endpoint = base_url + '/gamemaster/lottery_winners?'+'lottery_time='+data
  return apiService(endpoint, 'POST',null)
}



export {
  base_url,
  place_order,
  base_websocket_url,
  get_tickets_for_user,
  get_lottery_timings,
  get_winners
}
