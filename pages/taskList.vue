<template>
    <div class="container">
      <div>
        <h1 class="title">Task Planner</h1>
        <section class="tasks-list">
          <TaskList />
  
          <section class="create-todo">
            <TaskInput />
          </section>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import TaskList from '@/components/TaskList'
  import TaskInput from '@/components/TaskInput'
  
  export default {
    components: { TaskList, TaskInput },
    async fetch({ store }) {
      await store.dispatch('tasks/setTasks')
    },
  }
  </script>
  
  <style scoped>
  .create-todo {
    margin-left: 2.5em;
    margin-top: 10%;
  }
  
  .title {
    margin-left: 1.5em;
  }
  </style>
  