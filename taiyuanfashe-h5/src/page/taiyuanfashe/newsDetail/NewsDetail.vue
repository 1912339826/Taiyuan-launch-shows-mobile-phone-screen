<template>
  <div class="lay-Box">
    <Header></Header>
    <img class="back" src="../../../../static/images/04.png" alt />
    <Tab></Tab>
    <div style="position: fixed;z-index: 9999;bottom:3vw;left:3vw;border-radius: 50%;">
      <Gohome />
    </div>
    <div class="lay-one">
      <template v-if="Ifcommonupload">
        <iframe :src="item" frameborder="1" v-for="(item,index) in Iscommonupload" :key="index" />
      </template>
      <div id="hint" v-else>
        <img src="../../../../static/images/暂无信息.png" alt />
        <div>暂无信息</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#hint {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#hint > img {
  width: 70vw;
  height: 70vw;
}

#hint > div {
  font-size: 1.2rem;
  color: #bfbfbf;
}
.lay-one {
  width: 100%;
  height: 154.5vw;
  padding-right: 2vw;
  padding-left: 2vw;
  margin-top: 3vw;
  overflow: scroll;
}

iframe {
  width: 100%;
  height: 100%;
  margin-bottom: 5vw;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Gohome from "../../../components/taiyuanfashe/Gohome";
export default {
  name: "NewsDetail",
  components: {
    Header,
    Tab,
    Gohome
  },
  data: function() {
    return {
      Iscommonupload: [],
      Ifcommonupload: false,
      // IsHttp: localStorage.getItem("BASE_URLA")
    };
  },
  created() {
    this.commonupload(this.$route.query.id);
  },
  mounted() {},
  destroyed() {},
  methods: {
    // // 通知公告列表-详情 commonupload
    async commonupload(index) {
      this.Iscommonupload = [];
      let res = await this.$req(window.api.commonupload, {
        pTableId: index
      });
      for (let index = 0; index < res.data.objectList.length; index++) {
        const element = res.data.objectList[index];
        this.Iscommonupload.push(
          `${window.BASE_URLA}/${element.path}${element.filename}`
        );
      }
      if(this.Iscommonupload.length == 0){
        this.Ifcommonupload = false
      }else{
        this.Ifcommonupload = true
      }
    }
  }
};
</script>