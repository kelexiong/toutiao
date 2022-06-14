<template>
  <li class="checkbox-list">
    <div class="listbox">
      <input type="checkbox" :id="todoid" :checked="done" @change="Checkstatus(todoid)" />
      <label :for="todoid" v-show="!todoObj.isEditor">{{ title }}</label>
      <input type="text" :value="title" v-show="todoObj.isEditor" @blur="alterValue(todoObj, $event)" ref="GotFocus" />
    </div>
    <div>
      <button class="del-btn edit-btn" @click="edittodo(todoObj)" v-show="!todoObj.isEditor">编辑{{ todoid }}</button>
      <button class="del-btn" @click="removelist(todoid)">删除{{ todoid }}</button>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      // listtitle: this.title,
      listdone: this.done
      // listid: this.todoid
    }
  },

  methods: {
    // 修改文字,失去焦点
    alterValue(todoObj, e) {
      console.log(e.target.value.trim())
      if (e.target.value.trim() !== '') {
        todoObj.isEditor = false
        console.log(e.target.value)
        this.$bus.$emit('alterValueTitle', todoObj.todoid, e.target.value)
      } else return (todoObj.isEditor = false)
    },
    // 编辑按钮
    edittodo(todo) {
      if (Object.prototype.hasOwnProperty.call(todo, 'isEditor')) todo.isEditor = true
      else this.$set(todo, 'isEditor', true)
      this.$nextTick(function () {
        this.$refs.GotFocus.focus()
      })
    },
    Checkstatus(tododone) {
      // console.log('点击了22')
      // this.Changecheckbox(tododone)
      this.$bus.$emit('Changecheckbox', tododone)
    },
    removelist(id) {
      // this.removeeventlists(id)
      this.$bus.$emit('removeeventlists', id)
      // console.log('点击了11')
    }
  },
  props: ['todoid', 'title', 'done', 'todoObj']
}
</script>

<style lang="less" scoped>
.checkbox-list {
  display: flex;
  margin-top: -1px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  label {
    padding-right: 20px;
  }
  button {
    display: none;
  }
  .del-btn {
    float: left;
    margin-right: 10px;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 5px;
    color: #fff;
    border: none;
    background-color: rgb(170, 36, 36);
  }
  .edit-btn {
    background-color: rgb(36, 170, 47);
  }
  .del-btn:hover {
    cursor: pointer;
    box-shadow: 1px 1px 2px 1px rgb(209, 30, 30);
  }
  #checkbox-btn {
    margin: 0;
    vertical-align: middle;
    width: 16px;
    height: 16px;
  }
  label {
    margin-left: 20px;
    user-select: none;
  }
}
.checkbox-list:hover {
  background-color: rgb(243, 240, 240);
  button {
    display: block;
  }
}
</style>
