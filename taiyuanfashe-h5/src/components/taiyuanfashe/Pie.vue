// 饼图
<template>
  <div id="pie1">
    <div :id="idName" class="pie_child"></div>
    <img :src="imgs" alt />
  </div>
</template>

<script>
export default {
  name: "Pie",
  data() {
    return {
      imgs: "",
      fontSize: 0,
      IsroseType: "area",
    };
  },
  props: {
    datas: {
      type: Array,
      default: () => {
        return [
          { value: 335, name: "单位1" },
          { value: 310, name: "单位2" },
          { value: 234, name: "单位3" },
          { value: 135, name: "单位4" },
          { value: 1048, name: "单位5" },
        ];
      },
    },
    idName: {
      type: String,
      default: "myChart",
    },
    roseType: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Array,
      default: function () {
        return [40, 90];
      },
    },
  },
  watch: {
    datas() {
      this.visitor();
    },
  },
  mounted() {
    if (this.roseType) {
      this.IsroseType = false;
    } else {
      this.IsroseType = "area";
    }
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
      console.log(
        Number(document.documentElement.style.fontSize.split("px")[0]) * 0.13
      );
      this.fontSize =
        Number(document.documentElement.style.fontSize.split("px")[0]) * 0.1;
      let myChart = this.$echarts.init(
        document.getElementById(this.idName),
        "walden"
      );
      window.onresize = myChart.resize;
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c}",
        },
        label: {
          formatter: "{b}: {c}",
          fontSize: this.fontSize,
        },
        series: [
          {
            animation: false,
            name: "面积模式",
            type: "pie",
            height: "80%",
            radius: this.radius,
            center: ["50.1%", "55%"],
            label: {
              color: "#fff",
            },
            labelLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            roseType: this.IsroseType,
            data: this.datas,
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
#pie1 {
  width: 100%;
  height: 100%;
  position: relative;
}

#pie1 > .pie_child {
  position: absolute;
  visibility: hidden;
  width: 80%;
  height: 80%;
}

#pie1 > img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0%;
  left: 0%;
}
</style>
