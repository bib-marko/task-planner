<template>
  <div>
    <div class="center">
      <h1 class="landing-title">Welcome to Task Planner</h1>
      <span class="landing-sub-title">
        Get things done with your day, a list that <br/>refreshes every day.
      </span>
    </div>

    <section class="create-todo">
      <TaskInput />
    </section>
  </div>
</template>

<script>
import TaskInput from './TaskInput.vue'

export default {
  components: { TaskInput },
  async fetch({ store }) {
    await store.dispatch('tasks/setTasks')
  }
}
</script>

<style scoped>
.create-todo {
  margin-left: 2.5em;
  margin-top: 2%;
}

.title {
  margin-left: 1.5em;
}
.center {
  text-align: center;
  margin-top: 20%;
}

.landing-sub-title {
  font-size: 10px;
}
</style>
