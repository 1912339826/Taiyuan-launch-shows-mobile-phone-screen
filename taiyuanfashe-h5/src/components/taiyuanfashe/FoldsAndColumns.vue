// 折线和柱状图
<template>
  <div id="FoldsAndColumns">
    <div :id="idName" class="FoldsAndColumns_child" :style="{width: '1000px',height: '500px' }"></div>
    <img :src="imgs" alt />
  </div>
</template>

<script>
export default {
  name: "FoldsAndColumns",
  data() {
    return {
      imgs: "",
      percent: [100, 100, 100, 100, 100, 100, 100, 100],
      quantity: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
      xAxis: [
        "第25基地通讯团",
        "去年同期水量",
        "滚动目标值水量",
        "全年目标值水量",
        "当年完成金额",
        "去年同期金额",
        "滚动目标金额",
        "全年目标值"
      ],
      max: [0]
    };
  },
  props: {
    idName: {
      type: String,
      default: "FoldsAndColumnsMY"
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
        backgroundColor: "#1f3f72",
        grid: {
          top: "20%",
          bottom: "18%" //也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true
            }
          }
        },
        legend: {
          data: ["人员在位率(%)", "人员在位数(个)"],
          top: "0%",
          textStyle: {
            color: "#ffffff"
          }
        },
        xAxis: {
          data: this.xAxis,
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#01FCE3"
            }
          },
          axisTick: {
            show: true //隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            rotate: 25,
            textStyle: {
              color: "#ebf8ac", //X轴文字颜色
              fontSize: 10
            }
          }
        },
        yAxis: [
          {
            max: this.max[0] + 5,
            min: 0,
            nameGap: 40,
            type: "value",
            name: "人员数量(个)",
            nameTextStyle: {
              color: "#ebf8ac"
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#FFFFFF"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ebf8ac"
              }
            }
          },
          {
            max: 100,
            nameGap: 40,
            type: "value",
            name: "在位率(%)",
            nameTextStyle: {
              color: "#ebf8ac"
            },
            position: "right",
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                color: "#ebf8ac"
              }
            }
          }
        ],
        series: [
          {
            animation: false,
            name: "人员在位率(%)",
            type: "line",
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#058cff",
              fontWeight: "bolder",
              fontSize: 15
            },
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#058cff"
            },
            lineStyle: {
              color: "#058cff"
            },
            areaStyle: {
              color: "rgba(5,140,255, 0.2)"
            },
            data: this.percent
          },
          {
            name: "人员在位数(个)",
            label: {
              show: true,
              position: "top",
              distance: 0,
              color: "#00FFE3",
              fontWeight: "bolder",
              fontSize: 15
            },
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00FFE3"
                  },
                  {
                    offset: 1,
                    color: "#4693EC"
                  }
                ])
              }
            },
            data: this.quantity
          }
        ]
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
#FoldsAndColumns {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

#FoldsAndColumns > .FoldsAndColumns_child {
  position: absolute;
  visibility: hidden;
}

#FoldsAndColumns > img {
  position: absolute;
  width: 100%;
  height: 90%;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>