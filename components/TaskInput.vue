<template>
  <div>
    <div class="input-container">
      <i class="fa fa-plus icon" aria-hidden="true"></i>
      <input
        v-model="newTasks.title"
        v-on:keyup.enter="createTask"
        type="text"
        class="addtodo"
        placeholder="Add a Task"
      />
    </div>
    <p class="task-notes">Please <b>enter</b> to add task</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TaskInput',
  data() {
    return {
      isLoading: false,
      newTasks: {
        title: '',
        completed: false,
        user: 1
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    async createTask() {
      if (this.newTasks.title.length) {
        this.isLoading = true
        console.log($nuxt.$route.name);
        let task = { ...this.newTasks }
        this.newTasks.title = ''
        await this.addTask(task)
        if($nuxt.$route.name === 'index'){
          this.$router.push({
            path: `/taskList`
          });
        }
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.disabled {
  opacity: 0.7;
}
.addtodo input[type='text'] {
  color: #777;
  padding: 0.25em 0.625em;
  width: 100%;
}

.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.icon {
  padding: 10px;
  background: #f3f4f7;
  color: rgb(208, 208, 208);
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
}

.addtodo {
  width: 100%;
  padding: 10px;
  left: 50%;
  background-color: #f3f4f7;
  outline: none;
}

::placeholder {
  color: rgb(186, 186, 186);
  opacity: 1;
}

.task-notes {
  font-size: 10px;
  color: rgb(186, 186, 186);
  margin-top: -1em;
}

.task-notes b {
  color: rgb(255, 0, 0);
}
</style>
