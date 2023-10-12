<template>
  <div class="container">
    <LandingPage />
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage'

export default {
  components: { LandingPage },
  async fetch({ store }) {
    await store.dispatch('tasks/setTasks')
  }
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
