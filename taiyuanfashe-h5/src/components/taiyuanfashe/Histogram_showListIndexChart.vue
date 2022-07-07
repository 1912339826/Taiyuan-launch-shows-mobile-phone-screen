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
      default: "Histogram_showListIndexChart",
    },
    datas: {
      type: Array,
      default: function () {
        return [0, 0, 0];
      },
    },
    name: {
      type: String,
      default: "",
    },
    Y_name: {
      type: String,
      default: "",
    },
    X_data: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  watch: {
    name(news) {
      console.log(news);
      this.visitor();
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
      console.log(this.datas);
      let myChart = this.$echarts.init(
        document.getElementById(this.idName),
        "macarons"
      );
      window.onresize = myChart.resize;
      myChart.setOption({
        legend: {
          data: [this.name],
          left: "10%",
        },
        xAxis: {
          type: "category",
          data: this.X_data,
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
          name: this.Y_name,
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
            name: this.name,
            animation: false,
            data: this.datas,
            type: "bar",
          },
          {
            name: "",
            animation: false,
            data: [],
            type: "bar",
          },
          {
            name: "",
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