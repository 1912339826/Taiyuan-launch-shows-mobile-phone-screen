<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/05.png" alt />
    <Tab></Tab>
    <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>

    <div class="lay-one">
      <a
        href="javascript:void(0)"
        style="text-decoration: none;font-size: 0.1rem;"
        @click="dropdown(basename.id,basename.levelCode,basename.name)"
        :class="changeName==basename.name?'activeA':''"
        :id="ChangeorgId==basename.id?'activeA':''"
      >{{basename.name}}</a>
      <div v-for="(item, index) in officearr" :key="index">
        <Dropdown>
          <a
            href="javascript:void(0)"
            style="text-decoration: none;"
            @click="dropdown(item.id,item.levelCode,item.name)"
            :class="changeName==item.name?'activeA':''"
            :id="ChangeorgId==item.id?'activeA':''"
          >{{item.name}}</a>
          <DropdownMenu slot="list" v-if="!item.children.length==0">
            <DropdownItem
              @click.native="dropdown(item.id,item.levelCode,'')"
              v-for="item in childlistarr[index]"
              :key="item.id"
              :selected="ChangeorgId==item.id"
            >{{item.name}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <img src="../../../../static/images/down.png" alt v-if="!item.children.length==0" />
      </div>
    </div>
    <!-- <div class="lay-one">
      <div @click="dropdown(basename.id,basename.levelCode)">{{basename.name}}</div>
      <div v-for="(item, index) in officearr" :key="index">
        <a-dropdown placement="bottomCenter" :trigger="['click']">
          <a-button @click="dropdown(item.id,item.levelCode)">{{item.name}}</a-button>
          <a-menu slot="overlay" v-if="!item.children.length==0">
            <a-menu-item
              @click="dropdown(item.id,item.levelCode)"
              v-for="item in childlistarr[index]"
              :key="item.id"
            >{{item.name}}</a-menu-item>
          </a-menu>
        </a-dropdown>
        <img src="../../../../static/images/down.png" alt v-if="!item.children.length==0" />
      </div>
    </div>-->

    <div class="lay-content">
      <div class="four gaine">
        <nav class="Istitle">
          <div>
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">训练进度</div>
          </div>
          <div class="four-tab">
            <div v-for="item in tab" :key="item.name">
              <span
                :class="item.id==changeId ? 'tab-chenge':''"
                @click="change(item.id)"
              >{{item.name}}</span>
            </div>
          </div>
        </nav>

        <div class="content">
          <LineChart :series="series" ref="IsLineChart" :name="'进度(%)'" :bottomTitle="bottomTitle"></LineChart>
        </div>
      </div>

      <div class="gaine four">
        <nav class="Istitle">
          <div>
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">参训率</div>
          </div>
          <div class="four-tab">
            <div
              v-for="(item,index) in fourTab"
              :key="index"
              @click="fourchangeHand(item)"
              :class="item == fourchange ? 'tab-chenge':''"
            >{{item}}</div>
          </div>
        </nav>
        <div class="content" ref="box">
          <LineChart
            :idName="'aaaaaaa'"
            :series="seriesFour"
            :name="'参训率(%)'"
            :legend="legend"
            ref="IsFour"
            v-if="IsFour"
            :bottomTitle="fourBottom"
          ></LineChart>
        </div>
      </div>

      <div class="lay-three">
        <img src="../../../../static/images/052_01.png" alt />
        <div class="tables">
          <table border="1">
            <tr style="background-color:#294a93">
              <th>岗位名称</th>
              <th>岗前</th>
              <th>初级</th>
              <th>中级</th>
              <th>高级</th>
            </tr>
            <tr v-for="(item, index) in IsshowPostList" :key="index">
              <td>{{item.postName}} ({{item.zs}})</td>
              <td>{{item.gq}}</td>
              <td>{{item.cj}}</td>
              <td>{{item.zj}}</td>
              <td>{{item.gj}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import LineChart from "../../../components/taiyuanfashe/LineChart";
import Gohome from "../../../components/taiyuanfashe/Gohome";
export default {
  name: "MilitaryTraining",
  components: {
    Header,
    Tab,
    LineChart,
    Gohome
  },
  data: function() {
    return {
      IsFour: false,
      changeName: "",
      changeId: "month",
      tab: [
        { name: "本月", id: "month" },
        { name: "本季", id: "quarter" },
        { name: "本年", id: "year" }
      ],
      officearr: [],
      basename: {},
      childlistarr: [],
      legend: {
        data: [],
        top: "0%",
        textStyle: {
          color: "#ffffff"
        }
      },
      fourTab: ["本周", "本月", "本年"],
      timeTabData: [
        { name: "月度", type: "month" },
        { name: "季度", type: "quarter" },
        { name: "年度", type: "year" }
      ],
      timeTabHeaderType: "month",
      // series: [
      //   {
      //     animation: false,
      //     data: ["4", "7", "3", "7", "9", "6"],
      //     type: "line",
      //     smooth: false,
      //     symbol: "circle",
      //     symbolSize: 8,
      //     label: {
      //       show: true,
      //       position: "top",
      //       textStyle: {
      //         color: "#fff"
      //       }
      //     },
      //     sampling: "average",
      //     itemStyle: {
      //       // color: this.color
      //     },
      //     areaStyle: {
      //       color: new this.$echarts.graphic.LinearGradient(
      //         0,
      //         0,
      //         0,
      //         1,
      //         [
      //           {
      //             offset: 0
      //             // color: this.color
      //           },
      //           {
      //             offset: 1,
      //             color: "#1f407c"
      //           }
      //         ],
      //         false
      //       )
      //     }
      //   }
      // ],
      bottomTitle: [],
      fourchange: "本周",
      IsshowTrainRate: [
        ["03-30", "03-31", "04-01", "04-02", "04-03", "04-04", "04-05"],
        [
          { name: "通信团", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "团机关", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "一营", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "一营营部", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "一营一连", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "一营二连", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "二营", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "二营营部", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "二营三连", data: [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "二营四连", data: [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "技术支援营", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "勤务连", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
          { name: "te111st连", data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] }
        ]
      ],
      fourBottom: [
        "03-30",
        "03-31",
        "04-01",
        "04-02",
        "04-03",
        "04-04",
        "04-05"
      ],
      seriesFour: [
        {
          name: "11111111111",
          animation: false,
          data: ["4", "7", "3", "7", "9", "6"],
          type: "line",
          smooth: false,
          symbol: "circle",
          symbolSize: 8,
          label: {
            show: true,
            position: "top",
            textStyle: {
              color: "#fff"
            }
          },
          sampling: "average"
        }
      ],
      IsshowPostList: [
        { name: "岗位1", postName: "试", gc: 0, cj: 0, zj: 0, gj: 0, zs: 0 },
        {
          id: "0aac5bb7-839a-414f-bd8a-6dab8b06a77e",
          name: "名称",
          recordSort: 1,
          postName: "名称",
          gq: 0,
          cj: 0,
          zj: 0,
          gj: 0,
          zs: 0
        }
      ],
      ChangeorgId: "",
      IstrainScheduleContrast: [],
      series: [
        {
          animation: false,
          data: ["0.12", 1, 4, 5, 4, 5],
          type: "line",
          smooth: false,
          symbol: "circle",
          symbolSize: 5,    
          label: {
            show: true,
            position: "top",
            textStyle: {
              color: "#fff"
            }
          },
          sampling: "average",
          itemStyle: {
            color: "#34ecfc"
          },
          areaStyle: {
            // color: new this.$echarts.graphic.LinearGradient(
            //   0,
            //   0,
            //   0,
            //   1,
            //   [
            //     {
            //       offset: 0,
            //       color: "#1186c2"
            //     },
            //     {
            //       offset: 1,
            //       color: "#1f407c"
            //     }
            //   ],
            //   false
            // )
            color:'#dbdfe0'
          }
        }
      ],
      levelCode: ""
    };
  },
  created() {
    this.getOrgTreePublic();
    this.trainScheduleContrast("month");
    this.showPostList(localStorage.getItem("loginOrgId"));
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 5.首页-训练进度
    async trainScheduleContrast(id) {
      this.series[0]["data"] = [];
      this.bottomTitle = [];
      let res = await this.$req(window.api.trainScheduleContrast, {
        type: id
      });
      this.IstrainScheduleContrast = res.data[0];
      res.data[0].map(item => {
        this.series[0]["data"].push(item["avg"]);
        this.bottomTitle.push(item["name"]);
      });
      this.$refs.IsLineChart.visitor();
    },
    change(id) {
      this.changeId = id;
      this.trainScheduleContrast(id);
    },
    // 1.战备工作-部门导航
    async getOrgTreePublic() {
      let boxarr = [];
      let res = await this.$req(window.api.getOrgTreePublic, {
        code: "org.queryOrganization"
      });
      this.basename = {
        id: res.data.children[0].id,
        name: res.data.children[0].name,
        levelCode: res.data.children[0].levelCode
      };
      this.changeName = this.basename.name;
      this.ChangeorgId = this.basename.id;
      this.officearr = res.data.children[0].children;
      this.levelCode = res.data.children[0].levelCode;
      this.fourchangeHand("本周");
      for (
        let index = 0;
        index < res.data.children[0].children.length;
        index++
      ) {
        const element = res.data.children[0].children[index];
        boxarr.push(this.treeTransArray(element.children, "children"));
        this.childlistarr = boxarr;
      }
    },
    // 点击基地/团/营的按钮以及下拉选项
    dropdown(id, levelCode, name) {
      this.ChangeorgId = id;
      this.levelCode = levelCode;
      if (name != "") {
        this.changeName = name;
      }
      this.showPostList(id);
      if (this.fourchange == "本周") {
        this.showTrainRateByOrg(levelCode);
      } else if (this.fourchange == "本月") {
        this.showTrainRateByOneMonth(levelCode);
      } else if (this.fourchange == "本年") {
        this.showTrainRateByRecentYear(levelCode);
      }
    },
    timeTabButton(type) {
      this.timeTabHeaderType = type;
      this.trainScheduleContrast(type);
    },
    // 2.参训率
    // 周
    async showTrainRateByOrg(levelCode) {
      this.IsshowTrainRate = [];
      let res = await this.$req(window.api.showTrainRateByOrg, {
        orgLevelCode: levelCode
      });
      this.IsshowTrainRate = res.data;
      this.aaaa();
    },
    //  月
    async showTrainRateByOneMonth(levelCode) {
      this.IsshowTrainRate = [];
      let res = await this.$req(window.api.showTrainRateByOneMonth, {
        orgLevelCode: levelCode
      });
      this.IsshowTrainRate = res.data;
      this.aaaa();
    },
    //  年
    async showTrainRateByRecentYear(levelCode) {
      this.IsshowTrainRate = [];
      let res = await this.$req(window.api.showTrainRateByRecentYear, {
        orgLevelCode: levelCode
      });
      this.IsshowTrainRate = res.data;
      this.aaaa();
    },
    // 3.岗位分布
    async showPostList(id) {
      this.IsshowPostList = [];
      let res = await this.$req(window.api.showPostList, {
        orgId: id
      });
      this.IsshowPostList = res.data;
    },
    fourchangeHand(name) {
      this.legend.data = [];
      this.seriesFour = [];
      this.fourchange = name;
      console.log(this.levelCode);
      if (name == "本周") {
        this.showTrainRateByOrg(this.levelCode);
      } else if (name == "本月") {
        this.showTrainRateByOneMonth(this.levelCode);
      } else if (name == "本年") {
        this.showTrainRateByRecentYear(this.levelCode);
      }
    },
    // 向组件注入数据
    aaaa() {
      let name = [];
      this.IsFour = false;
      this.fourBottom = this.IsshowTrainRate[0];
      // this.legend.data = [];
      this.seriesFour = [];
      console.log(this.IsshowTrainRate);
      for (let index = 0; index < this.IsshowTrainRate[1].length; index++) {
        const element = this.IsshowTrainRate[1][index];
        name.push(element.name)
        this.legend = {
          data: name,
          top: "0%",
          textStyle: {
            color: "#ffffff"
          }
        };
        // this.legend.data.push(element.name);
        this.seriesFour.push({
          name: element.name,
          animation: false,
          data: element.data,
          type: "line",
          smooth: false,
          symbol: "circle",
          symbolSize: 8,
          label: {
            show: true,
            position: "buttom",
            textStyle: {
              color: "#fff"
            }
          },
          sampling: "average"
        });
      }
      this.IsFour = true;
      console.log(this.$refs);
    },
    // 树结构转换成普通数组
    treeTransArray(tree, key) {
      return tree
        .reduce(function f(con, item) {
          var callee = f;
          con.push(item);
          if (item[key] && item[key].length > 0) {
            item[key].reduce(callee, con);
          }
          return con;
        }, [])
        .map(function(item) {
          item[key] = [];
          return item;
        });
    }
  }
};
</script>

<style scoped>
.four-tab > div {
  color: #546b9f;
  font-size: 0.15rem;
}

.four .tab-chenge {
  border-bottom: 1px solid #ffffff;
  font-size: 0.15rem;
  color: #fff;
}

.four {
  margin-top: 3vw;
}
.lay-three > .tables > table > tr {
  height: 5vw;
}
.lay-three > .tables > table {
  width: 100%;
  font-size: 0.12rem;
  text-align: center;
  color: #fff;
  border: 1px solid #3e6ad8;
  background-image: linear-gradient(to right, #1d50a8, #244281, #1d50a8);
}

.lay-three > .tables {
  width: 100%;
  height: 50vw;
  overflow: scroll;
}

.lay-three > img {
  width: 100%;
  border-top-left-radius: 1vw;
  border-top-right-radius: 1vw;
  border: 1px solid #6a9dff;
  border-bottom: none;
}

.lay-three {
  width: 100%;
  margin-top: 3vw;
}
.two-center {
  width: 100%;
  height: 80%;
  overflow: scroll;
  margin-top: 1px;
}

.lay-content > .lay-two > .four-tab > .tab-chenge {
  border-bottom: 1px solid #ffffff;
  font-size: 0.15rem;
  color: #fff;
}
.lay-two span {
  color: #546b9f;
  display: block;
}

.one-tab > div {
  margin-left: 2vw;
  padding-right: 2vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.15rem;
}

.one-tab {
  display: flex;
  justify-content: flex-end;
  padding-top: 1.5vw;
}

.lay-two {
  position: relative;
  height: 34.5vw;
  width: 100%;
}

.lay-content {
  margin-left: 1.57vw;
  margin-right: 1.57vw;
  margin-top: 3vw;
}

.lay-one {
  border-radius: 1vw;
  margin-top: 3vw;
  color: #fff;
  height: 5.7vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #1b4592;
  border: 2px solid #3647af;
  margin-left: 1.57vw;
  margin-right: 1.57vw;
}

.lay-one .activeA {
  border: 1px solid #013bf6;
}

.lay-one #activeA {
  color: #2d8cf0;
}

.lay-one a {
  display: block;
  width: 10vw;
  height: 5vw;
  line-height: 5vw;
  background-color: #1b4592;
  border: none;
  color: #ffffff;
  font-size: 0.1rem;
  text-align: center;
}

.lay-one /deep/.ivu-dropdown .ivu-dropdown-rel .activeA {
  border: 1px solid #013bf6;
}

.lay-one /deep/.ivu-dropdown .ivu-dropdown-rel #activeA {
  color: #2d8cf0;
}

.lay-one /deep/.ant-btn.ant-dropdown-trigger {
  width: 10vw;
  height: 5vw;
  background-color: #1b4592;
  border: none;
  color: #ffffff;
  font-size: 0.08rem;
  text-align: center;
}

.lay-one /deep/.ant-dropdown.ant-dropdown-placement-bottomCenter {
  min-width: 10px;
}

.lay-one /deep/.ant-dropdown-menu-item {
  height: 8vw;
}

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
.lay-one /deep/.ivu-dropdown .ivu-dropdown-rel a {
  display: block;
  width: 10vw;
  height: 5vw;
  line-height: 5vw;
  background-color: #1b4592;
  border: none;
  color: #ffffff;
  font-size: 0.1rem;
  text-align: center;
}

.lay-one > span {
  display: block;
  border-right: 1px solid #3565ce;
  height: 5.7vw;
  color: #1c4ba0;
  font-size: 0.1rem;
}

.lay-one > div {
  font-size: 0.08rem;
  height: 5vw;
  line-height: 5vw;
  text-align: center;
}

.lay-one > div img {
  width: 1.8vw;
  height: 1.8vw;
}

.gaine {
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
  padding-top: 2vw;
  padding-left: 3vw;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.gaine > .Istitle .text {
  margin-left: 0.7vw;
  color: #fff;
  font-size: 0.15rem;
}

.gaine > .Istitle > div {
  display: flex;
  align-items: center;
}

.gaine > .Istitle > div:nth-child(2) {
  width: 22vw;
  justify-content: space-between;
  padding-right: 3vw;
}

.gaine > .Istitle img {
  width: 2.7vw;
  height: 2.7vw;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>