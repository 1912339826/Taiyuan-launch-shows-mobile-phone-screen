<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/01.png" alt />
    <Tab></Tab>
    <section class="box">
      <section>
        <div class="lay-one">
          <div class="one-item" v-for="(item, index) in 6" :key="index">
            <img src="../../../../static/images/0111.png" alt />
            <p class="one-item-p">揭秘我南海舰队护航揭秘我南海舰队护航......</p>
          </div>
        </div>
        <div class="lay-two">
          <li
            type="square"
            class="two-li"
            v-for="(item, index) in IsgetInformAndNoticeList"
            :key="index"
            :title="item.mainTitle"
          >{{item.article}}</li>
        </div>
      </section>
      <section style="height:35vw">
        <div class="lay-three">
          <div class="three-top">
            <div>
              <img class="three-img" src="../../../../static/images/0111.png" alt />
              <pre :title="IsshowDutyManage.dutyHeadName">值班领导:<span>{{IsshowDutyManage.dutyHeadName}}</span></pre>
              <pre :title="IsshowDutyManage.headTelphoneNum">联系电话:<span>{{IsshowDutyManage.headTelphoneNum}}</span></pre>
            </div>
            <div style="margin-left:1vw;">
              <img class="three-img" src="../../../../static/images/0111.png" alt />
              <pre :title="IsshowDutyManage.dutyPersonnelName">值班员:<span>{{IsshowDutyManage.dutyPersonnelName}}</span></pre>
              <pre :title="IsshowDutyManage.personnelTelphoneNum">联系电话:<span>{{IsshowDutyManage.personnelTelphoneNum}}</span></pre>
            </div>
          </div>
          <div class="three-bottom">
            <div>
              <pre :title="IsshowDutyManage.orgName">值班分队:<span>{{IsshowDutyManage.orgName}}</span></pre>
              <pre :title="IsshowDutyManage.carTypeNum">值班车辆:<span>{{IsshowDutyManage.carTypeNum}}</span></pre>
              <pre :title="IsshowDutyManage.dutyCarName">车牌:<span>{{IsshowDutyManage.dutyCarName}}</span></pre>
            </div>
            <div style="margin-left:1vw;">
              <pre :title="IsshowDutyManage.driverTelephoneNum">联系电话:<span>{{IsshowDutyManage.driverTelephoneNum}}</span></pre>
              <pre :title="IsshowDutyManage.driver">值班司机:<span>{{IsshowDutyManage.driver}}</span></pre>
            </div>
          </div>
        </div>

        <div class="lay-four">
          <section class="top">
            <div class="left">
              <div style="height:10vw;width:10vw;">
                <Meter :idName="'lest11'" :num="90" />
              </div>
              <div style="color:#fff;text-align: center;font-size:0.1rem;">在位率</div>
            </div>
            <div class="right">
              <div style="height:10vw;width:10vw;">
                <Meter :idName="'right'" :num="20" :unit="'人'" :max="200" />
              </div>
              <div style="color:#fff;text-align: center;font-size:0.1rem;">不在位人数</div>
            </div>
          </section>
          <section class="bottom">
            <div class="box">
              <div>12</div>
              <div>休假人数</div>
            </div>
            <div class="box">
              <div>5</div>
              <div>出差人数</div>
            </div>
            <div class="box">
              <div>0</div>
              <div>住院人数</div>
            </div>
            <div class="box">
              <div>12</div>
              <div>学习人数</div>
            </div>
          </section>
        </div>
      </section>

      <div class="lay-five">
        <div class="header">
          <span
            v-for="(item,i) in weekday "
            :key="i"
            @click="headerTimeBtn(item)"
            :class="headerTime==item? 'header-change':''"
          >{{item}}</span>
        </div>
        <div class="content">
          <table border="1">
            <tr>
              <th style="background-color: #2d4f9b;color:#fff;">时段</th>
              <th style="background-color: #2d4f9b;color:#fff;">事项安排</th>
              <th style="background-color: #2d4f9b;color:#fff;">参加对象</th>
            </tr>
            <tr>
              <th rowspan="2">早晨</th>
              <td rowspan="2" style="padding-left:15vw">{{IsgetPlanWeekCount[0]["trainContent"] || ""}}</td>
              <td rowspan="2">全体</td>
            </tr>
            <tr></tr>
            <tr>
              <th rowspan="2">上午</th>
              <td rowspan="2" style="padding-left:15vw">{{IsgetPlanWeekCount[1]["trainContent"] || ""}}</td>
              <td rowspan="2">全体</td>
            </tr>
            <tr></tr>
             <tr>
              <th rowspan="2">下午</th>
              <td rowspan="2" style="padding-left:15vw">{{IsgetPlanWeekCount[2]["trainContent"] || ""}}</td>
              <td rowspan="2">全体</td>
            </tr>
            <tr></tr>
           <tr>
              <th rowspan="2">晚上</th>
              <td rowspan="2" style="padding-left:15vw">{{IsgetPlanWeekCount[3]["trainContent"] || ""}}</td>
              <td rowspan="2">全体</td>
            </tr>
            <tr></tr>
          </table>
        </div>
      </div>
      <section>
        <div class="lay-six">
          <table border="1">
            <tr>
              <th>早餐</th>
              <th>中餐</th>
              <th>晚餐</th>
            </tr>
            <tr v-for="(item, index) in 4" :key="index">
              <td>砂糖西红柿</td>
              <td>砂糖西红柿</td>
              <td>砂糖西红柿</td>
            </tr>
          </table>
        </div>

        <div class="lay-serve">
          <div style="width: 47vw;height: 22vw;">
            <LineChart></LineChart>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Meter from "../../../components/taiyuanfashe/Meter";
import LineChart from "../../../components/taiyuanfashe/LineChart";
export default {
  name: "Index",
  components: {
    Header,
    Tab,
    Meter,
    LineChart
  },
  data: function() {
    return {
      weekday: [
        " 周 一",
        " 周 二",
        " 周 三",
        " 周 四",
        " 周 五",
        " 周 六",
        " 周 日"
      ],
      headerTime: " 周 一",
      IsgetInformAndNoticeList: [],
      IsshowDutyManage: {},
      IsgetPlanWeekCount:[],
      IstrainScheduleContrast:[]
    };
  },
  created() {
    // this.getInformAndNoticeList();
    // this.showDutyManage();
    this.getPlanWeekCount();
    // this.trainScheduleContrast()
  },
  mounted() {
    // console.log(this.$api);
  },
  destroyed() {},
  methods: {
    headerTimeBtn(item) {
      this.headerTime = item;
    },
    // 2.首页-通知公告
    async getInformAndNoticeList() {
      let res = await this.$req(window.api.getInformAndNoticeList, {});
      this.IsgetInformAndNoticeList = res.data;
    },
    // 3.首页-战备值班
    async showDutyManage() {
      let res = await this.$req(window.api.showDutyManage, {
        orgId: localStorage.getItem("orgId"),
        orgLevelCode: localStorage.getItem("orgLevelCode")
      });
      this.IsshowDutyManage = res.data;
    },
    // 4.首页-今日工作
    async getPlanWeekCount() {
      let res = await this.$req(window.api.getPlanWeekCount, {
        isCurrentDay: "02"
      });
      this.IsgetPlanWeekCount = res.data.objectList
    },
    // 5.首页-训练进度
    async trainScheduleContrast() {
      let res = await this.$req(window.api.trainScheduleContrast, {
        type:"1"
      });
      this.IstrainScheduleContrast = res.data[0]
    }
  }
};
</script>

<style scoped>
.lay-serve {
  /* background: url("../../../../static/images/019.png") no-repeat center; */
  overflow: scroll;
  width: 47vw;
  height: 22vw;
  margin-top: 10vw;
}
.lay-serve::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.lay-six table > tr > th {
  font-size: 0.1rem;
}

.lay-six table > tr > td {
  font-size: 0.1rem;
}

.lay-six table {
  width: 100%;
  text-align: center;
  color: #fff;
  height: 100%;
  border: 1px solid #5a8be3;
}

.lay-six {
  overflow: scroll;
  width: 47vw;
  padding-right: 1vw;
  margin-top: 10vw;
  height: 20vw;
}

.lay-six::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.lay-five .content table > tr > th {
  padding: 1vw;
  text-align: center;
}

.lay-five .content table > tr > td:last-child {
  padding: 1vw;
  text-align: center;
}

.lay-five .content table {
  width: 100%;
  height: 100%;
  border: 1px solid #4472da;
  color: #d7dae5;
  font-size: 0.1rem;
}

.lay-five .content {
  width: 100%;
  height: 38vw;
  overflow: scroll;
  margin-top: 2vw;
}

.lay-five .content::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.lay-five .header .header-change {
  font-size: 0.15rem;
  color: #fff;
  border-bottom: 1px solid #fff;
}
.lay-five .header span {
  font-size: 0.15rem;
  margin-left: 3vw;
  color: #546b9f;
}
.lay-five .header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1vw;
}
.lay-five {
  padding-left: 2vw;
  padding-right: 2vw;
}

.lay-four > section.bottom > div.box > div:nth-child(2) {
  font-size: 1.2vw;
  color: #fff;
  margin-top: 1vw;
  text-align: center;
}

.lay-four > section.bottom > div.box > div:nth-child(1) {
  border-radius: 50%;
  width: 7vw;
  height: 7vw;
  line-height: 7vw;
  background-color: #235293;
  font-size: 2vw;
  text-align: center;
  color: #fdd100;
  font-weight: 800;
}

.lay-four > section.bottom > div.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lay-four > section.bottom {
  display: flex;
  justify-content: space-evenly;
  margin-top: 0.5vw;
}

.lay-four > section.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 3.5vw;
}

.lay-four > section.top > div {
  width: 40vw;
  height: 12vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lay-four {
  width: 46.5vw;
  margin-top: 5vw;
}
.lay-three {
  width: 46vw;
  margin-top: 9vw;
  padding-left: 1vw;
  padding-right: 1vw;
}
.lay-three p {
  margin: 0;
}
.three-top {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-bottom: 1vw;
  border-bottom: 1px solid #4778dd;
}
.three-bottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.three-top > div,
.three-bottom > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.three-top > div > pre,
.three-bottom > div > pre {
  width: 100%;
  margin: 0;
  overflow: hidden;
  font-size: 1.8vw;
  color: #96989b;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.three-top > div > pre > span,
.three-bottom > div > pre > span {
  color: #fff;
}

.three-top > div > pre > span:empty::before,
.three-bottom > div > pre > span:empty::before {
  content: "XXX";
}

.three-img {
  border: 1px solid rgb(61, 61, 224);
  display: block;
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  margin-bottom: 0.5vw;
}

.lay-two {
  margin-top: 6vw;
  height: 28vw;
  width: 44vw;
  overflow: scroll;
}

.lay-two::-webkit-scrollbar {
  width: 0vw;
  height: 0vw;
}

.two-li {
  color: #fff;
  width: 100%;
  font-size: 0.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 5.5vw;
  line-height: 5.5vw;
  border-bottom: 1px solid #235b91;
}

.lay-one {
  margin-top: 6vw;
  display: flex;
  height: 30vw;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 46vw;
}
.one-item {
  width: 13vw;
}
.one-item img {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.one-item-p {
  margin-top: 1vw;
  overflow: hidden;
  color: #eee;
  font-size: 0.1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lay-Box > .box > section {
  display: flex;
  justify-content: space-between;
  padding-left: 2vw;
  padding-right: 2vw;
}

.lay-Box > .box {
  margin-top: 4vw;
  width: 100%;
}

.lay-Box {
  width: 100%;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}
.lay-tab {
  height: 20px;
  line-height: 20px;
  margin-top: -60px;
}
.tab li {
  float: left;
  margin: 0 32px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
</style>

