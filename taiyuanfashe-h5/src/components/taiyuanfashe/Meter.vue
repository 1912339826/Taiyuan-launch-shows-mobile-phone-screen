// 仪表
<template>
  <div id="pie">
    <div :id="idName" class="pie_child" :style="{width: '500px',height: '500px'}"></div>
    <img :src="imgs" alt />
  </div>
</template>

<script>
export default {
  name: "Meter",
  data() {
    return {
      Color: "#24b375",
      imgs: ""
    };
  },
  props: {
    num: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: "%"
    },
    idName: {
      type: String,
      default: "meter"
    },
    max: {
      type: Number,
      default: 100
    }
  },
  watch: {},
  mounted() {
    // this.visitor();
    window.onresize = () => {
      this.imgs = "";
      this.visitor();
    };
  },
  destroyed() {
    window.onresize = null;
    this.imgs = "";
  },
  watch:{
    // 异步更新数据
    num(news,olds){
      this.imgs = ''
       this.visitor();
    }
  },
  methods: {
    visitor() {
      var data = { value: this.num, color: "#3fecff" };
      var max = this.max;
      let myChart = this.$echarts.init(
        document.getElementById(this.idName),
        "macarons"
      );
      window.onresize = myChart.resize;
      myChart.setOption({
        min: 0,
        max: max,
        series: [
          {
            animation: false,
            name: "AQI",
            type: "gauge",
            radius: "100%",
            startAngle: 359.9,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
                color: [
                  [data.value / max, data.color],
                  [1, "#235293"]
                ]
              }
            },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLabel: { show: false },
            pointer: { show: false },
            title: {
              offsetCenter: [0, "0%"],
              color: "#fdd100",
              fontSize: 80,
              fontWeight: 800
            },
            center: ["50%", "50%"],
            detail: false,
            data: [{ value: data.value, name: `${data.value}${this.unit}` }]
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
#pie {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
#pie > .pie_child {
  position: absolute;
  visibility: hidden;
}
#pie > img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>
