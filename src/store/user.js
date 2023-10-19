const state = {
  newUserID: null,
  indexUserRoute: null
};

const getters = {
  newUserID: state => state.newUserID,
  indexUserRoute: state => state.indexUserRoute
};

const actions = {
  setNewUserID({commit}, newUserID){
    commit('setNewUserID', newUserID)
  },
  setIndexUserRoute({commit}, fullPath){
    commit('setIndexUserRoute', fullPath)
  }
};

const mutations = {
  setNewUserID(state, newUserID){
    state.newUserID = newUserID
  },
  setIndexUserRoute(state, fullPath){
    state.indexUserRoute = fullPath
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};