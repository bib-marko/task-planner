export const namespaced = true

export const state = {
  todos: [],
  todo: null
}

export const mutations = {
  SET_TODO(state, todo) {
    state.todo = todo
  },
  SET_TODOS(state, todos) {
    state.todos = todos
  },
  ADD_TODO(state, todo) {
    state.todos.push(todo)
  },
  REMOVE_TODO(state, todo) {
    const index = state.todos.indexOf(todo)
    state.todos.splice(index, 1)
  }
}

export const actions = {
  async setTodo({ commit }, id) {
    const { data } = await this.$axios.get(`/todos/${id}`)
    if (data) commit('SET_TODO', data)
  },
  async setTodos({ commit }) {
    const { data } = await this.$axios.get(
      'https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks'
    )
    console.log('module = ', data);
    if (data) commit('SET_TODOS', data)
  },
  async addTodo({ commit }, todo) {
    const { data } = await this.$axios.post(
      'https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks',
      todo
    )
    if (data) commit('ADD_TODO', data)
  },
  async removeTodo({ commit }, todo) {
    await this.$axios.delete(
      `https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks/${todo.id}`
    )
    commit('REMOVE_TODO', todo)
  }
}

export const getters = {
  todos(state) {
    return state.todos
  },
  todo(state) {
    return state.todo
  }
}
