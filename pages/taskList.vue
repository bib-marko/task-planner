<template>
    <div class="container">
      <div>
        <h1 class="title">Task Planner</h1>
        <section class="tasks-list">
          <TodoList />
  
          <section class="create-todo">
            <TodoInput />
          </section>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import TodoList from '@/components/TodoList'
  import TodoInput from '@/components/TodoInput.vue'
  
  export default {
    components: { TodoList, TodoInput },
    async fetch({ store }) {
      await store.dispatch('todos/setTodos')
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
  