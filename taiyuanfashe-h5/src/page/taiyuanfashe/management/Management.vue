<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/05.png" alt />
    <Tab></Tab>
    <div
      style="
        position: fixed;
        z-index: 9999;
        bottom: 3vw;
        left: 3vw;
        border-radius: 50%;
      "
    >
      <Gohome />
    </div>
    <section class="box">
      <section>
        <div class="gaine one">
          <nav class="Istitle">
            <div class="title">
              <img src="../../../../static/images/Index_Box_Icon.png" alt />
              <div class="text">人员在位情况</div>
            </div>
            <div class="Isborder"></div>
          </nav>

          <div class="content">
            <div class="one-left">
              <div class="top">
                <div>
                  <Meter
                    :num="IsgetTodayReginNum[1]"
                    :idName="'top'"
                    :max="100"
                    ref="MeterTop"
                  ></Meter>
                </div>
                <div style="color: #fff; text-align: center; font-size: 0.1rem">
                  人员在位率
                </div>
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
                <div style="color: #fff; text-align: center; font-size: 0.1rem">
                  在位人员
                </div>
              </div>
            </div>
            <div class="one-right">
              <div style="width: 100%; height: 100%">
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
            <div class="title">
              <img src="../../../../static/images/Index_Box_Icon.png" alt />
              <div class="text">车辆在位情况</div>
            </div>
            <div class="Isborder"></div>
          </nav>

          <div class="content">
            <div class="left">
              <div>
                <span class="top" style="color: red">{{
                  IsgetPublicCarChangeRecord.outCar
                }}</span>
                <span class="bottom" style="color: red">不在位数(辆)</span>
              </div>
              <div style="color: #fff">
                <span class="top" style="color: #fff">{{
                  IsgetPublicCarChangeRecord.inCar
                }}</span>
                <span class="bottom">在位数(辆)</span>
              </div>
            </div>

            <div class="right">
              <section>
                <div class="tool">
                  <div v-for="item in unReignListMap" :key="item.recordSort">
                    <img src="../../../../static/images/075-no.png" alt />
                    <p style="color: red">{{ item.carNumber }}</p>
                  </div>
                </div>
                <div class="tool">
                  <div v-for="item in reignListMap" :key="item.recordSort">
                    <img src="../../../../static/images/075.png" alt />
                    <p style="color: #fff">{{ item.carNumber }}</p>
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
            <div class="title">
              <img src="../../../../static/images/Index_Box_Icon.png" alt />
              <div class="text">今日访客情况</div>
            </div>
            <div class="Isborder"></div>
          </nav>

          <div class="content">
            <div>
              <div class="top">{{ IsgetVisitRecord.todayVisit }}</div>
              <div class="bottom">今日访客(人)</div>
            </div>
            <div>
              <div class="top">{{ IsgetVisitRecord.outVisit }}</div>
              <div class="bottom">进入次数(人)</div>
            </div>
            <div>
              <div class="top">{{ IsgetVisitRecord.inVisit }}</div>
              <div class="bottom">离开次数(人)</div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="gaine four">
          <nav class="Istitle">
            <div class="title">
              <img src="../../../../static/images/Index_Box_Icon.png" alt />
              <div class="text">临时来队住房</div>
            </div>
            <div class="Isborder"></div>
          </nav>

          <div class="content">
            <div>
              <Pie
                :idName="'Pie'"
                :roseType="false"
                :datas="IsgetTempHomeInfo"
                ref="Pie"
              ></Pie>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="gaine five">
          <nav class="Istitle">
            <div class="title">
              <img src="../../../../static/images/Index_Box_Icon.png" alt />
              <div class="text">当日卫生值班</div>
            </div>
            <div class="Isborder"></div>
          </nav>

          <div class="content">
            <div>
              <div class="top">
                <div class="top-child">
                  <div class="imgs">
                    <img
                      :src="BASE_URLA + listTodayDutySituationObj.leaderPicPath"
                      alt
                    />
                  </div>
                  <pre
                    style="margin-bottom: 1.5vw"
                    :title="listTodayDutySituationObj.leaderName"
                  >
                  <span style="color:#ffffff">姓名:</span><span>{{listTodayDutySituationObj.leaderName}}</span> 
                </pre>
                  <pre
                    style="margin-bottom: 1.5vw"
                    :title="listTodayDutySituationObj.leaderTelphoneNum"
                  >
                  <span style="color:#ffffff">联系方式:</span><span>{{listTodayDutySituationObj.leaderTelphoneNum}}</span> 
                </pre>
                </div>
                <div class="top-child">
                  <div class="imgs">
                    <img
                      :src="
                        BASE_URLA + listTodayDutySituationObj.personnelPicPath
                      "
                      alt
                    />
                  </div>
                  <pre
                    style="margin-bottom: 1.5vw"
                    :title="listTodayDutySituationObj.dutyNames"
                  >
                  <span style="color:#ffffff">姓名:</span><span>{{listTodayDutySituationObj.dutyNames}}</span> 
                </pre>
                  <pre
                    style="margin-bottom: 1.5vw"
                    :title="listTodayDutySituationObj.personnelTelphoneNum"
                  >
                  <span style="color:#ffffff">联系方式:</span><span>{{listTodayDutySituationObj.personnelTelphoneNum}}</span> 
                </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="gaine six">
          <nav class="Istitle">
            <div class="title">
              <img src="../../../../static/images/Index_Box_Icon.png" alt />
              <div class="text">年度外诊态势</div>
            </div>

            <div class="Isborder">
              <div class="date">
                <div class="son form">
                  <img
                    src="../../../../static/images/circle_left_03.png"
                    alt
                    @click="listDiagnosisManageFormtMinus"
                  />
                  <div>
                    {{ listDiagnosisManageForm.year }}年
                    {{ listDiagnosisManageForm.month }}月
                  </div>
                  <img
                    src="../../../../static/images/circle_right_03.png"
                    alt
                    @click="listDiagnosisManageFormtAdd"
                  />
                </div>
                <div
                  style="
                    text-align: center;
                    color: #ffffff;
                    margin-left: 1vw;
                    margin-right: 1vw;
                    display: flex;
                    align-items: center;
                  "
                >
                  ————
                </div>
                <div class="son to">
                  <img
                    src="../../../../static/images/circle_left_03.png"
                    alt
                    @click="listDiagnosisManageToMinus"
                  />
                  <div>
                    {{ listDiagnosisManageTo.year }}年
                    {{ listDiagnosisManageTo.month }}月
                  </div>
                  <img
                    src="../../../../static/images/circle_right_03.png"
                    alt
                    @click="listDiagnosisManageToAdd"
                  />
                </div>
              </div>

              <a-button
                type="primary"
                size="small"
                @click="listDiagnosisManage"
              >
                查询
              </a-button>
            </div>
          </nav>

          <div class="content">
            <div></div>
          </div>
        </div>
      </section>
      <section>
        <div class="gaine seven">
          <nav class="Istitle">
            <div class="title">
              <img src="../../../../static/images/Index_Box_Icon.png" alt />
              <div class="text">年度疗养态势</div>
            </div>

            <div class="Isborder">
              <div class="date">
                <div class="son form">
                  <img
                    src="../../../../static/images/circle_left_03.png"
                    alt
                    @click="listLsrecuperateManageFormMinus"
                  />
                  <div>
                    {{ listLsrecuperateManageForm.year }}年
                    {{ listLsrecuperateManageForm.month }}月
                  </div>
                  <img
                    src="../../../../static/images/circle_right_03.png"
                    alt
                    @click="listLsrecuperateManageFormAdd"
                  />
                </div>
                <div
                  style="
                    text-align: center;
                    color: #ffffff;
                    margin-left: 1vw;
                    margin-right: 1vw;
                    display: flex;
                    align-items: center;
                  "
                >
                  ————
                </div>
                <div class="son to">
                  <img
                    src="../../../../static/images/circle_left_03.png"
                    alt
                    @click="listLsrecuperateManageToMinus"
                  />
                  <div>
                    {{ listLsrecuperateManageTo.year }}年
                    {{ listLsrecuperateManageTo.month }}月
                  </div>
                  <img
                    src="../../../../static/images/circle_right_03.png"
                    alt
                    @click="listLsrecuperateManageToAdd"
                  />
                </div>
              </div>

              <a-button
                type="primary"
                size="small"
                @click="listLsrecuperateManage"
              >
                查询
              </a-button>
            </div>
          </nav>

          <div class="content">
            <div></div>
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
    Pair,
  },
  data: function () {
    return {
      BASE_URLA: window.BASE_URLA, //用于拼接img
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
        "全年目标值",
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
        { carNumber: "1", recordSort: "1" },
      ],
      // 不在位车辆列表
      unReignListMap: [],
      IsgetPublicCarChangeRecord: { inCar: 0, outCar: 0 },
      IsgetTempHomeInfo: [
        { value: 335, name: "单位1" },
        { value: 335, name: "单位2" },
      ],
      IsgetVisitRecord: { todayVisit: 0, outVisit: 0, inVisit: 0 },
      listTodayDutySituationObj: {
        leaderPicPath: "",
        leaderName: "",
        leaderTelphoneNum: "",
        personnelPicPath: "",
        dutyNames: "",
        personnelTelphoneNum: "",
      },
      listDiagnosisManageList: [],
      listDiagnosisManageForm: { year: "2021", month: "01" },
      listDiagnosisManageTo: { year: "2021", month: "01" },
      listLsrecuperateManageList: [],
      listLsrecuperateManageForm: { year: "2021", month: "01" },
      listLsrecuperateManageTo: { year: "2021", month: "01" },
    };
  },
  filter: {},
  created() {
    if (new Date().getMonth() + 1 < 10) {
      this.listDiagnosisManageForm.month = `0${new Date().getMonth() + 1}`;
      this.listDiagnosisManageTo.month = `0${new Date().getMonth() + 1}`;
      this.listLsrecuperateManageForm.month = `0${new Date().getMonth() + 1}`;
      this.listLsrecuperateManageTo.month = `0${new Date().getMonth() + 1}`;
    } else {
      this.listDiagnosisManageForm.month = `${new Date().getMonth() + 1}`;
      this.listDiagnosisManageTo.month = `${new Date().getMonth() + 1}`;
      this.listLsrecuperateManageForm.month = `${new Date().getMonth() + 1}`;
      this.listLsrecuperateManageTo.month = `${new Date().getMonth() + 1}`;
    }
    this.listDiagnosisManageForm.year = new Date().getFullYear();
    this.listDiagnosisManageTo.year = new Date().getFullYear();
    this.listLsrecuperateManageForm.year = new Date().getFullYear();
    this.listLsrecuperateManageTo.year = new Date().getFullYear();
    this.listDiagnosisManageFormtMinus();
    this.listLsrecuperateManageFormMinus();
    this.perReignCount();
    // console.log(this.$refs.Pair)
    this.getTodayReginNum();
    // 3.日常管理-车辆在位/不在位列表
    this.getCarList();
    // 4.日常管理-车辆在位数/外出数
    this.getPublicCarChangeRecord();
    this.getTempHomeInfo();
    this.getVisitRecord();
    this.listTodayDutySituation(localStorage.getItem("loginOrgId"));
    this.listDiagnosisManage();
    this.listLsrecuperateManage();
  },
  mounted() {
    let clientWidth =
      document.getElementsByClassName("lay-Box")[0].clientWidth / 100;
    console.log(clientWidth);
    let clientHeight = document.getElementsByClassName("lay-Box")[0]
      .clientHeight;
    document
      .getElementsByClassName("back")[0]
      .setAttribute("height", clientHeight + 240 * clientWidth);
    // console.log(this.$refs.Pair)
    this.perReignCount();
    setInterval(() => {
      // 3.日常管理-车辆在位/不在位列表
      this.getCarList();
      // 4.日常管理-车辆在位数/外出数
      this.getPublicCarChangeRecord();
    }, 1000 * 60);
  },
  destroyed() {},
  methods: {
    //8.年度外诊态势 Form上个月
    listDiagnosisManageFormtMinus() {
      if (this.listDiagnosisManageForm.month == "01") {
        this.listDiagnosisManageForm.month = "12";
        this.listDiagnosisManageForm.year = `${
          Number(this.listDiagnosisManageForm.year) - 1
        }`;
      } else {
        if (Number(this.listDiagnosisManageForm.month) - 1 < 10) {
          this.listDiagnosisManageForm.month = `0${
            Number(this.listDiagnosisManageForm.month) - 1
          }`;
        } else {
          this.listDiagnosisManageForm.month = `${
            Number(this.listDiagnosisManageForm.month) - 1
          }`;
        }
      }
    },
    //8.年度外诊态势 Form下个月
    listDiagnosisManageFormtAdd() {
      if (this.listDiagnosisManageForm.month == "12") {
        this.listDiagnosisManageForm.month = "01";
        this.listDiagnosisManageForm.year = `${
          Number(this.listDiagnosisManageForm.year) + 1
        }`;
      } else {
        if (Number(this.listDiagnosisManageForm.month) + 1 < 10) {
          this.listDiagnosisManageForm.month = `0${
            Number(this.listDiagnosisManageForm.month) + 1
          }`;
        } else {
          this.listDiagnosisManageForm.month = `${
            Number(this.listDiagnosisManageForm.month) + 1
          }`;
        }
      }
    },

    //8.年度外诊态势 To上个月
    listDiagnosisManageToMinus() {
      if (this.listDiagnosisManageTo.month == "01") {
        this.listDiagnosisManageTo.month = "12";
        this.listDiagnosisManageTo.year = `${
          Number(this.listDiagnosisManageTo.year) - 1
        }`;
      } else {
        if (Number(this.listDiagnosisManageTo.month) - 1 < 10) {
          this.listDiagnosisManageTo.month = `0${
            Number(this.listDiagnosisManageTo.month) - 1
          }`;
        } else {
          this.listDiagnosisManageTo.month = `${
            Number(this.listDiagnosisManageTo.month) - 1
          }`;
        }
      }
    },
    //8.年度外诊态势 To下个月
    listDiagnosisManageToAdd() {
      if (this.listDiagnosisManageTo.month == "12") {
        this.listDiagnosisManageTo.month = "01";
        this.listDiagnosisManageTo.year = `${
          Number(this.listDiagnosisManageTo.year) + 1
        }`;
      } else {
        if (Number(this.listDiagnosisManageTo.month) + 1 < 10) {
          this.listDiagnosisManageTo.month = `0${
            Number(this.listDiagnosisManageTo.month) + 1
          }`;
        } else {
          this.listDiagnosisManageTo.month = `${
            Number(this.listDiagnosisManageTo.month) + 1
          }`;
        }
      }
    },

    //9.疗养态势 Form上个月
    listLsrecuperateManageFormMinus() {
      if (this.listLsrecuperateManageForm.month == "01") {
        this.listLsrecuperateManageForm.month = "12";
        this.listLsrecuperateManageForm.year = `${
          Number(this.listLsrecuperateManageForm.year) - 1
        }`;
      } else {
        if (Number(this.listLsrecuperateManageForm.month) - 1 < 10) {
          this.listLsrecuperateManageForm.month = `0${
            Number(this.listLsrecuperateManageForm.month) - 1
          }`;
        } else {
          this.listLsrecuperateManageForm.month = `${
            Number(this.listLsrecuperateManageForm.month) - 1
          }`;
        }
      }
    },
    //9.疗养态势 Form下个月
    listLsrecuperateManageFormAdd() {
      if (this.listLsrecuperateManageForm.month == "12") {
        this.listLsrecuperateManageForm.month = "01";
        this.listLsrecuperateManageForm.year = `${
          Number(this.listLsrecuperateManageForm.year) + 1
        }`;
      } else {
        if (Number(this.listLsrecuperateManageForm.month) + 1 < 10) {
          this.listLsrecuperateManageForm.month = `0${
            Number(this.listLsrecuperateManageForm.month) + 1
          }`;
        } else {
          this.listLsrecuperateManageForm.month = `${
            Number(this.listLsrecuperateManageForm.month) + 1
          }`;
        }
      }
    },

    //9.疗养态势 To上个月
    listLsrecuperateManageToMinus() {
      if (this.listLsrecuperateManageTo.month == "01") {
        this.listLsrecuperateManageTo.month = "12";
        this.listLsrecuperateManageTo.year = `${
          Number(this.listLsrecuperateManageTo.year) - 1
        }`;
      } else {
        if (Number(this.listLsrecuperateManageTo.month) - 1 < 10) {
          this.listLsrecuperateManageTo.month = `0${
            Number(this.listLsrecuperateManageTo.month) - 1
          }`;
        } else {
          this.listLsrecuperateManageTo.month = `${
            Number(this.listLsrecuperateManageTo.month) - 1
          }`;
        }
      }
    },
    //9.疗养态势 To下个月
    listLsrecuperateManageToAdd() {
      if (this.listLsrecuperateManageTo.month == "12") {
        this.listLsrecuperateManageTo.month = "01";
        this.listLsrecuperateManageTo.year = `${
          Number(this.listLsrecuperateManageTo.year) + 1
        }`;
      } else {
        if (Number(this.listLsrecuperateManageTo.month) + 1 < 10) {
          this.listLsrecuperateManageTo.month = `0${
            Number(this.listLsrecuperateManageTo.month) + 1
          }`;
        } else {
          this.listLsrecuperateManageTo.month = `${
            Number(this.listLsrecuperateManageTo.month) + 1
          }`;
        }
      }
    },

    //  1.日常管理-人员在位率柱状图(最上面,右边的图)
    async perReignCount() {
      let res = await this.$req(window.api.perReignCount, {
        orgId: localStorage.getItem("loginOrgId"),
        orgLevelCode: localStorage.getItem("orgLevelCode"),
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
        orgLevelCode: localStorage.getItem("orgLevelCode"),
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
        orgLevelCode: localStorage.getItem("orgLevelCode"),
      });
      this.reignListMap = res.data.reignListMap;
      this.unReignListMap = res.data.unReignListMap;
    },
    // 4.日常管理-车辆在位数/外出数
    async getPublicCarChangeRecord() {
      let res = await this.$req(window.api.getPublicCarChangeRecord, {
        orgId: localStorage.getItem("loginOrgId"),
        orgLevelCode: localStorage.getItem("orgLevelCode"),
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
    },
    // 7.日常管理-当日卫生值班
    async listTodayDutySituation(id) {
      this.listTodayDutySituationObj = {};
      let res = await this.$req(window.api.listTodayDutySituation, {
        orgId: id,
      });
      this.listTodayDutySituationObj = res.data;
    },
    // 8.日常管理-年度外诊态势
    async listDiagnosisManage() {
      this.listDiagnosisManageList = [];
      let res = await this.$req(window.api.listDiagnosisManage, {
        levelCode: localStorage.getItem("orgLevelCode"),
        beginTime: `${this.listDiagnosisManageForm.year}-${this.listDiagnosisManageForm.month}-01`,
        endTime: `${this.listDiagnosisManageTo.year}-${this.listDiagnosisManageTo.month}-01`,
      });
      this.listDiagnosisManageList = res.data.objectList;
    },
    // 9.日常管理-疗养态势
    async listLsrecuperateManage() {
      this.listLsrecuperateManage = [];
      let res = await this.$req(window.api.listLsrecuperateManage, {
        levelCode: localStorage.getItem("orgLevelCode"),
        beginTime: `${this.listLsrecuperateManageForm.year}-${this.listLsrecuperateManageForm.month}-01`,
        endTime: `${this.listLsrecuperateManageTo.year}-${this.listLsrecuperateManageTo.month}-01`,
      });
      this.listLsrecuperateManageList = res.data.objectList;
    },
  },
};
</script>

<style scoped>
.box > section > .six .Isborder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.box > section > .six .Isborder .date {
  display: flex;
  justify-content: space-between;
}

.box > section > .six /deep/ .ant-btn-sm {
  font-size: 0.1rem;
  height: 2.5vw;
  padding: 0 1vw;
}

.box > section > .seven > .content > div {
  width: 80%;
  height: 80%;
  /* margin-top: 3vw; */
  /* color: red; */
}
.box > section > .seven > .content {
  display: flex;
  overflow: hidden;
  justify-content: center;
  /* align-items: center; */
  height: 87%;
}

.box > section > .seven {
  height: 50vw;
}

.box > section > .six > .content > div {
  width: 80%;
  height: 80%;
  /* margin-top: 3vw; */
  /* color: red; */
}
.box > section > .six > .content {
  display: flex;
  overflow: hidden;
  justify-content: center;
  /* align-items: center; */
  height: 87%;
}

.box > section > .six {
  height: 50vw;
}

.box > section > .five > .content > div {
  width: 80%;
  height: 80%;
  /* margin-top: 3vw; */
  /* color: red; */
}
.box > section > .five > .content {
  display: flex;
  overflow: hidden;
  justify-content: center;
  /* align-items: center; */
  height: 87%;
}

.box > section > .five {
  height: 50vw;
}

.box > section > .five > .content .top > .top-child img {
  width: 10.5vw;
  height: 10.5vw;
  border-radius: 50%;
}

.box > section > .five > .content .top > .top-child > .imgs {
  width: 12vw;
  height: 12vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #194c98;
  border-radius: 50%;
  border: 2px solid #3f76e6;
  margin-bottom: 2.5vw;
}

.box > section > .five > .content .top > .top-child span:nth-child(1) {
  color: #ffffff;
  font-size: 0.13rem;
}

.box > section > .five > .content .top > .top-child pre {
  color: #8f98b1;
  font-size: 0.13rem;
  width: 20vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box > section > .five > .content .top > .top-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.box > section > .five > .content .top {
  display: flex;
  justify-content: space-around;
  /* border-bottom: 1px solid #4778dd; */
  padding-bottom: 2vw;
  padding-top: 1.8vw;
  margin-bottom: 3vw;
}

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
  background-color: #2d579b;
  border-radius: 1vw;
  border: 2px solid #445ee7;
  margin-bottom: 1.8vw;
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
  justify-content: space-between;
}

.gaine > .Istitle > .title {
  display: flex;
}

.gaine > .Istitle > .title > .text {
  margin-left: 0.5vw;
  color: #fff;
  font-size: 0.15rem;
}

.gaine > .Istitle > .title > img {
  width: 3vw;
  height: 3vw;
}

.gaine .Isborder {
  padding-right: 3vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gaine .Isborder .date {
  display: flex;
  justify-content: space-between;
}

.gaine .Isborder /deep/ .ant-btn-sm {
  font-size: 0.1rem;
  height: 2.5vw;
  padding: 0 1vw;
}

.gaine .Isborder .date .son {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.12rem;
  color: #fff;
}

.gaine .Isborder .date .to {
  padding-right: 2.5vw;
}

.gaine .Isborder .date .son > div {
  margin-left: 2vw;
  margin-right: 2vw;
}

.gaine > .Isborder > div {
  width: 100%;
  height: 1px;
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>