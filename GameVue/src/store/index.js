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
      lotteryTimings:[ new Date(1617878700000) ,new Date(1617879600000) ],
      results: {},
      price : 10
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
      },
      get_next_lottery: state => {
        console.log("date is"+new Date());
        for (var i = 0; i < state.lotteryTimings; i++) {
           console.log(state.lotteryTimings[i])
            if( new Date() > state.lotteryTimings[i]) {
              console.log("passed lottery")
            }
            else{
              console.log("later lottery")
            }
        }
        return 1
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
