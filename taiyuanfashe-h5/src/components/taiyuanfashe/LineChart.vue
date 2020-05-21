// 有背景的折线图
<template>
  <div id="lineChart1">
    <div :id="idName" class="lineChart_child" :style="{width: '1000px',height: '500px' }"></div>
    <img :src="imgs" alt />
  </div>
</template>

<script>
export default {
  name: "LineChart",
  data() {
    return {
      imgs: ""
    };
  },
  watch: {},
  props: {
    color: {
      type: String,
      default: "#1186c2"
    },
    idName: {
      type: String,
      default: "lineChart"
    },
    series: {
      type: Array,
      default: function() {
        return [
          {
            animation: false,
            data: ["4", "7", "3", "7", "9", "6"],
            type: "line",
            smooth: false,
            symbol: "circle",
            symbolSize: 8,
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff"
              }
            },
            sampling: "average",
            itemStyle: {
              color: this.color
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: this.color
                  },
                  {
                    offset: 1,
                    color: "#1f407c"
                  }
                ],
                false
              )
            }
          }
        ];
      }
    },
    bottomTitle: {
      type: Array,
      default: function() {
        return ["数据1", "数据2", "数据3", "数据4", "数据5", "数据6"];
      }
    },
    name: {
      type: String,
      default: "单位(%)"
    },
    legend: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    bottomTitle(news, olds) {
      this.visitor();
    }
  },
  mounted() {
    this.visitor();
    window.onresize = () => {
      this.imgs = "";
      this.visitor();
    };
  },
  destroyed() {
    window.onresize = null;
    this.imgs = "";
  },
  methods: {
    visitor() {
      console.log(this.series)
      let myChart = this.$echarts.init(
        document.getElementById(this.idName),
        "macarons"
      );
      window.onresize = myChart.resize;
      myChart.setOption({
         grid: {
          top: "20%",
          bottom: "18%" //也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#2d579b"
            }
          }
        },
        legend: this.legend,
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.bottomTitle,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              fontSize: 25
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#2c75b9"
            }
          },
          axisLabel: {
            show: true,
            rotate: 22,
            interval: 0,
            textStyle: {
              color: "#ebf8ac", //X轴文字颜色
              fontSize: 16
            }
          }
        },
        yAxis: {
          name: this.name,
          boundaryGap: false,
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              fontSize: 25
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#2c75b900"
            }
          }
        },
        series: this.series
      });
      var img = new Image();
      img.src = myChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#2d579b"
      });
      this.imgs = img.src;
    }
  }
};
</script>
<style scoped>
#lineChart1 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #188fff00;
  /* background-color: #415e94; */
}

#lineChart1 > .lineChart_child {
  position: absolute;
  visibility: hidden;
}

#lineChart1 > img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>