// 柱状图
<template>
  <div id="Histogram">
    <div
      :id="idName"
      class="Histogram_child"
      :style="{ width: '1000px', height: '500px' }"
    ></div>
    <img :src="imgs" alt />
  </div>
</template>

<script>
export default {
  name: "Histogram",
  data() {
    return {
      imgs: "",
    };
  },
  props: {
    idName: {
      type: String,
      default: "HistogramMY",
    },
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
        legend: {
          data: ["1", "2", "3"],
          left: "10%",
        },
        xAxis: {
          type: "category",
          data: ["注册人数", "选课人数", "选课人次"],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              fontSize: 25,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#2c75b9",
            },
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: "#ebf8ac", //X轴文字颜色
              fontSize: 16,
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              fontSize: 25,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#2c75b900",
            },
          },
        },
        series: [
          {
            name: "1",
            animation: false,
            data: [110, 10, 20],
            type: "bar",
          },
          {
            name: "2",
            animation: false,
            data: [],
            type: "bar",
          },
          {
            name: "3",
            animation: false,
            data: [],
            type: "bar",
          },
        ],
      });
      var img = new Image();
      img.src = myChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#2d579b",
      });
      this.imgs = img.src;
    },
  },
};
</script>

<style scoped>
#Histogram {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

#Histogram > .Histogram_child {
  position: absolute;
  visibility: hidden;
}

#Histogram > img {
  position: absolute;
  width: 100%;
  height: 90%;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>