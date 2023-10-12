<script>
import { mapActions } from 'vuex'

export default {
  name: 'TaskActions',
  data() {
    return {
      isLoading: false,
      editMode: false,
      editTitle: ''
    }
  },
  methods: {
    ...mapActions('task', ['removeTask']),
    async load(funct, args) {
      this.isLoading = true
      await funct(args)
      this.isLoading = false
    },
    async toggleTask(task) {
      const params = { completed: !task.is_done, title: task.title }
      await this.updateTask({ params, task })
    },
    async editTask(task) {
      const params = { title: this.editTitle }
      await this.updateTask({ params, task })
      this.resetEditMode()
    },
    async deleteTask(task) {
      await this.removeTask(task)
    },
    async deleteTaskAndBackHome(task) {
      await this.removeTask(task)
      this.backToHome()
    },
    setEditMode(title) {
      this.editTitle = title
      this.editMode = true
    },
    resetEditMode() {
      this.editTitle = ''
      this.editMode = false
    },
    backToHome() {
      this.$router.push('/')
    }
  },
  render() {
    return this.$scopedSlots.default({
      load: (funct, args) => this.load(funct, args),
      taskData: {
        isLoading: this.isLoading,
        editMode: this.editMode
      },
      taskActions: {
        toggle: task => this.toggleTask(task),
        edit: task => this.editTask(task),
        delete: task => this.deleteTask(task),
        deleteAndBackHome: task => this.deleteTaskAndBackHome(task)
      },
      taskEditMode: {
        reset: this.resetEditMode,
        set: this.setEditMode
      },
      taskInput: {
        value: { value: this.editTitle },
        event: { input: e => (this.editTitle = e) }
      }
    })
  }
}
</script>

<style scoped></style>
