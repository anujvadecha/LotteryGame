import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {},
    state: {
      selectionState:{
      },
      lotteryTimings:{},
      results:{},
      price:10
    },
    mutations: {
      push_ticket(state, ticket) {
        state.selectionState[ticket['ticket']] = ticket['quantity']
      }
    },
    actions: {
      push_ticket ({ commit }, ticket) {
          commit('push_ticket', ticket)
       },
    },
    getters:{
      get_selected: state => {
      return state.selectionState
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
