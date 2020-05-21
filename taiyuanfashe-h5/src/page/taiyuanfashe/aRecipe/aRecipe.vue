// 一周食谱,此页方法与周工作计划页面基本相同
<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/05.png" alt />
    <Tab></Tab>
    <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>

    <section id="box" ref="sssss">
      <div class="gaine">
        <div id="jiantou">
          <!-- <img src="../../../../static/images/手势类单色线性图标finger-slide-01.png" alt /> -->
        </div>

        <div id="table-form">
          <!-- <table border="1">
            <tr>
              <th style="width:10vw;height:10vw;">时间</th>
              <th
                style="width:20vw;height:10vw;"
                v-for="(item, index) in makeDateStr"
                :key="index"
              >{{item.name}}({{item.date}})</th>
            </tr>
            <tr>
              <th>早餐</th>
              <td v-for="(item, index) in breakfast" :key="index">
                <div v-for="(items,indexs) in item" :key="indexs">{{items}}</div>
              </td>
            </tr>

            <tr>
              <th>午餐</th>
              <td v-for="(item, index) in lunch" :key="index">
                <div v-for="(items,indexs) in item" :key="indexs">{{items}}</div>
              </td>
            </tr>

            <tr>
              <th>晚餐</th>
              <td v-for="(item, index) in dinner" :key="index">
                <div v-for="(items,indexs) in item" :key="indexs">{{items}}</div>
              </td>
            </tr>
          </table>-->

          <table border="1">
            <tr>
              <th style="width:16%;height:10vw;">时间</th>
              <th style="width:28%;height:10vw;">早餐</th>
              <th style="width:28%;height:10vw;">午餐</th>
              <th style="width:28%;height:10vw;">晚餐</th>
            </tr>
            <tr v-for="(item, index) in makeDateStr" :key="index">
              <th>{{item.name}}({{IsgetThisWeekFoodMenu[index]['makeDateStr']}})</th>
              <td>
                <div
                  v-for="(items, indexs) in IsgetThisWeekFoodMenu[index]['breakfast'].split(',')"
                  :key="indexs"
                >{{items}}</div>
              </td>
              <td>
                <div
                  v-for="(items, indexs) in IsgetThisWeekFoodMenu[index]['lunch'].split(',')"
                  :key="indexs"
                >{{items}}</div>
              </td>
              <td>
                <div
                  v-for="(items, indexs) in IsgetThisWeekFoodMenu[index]['dinner'].split(',')"
                  :key="indexs"
                >{{items}}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// 请填写就餐意见(本意见匿名显示) ...
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Gohome from "../../../components/taiyuanfashe/Gohome";
export default {
  name: "NewsList",
  components: {
    Header,
    Tab,
    Gohome
  },
  data() {
    return {
      makeDateStr: [
        { name: "星期一", date: "" },
        { name: "星期二", date: "" },
        { name: "星期三", date: "" },
        { name: "星期四", date: "" },
        { name: "星期五", date: "" },
        { name: "星期六", date: "" },
        { name: "星期日", date: "" }
      ],
      IsgetThisWeekFoodMenu: [
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" }
      ]
    };
  },
  created() {
    this.getThisWeekFoodMenu();
  },
  mounted() {},
  methods: {
    async getThisWeekFoodMenu() {
      this.IsgetThisWeekFoodMenu = [
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" },
        { makeDateStr: "", breakfast: "", lunch: "", dinner: "" }
      ];
      let res = await this.$req(window.api.getThisWeekFoodMenu, {
        orgId: localStorage.getItem("loginOrgId")
      });
      this.IsgetThisWeekFoodMenu = res.data;
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#jiantou {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

#jiantou > img {
  width: 5vw;
  height: 5vw;
}

.gaine {
  background-color: #2d579b;
  border-radius: 1vw;
  border: 2px solid #445ee7;
}

#table-form > table {
  height: 100%;
  text-align: center;
  color: #fff;
  border: 1px solid #3a5ecb;
  width: 100%;
  font-size: 0.15rem;
}

#table-form {
  height: 142vw;
  width: 100%;
  overflow: scroll;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}

#box {
  color: red;
  margin-top: 4vw;
  margin-left: 2vw;
  margin-right: 2vw;
}
</style>