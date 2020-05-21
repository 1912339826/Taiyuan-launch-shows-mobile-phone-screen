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
        <div class="content">
          <div
            class="list"
            v-for="(item, index) in IsgetNoticePage"
            :key="index"
            :title="item.mainTitle"
            @click="toDetail(item)"
          >
            <div class="title">
              <div>{{item.rn}}. {{item.mainTitle}} - {{item.startTimeStr}}</div>
              <!-- <img src="../../../../static/images/详情.png" alt @click="toDetail(item)" /> -->
            </div>
            <div class="text">{{item.article}}</div>
          </div>
        </div>
        <div id="top">
          <a-pagination
            :defaultCurrent="current"
            :total="rowCount"
            :pageSize.sync="limit"
            @change="change"
          />
        </div>
      </div>
    </section>
    <a-modal title="详情" v-model="visible" :footer="null" :width="'90%'">
      <div style="height:100vw; overflow: scroll;">
        <template v-if="Ifcommonupload" style>
          <a-pagination
            simple
            :default-current="1"
            :total="numPages"
            :defaultPageSize="1"
            v-model="PDFpage"
            style="color:#2d579b; display: flex;
 justify-content: center;font-size: 0.1rem;height:2vw; line-height:2vw; align-items: center;"
          />
          <a-spin
            :spinning="!loading"
            :delay="delayTime"
            style="width:100%;height:100vw;"
            size="large"
            tip="加载中..."
          >
            <canvas
              style=" width: 100%;
            height: 100%;
            margin-bottom: 5vw;"
              :id="'the-canvas' + item"
              v-for="(item, index) in 1"
              :key="index"
            ></canvas>
          </a-spin>
        </template>
        <div
          id="hint"
          v-else
          style="width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;"
        >
          <img
            src="../../../../static/images/暂无信息.png"
            alt
            style="  width: 70vw;
      height: 70vw;"
          />
          <div style="  font-size: 1.2rem;
      color: #bfbfbf;">暂无信息</div>
        </div>
      </div>
    </a-modal>

    <!-- <canvas id="the-canvas"></canvas> -->
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";
import Gohome from "../../../components/taiyuanfashe/Gohome";
// import PDFObject from 'pdfobject'
import pdfjsLib from "pdfjs-dist";
export default {
  name: "Notice",
  components: {
    Header,
    Tab,
    Gohome
  },
  data() {
    return {
      PDFUrl: "",
      PDFpage: 1,
      delayTime: 500,
      loading: false,
      numPages: 0,
      Iscommonupload: [],
      Ifcommonupload: false,
      IsHttp: localStorage.getItem("BASE_URLA"),
      visible: false,
      current: 1,
      rowCount: 3,
      limit: 20,
      IsgetNoticePage: [
        {
          id: "12",
          mainTitle: "13名民企科技专家进入火箭军",
          article:
            "今日，一批民企技术人员组成两制创新团队，对接火箭武器装备关键技术需求公关。牵头组织......",
          startTimeStr: "2019-04-25",
          rn: 1
        },
        {
          id: "11",
          mainTitle: "13名民企科技专家进入火箭军",
          article:
            "今日，一批民企技术人员组成两制创新团队，对接火箭武器装备关键技术需求公关。牵头组织......",
          startTimeStr: "2019-04-25",
          rn: 1
        },
        {
          id: "10",
          mainTitle: "13名民企科技专家进入火箭军",
          article:
            "今日，一批民企技术人员组成两制创新团队，对接火箭武器装备关键技术需求公关。牵头组织......",
          startTimeStr: "2019-04-25",
          rn: 1
        }
      ]
    };
  },
  watch: {
    // pdf文档分页
    PDFpage(news) {
      console.log(news);
      if (news == 0) {
        this.PDFthis("");
      } else {
        this.PDFthis(this.PDFUrl, news);
      }
    },
    visible() {
      this.PDFpage = 1;
      this.numPages = 0;
    }
  },
  mounted() {
    // window.open(`https://www-file.huawei.com/-/media/corporate/pdf/annual-report/annual_report_2019_cn.pdf`)
    // console.log(plus.runtime)
    // console.log(PDFObject.embed(`https://www-file.huawei.com/-/media/corporate/pdf/annual-report/annual_report_2019_cn.pdf`,`#pdfs`))
  },
  created() {
    this.getNoticePage(0);
    // this.commonupload()
    // console.log(PDFJS.getDocument(`http://192.168.1.197:9081/upload/informnoticefilegrid/《Webpack实战-入门、进阶与调优》_居玉皓_2019-06-01-------10.pdf`))
  },
  methods: {
    // 1.通知公告列表-分页
    async getNoticePage(index) {
      let res = await this.$req(window.api.getNoticePage, {
        start: index
      });
      this.IsgetNoticePage = res.data.objectList;
      this.limit = res.data.limit;
      this.rowCount = res.data.rowCount;
    },

    change(page, pageSize) {
      this.getNoticePage(page * 20 - 20);
    },
    toDetail(item) {
      // this.$router.push({
      //   path: `/newsdetail`,
      //   query: {
      //     id: item.id
      //   }
      // });
      this.commonupload(item.id);
      // this.visible = true;
    },
    // // 通知公告列表-详情 commonupload
    async commonupload(index) {
      this.$message.destroy();
      this.loading = false;
      this.Iscommonupload = [];
      let res = await this.$req(window.api.commonupload, {
        pTableId: index
      });
      for (let index = 0; index < res.data.objectList.length; index++) {
        const element = res.data.objectList[index];
        this.Iscommonupload.push(
          `http://172.1.0.130:9081/${element.path}${element.filename}`
        );
      }
      if (this.Iscommonupload.length == 0) {
        // this.Ifcommonupload = false;
        // this.Iscommonupload = [""];
        this.$message.info("无文件!");
        setTimeout(() => {
          this.$message.destroy();
        }, 1000);
      } else {
        // console.log(this.Iscommonupload)
        for (let index = 0; index < this.Iscommonupload.length; index++) {
          const element = this.Iscommonupload[index];
          this.callAndroid(element);
        }

        // this.Ifcommonupload = true;
      }
      // this.PDFUrl = this.Iscommonupload[0];
      // this.PDFthis(this.Iscommonupload[0],1)
      // console.log(this.Iscommonupload);
      //   this.PDFthis(
      //   ``
      // );
    },
    callAndroid(url) {
      document.location = `conch://pdf?url=${url}`;
    },
    // 处理PDF
    PDFthis(url, pagePDF) {
      let v = `${new Date().getTime()}`;
      this.loading = false;
      var loadingTask = pdfjsLib.getDocument(`${url}?v=${v}`);
      loadingTask.promise
        .then(pdf => {
          this.numPages = pdf.numPages;
          // for (let i = 1; i < this.numPages - 1; i++) {
          pdf.getPage(pagePDF).then(page => {
            this.loading = true;
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });
            var canvas = document.getElementById(`the-canvas${1}`);
            var context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
          // }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  destroyed() {
    this.$message.destroy();
  }
};
</script>

<style scoped>
#Notice
  /deep/.ant-modal-root
  .ant-spin.ant-spin-spinning
  .ant-spin-dot.ant-spin-dot-spin {
  background-color: red;
}

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
  /* height: 6.5vw; */
  border-bottom: 1px solid #0a4f91;
}

.list > .title {
  padding-left: 0.15rem;
  font-size: 0.15rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.list > .title > img {
  width: 5vw;
  height: 5vw;
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
  height: 136vw;
  border-top: 1px solid #445ee7;
  background-color: rgba(31, 66, 121, 0.76);
  /* margin-top: 3vw; */
  overflow: scroll;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}
</style>