<template>
  <div id="Notice">
    <Header></Header>
    <img class="back" src="../../../../static/images/05.png" alt />
    <Tab></Tab>
    <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>
    <section class="box">
      <div class="gaine">
        <div class="tab">
          <!-- <div
            class="tab-list"
            :id="item.code==suggestType?'active':''"
            v-for="(item, index) in tab"
            :key="index"
            @click="tabChange(item.code)"
          >{{item.name}}</div>-->
        </div>

        <div class="content">
          <div
            class="list"
            v-for="(item, index) in IsgetSuggestPage"
            :key="index"
            :title="item.mainTitle"
          >
            <div class="title">{{item.rn}}. {{item.suggest}}</div>
            <div class="text">{{item.suggestTimeStr}}</div>
          </div>
        </div>
        <div id="top">
          <a-pagination
            :defaultCurrent="current"
            :total="rowCount"
            :pageSize.sync="limit"
            @change="change"
            v-model="changeNum"
          />
        </div>
        <div class="submit">
          <nav>
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div>意见提交</div>
          </nav>
          <div class="text-box">
            <div class="text">
              <textarea v-model="submitContent"></textarea>
            </div>
          </div>
          <div class="buttons">
            <div class="box-buttons">
              <button class="reset" @click="reset">重置</button>
              <button class="submit-button" @click="submit">提交</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <a-modal
      title="请选择要提交的意见类型"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :cancelText="'取消'"
      :okText="'确定'"
    >
      <div style="height:20vw;overflow:scroll;">
        <a-radio-group @change="onChange" v-model="value">
          <a-radio
            :style="radioStyle"
            :value="item.code"
            v-for="(item,index) in tab"
            :key="index"
          >{{item.name}}</a-radio>
        </a-radio-group>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Gohome from "../../../components/taiyuanfashe/Gohome";
export default {
  name: "Notice",
  components: {
    Header,
    Tab,
    Gohome
  },
  data() {
    return {
      value: 1,
      radioStyle: {
        display: "block",
        alignContent: "center",
        height: "3vw",
        lineHeight: "3vw",
        fontSize: "0.1rem"
      },
      current: 1,
      rowCount: 3,
      limit: 20,
      IsgetSuggestPage: [
        {
          suggest: "55555555555",
          suggestTimeStr: "2020-04-03",
          rn: 1
        }
      ],
      tab: [],
      suggestType: "",
      submitContent: "",
      page: 1,
      changeNum: 1,
      visible: false,
      confirmLoading: false
    };
  },
  created() {
    this.list_category_value2();
    // this.getSuggestPage(0);
    this.tabChange("");
  },
  watch: {
    suggestType() {
      this.page = 1;
      this.change(this.page);
    }
  },
  methods: {
    // 1.通知公告列表-分页 BwSuggestType
    async list_category_value2() {
      this.tab = [];
      let res = await this.$req(window.api.list_category_value2, {
        categoryCode: "BwSuggestType"
      });
      this.tab = res.data;
      this.value = this.tab[0].code;
      this.getSuggestPage(0);
    },

    //  2.建言建议-保存意见
    async save() {
      // 01
      this.$message.destroy();
      let res = await this.$req(window.api.save, {
        // suggestType: this.value,
        suggestType: "01",
        suggest: this.submitContent
      });
      this.$message.info(res.data.message);
      // this.page = 1;
      // this.changeNum = 1;
      this.getSuggestPage(this.page * 20 - 20);
    },
    // 3.建言建议-获取意见列表-分页
    async getSuggestPage(Start) {
      let res = await this.$req(window.api.getSuggestPage, {
        suggestType: "",
        Start: Start
      });
      this.limit = res.data.limit;
      this.rowCount = res.data.rowCount;
      this.IsgetSuggestPage = res.data.objectList;
    },
    tabChange(index) {
      this.suggestType = index;
      this.getSuggestPage(0);
    },
    change(page) {
      this.changeNum = page;
      this.page = page;
      this.getSuggestPage(this.page * 20 - 20);
    },
    reset() {
      this.$message.destroy();
      this.submitContent = "";
      this.$message.info("已重置");
      setTimeout(() => {
        this.$message.destroy();
      }, 1000);
    },
    submit() {
      this.$message.destroy();
      // if (this.suggestType == "") {
      //   this.$message.info("请选择类型!");
      // } else {
      //   if (this.submitContent == "") {
      //     this.$message.info("请填写内容!");
      //   } else {
      if (this.submitContent != "") {
        this.save();
        this.submitContent = "";
      } else {
        this.$message.info("请填写内容!");
      }

      // this.visible = true;
      // }
      // }
    },
    handleOk(e) {
      this.save();
      this.confirmLoading = true;
      this.visible = false;
      this.confirmLoading = false;
    },
    onChange() {},
    handleCancel() {
      this.visible = false;
    }
  },
  destroyed() {
    this.$message.destroy();
  }
};
</script>
<style scoped>
.gaine {
  height: 143vw;
  background-color: #2d579b;
  border-radius: 1vw;
  border: 2px solid #445ee7;
}

#Notice > .box {
  padding-left: 2vw;
  padding-right: 2vw;
  margin-top: 3vw;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.box > .gaine > .tab > #active {
  color: #fff;
  font-size: 0.18rem;
  border-bottom: 2px solid #fff;
  font-weight: 900;
}

.box > .gaine > .tab > .tab-list:hover {
  cursor: pointer;
  color: #fff;
}

.box > .gaine > .tab > .tab-list {
  color: rgb(151, 150, 150);
  font-size: 0.15rem;
  margin-left: 1vw;
}

.box > .gaine > .tab {
  display: flex;
  justify-content: flex-end;
  /* margin-top: 2vw; */
  margin-right: 2vw;
}

.box > .gaine > #top /deep/.ant-pagination-item-active {
  -moz-box-shadow: 0px -5px 10px #49b9e8;
  -webkit-box-shadow: 0px -5px 10px #49b9e8;
  box-shadow: 0px -5px 10px #49b9e8;
  color: #49b9e8;
}

.box > .gaine > #top {
  display: flex;
  justify-content: center;
  margin-top: 2vw;
}

.list {
  margin-bottom: 0.1vw;
  border-bottom: 1px solid #0a4f91;
}

.list > .title {
  padding-left: 0.15rem;
  font-size: 0.15rem;
  color: #fff;
}

.list > .text {
  padding-left: 0.2rem;
  font-size: 0.1rem;
  color: #fff;
  line-height: 3vw;
  text-indent: 0.2rem;
}

.box > .gaine > .content {
  width: 100%;
  height: 90vw;
  border-top: 1px solid #445ee7;
  background-color: rgba(31, 66, 121, 0.76);
  overflow: scroll;
  border-radius: 1vw;
}

.box > .gaine > .submit {
  border: 2px solid #3e6eea;
  width: 100%;
  height: 34.5vw;
  border-radius: 1vw;
  margin-top: 5vw;
  background-color: #2d579b;
}

.box > .gaine > .submit > nav {
  display: flex;
  align-items: center;
  margin-top: 3vw;
  margin-left: 3vw;
}

.box > .gaine > .submit > nav > img {
  width: 3vw;
  height: 3vw;
}

.box > .gaine > .submit > nav > div {
  color: #fff;
  font-size: 0.18rem;
  margin-left: 1vw;
}

.box > .gaine > .submit > .text-box {
  /* background-color: #133eb49a; */
  width: 100%;
  display: flex;
  justify-content: center;
}

.box > .gaine > .submit > .text-box > .text {
  width: 90%;
  margin-top: 2vw;
  height: 20vw;
  background-color: #385ab69a;
}

.box > .gaine > .submit > .text-box > .text > textarea {
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 0.1rem;
  background-color: #3e6fea00;
  resize: none;
}

.box > .gaine > .submit > .buttons > .box-buttons {
  display: flex;
  justify-content: flex-end;
  width: 90%;
}

.box > .gaine > .submit > .buttons {
  margin-top: 1vw;
  width: 100%;
  display: flex;
  justify-content: center;
}

.box > .gaine > .submit > .buttons > .box-buttons > button {
  width: 8vw;
  height: 3.5vw;
  line-height: 3.5vw;
  border-radius: 0.5vw;
  margin-left: 2vw;
  border: none;
  font-size: 0.13rem;
}

.box > .gaine > .submit > .buttons > .box-buttons > button:hover {
  cursor: pointer;
}

.box > .gaine > .submit > .buttons > .box-buttons > .reset {
  color: #666666;
}

.box > .gaine > .submit > .buttons > .box-buttons > .submit-button {
  background-color: #fdd100;
  color: #fff;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}
</style>