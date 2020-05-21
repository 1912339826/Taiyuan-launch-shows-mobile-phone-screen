<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/001.png" alt />
    <div class="lay-login">
      <h2>
        账 号 :
        <input type="text" v-model="name" />
      </h2>
      <h2>
        密 码 :
        <input type="password" v-model="password" />
      </h2>
      <!-- <div class="lay-checkbox">
        <div @click="changecheckbox">
          <img src="../../../../static/images/0110_03.png" v-if="checkbox" alt />
          <img src="../../../../static/images/00_03.png" v-else alt />
          <div>自动登录</div>
        </div>
      </div> -->
      <h2>
        <a-button type="primary" @click="Login">登录</a-button>
      </h2>
    </div>
  </div>
</template>



<script>
import Header from "@/components/Header.vue";
import axios from "axios";
export default {
  name: "Login",
  components: {
    Header
  },
  data: function() {
    return {
      name: "",
      password: '',
      checkbox: true
    };
  },
  filter: {},
  created() {
    localStorage.clear();
    // 如果localStorage中存在用户名,则用用户名和密码登录
    // if (!!localStorage.getItem("username")) {
    //   this.Login(
    //     localStorage.getItem("username"),
    //     localStorage.getItem("password")
    //   );
    // }
  },
  mounted() {},
  destroyed() {},
  methods: {
    async Login(username, password) {
      this.$message.destroy()
      let res = await this.$req(window.api.Login, {
        loginname: this.name || username,
        password: this.password
      });
      if (res.data.success) {
        // 登录成功,前往首页
        this.$router.push({ path: "/index" });
        // 将用户ID存储在localStorage中
        localStorage.setItem("orgId", res.data.data.orgId);
        localStorage.setItem("orgLevelCode", res.data.data.orgLevelCode);
        // 存储登录ID
        localStorage.setItem("loginOrgId", res.data.data.orgId);
        // if (this.checkbox) {
        //   // 选中了自动登录,存储用户名和密码
        //   localStorage.setItem("username", this.name);
        //   localStorage.setItem("password", this.password);
        // }
      } else {
        this.$message.error("用户名或者密码错误!");
      }
    },

    // changecheckbox() {
    //   // 自动登录的选择
    //   this.checkbox = !this.checkbox;
    // }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  padding-top: 2vw;
  font-size: 0.15rem;
}
.lay-checkbox {
  text-align: center;
  color: #404040;
  font-size: 0.08rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lay-checkbox > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lay-checkbox > div:hover {
  cursor: pointer;
}

.lay-checkbox div img {
  width: 1vw;
  height: 1vw;
  margin-right: 1vw;
}

input {
  border: 1px solid #cccccc;
}
button {
  height: 4vw;
  padding-left: 4vw;
  padding-right: 4vw;
  background: #436eee;
  border-radius: 1vw;
  text-align: center;
  line-height: 4vw;
  font-size: 0.1rem;
}

button:hover {
  cursor: pointer;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}
.lay-login {
  width: 55.5vw;
  height: 32vw;
  background: #ffffff;
  margin-top: 52vw;
  padding-top: 5vw;
}

.lay-Box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>