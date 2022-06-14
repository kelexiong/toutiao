<template>
  <div class="footbox" v-show="listAll">
    <div>
      <input type="checkbox" class="footcheckbox" id="footbtnid" v-model="Alldone" /><label for="footbtnid">已完成 {{ muchdone }} / 全部 {{ listAll }}</label>
    </div>
    <div><button class="remove-btn" @click="deleteAllList">清除所有完成项目</button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // Alldone() {
    //   this.changedoneAll(e.target.checked)
    // },
    deleteAllList() {
      // this.removeAllList()
      this.$emit('removeAllList')
    }
  },
  props: ['todo'],
  computed: {
    muchdone: {
      get() {
        return this.todo.reduce((oldval, newval) => oldval + (newval.done ? 1 : 0), 0)
      }
      // set() {
      //   let arr = this.todo.filter(item => {
      //     if (item.done) return item
      //   })
      //   console.log(arr)
      //   return arr.length
      // }
    },
    listAll: {
      get() {
        return this.todo.length
      }
    },
    Alldone: {
      get() {
        return this.muchdone === this.listAll && this.listAll > 0
      },
      set(value) {
        // this.changedoneAll(value)
        this.$emit('changedoneAll', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footbox {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #d68f8d;
  padding: 0 30px;
  background: rgba(255, 255, 255, 0.856);
  .footcheckbox {
    margin: 0;
    vertical-align: middle;
    line-height: 35px;
    width: 16px;
    height: 16px;
  }
  label {
    margin-left: 20px;
    line-height: 35px;
    user-select: none;
  }
  .remove-btn {
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 5px;
    color: #fff;
    border: none;
    background-color: rgb(170, 36, 36);
  }
  .remove-btn:hover {
    cursor: pointer;
    box-shadow: 1px 1px 2px 1px rgb(209, 30, 30);
  }
}
</style>
