// 周工作计划,此页方法与一周食谱页面基本相同
<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/202.png" alt />
    <Tab></Tab>
    <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>

    <div class="lay-one">
      <a
        href="javascript:void(0)"
        style="text-decoration: none;color:#fff;font-size: 0.1rem;"
        @click="dropdown(basename.id,true,basename.name)"
        :class="changename==basename.name?'activeA':''"
        :id="changeId==basename.id?'activeA':''"
      >{{basename.name}}</a>

      <div v-for="(item, index) in officearr" :key="index">
        <Dropdown>
          <a
            href="javascript:void(0)"
            style="text-decoration: none;color:#fff;"
            @click="dropdown(item.id,true,item.name)"
            :class="changename==item.name?'activeA':''"
            :id="changeId==item.id?'activeA':''"
          >{{item.name}}</a>
          <DropdownMenu slot="list" v-if="!item.children.length==0">
            <DropdownItem
              @click.native="dropdown(item.id,false,item.name)"
              v-for="item in childlistarr[index]"
              :key="item.id"
              :selected="changeId==item.id"
            >{{item.name}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <img src="../../../../static/images/down.png" alt v-if="!item.children.length==0" />
      </div>
    </div>

    <div class="lay-two">
      <div class="two-header">{{current}}</div>
      <div class="two-timer">
        <div class="left-btn" @click="leftBtn"></div>
        <div class="day-items" v-for="(item,i) in timeData" :key="i" @click="change(item)">
          <p class="day-p">{{ weekday[item.isdate.getDay()] }}</p>
          <div
            class="day-time"
            :class="item.TAG==yearandmonthanddate ? 'change':''"
          >{{item.isdate.getDate()}}</div>
        </div>
        <div class="right-btn" @click="rightBtn"></div>
      </div>
    </div>

    <div class="lay-three">
      <div class="title">
        <img src="../../../../static/images/Index_Box_Icon.png" alt />
        <div class="text">工作安排</div>
      </div>
      <div class="table-box">
        <table border="1">
          <tr >
            <th style="background-color:#284891;height:10vw;width:10%">时段</th>
            <th style="background-color:#284891;width:77%">事项安排</th>
            <th style="background-color:#284891;width:13%">参加对象</th>
          </tr>
          <template v-for="item in IsgetThisWeekWorkInfo">
            <tr :key="item.id">
              <th rowspan="2">{{item.timeName}}</th>
              <td>课目: {{item.content}}</td>
              <td>{{childlistname}}</td>
            </tr>
            <tr :key="item.timeName">
              <td>训练内容: {{item.trainContent}}</td>
              <td>{{childlistname}}</td>
            </tr>
          </template>
        </table>
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
  },
  data: function() {
    return {
      changename:'',
      // 时间池
      timeData: [],
      weekday: [
        " 周 日",
        " 周 一",
        " 周 二",
        " 周 三",
        " 周 四",
        " 周 五",
        " 周 六"
      ],
      getDate: new Date().getDate(),
      getDay: new Date().getDay(),
      newDate: new Date(),
      current: "",
      yearandmonthanddate: ``,
      ischangeday: new Date().getTime(),
      basename: {},
      childlistname: "基地",
      officearr: [
        {
          orgType: "4",
          createTime: 1522636235000,
          referenceTreeId: null,
          name:'1111111',
          children: [
            {
              orgType: "4",
              createTime: 1522636254000,
              referenceTreeId: null,
              children: [],
              modifior: "developer",
              leaf: true,
              telphone: null,
              creator: "developer",
              id: "b85859d8-1c73-4a0c-832d-425c7237f5b0",
              parentId: "40cc3bcb-5479-4c55-9063-76dd7a45ccf4",
              modifyName: "developer",
              orgCode: null,
              name: "作训科",
              leader: null,
              value: "b85859d8-1c73-4a0c-832d-425c7237f5b0",
              nodeType: "OrgOrganization",
              modifyTime: 1524894422000,
              simpleName: "作训科",
              icon: "/pro_icons/plat/tree/deptTree.png",
              text: "作训科",
              fax: null,
              weburl: null,
              sortOrder: 1000,
              isUse: 1,
              zipcode: null,
              levelCode: "001001001",
              code: "ZXK",
              recordSort: 3,
              creatorName: "developer",
              address: null,
              email: null,
              attributes: {},
              fldtag: null,
              orgLevel: 3
            }
          ]
        }
      ],
      childlistarr: [{name:"1",id:1}],
      IsgetThisWeekWorkInfo: [
        {
          id: "d570fcd1-a140-4c4a-b7b7-f4cf019dbf17",
          timeName: "早操",
          content: "写日报",
          trainContent: "3"
        },
        {
          id: "f40770e8-c791-4380-92a4-53623d6284b6",
          timeName: "上午",
          content: "无",
          trainContent: "机动"
        },
        {
          id: "69e6b6b9-566b-423b-9aae-2e84175270cd",
          timeName: "下午",
          content: "无",
          trainContent: "机动"
        },
        {
          id: "2e6b18b5-d4c0-4c33-86e6-478004fc1bbd",
          timeName: "111",
          content: "无",
          trainContent: "机动"
        }
      ],
      changeTime: "",
      changeId: localStorage.getItem("loginOrgId")
    };
  },
  watch: {},
  created() {
    this.changeTime = this.conversionSecond(new Date());
    this.getOrgTreePublic();
    this.getThisWeekWorkInfo(this.changeId);
  },
  mounted() {
    this.getTimes();
    this.current = this.conversion();
  },
  destroyed() {},
  methods: {
    // 1.战备工作-部门导航
    async getOrgTreePublic() {
      let boxarr = [];
      this.childlistname = '';
      this.officearr  = []
      let res = await this.$req(window.api.getOrgTreePublic, {
        code: "org.queryOrganization"
      });
      this.basename = {
        id: res.data.children[0].id,
        name: res.data.children[0].name
      };
      this.childlistname = res.data.children[0].name;
      this.changename = res.data.children[0].name;
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
    },
    //  1.工作计划-每日工作
    async getThisWeekWorkInfo(id) {
      this.IsgetThisWeekWorkInfo = []
      let res = await this.$req(window.api.getThisWeekWorkInfo, {
        orgId: id,
        queryDate: this.changeTime
      });
      if (typeof res.data == "string") {
        // this.$message.error("数据错误!");
      } else {
        this.IsgetThisWeekWorkInfo = res.data;
      }
    },
    // 点击基地/团/营的按钮以及下拉选项
    dropdown(id, boolean ,name) {
      this.changeId = id;
      this.childlistname = name;
      if(boolean){
        this.changename = name;
        
      }
      this.getThisWeekWorkInfo(this.changeId);
    },
    getTimes() {
      // 默认显示本周
      let arr = [];
      for (let index = 0; index < 7; index++) {
        let date = new Date(
          this.showWeekFirstDay().getTime() + 86400000 * index
        );
        arr.push({
          // TAG用作唯一标识符
          TAG: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
          isdate: date
        });
        // 时间池
        this.timeData = arr;
      }
    },
    leftBtn() {
      // 得到当前显示的上周一时间戳
      let num = this.timeData[0].isdate.getTime() - 86400000 * 7;
      let arr = [];
      for (let index = 0; index < 7; index++) {
        let date = new Date(num + 86400000 * index);
        arr.push({
          TAG: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
          isdate: date
        });
        this.timeData = arr;
      }
    },
    rightBtn() {
      // 得到当前显示的下周一时间戳
      let num = this.timeData[0].isdate.getTime() + 86400000 * 7;
      let arr = [];
      for (let index = 0; index < 7; index++) {
        let date = new Date(num + 86400000 * index);
        arr.push({
          TAG: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
          isdate: date
        });
        this.timeData = arr;
      }
    },
    change(date) {
      this.current = this.conversion(date);
      this.changeTime = this.conversionSecond(date.isdate);
      this.getThisWeekWorkInfo(this.changeId);
    },
    // 本周第一天
    showWeekFirstDay() {
      var Nowdate = new Date();
      var WeekFirstDay = new Date(Nowdate.getTime() - (Nowdate.getDay()||7 - 1) * 86400000);
      return WeekFirstDay;
    },
    // new Date()格式的时间转化成:2020年1月1日 周几
    conversion(isdate) {
      if (!!isdate) {
        let isdates = isdate.isdate;
        this.yearandmonthanddate = `${isdates.getFullYear()}${isdates.getMonth()}${isdates.getDate()}`;
        let month = isdates.getMonth() + 1;
        let year = isdates.getFullYear(); //取得4位数的年份
        let date = isdates.getDate(); //返回日期月份中的天数（1到31）getDay
        this.getDate = date;
        let getDay = this.weekday[isdates.getDay()];
        return `${year}年  ${month}月  ${date}日 ${getDay}`;
      } else {
        // 当无参时
        this.yearandmonthanddate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear(); //取得4位数的年份
        let date = new Date().getDate(); //返回日期月份中的天数（1到31）
        this.getDate = date;
        let getDay = this.weekday[new Date().getDay()];
        return `${year}年 ${month}月  ${date}日 ${getDay}`;
      }
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
    },
    // 2020-03-09之类
    conversionSecond(date) {
      let year = new Number();
      let month = new Number();
      let day = new Number();
      year = date.getFullYear();
      if (date.getMonth() + 1 < 10) {
        month = `0${date.getMonth() + 1}`;
      } else {
        month = date.getMonth() + 1;
      }
      if (date.getDate() < 10) {
        day = `0${date.getDate()}`;
      } else {
        day = date.getDate();
      }
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style scoped>
.gaine {
  width: 100%;
  padding-right: 2vw;
  padding-left: 2vw;
  margin-top: 4vw;
}

.two-right > .title {
  margin-top: 7vw;
  height: 3vw;
  line-height: 3vw;
  color: #fff;
  font-size: 0.15rem;
  padding-left: 6vw;
}

.two-right {
  height: 20vw;
  width: 100%;
}

.two-right > .content {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.two-right > .content > table {
  width: 100%;
  color: #fff;
  font-size: 0.1rem;
  text-align: center;
  border: 1px solid #4a7bdc;
  margin-top: 2vw;
}

* {
  margin: 0;
  box-sizing: border-box;
}
.lay-Box {
  width: 100%;
}

.day-items .change {
  background: #fdd100;
  color: #1f3d7a;
}

.day-items:hover {
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

.lay-two .day-items .day-p {
  margin-bottom: 0;
  text-align: center;
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
  margin-top: 2.5vw;
  border: 1px solid #5a8be3;
}

.lay-three .title {
  display: flex;
  align-items: center;
  height: 3vw;
  line-height: 3vw;
  text-align: left;
  padding-left: 3vw;
  font-size: 0.15rem;
}

.lay-three .title img {
  width: 2.5vw;
  height: 2.5vw;
  margin-right: 1vw;
}

.lay-three {
  margin-top: 6vw;
  text-align: center;
  color: #c9d0e1;
  height: 110vw;
  font-size: 0.1rem;
  width: 100%;
  padding-left: 1.8vw;
  padding-right: 1.8vw;
}


.lay-three .table-box {
  height: 95%;
  width: 100%;
  overflow: scroll;
  margin-top: 1vw;
}

.two-timer {
  margin-top: 2vw;
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
  margin-top: 3vw;
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
  background-image: linear-gradient(#1b448f, #1e3e80, #1c428a);
  border:none;
  color: #ffffff;
  font-size: 0.1rem;
  text-align: center;
}

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
.lay-one /deep/.ivu-dropdown .ivu-dropdown-rel a {
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
</style>