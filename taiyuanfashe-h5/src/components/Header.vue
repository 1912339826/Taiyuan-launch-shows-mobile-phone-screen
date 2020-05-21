<template>
  <div id="Header">
    <div class="lay-header">
      <img class="header-img" src="../assets/images/00(2).png" alt="">
      <p class="time">{{time | formatDate}} {{weekday[day]}}</p>
    </div>
  </div>
</template>

<style   scoped>
#Header{
  width: 100%;
}
.lay-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.header-img {
  display: block;
  width: 100%;
}
.time {
  color: #49b9e8;
  font-size: 0.13rem;
  text-align: center;
  margin-top: -4vw;
}
</style>
<script>
import Vue from "vue";
import { formatDate } from "@/utils/date.js";
export default {
  name: "Header",
  components: {},
  data: function() {
    return {
      time: Date.parse( new Date() ).toString().substr(0,10),
      day:new Date().getDay(),
      weekday:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created(){
    // setTimeout(()=>{
      // this.showDutyManage()
    // },100)
    // this.showDutyManage()
  },
  mounted() {
    // this.showDutyManage()
    let that=this
    that.timer = setInterval(function() {
      that.time=Date.parse( new Date() ).toString().substr(0,10);
    }, 1000);
  },
  destroyed() {},
  methods: {
    // 测试,可删
    // // 3.首页-战备值班
    // async showDutyManage() {
    //   let res = await this.$req(window.api.showDutyManage, {
    //     orgId: localStorage.getItem("orgId"),
    //     orgLevelCode: localStorage.getItem("orgLevelCode")
    //   });
    //   console.log(res,'11111111111111111111111')
    // },
  }
};
</script>