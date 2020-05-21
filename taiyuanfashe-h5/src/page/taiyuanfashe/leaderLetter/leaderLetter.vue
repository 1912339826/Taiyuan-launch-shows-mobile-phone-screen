<template>
  <div id="leaderLetter">
    <Header></Header>
    <img class="back" src="../../../../static/images/05.png" alt />
    <Tab></Tab>
     <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>
    <section class="box">
      <div class="submit" v-if="active==1">
        <nav>
          <img src="../../../../static/images/Index_Box_Icon.png" alt />
          <div>团长信箱</div>
        </nav>
        <div class="text-box">
          <div class="text">
            <textarea v-model="TopsubmitContent"></textarea>
          </div>
        </div>
        <div class="buttons">
          <div class="box-buttons">
            <button class="reset" @click="back()">返回</button>
            <button class="reset" @click="reset(1)">重置</button>
            <button class="submit-button" @click="submit(1)">提交</button>
          </div>
        </div>
      </div>
      <div class="submit" v-if="active==2">
        <nav>
          <img src="../../../../static/images/Index_Box_Icon.png" alt />
          <div>政委信箱</div>
        </nav>
        <div class="text-box">
          <div class="text">
            <textarea v-model="ButtomsubmitContent"></textarea>
          </div>
        </div>
        <div class="buttons">
          <div class="box-buttons">
            <button class="reset" @click="back()">返回</button>
            <button class="reset" @click="reset(2)">重置</button>
            <button class="submit-button" @click="submit(2)">提交</button>
          </div>
        </div>
      </div>
      <p v-if="active==0">
        <button @click="activeEvent(1)">团长信箱</button>
        <button @click="activeEvent(2)">政委信箱</button>
      </p>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Gohome from "../../../components/taiyuanfashe/Gohome";
export default {
  name: "leaderLetter",
  components: {
    Header,
    Tab,
    Gohome
  },
  data() {
    return {
      active: 0,
      TopsubmitContent: "",
      ButtomsubmitContent: ""
    };
  },
  methods: {
    back() {
      this.active = 0;
      this.TopsubmitContent = "";
      this.ButtomsubmitContent = "";
    },
    activeEvent(index) {
      this.active = index;
    },
    reset(change) {
      this.$message.destroy();
      if (change == 1) {
        this.TopsubmitContent = "";
      } else {
        this.ButtomsubmitContent = "";
      }
      this.$message.info("已重置");
      setTimeout(() => {
        this.$message.destroy();
      }, 1000);
    },

    submit(change) {
      this.$message.destroy();
      if (change == 1) {
        if (this.TopsubmitContent != "") {
          this.bwleadersuggest();
          this.TopsubmitContent = "";
          this.$message.info("提交成功");
          this.active = 0;
        } else {
          this.$message.info("不能为空");
        }
      } else {
        if (this.ButtomsubmitContent != "") {
          this.bwpoliticalsuggest();
          this.ButtomsubmitContent = "";
          this.$message.info("提交成功");
          this.active = 0;
        } else {
          this.$message.info("不能为空");
        }
      }
      
      setTimeout(() => {
        this.$message.destroy();
      }, 1000);
    },
    // 1.团长信箱
    async bwleadersuggest() {
      let res = await this.$req(window.api.bwleadersuggest, {
        suggest: this.TopsubmitContent
      });
    },
    // 2.政委信箱
    async bwpoliticalsuggest() {
      let res = await this.$req(window.api.bwpoliticalsuggest, {
        suggest: this.ButtomsubmitContent
      });
    }
  },
  destroyed() {
    this.$message.destroy();
  }
};
</script>

<style scoped>
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
  margin-top: 10vw;
}
.box > p {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box > p > button {
  width: 80vw;
  height: 60vw;
  color: #3e6eea;
  background-color: #2d579bb9;
  border-radius: 1vw;
  font-size: 0.8rem;
  border: none;
  margin-bottom: 10vw;
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
  margin-top: 3.8vw;
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