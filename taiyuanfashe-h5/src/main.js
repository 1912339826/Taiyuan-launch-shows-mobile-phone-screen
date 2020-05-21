import Vue from 'vue';
import App from './App';
import router from './router';
import api from '../src/api/api2'
import req from '../src/api/req'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'view-design/dist/styles/iview.css';
import { DropdownMenu,DropdownItem,Dropdown} from 'view-design';
Vue.component("DropdownMenu",DropdownMenu);
Vue.component("DropdownItem",DropdownItem);
Vue.component("Dropdown",Dropdown);
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(Antd)
// Vue.use(ElementUI);
Vue.prototype.$req = req
window.api = api


import echarts from 'echarts'
echarts.dataTool = require("echarts/extension-src/dataTool/gexf");
Vue.prototype.$echarts = echarts
Vue.prototype.$dataTool = echarts.dataTool;
import 'echarts/theme/macarons.js'
import 'echarts/theme/walden.js'
// normalize.css（css样式初始化）
import 'normalize.css/normalize.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted: function () {
    window.selfVue = this;
  },
  watch: {
    $route(news,olds){
      // console.log(news)
    }
  },
});
window.selfVue.$message.config({
  top: `30vh`
});
// // 前提是选择了自动登录
// if (!!localStorage.getItem("username")) {
//   let data =  window.selfVue.$req(window.api.Login, {
//     loginname: localStorage.getItem("username"),
//     password: Number(localStorage.getItem("password"))
//   });
//   // this.$router.push({ path: item.router });
// }



// function getQueryString(name) {
//   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//   var r = window.location.search.substr(1).match(reg);
//   if (r != null) return unescape(r[2]); return null;
// }
console.log('%c Gancia na starting success','color: #02ff81;')

