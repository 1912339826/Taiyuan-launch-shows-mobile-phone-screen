<template>
  <div
    id="Gohome"
    @click.left="MY_monitor"
    @click.middle="MY_monitor"
    @contextmenu.prevent="MY_monitor"
  >
    <div class="tohome" @click="tohome">
      <img src="../../../static/images/tohome_03.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      activeTime: "",
      staticTime: ""
    };
  },
  mounted() {
    // 监听页面动作,页面没有任何动作持续一分钟,跳转到首页(/index)
    // chrome and ie
    window.addEventListener("mousewheel", this.MY_monitor, false);
    //// firefox
    window.addEventListener("DOMMouseScroll", this.MY_monitor, false);
    // 监听鼠标键盘按键
    window.addEventListener("keydown", () => {
      this.MY_monitor();
    });
    window.addEventListener("mousedown", this.MY_monitor, false);
    window.addEventListener("mousemove", this.MY_monitor, false);
    this.staticTime = setTimeout(() => {
      // 进入页面之后,一定时间内没有动作,返回首页
      if (!this.active) {
        this.tohome();
      }
    }, 1000 * 60);
  },
  methods: {
    tohome() {
      this.$router.push({ path: "/index" });
    },
    MY_monitor() {
      // 进入页面之后,一定时间之内有动作,清除定时器 this.staticTime,新建定时器this.activeTime
      clearTimeout(this.staticTime);
      this.active = true;
      clearTimeout(this.activeTime);
      this.activeTime = setTimeout(() => {
        this.tohome();
      }, 2000*60);
    }
  },
  destroyed() {
    // 在这清理定时器
    this.active = false;
    clearTimeout(this.activeTime);
    clearTimeout(this.staticTime);
  }
};
</script>

<style scoped>
.tohome {
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: fixed;
  z-index: 9999; */
  width: 9vw;
  height: 9vw;
  overflow: hidden;
}

.tohome:hover {
  cursor: pointer;
}

.tohome > img {
  width: 100%;
  height: 100%;
}
</style>