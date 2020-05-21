<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/05.png" alt />
    <Tab></Tab>
    <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>
    <section class="box">
      <section>
        <div class="gaine one">
          <nav class="Istitle">
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">人员在位情况</div>
          </nav>
          <div class="Isborder">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="content">
            <div class="one-left">
              <div class="top">
                <div>
                  <Meter :num="IsgetTodayReginNum[1]" :idName="'top'" :max="100" ref="MeterTop"></Meter>
                </div>
                <div style="color:#fff;text-align: center;font-size:0.1rem;">人员在位率</div>
              </div>
              <div class="bottom">
                <div>
                  <Meter
                    :num="IsgetTodayReginNum[0]"
                    :idName="'buttom'"
                    :unit="'人'"
                    :max="percent"
                    ref="MeterBottom"
                  ></Meter>
                </div>
                <div style="color:#fff;text-align: center;font-size:0.1rem;">在位人员</div>
              </div>
            </div>
            <div class="one-right">
              <div style="width:100%;height:100%">
                <Pair
                  ref="Pair"
                  :percent="percentPair"
                  :quantity="quantityPair"
                  :xAxis="xAxisPair"
                  :max="maxPair"
                  v-if="condition"
                ></Pair>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="gaine two">
          <nav class="Istitle">
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">车辆在位情况</div>
          </nav>
          <div class="Isborder">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="content">
            <div class="left">
              <div>
                <span class="top" style="color:red;">{{IsgetPublicCarChangeRecord.outCar}}</span>
                <span class="bottom" style="color:red;">不在位数(辆)</span>
              </div>
              <div style="color:#fff;">
                <span class="top" style="color:#fff;">{{IsgetPublicCarChangeRecord.inCar}}</span>
                <span class="bottom">在位数(辆)</span>
              </div>
            </div>

            <div class="right">
              <section>
                <div class="tool">
                  <div v-for="item in unReignListMap" :key="item.recordSort">
                    <img src="../../../../static/images/075-no.png" alt />
                    <p style="color:red;">{{item.carNumber}}</p>
                  </div>
                </div>
                <div class="tool">
                  <div v-for="item in reignListMap" :key="item.recordSort">
                    <img src="../../../../static/images/075.png" alt />
                    <p style="color:#fff;">{{item.carNumber}}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="gaine three">
          <nav class="Istitle">
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">今日访客情况</div>
          </nav>
          <div class="Isborder">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="content">
            <div>
              <div class="top">{{IsgetVisitRecord.todayVisit}}</div>
              <div class="bottom">今日访客(人)</div>
            </div>
            <div>
              <div class="top">{{IsgetVisitRecord.outVisit}}</div>
              <div class="bottom">进入次数(人)</div>
            </div>
            <div>
              <div class="top">{{IsgetVisitRecord.inVisit}}</div>
              <div class="bottom">离开次数(人)</div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="gaine four">
          <nav class="Istitle">
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">临时来队住房</div>
          </nav>
          <div class="Isborder">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="content">
            <div>
              <Pie :idName="'Pie'" :roseType="false" :datas="IsgetTempHomeInfo" ref="Pie"></Pie>
            </div>
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
import Gohome from "../../../components/taiyuanfashe/Gohome";
import Pie from "../../../components/taiyuanfashe/Pie";
import Pair from "../../../components/taiyuanfashe/Pair";
export default {
  name: "Management",
  components: {
    Header,
    Tab,
    Meter,
    LineChart,
    Gohome,
    Pie,
    Pair
  },
  data: function() {
    return {
      condition: false,
      percentPair: [22, 100, 100, 100, 100, 100, 100, 100],
      quantityPair: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
      maxPair: [0],
      xAxisPair: [
        "第25基地通讯团",
        "去年同期水量",
        "滚动目标值水量",
        "全年目标值水量",
        "当年完成金额",
        "去年同期金额",
        "滚动目标金额",
        "全年目标值"
      ],
      IsgetTodayReginNum: [4, 10],
      percent: 0.5,
      // 在位车辆列表
      reignListMap: [
        { carNumber: "1", recordSort: "1" },
        { carNumber: "1", recordSort: "1" },
        { carNumber: "1", recordSort: "1" },
        { carNumber: "1", recordSort: "1" },
        { carNumber: "1", recordSort: "1" },
        { carNumber: "1", recordSort: "1" }
      ],
      // 不在位车辆列表
      unReignListMap: [],
      IsgetPublicCarChangeRecord: { inCar: 0, outCar: 0 },
      IsgetTempHomeInfo: [
        { value: 335, name: "单位1" },
        { value: 335, name: "单位2" }
      ],
      IsgetVisitRecord: { todayVisit: 1, outVisit: 0, inVisit: 0 }
    };
  },
  filter: {},
  created() {
    this.perReignCount();
    // console.log(this.$refs.Pair)
    this.getTodayReginNum();
    // 3.日常管理-车辆在位/不在位列表
    this.getCarList();
    // 4.日常管理-车辆在位数/外出数
    this.getPublicCarChangeRecord();
    this.getTempHomeInfo();
    this.getVisitRecord();
  },
  mounted() {
    // console.log(this.$refs.Pair)
    this.perReignCount();
    setInterval(() => {
      // 3.日常管理-车辆在位/不在位列表
      this.getCarList();
      // 4.日常管理-车辆在位数/外出数
      this.getPublicCarChangeRecord();
    },1000*60);
  },
  destroyed() {},
  methods: {
    //  1.日常管理-人员在位率柱状图(最上面,右边的图)
    async perReignCount() {
      let res = await this.$req(window.api.perReignCount, {
        orgId: localStorage.getItem("loginOrgId"),
        orgLevelCode: localStorage.getItem("orgLevelCode")
      });

      this.percentPair = res.data.data[1];
      this.quantityPair = res.data.data[0];
      this.xAxisPair = res.data.data[2];
      let quantity = res.data.data[0];
      // 取数组最大值
      this.maxPair = Math.max(quantity);
      this.condition = true;
      let Ifarr = res.data.data.constructor;
      if (!res.data) {
        if (!res.data.data) {
          if (Ifarr != Array) {
            // alert('1')
            console.log("人员在位率柱状图!!!!!!!!!!");
          }
        }
      }
    },
    // 2.日常管理-人员在位数/在位率
    async getTodayReginNum() {
      let IsgetTodayReginNum = [];
      let res = await this.$req(window.api.getTodayReginNum, {
        orgId: localStorage.getItem("loginOrgId"),
        orgLevelCode: localStorage.getItem("orgLevelCode")
      });
      IsgetTodayReginNum.push(
        Number(res.data.data.split(" / ")[0]),
        Number(res.data.data.split(" / ")[1].split("%")[0])
      );
      this.IsgetTodayReginNum = IsgetTodayReginNum;
      let num = this.IsgetTodayReginNum[1] / 100;
      this.percent = this.IsgetTodayReginNum[0] / num;
      this.$refs.MeterTop.visitor();
      this.$refs.MeterBottom.visitor();
    },
    // 3.日常管理-车辆在位/不在位列表
    async getCarList() {
      this.reignListMap = [];
      this.unReignListMap = [];
      let res = await this.$req(window.api.getCarList, {
        orgId: localStorage.getItem("loginOrgId"),
        orgLevelCode: localStorage.getItem("orgLevelCode")
      });
      this.reignListMap = res.data.reignListMap;
      this.unReignListMap = res.data.unReignListMap;
    },
    // 4.日常管理-车辆在位数/外出数
    async getPublicCarChangeRecord() {
      let res = await this.$req(window.api.getPublicCarChangeRecord, {
        orgId: localStorage.getItem("loginOrgId"),
        orgLevelCode: localStorage.getItem("orgLevelCode")
      });
      this.IsgetPublicCarChangeRecord.inCar = res.data.data[0].inCar;
      this.IsgetPublicCarChangeRecord.outCar = res.data.data[0].outCar;
    },
    // 5.日常管理-家属房入住情况
    async getTempHomeInfo() {
      this.IsgetTempHomeInfo = [];
      let res = await this.$req(window.api.getTempHomeInfo, {});
      this.IsgetTempHomeInfo.push(
        { value: res.data.data.noEmptyHouse, name: "已住户数" },
        { value: res.data.data.emptyHouse, name: "空房户数" }
      );
      this.$refs.Pie.visitor();
    },
    // 6.日常管理-今日访客情况
    async getVisitRecord() {
      this.IsgetTempHomeInfo = [];
      let res = await this.$req(window.api.getVisitRecord, {});
      this.IsgetVisitRecord = res.data.data;
    }
  }
};
</script>

<style scoped>
.box > section > .four > .content > div {
  width: 80%;
  height: 80%;
  /* margin-top: 3vw; */
  /* color: red; */
}
.box > section > .four > .content {
  display: flex;
  overflow: hidden;
  justify-content: center;
  /* align-items: center; */
  height: 87%;
}

.box > section > .four {
  height: 50vw;
}

.box > section > .three > .content .bottom {
  font-size: 0.1rem;
  font-weight: 300;
  color: #fff;
}

.box > section > .three > .content .top {
  color: #fdd100;
  font-size: 0.4rem;
  font-weight: 900;
}

.box > section > .three > .content > div {
  height: 100%;
  /* margin-top: 2vw; */
}

.box > section > .three > .content {
  width: 100%;
  height: 60%;
  margin-top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  text-align: center;
  overflow: hidden;
}

.box > section > .three {
  overflow: hidden;
  margin-top: 4vw;
  width: 100%;
  height: 18vw;
  padding-right: 2vw;
}

.box > section > .two > .content > .right > section > .tool > div > p {
  font-size: 0.08rem;
  margin-top: 0.3vw;
}
.box > section > .two > .content > .right > section > .tool > div > img {
  width: 5.5vw;
  height: 5.5vw;
}

.box > section > .two > .content > .right > section > .tool > div {
  margin-top: 1vw;
  text-align: center;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
}

.box > section > .two > .content > .right > section > .tool {
  display: flex;
  flex-wrap: wrap;
}

.box > section > .two > .content > .right > section {
  padding-top: 0.5vw;
}

.box > section > .two > .content > .right {
  height: 100%;
  width: 78%;
  display: flex;
  overflow: scroll;
  padding-left: 1vw;
}

.box > section > .two > .content > .left > div > .bottom {
  font-size: 0.1rem;
  font-weight: 300;
  color: #fff;
}

.box > section > .two > .content > .left > div > .top {
  color: #fdd100;
  font-size: 0.4rem;
  font-weight: 900;
}

.box > section > .two > .content > .left > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50%;
  width: 100%;
}

.box > section > .two > .content > .left {
  border-right: 1px solid #5588e2;
  width: 22%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box > section > .two > .content {
  display: flex;
  border-top: 1px solid #5588e2;
  height: 38vw;
}

.box > section > .one > .content > .one-right {
  width: 78%;
  overflow: scroll;
}

.box > section > .one > .content > .one-left > div > div:nth-child(1) {
  width: 12vw;
  height: 12vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vw;
}

.box > section > .one > .content > .one-left > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box > section > .one > .content > .one-left {
  width: 22%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: scroll;
  border-right: 1px solid #3a61ce;
}

.box > section > .one > .content {
  display: flex;
  border-top: 1px solid #3a61ce;
}

.lay-Box > section {
  height: 94vw;
}

/* 这是一个带有样式的盒子 */
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
.gaine {
  /* height: 40vw; */
  /* width: 47vw; */
  background-color: #2d579b;
  border-radius: 1vw;
  border: 2px solid #445ee7;
}

.gaine > .content {
  overflow: scroll;
  width: 100%;
  height: 32vw;
  margin-top: 0.5vw;
}

.gaine > .Istitle {
  padding-top: 1vw;
  padding-left: 2vw;
  display: flex;
  align-content: center;
}

.gaine > .Istitle > .text {
  margin-left: 0.5vw;
  color: #fff;
  font-size: 0.15rem;
}

.gaine > .Istitle > img {
  width: 3vw;
  height: 3vw;
}

.gaine > .Isborder {
  width: 20vw;
  height: 3px;
  margin-top: 1vw;
}

.gaine > .Isborder > div {
  width: 100%;
  height: 1px;
}

.gaine > .Isborder > div:nth-child(1),
.gaine > .Isborder > div:nth-child(3) {
  background-image: linear-gradient(to right, #1a45967c, #20487f, #1a45967c);
}

.gaine > .Isborder > div:nth-child(2) {
  background-image: linear-gradient(to right, #1a45967c, #27a2bd, #1a45967c);
}
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}

.box {
  padding-left: 2vw;
  padding-right: 2vw;
  margin-top: 3vw;
}

.box > section {
  margin-bottom: 1.8vw;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>