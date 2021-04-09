import Vue from 'vue'
import Vuex from 'vuex'
import {compareDate} from "src/common/utils";

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
      selectionState:{},
      lotteryTimings:[ new Date(1617878700000) ,new Date(1617879600000) ],
      nextLottery:null,
      results: {},
      price : 10
    },
    mutations: {
      push_ticket(state, ticket) {
        state.selectionState[ticket['ticket']] = ticket['quantity']
      },
      set_lottery_timings(state,timings) {
        state.lotteryTimings=timings
      },
      set_next_lottery(state) {
        for (var i = 0; i < state.lotteryTimings.length; i++) {
            if(compareDate(new Date() , state.lotteryTimings[i]) > 0) {

            }
            else{
              console.log("lottery after")
              console.log("setting next lottery as"+state.lotteryTimings[i])
              state.nextLottery = state.lotteryTimings[i];
              break;
            }
        }
      }
    },
    actions: {
      push_ticket ({ commit }, ticket) {
          commit('push_ticket', ticket)
       },
      set_lottery_timings({commit},timings) {
        console.log("setting lottery timings")
        commit('set_lottery_timings',timings)
      },
      set_next_lottery({commit}) {
        console.log("setting next lottery")
        commit('set_next_lottery')

      }
    },

    getters:{
      get_selected: state => {
        return state.selectionState
      },
      get_next_lottery: state => {
        return state.nextLottery
      },
      get_last_lottery_time:state => {

      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
