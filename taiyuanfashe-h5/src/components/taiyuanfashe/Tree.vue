// 树状关系图
<template>
  <div id="Tree">
    <div :id="idName" class="Tree_child" :style="{width: '1000px',height: '500px' }"></div>
    <img :src="imgs" alt crossorigin="anonymous" />
  </div>
</template>

<script>
export default {
  name: "Tree",
  data() {
    return {
      imgs: ""
    };
  },
  props: {
    idName: {
      type: String,
      default: "TreeMY"
    },
    data2: {
      type: Array,
      default: function() {
        return [
          // {
          //   name: "治安管理工作",
          //   label: {
          //     normal: {
          //       backgroundColor: "#725bb8"
          //     }
          //   },
          //   children: [
          //     {
          //       name: "娱乐场所治",
          //       children: [
          //         {
          //           name: "娱乐场所治安"
          //         }
          //       ]
          //     },
          //     {
          //       name: "安保工作",
          //       children: [
          //         {
          //           name: "输油气管道"
          //         },
          //         {
          //           name: "校园安保工作"
          //         },
          //         {
          //           name:
          //             "节假日、重大活动"
          //         }
          //       ]
          //     },
          //     {
          //       name: "精神病人",
          //       children: [
          //         {
          //           name: "精神病人肇"
          //         }
          //       ]
          //     },
          //     {
          //       name: "物流寄递业",
          //       children: [
          //         {
          //           name: "物流寄递业"
          //         }
          //       ]
          //     },
          //     {
          //       name: "推进基层",
          //       children: [
          //         {
          //           name: "加强派出所建设"
          //         }
          //       ]
          //     },
          //     {
          //       name: "地网建设工作",
          //       children: [
          //         {
          //           name: "加强二轮电动"
          //         }
          //       ]
          //     },
          //     {
          //       name: "无人机管理",
          //       children: [
          //         {
          //           name: "加强无人"
          //         }
          //       ]
          //     },
          //     {
          //       name: "加强社会面",
          //       children: [
          //         {
          //           name: "武装联勤巡逻"
          //         }
          //       ]
          //     }
          //   ]
          // }
        ];
      }
    }
  },
  mounted() {
    this.visitor();
    window.onresize = () => {
      this.imgs = "";
      this.visitor();
    };
  },
  methods: {
    visitor() {
      let myChart = this.$echarts.init(
        document.getElementById(this.idName),
        "macarons"
      );
      window.onresize = myChart.resize;
      myChart.setOption({
        series: [
          {
            width: "95%",
            animation: false,
            type: "tree",
            data: this.data2,
            itemStyle: {
              //设置边框的属性
              normal: {
                color: "#1c438c",
                borderWidth: 1,
                borderColor: "#374bb8"
              }
            },
            label: {
              //内容位置等属性
              normal: {
                verticalAlign: "middle",
                align: "center",
                fontSize: 20,
                color: "#FFF",
                position: 'top',
                distance:5
              }
            },
            lineStyle: {
              //连线颜色
              normal: {
                color: "#2d98c6",
                width: 3
              }
            },
            emphasis: {},
            leaves: {
              label: { show: true }
            },
            top: "10%",
            left: "3%",
            bottom: "20%",
            symbolSize: 1,
            // symbolSize: [0, 0],
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
            orient: "vertical",
            symbol: "arrow",
            initialTreeDepth: 2
          }
        ]
      });
      var img = new Image();
      img.src = myChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#222e73",
        crossorigin: "anonymous"
      });
      this.imgs = img.src;
    }
  }
};
</script>

<style scoped>
#Tree {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

#Tree > .Tree_child {
  position: absolute;
  visibility: hidden;
}

#Tree > img {
  position: absolute;
  width: 100%;
  height: 90%;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>