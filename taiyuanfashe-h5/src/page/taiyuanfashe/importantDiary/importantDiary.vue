// 要事日记
<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/024.png" alt />
    <Tab></Tab>
      <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>
    <div id="box">
      <div class="top">
        <div class="change-date">
          <div class="change-date-E">
            <div>开始日期</div>
            <div>结束日期</div>
          </div>
          <a-range-picker @change="onChange" />
        </div>
        <div class="change-dropdown">
          1111111111111
          <!-- <a-dropdown placement="bottomCenter" :trigger="['click']">
            <a-button>11111111111</a-button>
            <a-menu slot="overlay">
              <a-menu-item @click="dropdown('11')">1111</a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </div>
        <div class="reset-retrieval">
          <div>重置</div>
          <div>检索</div>
        </div>
      </div>
      <div id="action">
        <div>添加</div>
        <div>编辑</div>
        <div>打印</div>
        <div>预览</div>
        <div>删除</div>
      </div>

      <div id="table-checkbox">
        <table border="1">
          <tr>
            <th>
              <img
                src="../../../../static/images/checkbox_no.png"
                v-if="!checkall"
                alt
                @click="checkAll"
              />
              <img
                src="../../../../static/images/checkbox_yes.png"
                v-if="checkall"
                alt
                @click="checkAll"
              />
            </th>
            <th>填写日期</th>
            <th>值班员</th>
            <th>编制人数</th>
            <th>现有人数</th>
            <th>早晨到课率</th>
            <th>上午到课率</th>
            <th>下午到课率</th>
            <th>晚上到课率</th>
          </tr>
          <tr v-for="(item, index) in tablearr" :key="index" @click="ischeck(item)">
            <th>
              <img src="../../../../static/images/checkbox_yes.png" v-if="item.check" alt />
              <img src="../../../../static/images/checkbox_no.png" v-else alt />
            </th>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
          </tr>
        </table>
      </div>
    </div>
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
      checkall: false,
      tablearr: [
        {
          id: "4564",
          date: "2019-01-01",
          pop: "王莫某",
          compile: "30",
          existing: "26",
          morn: "100%",
          am: "100%",
          pm: "100%",
          nig: "100%",
          check: false
        },
        {
          id: "4896564",
          date: "2019-01-01",
          pop: "王莫某",
          compile: "30",
          existing: "26",
          morn: "100%",
          am: "100%",
          pm: "100%",
          nig: "100%",
          check: false
        }
      ],
      checkid: []
    };
  },
  mounted() {},
  watch: {
    checkid(news, olds) {
      if (news.length == this.tablearr.length) {
        this.checkall = true;
      } else {
        this.checkall = false;
      }
    }
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    dropdown(e) {
      console.log(e);
    },
    checkAll() {
      this.checkall = !this.checkall;
    },
    ischeck(item) {
      let obj = {
        id: item.id
      };
      let index = this.tablearr.findIndex(item => {
        if (obj.id === item.id) {
          return true;
        } else {
          return false;
        }
      });
      this.tablearr[index]["check"] = !this.tablearr[index]["check"];
      let arr = this.tablearr;
      this.checkid = [];
      for (let index = 0; index < arr.length; index++) {
        if (arr[index]["check"]) {
          this.checkid.push(arr[index]["id"]);
        }
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#table-checkbox > table img:hover {
  cursor: pointer;
}

#table-checkbox > table > tr {
 height: 5vw;
}

#table-checkbox > table {
  border: 1px solid #3a5eca;
  color: #fff;
  text-align: center;
  width: 100%;
  font-size: 0.1rem;
}

/* #table-checkbox::-webkit-scrollbar{
  width:1px;
  height:50px;
}

#table-checkbox::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
#table-checkbox::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
#table-checkbox::-webkit-scrollbar-thumb:hover{
  background: #333;
}
#table-checkbox::-webkit-scrollbar-corner{
  background: #179a16;
} */

#table-checkbox {
  height: 20vw;
  overflow-y: scroll;
  margin-top: 2vw;
  width: 100%;
}

#action > div:hover {
  cursor: pointer;
}

#action > div {
  width: 6.5vw;
  text-align: center;
  color: rgba(0, 0, 0, 0);
}

#action {
  margin-top: 2vw;
  display: flex;
  justify-content: space-between;
  width: 38vw;
  height: 4vw;
}




.reset-retrieval > div:hover {
  cursor: pointer;
}

.reset-retrieval > div {
  text-align: center;
  width: 7vw;
  height: 4vw;
  line-height: 4vw;
  color: #ff000000;
}

.reset-retrieval {
  display: flex;
  justify-content: space-between;
  width: 15vw;
  height: 4vw;
  margin-left: 3vw;
}

.change-dropdown /deep/ .ant-btn.ant-dropdown-trigger {
  width: 17vw;
  height: 100%;
  background-color: #a8b2cf00;
  border-color: #a8b2cf00;
  color: #6b80b2;
  font-size: 0.1rem;
}

.change-dropdown {
  width: 17vw;
  height: 4vw;
  line-height: 4vw;
  text-align: center;
  margin-left: 2.2vw;
  color: #6b80b2;
}

.change-date-E {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4vw;
}

.change-date-E > div {
  width: 20vw;
  height: 4vw;
  line-height: 4vw;
  text-align: center;
  font-size: 0.1rem;
  color: #a8b2cf;
  z-index: -1;
}

.change-date {
  width: 42.5vw;
  display: flex;
  position: relative;
}

.change-date /deep/ svg {
  color: rgba(240, 248, 255, 1);
}

.change-date /deep/ .ant-calendar-range-picker-separator {
  color: rgba(240, 248, 255, 1);
  z-index: 555;
}

.change-date /deep/ .ant-calendar-picker-input.ant-input {
  width: 42.5vw;
  height: 4vw;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(240, 248, 255, 0);
  opacity: 0;
  border-color: rgba(240, 248, 255, 0);
}

.change-date
  /deep/
  .ant-calendar-picker-input.ant-input
  ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(97, 58, 8, 0);
}
.change-date /deep/ .ant-calendar-picker-input.ant-input :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(97, 58, 8, 0);
}
.change-date /deep/ .ant-calendar-picker-input.ant-input ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(97, 58, 8, 0);
}
.change-date
  /deep/
  .ant-calendar-picker-input.ant-input
  :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(97, 58, 8, 0);
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}

#box > .top {
  display: flex;
  height: 4vw;
}

#box {
  margin-top: 6.8vw;
  padding-left: 2vw;
  padding-right: 2vw;
  width: 100%;
  height: 485px;
}
</style>