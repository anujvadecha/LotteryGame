import { apiService } from './api.service'
const base_url = 'http://127.0.0.1:8000'
const base_websocket_url = 'localhost:8000'

//const base_url = 'http://admin.starskillgame.com'
//const base_websocket_url = 'admin.starskillgame.com'


function place_order (order) {
  const endpoint = base_url + '/gamemaster/buy_ticket/'
  return apiService(endpoint, 'POST', order)
}

function get_tickets_for_user () {
  const endpoint = base_url + '/gamemaster/tickets'
  return apiService(endpoint, 'GET',null)
}

function get_lottery_timings(data){
  const endpoint = base_url + '/gamemaster/lottery_timings/'
  return apiService(endpoint, 'GET',data)
}

function get_lottery_previous(data){
  const endpoint = base_url + '/gamemaster/lottery_winners_previous/'
  return apiService(endpoint, 'POST',data)
}

function get_winners(data){
  //TO SEND UNIX TIME TO {'lottery_time':1213213213}
  const endpoint = base_url + '/gamemaster/lottery_winners/'
  return apiService(endpoint, 'POST',data)
}

function get_total_points(data){
  //TO SEND UNIX TIME TO {'lottery_time':1213213213}
  console.log(data)
  const endpoint = base_url + '/gamemaster/total_points/'
  return apiService(endpoint, 'POST',data)
}

function get_user_details () {
  const endpoint = base_url + '/api/rest-auth/user/'
  return apiService(endpoint, 'GET', null)
}

function get_tickets(data) {
    const endpoint = base_url + '/gamemaster/ticket_id/'
    return apiService(endpoint, 'GET', data)
}

function delete_ticket_api(data){
    const endpoint = base_url + '/gamemaster/cancel_ticket/'
    return apiService(endpoint, 'POST', data)
}
function claim_ticket_api(data){
    const endpoint = base_url + '/gamemaster/claim_ticket/'
    return apiService(endpoint, 'POST', data)
}
export {
  base_url,
  place_order,
  base_websocket_url,
  get_tickets_for_user,
  get_lottery_timings,
  get_winners,
  get_lottery_previous,
  get_total_points,
  get_user_details,
  get_tickets,
  delete_ticket_api,
  claim_ticket_api,
}
