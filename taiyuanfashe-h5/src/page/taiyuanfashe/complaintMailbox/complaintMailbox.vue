<template>
  <div id="complaintMailbox">
    <Header></Header>
    <img class="back" src="../../../../static/images/05.png" alt />
    <Tab></Tab>
    <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>
    <section class="box">
      <template v-if="!active">
        <div class="submit">
          <nav>
            <img src="../../../../static/images/Index_Box_Icon.png" alt />
            <div>举报信箱</div>
          </nav>
          <div class="text-box">
            <div class="text">
              <textarea v-model="submitContent"></textarea>
            </div>
          </div>
          <div class="buttons">
            <div class="box-buttons">
              <button class="reset" @click="activeEvent()">返回</button>
              <button class="reset" @click="reset">重置</button>
              <button class="submit-button" @click="submit">提交</button>
            </div>
          </div>
        </div>
        
      </template>
      <p v-if="active">
        <button @click="activeEvent()">举报信箱</button>
      </p>
      <div class="telephone">监督电话：03504360326</div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Gohome from "../../../components/taiyuanfashe/Gohome";
export default {
  name: "complaintMailbox",
  components: {
    Header,
    Tab,
    Gohome
  },
  data() {
    return {
      submitContent: "",
      active: true
    };
  },
  created() {},
  methods: {
    activeEvent(){
      this.submitContent = "";
      this.active = !this.active
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

      if (this.submitContent != "") {
        this.bwjdcsuggest();
        this.submitContent = "";
        this.$message.info("提交成功");
        this.active = true;
      } else {
        this.$message.info("不能为空!");
      }
      setTimeout(() => {
        this.$message.destroy();
      }, 1000);
    },
    // 1.举报信箱
    async bwjdcsuggest() {
      let res = await this.$req(window.api.bwjdcsuggest, {
        suggest: this.submitContent
      });
    }
  },
  destroyed() {
    this.$message.destroy();
  }
};
</script>

<style scoped>
.telephone {
  margin-top: 2vw;
  color: #fff;
  font-size: 0.5rem;
  text-indent: 1rem;
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}

p {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p > button {
  width: 80vw;
  height: 60vw;
  color: #3e6eea;
  background-color: #2d579bb9;
  border-radius: 1vw;
  font-size: 0.8rem;
  border: none;
  margin-bottom: 10vw;
}

.box {
  padding-left: 2vw;
  padding-right: 2vw;
  margin-top: 5vw;
  height: 150vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.box > .submit {
  border: 2px solid #3e6eea;
  width: 100%;
  height: 60vw;
  border-radius: 1vw;
  margin-top: 5vw;
  background-color: #2d579b;
}

.box > .submit > nav {
  display: flex;
  align-items: center;
  margin-top: 3vw;
  margin-left: 3vw;
}

.box > .submit > nav > img {
  width: 3vw;
  height: 3vw;
}

.box > .submit > nav > div {
  color: #fff;
  font-size: 0.18rem;
  margin-left: 1vw;
}

.box > .submit > .text-box {
  width: 100%;
  display: flex;
  justify-content: center;
}

.box > .submit > .text-box > .text {
  width: 90%;
  margin-top: 2vw;
  height: 40vw;
  background-color: #385ab69a;
}

.box > .submit > .text-box > .text > textarea {
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 0.1rem;
  background-color: #3e6fea00;
  resize: none;
}

.box > .submit > .buttons > .box-buttons {
  display: flex;
  justify-content: flex-end;
  width: 90%;
}

.box > .submit > .buttons {
  margin-top: 1vw;
  width: 100%;
  display: flex;
  justify-content: center;
}

.box > .submit > .buttons > .box-buttons > button {
  width: 8vw;
  height: 3.5vw;
  line-height: 3.5vw;
  border-radius: 0.5vw;
  margin-left: 2vw;
  border: none;
  font-size: 0.13rem;
}

.box > .submit > .buttons > .box-buttons > button:hover {
  cursor: pointer;
}

.box > .submit > .buttons > .box-buttons > .reset {
  color: #666666;
}

.box > .submit > .buttons > .box-buttons > .submit-button {
  background-color: #fdd100;
  color: #fff;
}
</style>