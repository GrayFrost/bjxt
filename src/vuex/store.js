/**
 * Created by Administrator on 2017/4/3.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    webTitle: '一个纯粹的比价网站'
  },
  mutations: {
    changeTitle (state, str) {
      return state.webTitle = str;
    }
  },
  actions: {
    changeTitle (context, str) {
      context.commit('changeTitle', str);
    }
  }
});

export default store;