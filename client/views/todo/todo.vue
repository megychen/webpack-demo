<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么？"
      @keyup.enter="addTodo"
      v-model="content"
    >
    <item
      v-for="todo in filterTodos"
      :todo="todo"
      :key="todo.id"
      @del="deleteTodo"
    >
    </item>
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    >
    </tabs>
  </section>
</template>

<script>
import item from './item.vue'
import tabs from './tabs.vue'

export default {
  name: 'Todo',
  components: {
    item,
    tabs
  },
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('todo before update')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo before leave')
    next()
  },
  data () {
    return {
      todos: [],
      id: 0,
      content: '',
      filter: 'all'
    }
  },
  computed: {
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo () {
      this.todos.unshift({
        id: this.id++,
        content: this.content,
        completed: false
      })
      this.content = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
      console.log(this.filter)
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }

  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
</style>

