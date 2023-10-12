<template>
  <div class="list" id="todo-list">
    <div class="task-card__action" style="margin: -4em 0 0 62em">
      <label 
        class="wrap"  
        v-for="(filter, i) in filters"
        :key="i">
        {{ filter }}
        <input type="radio" name="radio-101fm" @click="filterButton(filter)" :checked="i == 0" />
        <span></span>
      </label>
    </div>
    <div class="search-bar">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" v-model="searchTasks" placeholder="search" @keyup.enter="save" autocomplete="false">
    </div>

    <template v-for="task in searchResultsList">
      <div :key="task.id">
        <TaskItem :task="task" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskItem from '@/components/TaskItem'

export default {
  name: 'TaskList',
  components: { TaskItem },
  data() {
    return {
      filters: ['All', 'Important', 'Done'],
      totalImportant: 0,
      totalDone: 0,
      activeFilter: 'all',
      viewResults: false,
      searchResultsList: null,
      searchTasks: null
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks']),
    filteredTasks() {
      this.searchResultsList = this.tasks
      return this.searchResultsList;
    },
    allTodosDone() {
      return (
        this.tasks.filter(task => task.is_done).length === this.tasks.length
      )
    },
  },
  methods: {
    init: function() {
      this.storedData = this.tasks; 
      this.loading = false;
    },
    searchDataFilter () {
      const data = this.storedData;
      console.log(this.searchTasks.toLowerCase())
      if(this.searchTasks.toLowerCase() !== ''){
        const results = data.filter((item, i) => {
          if (item.title.toLowerCase().indexOf(this.searchTasks.toLowerCase()) > -1) {
            return item;
          }
        });
        return this.searchResultsList = results.slice(0,5);
      } else {
        return this.searchResultsList = data;
      }
    },
    filterButton(typeOfFilter){
      console.log(typeOfFilter)
      if (typeOfFilter === 'Important'){
        this.searchResultsList = this.tasks.filter(task => !task.is_important)
        return  this.searchResultsList;
      }
      if (typeOfFilter === 'Done'){
        this.searchResultsList = this.tasks.filter(task => task.is_done)

        return  this.searchResultsList;
      }
      if (typeOfFilter === 'All'){
        this.searchResultsList = this.tasks
        return this.searchResultsList;
      }
    }
  },
  watch: {
    searchTasks() {
      this.searchDataFilter();
    }
  },
  mounted() {
    this.loading = true;
    this.init();
    this.filteredTasks;
  }
}
</script>

<style scoped>

.wrap { 
  min-height: 3em;
  min-width: 5em;
  padding-left: 1em;
  padding-right: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 12px;
  margin-left: 0.5em;
}

.wrap input {
  opacity: 0;
  position: absolute;
  left:0;
  right: 0;
}

.wrap span {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  z-index: -1;
}

.wrap input:checked ~ span {
  background: rgb(198, 198, 198);
  color: aliceblue;
}

.wrap:hover {
  background: rgb(198, 198, 198);
  color: aliceblue;
  border-radius: 10px;
}
.search-bar {
    background-color: #FFF;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -ms-flex-pack: distribute;
        justify-content: space-around;
    border: 1px solid #ccc;
    border-radius: 50px;
    text-align: center;
    margin-left: 2.5em;
    margin-top: 1%;
}

.search-bar i {
    margin: 0;
    padding: 0;
    color: #aaa;
    -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
    -webkit-box-flex: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    margin: 10px;
}
input {
    margin: 5px 5px;
    width: 90%;
    border: none;
    padding: 1px 0;
    outline: none;
    font-size: 1em;
    color: #888;
    -webkit-box-flex: 2;
        -ms-flex-positive: 2;
            flex-grow: 2;
}
</style>
