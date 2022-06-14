<template>
  <div class="todo-search">
    <input class="todo-seacrhbox" type="text" placeholder="请输入你的计划" @keyup.enter="addtodolist" v-model.trim="title" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      todoid: this.maxid
    }
  },

  props: ['maxid'],
  methods: {
    addtodolist(e) {
      // console.log(e.target.value)
      if (e.target.value !== '') {
        this.todoid++
        const todo = { todoid: this.todoid, title: this.title, done: false }
        this.$emit('addTodo', todo)
        this.title = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.todo-search {
  margin-bottom: 20px;
  .todo-seacrhbox {
    border-radius: 10px;
    outline: none;
    // border: none;
    padding-left: 30px;
    width: 100%;
    height: 35px;
    font-size: 16px;
    line-height: 35px;
    border: 1px solid #d68f8d;
    background: rgba(255, 255, 255, 0.856);
    box-sizing: border-box;
  }
}
</style>
