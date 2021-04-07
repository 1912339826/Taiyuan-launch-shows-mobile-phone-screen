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
    <div class="lay-one">
      <div class="one-tab">
        <div
          v-for="(item, index) in IszzgzMngOrgBuild"
          :key="index"
          @click="tabButton(index)"
          :class="item['text'] == tabHeader['text'] ? 'tab-change' : ''"
        >
          <span>{{ item["text"] }}</span>
        </div>
      </div>
      <div style="width: 100%; height: 51.5vw;" class="tree-box">
        <!-- 46.7 -->
        <Tree :data2="TreeData" ref="Tree" />
        <!-- <Tree/> -->
      </div>
    </div>

    <section class="box-section">
      <div class="gaine lay-two">
        <nav class="Istitle">
          <div>
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">教育计划</div>
          </div>

          <div class="two-header">
            <img
              src="../../../../static/images/circle_left_03.png"
              alt
              @click="Left"
            />
            <div>{{ istime.year }}年 {{ istime.month }}月</div>
            <img
              src="../../../../static/images/circle_right_03.png"
              alt
              @click="Right"
            />
          </div>
        </nav>
        <div class="content" ref="box">
          <div class="two-center">
            <template v-if="IsgetMonthEduRecordList != []">
              <div
                class="two-center-items"
                v-for="(item, index) in IsgetMonthEduRecordList"
                :key="index"
              >
                <div class="child">
                  <div class="title_top">
                    <span>第{{ index + 1 }}周</span>
                  </div>
                  <div class="content">
                    <div
                      v-for="(item, indexs) in item.eduName.split(',')"
                      :key="indexs"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="two-center-items"></div>
            </template>
          </div>
        </div>
      </div>
      <div class="gaine lay-three">
        <nav class="Istitle">
          <div>
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">教育统计</div>
          </div>
          <div class="three-tab">
            <div
              v-for="item in timeTabData"
              :key="item.name"
              :class="item.name == timeTabHeader ? 'active' : ''"
              @click="timeTabButton(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </nav>
        <div class="content" ref="box">
          <div class="three-center">
            <div style="width: 100%; height: 100%">
              <Pie
                :datas="IsgetEduTypeCountChar"
                :roseType="true"
                ref="Pie"
              ></Pie>
            </div>
          </div>
        </div>
      </div>
      <div class="gaine lay-four">
        <nav class="Istitle">
          <div>
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div class="text">会议类型</div>
          </div>
          <div class="four-tab">
            <div class="date">
              <div class="four-header form">
                <img
                  src="../../../../static/images/circle_left_03.png"
                  alt
                  @click="meetingFormtLeft"
                />
                <div>{{ meetingForm.year }}年 {{ meetingForm.month }}月</div>
                <img
                  src="../../../../static/images/circle_right_03.png"
                  alt
                  @click="meetingFormtRight"
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
              <div class="four-header to">
                <img
                  src="../../../../static/images/circle_left_03.png"
                  alt
                  @click="meetingTotLeft"
                />
                <div>{{ meetingTo.year }}年 {{ meetingTo.month }}月</div>
                <img
                  src="../../../../static/images/circle_right_03.png"
                  alt
                  @click="meetingTotRight"
                />
              </div>
            </div>

            <a-button type="primary" size="small" @click="listMeetType">
              查询
            </a-button>
          </div>
        </nav>
        <div class="content" ref="box">
          <div class="four-center">
            <div style="width: 100%; height: 100%">
              <Pie
                :datas="meetingFormat"
                :roseType="true"
                ref="PieMeetingFormat"
              ></Pie>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Pie from "../../../components/taiyuanfashe/Pie";
import Gohome from "../../../components/taiyuanfashe/Gohome";
import Relation from "../../../components/taiyuanfashe/Relation";
import Tree from "../../../components/taiyuanfashe/Tree";
export default {
  name: "InEducation",
  components: {
    Header,
    Tab,
    Pie,
    Gohome,
    Relation,
    Tree,
  },
  data: function () {
    return {
      TreeData: [],
      tabHeader: [],
      timeTabData: [{ name: "月度" }, { name: "季度" }, { name: "年度" }],
      timeTabHeader: "月度",
      istime: { year: "2020", month: "01" },
      meetingForm: { year: "2021", month: "01" },
      meetingTo: { year: "2021", month: "01" },
      IsgetMonthEduRecordList: [
        { week: "01", eduName: "主题教育,思想教育" },
        { week: "02", eduName: "思想教育,心理卫生教育" },
        { week: "03", eduName: "安全教育" },
        { week: "04", eduName: "安全教育" },
        { eduName: "无", week: "05" },
      ],
      IsgetEduTypeCountChar: [],
      IszzgzMngOrgBuild: [],
      childrenOne: false,
      childrenTwo: false,
      meetingFormat: [],
      meetingFormat_dictionaries: {
        "01": "党支部会议",
        "02": "团支部会议",
        "03": "军人委员会议",
        "04": "党委中心组学习会议",
      },
    };
  },
  mounted() {
    let clientWidth =
      document.getElementsByClassName("lay-Box")[0].clientWidth / 100;
    let clientHeight = document.getElementsByClassName("lay-Box")[0]
      .clientHeight;
    document
      .getElementsByClassName("back")[0]
      .setAttribute("height", clientHeight + 15 * clientWidth);
  },
  created() {
    if (new Date().getMonth() + 1 < 10) {
      this.istime.month = `0${new Date().getMonth() + 1}`;
      this.meetingTo.month = `0${new Date().getMonth() + 1}`;
      this.meetingForm.month = `0${new Date().getMonth() + 1}`;
    } else {
      this.istime.month = `${new Date().getMonth() + 1}`;
      this.meetingTo.month = `${new Date().getMonth() + 1}`;
      this.meetingForm.month = `${new Date().getMonth() + 1}`;
    }
    this.istime.year = new Date().getFullYear();
    this.meetingTo.year = new Date().getFullYear();
    this.meetingForm.year = new Date().getFullYear();
    this.meetingFormtLeft();
    this.zzgzMngOrgBuild(0);
    this.getMonthEduRecordList(this.istime);
    this.getEduTypeCountChar("01");
    this.listMeetType();
  },
  methods: {
    // 1.政治工作-党委结构图  ??~~!!
    async zzgzMngOrgBuild(index) {
      this.TreeData = [];
      this.IszzgzMngOrgBuild = [];
      let arr = [];
      let box = [];
      let res = await this.$req(window.api.zzgzMngOrgBuild, {
        parentId: localStorage.getItem("loginOrgId"),
      });
      this.IszzgzMngOrgBuild = res.data.children;
      this.tabHeader = res.data.children[index];
      arr = this.treeTransArray(res.data.children, "children");
      box = this.treeToList(arr, "id", "parentId", "children", "name", "icon")[
        index
      ];
      this.TreeData.push(box);
      this.$refs.Tree.visitor();
    },
    // 2.政治工作-月教育计划
    async getMonthEduRecordList(time) {
      this.$message.destroy();
      this.IsgetMonthEduRecordList = [];
      let res = await this.$req(window.api.getMonthEduRecordList, {
        yearMonth: `${time.year}-${time.month}`,
      });
      this.IsgetMonthEduRecordList = res.data.objectList;
      if (res.data.objectList.length == 0) {
        this.$message.warn("当前没有内容");
      }
    },
    // 3.政治工作-教育类型次数统计饼图
    async getEduTypeCountChar(change) {
      this.IsgetEduTypeCountChar = [];
      let arr = [];
      let boxarr = [];
      let res = await this.$req(window.api.getEduTypeCountChar, {
        queryType: change,
      });
      arr = JSON.parse(res.data.data);
      // 此处判断后台数据是否异常
      if (arr.length != 0) {
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          this.IsgetEduTypeCountChar.push({
            value: element[1],
            name: element[0],
          });
        }
      } else {
        this.IsgetEduTypeCountChar.push({
          value: undefined,
          name: undefined,
        });
      }
    },
    // 4.政治工作-会议类型饼图
    async listMeetType() {
      this.meetingFormat = [];
      let arr = [];
      let res = await this.$req(window.api.listMeetType, {
        meetingTimeStart: `${this.meetingForm.year}-${this.meetingForm.month}`,
        meetingTimeEnd: `${this.meetingTo.year}-${this.meetingTo.month}`,
      });
      arr = res.data.objectList;
      // 此处判断后台数据是否异常
      if (arr.length != 0) {
        for (let index = 0; index < 4; index++) {
          this.meetingFormat.push({
            value: arr[0]["0" + (index + 1)],
            name: this.meetingFormat_dictionaries["0" + (index + 1)],
          });
        }
        this.$refs.PieMeetingFormat.visitor();
      } else {
        this.meetingFormat.push({
          value: undefined,
          name: undefined,
        });
      }
    },
    tabButton(index) {
      // this.tabHeader = item;
      this.zzgzMngOrgBuild(index);
    },
    timeTabButton(item) {
      this.timeTabHeader = item.name;
      let look = { 月度: "01", 季度: "02", 年度: "03" };
      this.getEduTypeCountChar(look[item.name]);
    },
    // 上个月
    Left() {
      if (this.istime.month == "01") {
        this.istime.month = "12";
        this.istime.year = `${Number(this.istime.year) - 1}`;
      } else {
        if (Number(this.istime.month) - 1 < 10) {
          this.istime.month = `0${Number(this.istime.month) - 1}`;
        } else {
          this.istime.month = `${Number(this.istime.month) - 1}`;
        }
      }
      this.getMonthEduRecordList(this.istime);
    },
    // 下个月
    Right() {
      if (this.istime.month == "12") {
        this.istime.month = "01";
        this.istime.year = `${Number(this.istime.year) + 1}`;
      } else {
        if (Number(this.istime.month) + 1 < 10) {
          this.istime.month = `0${Number(this.istime.month) + 1}`;
        } else {
          this.istime.month = `${Number(this.istime.month) + 1}`;
        }
      }
      this.getMonthEduRecordList(this.istime);
    },
    // 会议类型Form上个月
    meetingFormtLeft() {
      if (this.meetingForm.month == "01") {
        this.meetingForm.month = "12";
        this.meetingForm.year = `${Number(this.meetingForm.year) - 1}`;
      } else {
        if (Number(this.meetingForm.month) - 1 < 10) {
          this.meetingForm.month = `0${Number(this.meetingForm.month) - 1}`;
        } else {
          this.meetingForm.month = `${Number(this.meetingForm.month) - 1}`;
        }
      }
    },
    // 会议类型Form下个月
    meetingFormtRight() {
      if (this.meetingForm.month == "12") {
        this.meetingForm.month = "01";
        this.meetingForm.year = `${Number(this.meetingForm.year) + 1}`;
      } else {
        if (Number(this.meetingForm.month) + 1 < 10) {
          this.meetingForm.month = `0${Number(this.meetingForm.month) + 1}`;
        } else {
          this.meetingForm.month = `${Number(this.meetingForm.month) + 1}`;
        }
      }
    },
    // 会议类型To上个月
    meetingTotLeft() {
      if (this.meetingTo.month == "01") {
        this.meetingTo.month = "12";
        this.meetingTo.year = `${Number(this.meetingTo.year) - 1}`;
      } else {
        if (Number(this.meetingTo.month) - 1 < 10) {
          this.meetingTo.month = `0${Number(this.meetingTo.month) - 1}`;
        } else {
          this.meetingTo.month = `${Number(this.meetingTo.month) - 1}`;
        }
      }
    },
    // 会议类型To下个月
    meetingTotRight() {
      if (this.meetingTo.month == "12") {
        this.meetingTo.month = "01";
        this.meetingTo.year = `${Number(this.meetingTo.year) + 1}`;
      } else {
        if (Number(this.meetingTo.month) + 1 < 10) {
          this.meetingTo.month = `0${Number(this.meetingTo.month) + 1}`;
        } else {
          this.meetingTo.month = `${Number(this.meetingTo.month) + 1}`;
        }
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
        .map(function (item) {
          item[key] = [];
          return item;
        });
    },
    // 普通数组转化成树状结构
    treeToList(arr, father_id, child_id, children, name, icon) {
      // 一级节点数组
      let arrdata = [];
      let label = {
        backgroundColor: {
          image: "",
        },
      };
      // 拿到一级节点
      for (let item of arr) {
        console.log(item[child_id]);
        if (item[child_id] == "root") {
          // label.backgroundColor.image = `${localStorage.getItem("BASE_URLA")}${item[icon]}`;
          label.backgroundColor.image = `${window.BASE_URLA}${item[icon]}`;
          let obj = {
            [name]: item["text"],
            [father_id]: item[father_id],
            [child_id]: item[child_id],
            [children]: [],
            // ["label"]: label
          };
          // label.backgroundColor{image:''}
          // 对每一级节点进行子节点获取
          console.log(obj);
          obj[children] = this.treeToList_no_one(
            arr,
            item,
            father_id,
            child_id,
            children,
            name
            // label
          );
          arrdata.push(obj);
        }
      }
      return arrdata;
    },
    treeToList_no_one(arr, node, father_id, child_id, children, name, label) {
      let childrenBox = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][child_id] == node[father_id]) {
          let obj = {
            [name]: arr[i]["text"],
            [father_id]: arr[i][father_id],
            [child_id]: arr[i][child_id],
            [children]: [],
            // ["label"]: arr[i][label]
          };
          arr.splice(i, 1);
          i--;
          if (arr.length > 0) {
            //递归查找子节点
            obj[children] = this.treeToList_no_one(
              arr,
              obj,
              father_id,
              child_id,
              children,
              name
              // label
            );
          }
          childrenBox.push(obj);
        }
      }
      return childrenBox;
    },
  },
  destroyed() {
    this.$message.destroy();
  },
};
</script>

<style scoped>
.lay-four {
  margin-top: 4vw;
  width: 100%;
  padding-left: 2vw;
  padding-right: 2vw;
  height: 100%;
}

.lay-four /deep/ .ant-btn-sm {
  font-size: 0.1rem;
  height: 2.5vw;
  padding: 0 1vw;
}

.lay-four .four-center {
  height: 93%;
  width: 100%;
  overflow: scroll;
}

section .lay-four > .content {
  height: 42vw;
}

.lay-four .four-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lay-four .four-tab .date {
  display: flex;
  justify-content: space-between;
}

.lay-four .four-header > img {
  width: 2.8vw;
  height: 2.8vw;
}

.lay-four .four-header > div {
  margin-left: 2vw;
  margin-right: 2vw;
}

.lay-four .four-header {
  padding-right: 2.5vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.12rem;
  color: #fff;
}

.lay-four .form {
  padding-right: 0;
}

.lay-three .three-center {
  height: 93%;
  width: 100%;
  overflow: scroll;
}

.lay-three .three-tab > .active {
  font-size: 0.12rem;
  color: #fff;
  border-bottom: 1px solid #fff;
}
.lay-three .three-tab > div {
  margin-left: 2vw;
  color: #546b9f;
  font-size: 0.1rem;
}

.lay-three .three-tab {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 3vw;
  height: 7%;
}

section .lay-three > .content {
  height: 42vw;
}

.lay-three {
  margin-top: 4vw;
  width: 100%;
  padding-left: 2vw;
  padding-right: 2vw;
  height: 100%;
}

.lay-two .two-center > .two-center-items > .child > .content > div {
  width: 100%;
}

.lay-two .two-center > .two-center-items > .child > .content {
  height: 15vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  font-size: 0.15rem;
  background-image: linear-gradient(#233d7b, #265fbf);
  border: 1px solid #3a5cc8;
  border-top: none;
}

.lay-two .two-center > .two-center-items > .child > .title_top {
  height: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.12rem;
  background-color: #28448b;
  border: 1px solid #3a5cc8;
}

.lay-two .two-center > .two-center-items > .child {
  width: 100%;
  color: #fff;
}

.lay-two .two-center > .two-center-items {
  display: flex;
  width: 17vw;
  margin-top: 1vw;
  height: 20vw;
}

.lay-two .two-center {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.lay-two .two-header > img {
  width: 2.8vw;
  height: 2.8vw;
}

.lay-two .two-header > div {
  margin-left: 4vw;
  margin-right: 4vw;
}

.lay-two .two-header {
  padding-right: 2.5vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.12rem;
  color: #fff;
}

.lay-two {
  width: 100%;
  padding-left: 1.8vw;
  padding-right: 2vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 3vw;
}

.lay-one {
  width: 100%;
  height: 57.2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.branch-tier-box-two {
  display: flex;
  justify-content: space-between;
  width: 70vw;
}

.one-header {
  border: 2px solid #3a4dbd;
  background-color: #1b438d;
  width: 35vw;
  height: 7.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vw;
  border-radius: 1vw;
  font-size: 0.2rem;
  color: #fff;
  font-weight: 600;
}

.one-tab .tab-change {
  color: #fff;
  font-weight: 600;
  background: #2a63c5;
}

.one-tab > div:nth-child(3) {
  border-right: 2px solid #3a4dbd;
  border-top-right-radius: 1vw;
  border-bottom-right-radius: 1vw;
}

.one-tab > div:nth-child(2) {
  border-left: 1px solid #306fd6;
  border-right: 1px solid #306fd6;
}

.one-tab > div:nth-child(1) {
  border-left: 2px solid #3a4dbd;
  border-top-left-radius: 1vw;
  border-bottom-left-radius: 1vw;
}

.one-tab > div:hover {
  cursor: pointer;
}

.one-tab > div {
  border-top: 2px solid #3a4dbd;
  border-bottom: 2px solid #3a4dbd;
  width: 23vw;
  height: 100%;
  font-size: 0.15rem;
  color: #6180ba;
  background-color: #1d4a9c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.one-tab {
  height: 7vw;
  border-radius: 1vw;
  margin-top: 3.5vw;
  display: flex;
  justify-content: center;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
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

.gaine > .Istitle > div:nth-child(1) {
  padding-left: 2vw;
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.gaine > .Istitle > div:nth-child(1) > .text {
  margin-left: 0.5vw;
  color: #fff;
  font-size: 0.15rem;
}

.gaine > .Istitle {
  display: flex;
  justify-content: space-between;
  margin-top: 2vw;
}

.gaine > .Istitle > div:nth-child(1) > img {
  width: 3vw;
  height: 3vw;
}
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */
.box-section {
  width: 100%;
  padding-right: 2vw;
  padding-left: 2vw;
}
</style>