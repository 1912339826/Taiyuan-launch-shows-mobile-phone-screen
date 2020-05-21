// 周工作计划,此页方法与一周食谱页面基本相同
<template>
  <div class="PreparationAgainstWar">
    <Header></Header>
    <img class="back" src="../../../../static/images/202.png" alt />
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

    <div class="lay-two">
      <div class="two-header">{{ischangeday.value.split("(")[1].split(")")[0]}}</div>
      <div class="two-timer">
        <div class="left-btn" @click="leftBtn"></div>
        <div style="display:flex" class="center-btn">
          <div
            v-for="(item, index) in weekdatabox"
            :key="index"
            :class="ischangeday.value==item.value?'active center-btn-child':'active-no center-btn-child'"
            @click="changeWeek(item)"
          >
            <div class="left">
              <div
                class="top-month"
              >{{toMomthAndDay(item.value.split("(")[1].split(")")[0].split("~")[0]).month}}月</div>
              <div
                class="bottom-day"
              >{{toMomthAndDay(item.value.split("(")[1].split(")")[0].split("~")[0]).day}}</div>
            </div>
            <div class="center"></div>
            <div class="right">
              <div
                class="top-month"
              >{{toMomthAndDay(item.value.split("(")[1].split(")")[0].split("~")[1]).month}}月</div>
              <div
                class="bottom-day"
              >{{toMomthAndDay(item.value.split("(")[1].split(")")[0].split("~")[1]).day}}</div>
            </div>
          </div>
        </div>
        <div class="right-btn" @click="rightBtn"></div>
      </div>
    </div>
    <div class="two-left-box">
      <div class="gaine two-left">
        <nav class="Istitle">
          <img src="../../../../static/images/Index_Box_Icon.png" alt />
          <div class="text">值班安排</div>
        </nav>
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
              <pre style=" margin-bottom: 0.5vw;" :title="IsshowDutyManage['personnelTelphoneNum']">
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
    </div>
    <div class="lay-three-box">
      <div class="gaine lay-three">
        <nav class="Istitle">
          <div>
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">通信值勤</div>
          </div>
          <div>
            <img src="../../../../static/images/手势类单色线性图标finger-slide-01.png" alt />
          </div>
        </nav>
        <div class="table-box">
          <table border="1">
            <tr style="height:6vw;color:#fff:font-weight: 900;">
              <th style="width:20%">单位</th>
              <th style="width:20%">岗位</th>
              <th style="width:20%">日期</th>
              <th style="width:20%">时段</th>
              <th style="width:20%">值班人员</th>
            </tr>
            <tr v-for="(item,index) in IsgetSrTecResultData" :key="index" style="height:5vw;">
              <td>{{item.name}}</td>
              <td>{{item.post}}</td>
              <td>{{item.dutyDay}}</td>
              <td>{{item.dutyTime}}</td>
              <td>
                <div>{{item.leaderName}}</div>
                <div>{{item.dutyNames}}</div>
              </td>
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
import Gohome from "../../../components/taiyuanfashe/Gohome";
export default {
  name: "WeekWork",
  components: {
    Header,
    Tab,
    Gohome
    // Dropdown,
  },
  data: function() {
    return {
      changeName:'',
      IsshowDutyManage: {},
      current: "",
      yearandmonthanddate: ``,
      ischangeday: { value: "第3周(2020-03-09 ~ 2020-03-15)", key: "" },
      weekdata: [
        {
          value: "第1周(2020-02-24 ~ 2020-03-01)",
          key: 1
        },
        {
          value: "第2周(2020-03-02 ~ 2020-03-08)",
          key: 2
        },
        {
          value: "第3周(2020-03-09 ~ 2020-03-15)",
          key: 3
        },
        {
          value: "第4周(2020-03-16 ~ 2020-03-22)",
          key: 4
        },
        {
          value: "第5周(2020-03-23 ~ 2020-03-29)",
          key: 5
        },
        {
          value: "第6周(2020-03-30 ~ 2020-04-05)",
          key: 6
        }
      ],
      hebdomad: ["一", "二", "三", "四", "五", "六", "七"],
      weekdatabox: [],
      basename: {},
      officearr: [],
      childlistarr: [],
      IsgetSrTecResultData: [
        {
          id: "1fb7761a-f99a-41d9-b035-43e4dbe09612",
          name: "一连",
          post: "电源岗位",
          dutyDay: "星期一(2020-03-23)",
          dutyTime: "上午",
          leaderName: "1",
          dutyNames: "2"
        },
        {
          id: "5ae2bff2-a263-4f5b-98c5-dc48ad78826b",
          name: "一连",
          post: "电源岗位",
          dutyDay: "星期一(2020-03-23)",
          dutyTime: "下午",
          leaderName: null,
          dutyNames: null
        }
      ],
      hearImg: localStorage.getItem("BASE_URLA"),
      ChangeorgId: '',
      headPicPath: "",
      personnelPicPath: "",
      orgLevel: ''
    };
  },
  watch: {},
  created() {
    this.getOrgTreePublic();
    this.getWeekByMonth();
    // this.showDutyManage();
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 得到当前周
    getNowWeek() {
      let time = new Date();
      // 此数组用于显示周
      let boxlistarr = [];
      this.weekdatabox = [];
      for (let index = 0; index < this.weekdata.length; index++) {
        let one = this.togetTime(
          this.weekdata[index].value
            .split("(")[1]
            .split(")")[0]
            .split(" ~ ")[0]
        );
        let two = this.togetTime(
          this.weekdata[index].value
            .split("(")[1]
            .split(")")[0]
            .split(" ~ ")[1]
        );
        if (time.getTime() < two) {
          if (time.getTime() > one) {
            if (!this.weekdata[this.weekdata[index].key - 2]) {
              boxlistarr.push(
                this.weekdata[this.weekdata[index].key - 1],
                this.weekdata[this.weekdata[index].key],
                this.weekdata[this.weekdata[index].key + 1]
              );
            } else if (!this.weekdata[this.weekdata[index].key]) {
              boxlistarr.push(
                this.weekdata[this.weekdata[index].key - 3],
                this.weekdata[this.weekdata[index].key - 2],
                this.weekdata[this.weekdata[index].key - 1]
              );
            } else {
              boxlistarr.push(
                this.weekdata[this.weekdata[index].key - 2],
                this.weekdata[this.weekdata[index].key - 1],
                this.weekdata[this.weekdata[index].key]
              );
            }

            for (let index = 0; index < boxlistarr.length; index++) {
              if (boxlistarr[index]) {
                this.weekdatabox.push(boxlistarr[index]);
              }
            }
            // 显示当前选中或者默认的周
            this.ischangeday = {
              key: this.weekdata[index].key - 1,
              value: this.weekdata[index].value
            };
          }
        }
      }
    },
    // 3.首页-战备值班
    async showDutyManage() {
      let res = await this.$req(window.api.showDutyManage, {
        orgId: this.ChangeorgId,
        orgLevelCode: this.orgLevel
      });
      this.IsshowDutyManage = res.data;
      // this.headPicPath = `${this.hearImg}${this.IsshowDutyManage.headPicPath}`;
      // this.personnelPicPath = `${this.hearImg}${this.IsshowDutyManage.personnelPicPath}`;
       this.headPicPath = `${window.BASE_URLA}${this.IsshowDutyManage.headPicPath}`;
      this.personnelPicPath = `${window.BASE_URLA}${this.IsshowDutyManage.personnelPicPath}`;
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
      this.orgLevel = res.data.children[0].levelCode;
      this.showDutyManage()
      this.officearr = res.data.children[0].children;
      for (
        let index = 0;
        index < res.data.children[0].children.length;
        index++
      ) {
        const element = res.data.children[0].children[index];
        boxarr.push(this.treeTransArray(element.children, "children"));
        this.childlistarr = boxarr;
      }
      this.getSrTecResultData();
    },
    // 2.战备工作-通信值勤-获取本月有几周
    async getWeekByMonth() {
      let res = await this.$req(window.api.getWeekByMonth, {
        planYear: new Date().getFullYear(),
        planMonth: new Date().getMonth() + 1
      });
      this.weekdata = res.data;
      this.getNowWeek();
    },
    // 3.战备工作-通信值勤-获取周值班数据
    async getSrTecResultData() {
      this.IsgetSrTecResultData = [];
      let res = await this.$req(window.api.getSrTecResultData, {
        orgId: this.ChangeorgId,
        week: this.ischangeday.value,
        dutyType: "01"
      });
      this.IsgetSrTecResultData = res.data;
    },
    // 输入时间,得到对应时间戳
    togetTime(time) {
      return new Date(time).getTime();
    },
    // 点击基地/团/营的按钮以及下拉选项
    dropdown(id, orgLevel,name) {
      this.orgLevel = orgLevel;
      this.ChangeorgId = id;
      if(name!=""){
        this.changeName = name;
      }
      this.getSrTecResultData();
      this.showDutyManage();
    },
    // 选中某一周
    changeWeek(item) {
      this.ischangeday = item;
      this.getSrTecResultData();
    },
    // 减一周
    leftBtn() {
      if (this.weekdatabox[0].key != this.weekdata[0].key) {
        let boxarr = [];
        boxarr.push(
          this.weekdata[this.weekdatabox[0].key - 2],
          this.weekdata[this.weekdatabox[0].key - 1],
          this.weekdata[this.weekdatabox[0].key]
        );
        this.weekdatabox = boxarr;
      } else {
        this.$message.warn("没有了");
      }
    },
    // 加一周
    rightBtn() {
      if (
        this.weekdatabox[this.weekdatabox.length - 1].key !=
        this.weekdata[this.weekdata.length - 1].key
      ) {
        let boxarr = [];
        boxarr.push(
          this.weekdata[this.weekdatabox[0].key],
          this.weekdata[this.weekdatabox[0].key + 1],
          this.weekdata[this.weekdatabox[0].key + 2]
        );
        this.weekdatabox = boxarr;
      } else {
        this.$message.warn("没有了");
      }
    },
    // 时间"2020-03-30"格式转化成功{month:"3月",day:"30"}
    toMomthAndDay(data) {
      let isdata = new Date(data);
      return {
        month: isdata.getMonth() + 1,
        day: isdata.getDate()
      };
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
  },
  destroyed() {
    this.$message.destroy();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}
.PreparationAgainstWar {
  width: 100%;
}

.center-btn .center-btn-child > div > div:nth-child(1) {
  font-size: 0.15rem;
}

.center-btn .center-btn-child > div > div:nth-child(2) {
  font-size: 0.3rem;
}

.center-btn .center-btn-child:hover {
  cursor: pointer;
}

.center-btn .center-btn-child {
  display: flex;
  align-items: center;
}

.center-btn .center-btn-child .center {
  width: 5vw;
  height: 1px;
}

.center-btn .active {
  color: #fdd100;
}

.center-btn .active .center {
  background-color: #fdd100;
}

.center-btn .active-no {
  color: #63759d;
}

.center-btn .active-no .center {
  background-color: #63759d;
}

.center-btn {
  width: 70vw;
  justify-content: space-between;
}

.left-btn:hover,
.right-btn:hover {
  cursor: pointer;
}

.left-btn,
.right-btn {
  width: 2vw;
  height: 7vw;
}

.lay-two {
  width: 100%;
  margin-top: 1vw;
}

.day-time {
  background: #4e7ede;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  text-align: center;
  line-height: 10vw;
  color: #bcc0ce;
  font-size: 0.2rem;
  font-weight: 600;
}

.lay-three table {
  height: 100%;
  width: 100%;
  border: 1px solid #5a8be3;
}

.lay-three > .title {
  height: 3vw;
  line-height: 3vw;
  text-align: left;
  padding-left: 7vw;
  font-size: 0.15rem;
}

.lay-three-box {
  padding-left: 1.7vw;
  padding-right: 1.7vw;
}

.lay-three .table-box {
  overflow: scroll;
  width: 100%;
  height: 58vw;
  margin-top: 2.5vw;
}

.lay-three {
  margin-top: 2vw;
  text-align: center;
  color: #c9d0e1;
  height: 65vw;
  font-size: 0.1rem;
  width: 100%;
}

.two-timer {
  margin-top: 3vw;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 0.1rem;
  padding-left: 2vw;
  padding-right: 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.two-header {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 0.15rem;
  margin-top: 4vw;
}

.lay-one {
  margin-top: 3.7vw;
  width: 100%;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  color: #fff;
  height: 9.5vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.lay-one .activeA{
  border: 1px solid #013bf6;
}

.lay-one #activeA{
  color: #2d8cf0;
}


.lay-one a{
  display: block;
  width: 10vw;
  height: 5vw;
  line-height: 5vw;
  /* background-color: #1b4592; */
  border: none;
  color: #ffffff;
  font-size: 0.1rem;
  text-align: center;
}

.lay-one /deep/.ivu-dropdown .ivu-dropdown-rel .activeA{
  border: 1px solid #013bf6;
}

.lay-one /deep/.ivu-dropdown .ivu-dropdown-rel #activeA{
  color: #2d8cf0;
}

.lay-one /deep/.ant-btn.ant-dropdown-trigger {
  width: 10vw;
  height: 7vw;
  background-image: linear-gradient(#1d4086, #1e3e80, #1a4592);
  border: none;
  color: #ffffff;
  font-size: 0.1rem;
  text-align: center;
}

.PreparationAgainstWar /deep/.ivu-dropdown .ivu-dropdown-rel a {
  display: block;
  width: 10vw;
  height: 7vw;
  line-height: 7vw;
  background-image: linear-gradient(#1b448f, #1e3e80, #1c428a);
  border: none;
  color: #ffffff;
  font-size: 0.1rem;
  text-align: center;
}

.lay-one > span {
  display: block;
  border-right: 1px solid #3565ce;
  height: 9.5vw;
  color: #1f3d7a;
  font-size: 0.1rem;
}

.lay-one > div {
  font-size: 0.1rem;
  height: 9.5vw;
  line-height: 9vw;
  text-align: center;
}

.lay-one > div img {
  width: 2vw;
  height: 2vw;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}

.lay-three-box > .lay-three > .Istitle > div:nth-child(2) > img {
  width: 5vw;
  height: 5vw;
  opacity: 0;
}

.lay-three-box > .lay-three > .Istitle > div:nth-child(1) {
  align-items: center;
  font-size: 0.15rem;
}

.lay-three-box > .lay-three > .Istitle > div:nth-child(1) > img {
  width: 3vw;
  height: 3vw;
  margin-right: 2vw;
}

.lay-three-box > .lay-three > .Istitle > div {
  display: flex;
}

.lay-three-box > .lay-three > .Istitle {
  display: flex;
  justify-content: space-between;
  height: 4vw;
}

.two-left-box {
  width: 100%;
  padding-left: 1.7vw;
  padding-right: 1.7vw;
}

.two-left {
  height: 40vw;
  width: 100%;
  margin-top: 5.2vw;
}

.two-left > .Istitle {
  margin-top: 2vw;
}

/* .two-left > .Istitle > .text { */
  /* padding-left: vw; */
/* } */

.two-left > .content > .bottom {
  display: flex;
  justify-content: space-around;
}

.two-left > .content > .top > .top-child img {
  width: 10.5vw;
  height: 10.5vw;
  border-radius: 50%;
}

.two-left > .content > .top > .top-child > .imgs {
  width: 12vw;
  height: 12vw;
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
  padding-bottom: 1vw;
  padding-top: 1.8vw;
  margin-bottom: 1vw;
}

.two-left > .content {
  width: 100%;
  padding-left: 1vw;
  padding-right: 1vw;
}

.gaine {
  /* height: 40vw; */
  /* width: 47vw; */
  /* background-color: #2d579b; */
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
  margin-left: 2vw;
  color: #fff;
  font-size: 0.15rem;
}

.gaine > .Istitle > img {
  width: 2.5vw;
  height: 2.5vw;
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
</style>