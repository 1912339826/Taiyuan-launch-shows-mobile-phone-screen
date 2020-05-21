<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/05.png" alt />
    <Tab></Tab>
    <section class="box">
      <section>
        <div class="gaine one">
          <nav class="Istitle">
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">通知</div>
            <div id="mores" @click="more"> 更多 </div>
          </nav>
          <div class="Isborder">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="content" ref="box">
            <div ref="contentOne">
              <div
                class="list"
                :title="item.mainTitle"
                v-for="(item, index) in IsgetInformAndNoticeList"
                :key="index"
              >
                <div class="list-title">{{item.rownum}}. {{item.mainTitle}} - {{item.startTime}}</div>
                <section>{{item.article}}</section>
              </div>
            </div>
            <div ref="contentTwo"></div>
          </div>
        </div>
      </section>
      <section>
        <div class="gaine two-left">
          <nav class="Istitle">
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">值班安排</div>
          </nav>
          <div class="Isborder">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="content">
            <div class="top">
              <div class="top-child">
                <div class="imgs">
                  <img :src="headPicPath" alt />
                </div>
                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['dutyHeadName']">
                  <span>值班领导:</span><span>{{IsshowDutyManage['dutyHeadName']}}</span> 
                </pre>
                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['headTelphoneNum']">
                  <span>联系电话:</span><span>{{IsshowDutyManage['headTelphoneNum']}}</span> 
                </pre>
              </div>
              <div class="top-child">
                <div class="imgs">
                  <img :src="personnelPicPath" alt />
                </div>
                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['dutyPersonnelName']">
                  <span>值 班 员:</span><span>{{IsshowDutyManage['dutyPersonnelName']}}</span> 
                </pre>
                <pre
                  style=" margin-bottom: 0.5vw;"
                  :title="IsshowDutyManage['personnelTelphoneNum']"
                >
                  <span>联系电话:</span><span>{{IsshowDutyManage['personnelTelphoneNum']}}</span> 
                </pre>
              </div>
            </div>
            <div class="bottom">
              <div class="bottom-child">
                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['orgName']">
                  <span>值班分队:</span><span>{{IsshowDutyManage['orgName']}}</span> 
                </pre>
                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['carTypeNum']">
                  <span>值班车辆:</span><span>{{IsshowDutyManage['carTypeNum']}}</span> 
                </pre>
                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['dutyPhone']">
                  <span>联系电话:</span><span>{{IsshowDutyManage['dutyPhone']}}</span>
                </pre>
              </div>
              <div class="bottom-child">
                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['driverTelephoneNum']">
                  <span>联系电话:</span><span>{{IsshowDutyManage['driverTelephoneNum']}}</span> 
                </pre>
                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['driver']">
                  <span>值班司机:</span><span>{{IsshowDutyManage['driver']}}</span> 
                </pre>

                <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['driver']">
                  <span style="opacity: 0;">占位</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div class="gaine two-right">
          <nav class="Istitle">
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">今日工作安排</div>
          </nav>
          <div class="Isborder">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="content">
            <table border="1">
              <tr style="height:5vw;">
                <th style="width:20%">时段</th>
                <th style="width:40%">课目</th>
                <th style="width:40%">训练内容</th>
              </tr>

              <tr v-for="(item,index) in IsgetPlanWeekCount" :key="index">
                <th>{{item.timeName}}</th>
                <td style="text-align: left;text-indent: 0.2rem;">
                  <div v-for="(items,indexs) in item.content" :key="indexs">{{items}}</div>
                </td>
                <td
                  style="text-align: left;text-indent: 0.2rem;"
                  :title="item.trainContent"
                  @click="showModal(item.trainContent,item.timeName)"
                >{{item.trainContentContent}}</td>
                <!-- 11 -->
              </tr>
            </table>
          </div>
        </div>
      </section>
      <section>
        <div class="gaine three">
          <nav class="Istitle">
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">参训时长</div>
            <div class="tab-box">
              <div
                v-for="(item, index) in timeTabData"
                :key="index"
                :id="timeTabHeaderType==item.type?'active':''"
                @click="timeTabButton(item.type)"
              >{{item.name}}</div>
            </div>
          </nav>
          <div class="Isborder">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="content" style="height:60vw;">
            <div style="width: 100%;height: 100%;">
              <!-- <LineChart :name="'小时'" :series="series" ref="IsLineChart" :bottomTitle="bottomTitle"></LineChart> -->
              <ProgressBar :data2="IstrainScheduleContrast" />
            </div>
          </div>
        </div>
      </section>
    </section>

    <a-modal
      :title="concreteTitle"
      v-model="visible"
      @ok="handleOk"
      :cancelText="'关闭'"
      :okText="'知道了'"
      :width="'90%'"
    >
      <div style="height:50vw; overflow: scroll;">
        <table border="1" style="border:1px solid #4a7bdc;width:100%;text-align: center;">
          <tr>
            <th style="font-size: 0.15rem;">对应具体训练内容</th>
          </tr>
          <tr v-for="(item,index) in concrete" :key="index" style="height:2vw;font-size: 0.12rem;">
            <td>{{item}}</td>
          </tr>
        </table>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Meter from "../../../components/taiyuanfashe/Meter";
import LineChart from "../../../components/taiyuanfashe/LineChart";
import ProgressBar from "../../../components/taiyuanfashe/ProgressBar";
export default {
  name: "Index",
  components: {
    Header,
    Tab,
    Meter,
    LineChart,
    ProgressBar
  },
  data: function() {
    return {
      concreteTitle: "",
      concrete: [],
      visible: false,
      timeTabData: [
        { name: "本月", type: "month" },
        { name: "本季", type: "quarter" },
        { name: "本年", type: "year" }
      ],
      timeTabHeaderType: "month",
      headerTime: " 周 一",
      IsgetInformAndNoticeList: [],
      IsshowDutyManage: {},
      IsgetPlanWeekCount: [],
      IstrainScheduleContrast: [],
      // hearImg: localStorage.getItem("BASE_URLA"),
      // 战备值班的图片
      headPicPath: "",
      personnelPicPath: "",
      tab: [
        { name: "本月", id: "month" },
        { name: "本季", id: "quarter" },
        { name: "本年", id: "year" }
      ],
      changeId: "month"
    };
  },
  created() {
    this.getInformAndNoticeList();
    this.showDutyManage();
    this.getPlanWeekCount();
    this.trainScheduleContrast("month");
    this.change("month");
  },
  mounted() {
    // this.roll(50);
    this.$refs
  },
  destroyed() {},
  methods: {
    // 点击通知的更多
    more(){
      console.log('这是通知的更多按钮')
    },
    showModal(content, timeName) {
      this.concrete = [];
      this.concreteTitle = "";
      this.concrete = content.split(",");
      this.concreteTitle = `${timeName}训练内容`;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    timeTabButton(type) {
      this.timeTabHeaderType = type;
      this.trainScheduleContrast(type);
    },
    // 1.训练进度
    async trainScheduleContrast(type) {
      let res = await this.$req(window.api.trainScheduleContrast, {
        type: type
      });
      this.IstrainScheduleContrast = res.data[0];
    },
    headerTimeBtn(item) {
      this.headerTime = item;
    },
    roll(t) {
      var contentOne = this.$refs.contentOne;
      var contentTwo = this.$refs.contentTwo;
      var box = this.$refs.box;
      contentTwo.innerHTML = contentOne.innerHTML;
      box.scrollTop = 0;
      // var timer = setInterval(this.rollStart, t);
      // console.log(this.$refs)
      // box.onmouseover = () => {
      //   clearInterval(timer);
      // };
      // box.onmouseout = () => {
      //   timer = setInterval(this.rollStart, t);
      // };
    },

    rollStart() {
      var box = this.$refs.box;
      var contentOne = this.$refs.contentOne;
      if (box.scrollTop >= contentOne.scrollHeight) {
        box.scrollTop = 0;
      } else {
        box.scrollTop++;
      }
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
      // this.headPicPath = `${this.hearImg}${this.IsshowDutyManage.headPicPath}`;
      // this.personnelPicPath = `${this.hearImg}${this.IsshowDutyManage.personnelPicPath}`;
      this.headPicPath = `${window.BASE_URLA}${this.IsshowDutyManage.headPicPath}`;
      this.personnelPicPath = `${window.BASE_URLA}${this.IsshowDutyManage.personnelPicPath}`;
    },
    // 4.首页-今日工作
    async getPlanWeekCount() {
      this.IsgetPlanWeekCount = [];
      let res = await this.$req(window.api.getPlanWeekCount, {
        isCurrentDay: "02"
      });
      for (let index = 0; index < res.data.objectList.length; index++) {
        const element = res.data.objectList[index];
        let IstrainContentContent = "";
        if (element.trainContent.length > 9) {
          IstrainContentContent = `${element.trainContent.slice(0, 9)}...`;
        } else {
          IstrainContentContent = element.trainContent;
        }
        this.IsgetPlanWeekCount.push({
          timeName: element.timeName,
          content: element.content.split(","),
          trainContent: element.trainContent,
          trainContentContent: IstrainContentContent
        });
      }
    },
    change(id) {
      this.changeId = id;
      this.trainScheduleContrast(id);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.box > section > .three > .content {
  height: 50vw;
}

.tab-box {
  width: 80%;
  display: flex;
  justify-content: flex-end;
  font-size: 0.15rem;
}

.tab-box > div {
  margin-left: 3vw;
  color: #929292;
}

.tab-box > div:hover {
  cursor: pointer;
}

#active {
  color: #fff;
  text-decoration: underline;
}

.three {
  width: 100%;
  height: 70vw;
  overflow: hidden;
}

.two-right,
.two-left {
  height: 40vw;
  width: 47vw;
}

.two-right > .content > table {
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 0.1rem;
  text-align: center;
  border: 1px solid #4a7bdc;
}
/* .......................................... */
.two-left > .content > .bottom {
  margin-top: 1vw;
  display: flex;
  justify-content: space-around;
}

.two-left > .content > .top > .top-child img {
  width: 6.5vw;
  height: 6.5vw;
  border-radius: 50%;
}

.two-left > .content > .top > .top-child > .imgs {
  width: 8vw;
  height: 8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #194c98;
  border-radius: 50%;
  border: 2px solid #3f76e6;
  margin-bottom: 1.5vw;
}

.two-left > .content > .top > .top-child span:nth-child(1),
.two-left > .content > .bottom > .bottom-child span:nth-child(1) {
  color: #8f98b1;
  font-size: 0.13rem;
}

.two-left > .content > .top > .top-child pre,
.two-left > .content > .bottom > .bottom-child pre {
  color: #fff;
  font-size: 0.13rem;
  width: 20vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.two-left > .content > .top > .top-child,
.two-left > .content > .bottom > .bottom-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.two-left > .content > .top {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #4778dd;
  padding-bottom: 2vw;
  padding-top: 1.8vw;
  margin-bottom: 3vw;
}

.two-left > .content {
  width: 100%;
  padding-left: 1vw;
  padding-right: 1vw;
}

.box .one>.Istitle>#mores{
  color: rgb(77, 134, 240);
  font-size: 0.15rem;
  margin-left: 78vw;
  display: none;
}

.one > .content .list > .list-title {
  color: #fff;
  font-size: 0.13rem;
  font-weight: 900;
  line-height: 4vw;
}

.one > .content .list > section {
  color: #fff;
  line-height: 3vw;
  font-size: 0.12rem;
  text-indent: 0.24rem;
}

.one > .content .list {
  border-bottom: 1px solid #245a8e;
  margin-top: 1vw;
}

.one > .content {
  padding-left: 2vw;
  animation-delay: 10s;
}

.one {
  width: 100%;
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
  margin-top: 5vw;
}

.box > section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vw;
}
</style>

