<template>
  <div id="app">
    <div class="lnsidebox">
      <MyHeadr @addTodo="addTodo" :maxid="todoid"></MyHeadr>
      <MyBody :apptodoObj="apptodoObj"></MyBody>
      <MyFoot :todo="apptodoObj" @changedoneAll="changedoneAll" @removeAllList="removeAllList"></MyFoot>
    </div>
  </div>
</template>

<script>
import MyHeadr from '@/components/MyHeadr'
import MyBody from '@/components/MyBody'
import MyFoot from '@/components/MyFoot'
export default {
  name: 'App',
  components: {
    MyHeadr,
    MyBody,
    MyFoot
  },
  data() {
    return {
      apptodoObj: JSON.parse(localStorage.getItem('apptodoObj')) || [],
      // 获取最大的那个id
      todoid: null
    }
  },

  watch: {
    apptodoObj: {
      immediate: true,
      deep: true,
      handler(value) {
        localStorage.setItem('apptodoObj', JSON.stringify(value))
        // 监听todoid值，来渲染唯一id

        if (this.todoid === null) {
          // console.log('调用了')
          if (JSON.parse(localStorage.getItem('apptodoObj')).length !== 0) {
            console.log(JSON.parse(localStorage.getItem('apptodoObj'))[0].todoid)
            this.todoid = JSON.parse(localStorage.getItem('apptodoObj'))[0].todoid
            // console.log(this.todoid)-
          } else this.todoid = 1001
        } else this.todoid++
      }
    }
  },
  mounted() {
    this.$bus.$on('Changecheckbox', this.Changecheckbox)
    this.$bus.$on('removeeventlists', this.removeeventlists)
    this.$bus.$on('alterValueTitle', this.alterValueTitle)
  },
  beforeDestroy() {
    this.$bus.$off(['removeeventlists', 'Changecheckbox', 'alterValueTitle'])
  },
  methods: {
    alterValueTitle(id, value) {
      this.apptodoObj.some(item => {
        if (item.todoid === id) item.title = value
      })
    },
    addTodo(todo) {
      // console.log(todo)
      this.apptodoObj.unshift(todo)
      // console.log(this.todoObj)z
    },
    // mybodylist
    Changecheckbox(tododone) {
      this.apptodoObj.some(item => {
        if (item.todoid === tododone) {
          item.done = !item.done
        }
      })
    },
    removeAllList() {
      this.apptodoObj = this.apptodoObj.filter(item => !item.done)
    },
    // myfoot
    changedoneAll(done) {
      this.apptodoObj.forEach(item => (item.done = done))
    },
    removeeventlists(id) {
      this.apptodoObj = this.apptodoObj.filter(item => {
        if (item.todoid !== id) return item
      })
      console.log(this.apptodoObj, id)
    }

    // muchdone() {
    //   const muchdone = this.apptodoObj.filter(item => {
    //     if (item.done) {
    //       return item
    //     }
    //   })
    //   // console.log(muchdone.length)
    //   return muchdone.length
    // },
    // summuch() {
    //   return this.apptodoObj.length
    // }
  }
}
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
body {
  width: 1200px;
  margin: 0 auto;
  #app {
    padding: 40px 200px 0;
    .lnsidebox {
      width: 100%;
      border: 1px solid #d68f8d;
      border-radius: 10px;
      padding: 20px 30px 20px;
      background: rgba(255, 255, 255, 0.664);
    }
  }
  background: url('./assets/1.jpg') no-repeat center;
}
</style>
