import Vuex from 'vuex'
import * as tasks from '@/store/modules/tasks.js'
import * as users from '@/store/modules/users.js'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      tasks,
      users
    }
  })
}
export default createStore
