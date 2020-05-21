<template>
  <div id="lay-tab">
    <ul class="tab">
      <span v-for="item in tabDataTop" :key="item.name" :id="item.path==changeName?'active':''" @click="tabBtnTo(item)">{{item.name}}</span>
    </ul>
    <ul class="tab">
      <span v-for="item in tabDataBottom" :key="item.name" :id="item.path==changeName?'active':''" @click="tabBtnTo(item)">{{item.name}}</span>
    </ul>
  </div>
</template>

<style  scoped>
#lay-tab {
  width: 100%;
  height: 6vw;
  padding-top: 1.5vw;
}
.tab {
  font-family: "微软雅黑";
  height: 50%;
  /* background-color: chartreuse; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tab span {
  padding: 0 1vw;
  font-size: 0.13rem;
  color: #eee;
}
#lay-tab>.tab span:hover{
  cursor: pointer;
  border-radius: 2vw;
  color: #49b9e8;

}

#lay-tab>.tab>#active{
  color: #49b9e8;
}

.tab:nth-child(1) span{
  font-weight: 900;
}
#lay-tab>.tab:nth-child(2) span{
  font-size: 0.1rem;
}

#lay-tab>.tab:nth-child(1)>#active{
  background-color: #fff;
  border-radius: 2vw;
  color: #000;
}

#lay-tab>.tab:nth-child(2)>#active{
  border-bottom: 2px solid #49b9e8;
}

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

</style>
<script>
import Vue from "vue";

export default {
  name: "Tab",
  components: {},
  data: function() {
    return {
      tabDataBottom: [
        // {name: "首页", router: "/index" ,path:"Index"},
        { name: "公告", router: "/Notice"  ,path:"Notice"},
        { name: "工作计划", router: "/weekwork"  ,path:"Weekwork"},
        { name: "本周食谱", router: "/aRecipe"  ,path:"aRecipe"},
        { name: "建言建议", router: "/news"  ,path:"NewsList"},
        { name: "领导信箱", router: "/leaderLetter"  ,path:"leaderLetter"},
        { name: "举报信箱", router: "/complaintMailbox"  ,path:"complaintMailbox"}
      ],
      tabDataTop:[{ name: "战备工作", router: "/PreparationAgainstWar" ,path:"preparationAgainstWar"},
        { name: "军事训练", router: "/militaryTraining"  ,path:"MilitaryTraining"},
        { name: "政治工作", router: "/inEducation"  ,path:"InEducation"},
        { name: "日常管理", router: "/management"  ,path:"Management"},],
      changeName:"index"
    };
  },
  watch: {
  },
  created(){
    this.changeName = this.$route.name
  },
  mounted() {},
  destroyed() {},
  methods: {
    tabBtnTo(item) {
      this.$router.push({ path: item.router });
    }
  }
};
</script>