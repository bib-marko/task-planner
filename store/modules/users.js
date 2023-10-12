export const namespaced = true

export const state = {
  users: [],
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
}

export const actions = {
  async setUsers({ commit }) {
    const { data } = await this.$axios.get(
      'https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/users'
    )
    if (data) commit('SET_USERS', data)
  },
}

export const getters = {
  users(state) {
    return state.users
  },
}
