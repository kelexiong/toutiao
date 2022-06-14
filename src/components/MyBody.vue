<template>
  <div>
    <ul>
      <MyBodyList v-for="item in this.apptodoObj" :key="item.todoid" :todoid="item.todoid" :title="item.title" :done="item.done" :todoObj="item"></MyBodyList>
    </ul>
  </div>
</template>

<script>
import MyBodyList from '@/components/MyBodyList'
export default {
  data() {
    return {
      num: 1
    }
  },
  components: {
    MyBodyList
  },
  props: ['apptodoObj']
}
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0 30px;
  list-style: none;
  background: rgba(255, 255, 255, 0.349);
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
