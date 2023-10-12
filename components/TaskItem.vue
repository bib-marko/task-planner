<template>
  <TaskActions>
    <template slot-scope="{ load, taskActions }">
      <ul :class="`choice-list todo-item ${taskStatus && 'done'}`">
        <li class="choice-list__item task-card-item">
          <input
            :id="`checkbox-${task.id}`"
            type="checkbox"
            class="checkbox"
            @click="checkTask(taskStatus)"
          />
          <label :for="`checkbox-${task.id}`" class="todo-content">
            <div class="task-content">
              <span>{{ task.title }}</span>
            </div>
          </label>
          <span class="choice-list__aside">
            <img v-show="task.assignee.avatar" :src="task.assignee.avatar" alt="Italian Trulli" @click="getUsersData" >
            <div v-show="pop === true" class="box">
              <div class="search-bar">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input type="text" v-model="searchTasks" placeholder="Search Team Member" @keyup.enter="save" autocomplete="false">
              </div>
              <ul style="margin: .5em 0 0 -3em">
                <li class="flex-container" v-for="(user, i) in searchResultsList" :key="i" style="margin: .3em 0 0 0;">
                  <img v-show="user.avatar" :src="user.avatar" >
                  <span style="font-size: 12px; text-align: left;">{{ user.name }}</span>
                </li>
              </ul>
            </div>
            <fieldset class="rating">
              <input type="checkbox" :id="`star${task.id}`" name="rating" :value="task.id" />
              <label :for="`star${task.id}`"></label>
              </fieldset>
            <button
              class="btn task-action-trash"
              @click="load(taskActions.delete, task)"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </span>
        </li>
      </ul>
    </template>
  </TaskActions>
</template>

<script>
import { mapState } from 'vuex'
import TaskActions from '@/components/TaskActions'

export default {
  name: 'TaskItem',
  components: {
    TaskActions
  },
  props: {
    task: { type: Object, required: true }
  },
  data() {
    return {
      taskStatus: false,
      userList: [],
      pop: false,
      viewResults: false,
      searchResultsList: null,
      searchTasks: null
    }
  },
  computed: {
    ...mapState(["tasks", "users"]),
  },
  mounted() {
    this.$store.dispatch('users/setUsers')
  },
  methods: {
    routeTo(id) {
      this.$router.push(`tasks/${id}`)
    },
    checkTask(value) {
      return (this.taskStatus = value ? false : true)
    },
    getUsersData(){
      this.searchResultsList = this.userList = this.users.users;
      this.pop = !this.pop
    },
    searchDataFilter() {
      const data = this.userList;
      console.log(this.searchTasks.toLowerCase())
      if(this.searchTasks.toLowerCase() !== ''){
        const results = data.filter((item, i) => {
          if (item.name.toLowerCase().indexOf(this.searchTasks.toLowerCase()) > -1) {
            return item;
          }
        });
        return this.searchResultsList = results.slice(0,5);
      } else {
        return this.searchResultsList = data;
      }
    },
  },
  watch: {
    searchTasks() {
      this.searchDataFilter();
    }
  },
}
</script>

<style scoped>
.todo-content {
  width: 90%;
}
.todo-item.done .todo-content span {
  text-decoration: line-through;
  color: HSL(var(--color-purple)) !important;
}
.task-content {
  margin-left: 2.5em;
  margin-top: -1.5em;
}

.btn {
  background-color: transparent;
  border: none; 
  font-size: 16px; 
  cursor: pointer; 
  color: #dadada;
}

.task-action-trash :hover {
  color: rgb(255, 75, 75);
}

.task-action-star :hover {
  color: rgb(255, 185, 35);
}

.choice-list__aside {
  display: flex;
  justify-content: right;
  align-items: right;
  font-size: 1.4rem;
  width: 10%;
}

.card {
  margin-bottom: 32px;
}

tr.highlighted {
  background-color: #dff0d8;
  color: #3c763d;
}

.box {
  padding: 1em;
  position: absolute;
  right: 9%;
  height: 250px;
  width: 220px;
  background-color: rgb(255, 255, 255);
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-right: 2em;
  margin-top: 2em;
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
    text-align: center;
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
    font-size: .8em;
    color: #888;
    -webkit-box-flex: 2;
        -ms-flex-positive: 2;
            flex-grow: 2;
}

.flex-container {
  display: flex;
}

.flex-container > span {
  margin: 10px;
  font-size: 30px;
}

.rating {
    float:left;
    border:none;
}
.rating:not(:checked) > input {
    position:absolute;
    top:-9999px;
    clip:rect(0, 0, 0, 0);
}
.rating:not(:checked) > label {
    float:right;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size: 20px;
    line-height:1;
    color:#ddd;
}
.rating:not(:checked) > label:before {
    content:'★ ';
}
.rating > input:checked ~ label {
    color: #f70;
}
.rating:not(:checked) > label:hover, .rating:not(:checked) > label:hover ~ label {
    color: gold;
}
.rating > input:checked + label:hover, .rating > input:checked + label:hover ~ label, .rating > input:checked ~ label:hover, .rating > input:checked ~ label:hover ~ label, .rating > label:hover ~ input:checked ~ label {
    color: #ea0;
}
.rating > label:active {
    position:relative;
}

img {
  margin-top: .2em;
  border-radius: 50%;
  height: 20%;
  width: 20%;
}

</style>