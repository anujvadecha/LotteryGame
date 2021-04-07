import { apiService } from './api.service'
const base_url = 'http://127.0.0.1:8000'
const base_websocket_url = 'localhost:8000'

function place_order (order) {
  const endpoint = base_url + '/gamemaster/buy_ticket/'
  return apiService(endpoint, 'POST', order)
}

export {
  base_url,
  place_order,
  base_websocket_url,

}
