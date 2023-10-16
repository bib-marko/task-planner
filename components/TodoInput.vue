<template>
  <div>
    <div class="input-container">
      <i class="fa fa-plus icon" aria-hidden="true"></i>
      <input
        v-model="newTodo.title"
        v-on:keyup.enter="createTodo"
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
  name: 'TodoInput',
  data() {
    return {
      isLoading: false,
      newTodo: {
        title: '',
        completed: false,
        user: 1
      }
    }
  },
  methods: {
    ...mapActions('todos', ['addTodo']),
    async createTodo() {
      if (this.newTodo.title.length) {
        
        this.isLoading = true

        let timerInterval;
          this.$swal({
            title: 'Adding new Task...',
            html: 'I will close in <b></b> milliseconds.',
            timer: 1500,
            timerProgressBar: true,
            didOpen: async () => {
              this.$swal.showLoading()
              let todo = { ...this.newTodo }
              this.newTodo.title = ''
              await this.addTodo(todo)
              if($nuxt.$route.name === 'index'){
                this.$router.push({
                  path: `/taskList`
                });
              }
              const b = this.$swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = this.$swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === this.$swal.DismissReason.timer) {
              this.$swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New Task successfully added!',
                showConfirmButton: false,
                timer: 1000
              })
            }
          })

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
  opacity: 1; /* Firefox */
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
