import Vuex from 'vuex'
import * as todos from '@/store/modules/todos.js'
import * as users from '@/store/modules/users.js'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      todos,
      users
    }
  })
}
export default createStore
