import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { List } from 'ant-design-vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId:5,
    viewKey: 'all'
  },
  mutations: {
    initList(state,list){
      state.list = list
    },
    setInputValue(state,val){
      state.inputValue = val
    },
    addItem(state){
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue=''
    },
    deleteItem(state,id){
      const i = state.list.findIndex(x=>
        x.id === id
      )
      if(i!==-1){
        state.list.splice(i,1)
      }
    },
    changeStatus(state,param){
      const i = state.list.findIndex(x => x.id === param.id)
      if(i!==-1){
        state.list[i].done = param.status
      }
    },
    clearDoneItems(state){
      state.list = state.list.filter(item => item.done === false)
    },
    changeViewKey(state,key){
      state.viewKey = key
    }
  },
  actions: {
	  async getList(context){
		 const{data:res} = await axios.get('/list.json')
     console.log(res)
     context.commit('initList',res)
	  }
  },
  getters: {
    unDoneItems(state){
      return state.list.filter(item => item.done === false).length
    },
    infoList(state){
      if(state.viewKey === 'all'){
        return state.list
      }else if(state.viewKey === 'undone'){
        return state.list.filter(item => item.done === false)
      }else if(state.viewKey === 'done'){
        return state.list.filter(item => item.done === true)
      }
      return state.list
    }
  },
  modules: {
  }
})

