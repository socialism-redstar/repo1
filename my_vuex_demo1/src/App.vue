<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" 
    :value="inputValue" @change="handleInputChange" />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStatusChanged(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItemFromList(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneItems}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <!-- primary是按键高亮属性 -->
          <a-button :type="viewKey ==='all' ? 'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey ==='undone' ? 'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey ==='done' ? 'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created(){
	  this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list','inputValue','viewKey']),
    ...mapGetters(['unDoneItems','infoList'])
  },
  methods: {
    handleInputChange(e) {
      //获取文本框最新的值，需要把targrt.value保存到inputValue上
      //改变state（状态）必须使用mutation方法，不能手动改变
      this.$store.commit('setInputValue',e.target.value)
    },
    addItemToList(){
      if(this.inputValue.trim().length <= 0){
        //message是ant组件库中的
        return this.$message.warning('文本框不能为空！')
      }
      this.$store.commit('addItem')
    },
    deleteItemFromList(id){
      this.$store.commit('deleteItem',id)
    },
    cbStatusChanged(e,id){
      const param ={
        id:id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus',param)
    },
    clear(){
      this.$store.commit('clearDoneItems')
    },
    changeList(key){
      this.$store.commit('changeViewKey',key)
    }
  }
  
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
