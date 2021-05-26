import { createStore } from 'vuex'

export default createStore({
  state: {
    activityinfo:{}
  },
  mutations: {
    saveActivity(state,obj){
      state.activityinfo = obj;
    },
  },
  actions: {
  },
  modules: {
  }
})
