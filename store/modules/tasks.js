export const namespaced = true

export const state = {
  tasks: [],
  task: null
}

export const mutations = {
  SET_TASK(state, task) {
    state.task = task
  },
  SET_TASKS(state, tasks) {
    state.tasks = tasks
  },
  ADD_TASK(state, task) {
    state.tasks.push(task)
  },
  REMOVE_TASK(state, task) {
    const index = state.tasks.indexOf(task)
    state.tasks.splice(index, 1)
  }
}

export const actions = {
  async setTask({ commit }, id) {
    const { data } = await this.$axios.get(`/tasks/${id}`)
    if (data) commit('SET_TASK', data)
  },
  async setTasks({ commit }) {
    const { data } = await this.$axios.get(
      'https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks'
    )
    console.log('module = ', data);
    if (data) commit('SET_TASKS', data)
  },
  async addTask({ commit }, task) {
    const { data } = await this.$axios.post(
      'https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks',
      task
    )
    if (data) commit('ADD_TASK', data)
  },
  async removeTask({ commit }, task) {
    await this.$axios.delete(
      `https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks/${task.id}`
    )
    commit('REMOVE_TASK', task)
  }
}

export const getters = {
  tasks(state) {
    return state.tasks
  },
  task(state) {
    return state.task
  }
}
