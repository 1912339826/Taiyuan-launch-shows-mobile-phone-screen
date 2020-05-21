// 关系图
<template>
  <div id="Relation">
    <div :id="idName" class="Relation_child" :style="{width: '500px',height: '500px' }"></div>
    <img :src="imgs" alt />
  </div>
</template>

<script>
export default {
  name: "Relation",
  data() {
    return {
      imgs: ""
    };
  },
  props: {
    idName: {
      type: String,
      default: "RelationmyChart"
    },
    datas:{
      type:Array,
      default:()=>{
        return[
            {
          parentNode: "组织体系",
          childNodes: ["军人委员会", "团支部","党支部"]
        },
        { parentNode: "党支部", childNodes: ["分部2","分部1"] },
        {parentNode:"分部1",childNodes:["分部11"]}
        ]
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
  destroyed() {
    window.onresize = null;
    this.imgs = "";
  },
  methods: {
    visitor() {
      let myChart = this.$echarts.init(
        document.getElementById(this.idName),
        "macarons"
      );
      window.onresize = myChart.resize;

      var myGraphData = this.datas

      function getNodes(parentNode, childNodes, nodes) {
        var pnode;
        for (var i = 0; i < nodes.length; i++) {
          if (parentNode == nodes[i].nodename) {
            pnode = nodes[i];
          }
        }
        for (i = 0; i < childNodes.length; i++) {
          nodes.push({
            nodename: childNodes[i],
            nodelevel: pnode.nodelevel + 1,
            parentnode: parentNode
          });
        }
      }

      function setNodeData(nodes, listdata) {
        var size = 33;
        for (var i = 0; i < nodes.length; i++) {
          listdata.push({
            category: nodes[i].nodelevel,
            name: nodes[i].nodename,
            symbolSize: size,
            draggable: "true"
          });
        }
      }

      function setLinkData(childList, parentnode, links) {
        for (var i = 0; i < childList.length; i++) {
          links.push({
            // links根据节点名称建立，只适用于节点名称不一样的情况
            source: childList[i],
            target: parentnode,
            lineStyle: {
              normal: {
                color: "source"
              }
            }
          });
        }
      }

      var listdata = [];
      var linksdata = [];
      var nodes = [
        {
          nodename: this.datas[0]["parentNode"],
          nodelevel: 0,
          parentnode: 0
        }
      ];
      for (var i = 0; i < myGraphData.length; i++) {
        getNodes(myGraphData[i].parentNode, myGraphData[i].childNodes, nodes);
        setLinkData(
          myGraphData[i].childNodes,
          myGraphData[i].parentNode,
          linksdata
        );
      }
      setNodeData(nodes, listdata);

      var levels = 0;
      var legend_data = [];
      var series_categories = [];
      var temp = ["一", "二", "三", "四", "五"];
      for (var i = 0; i < nodes.length; i++) {
        levels = Math.max(levels, nodes[i].nodelevel);
      }
      for (var i = 0; i <= levels; i++) {
        legend_data.push({
          name: i === 0 ? "父节点" : "层级" + temp[i],
          icon: "rect"
        });

        series_categories.push({
          name: i === 0 ? "父节点" : "层级" + temp[i],
          symbol: "rect"
        });
      }

      myChart.setOption({
        tooltip: {
          formatter: "{b}"
        },
        backgroundColor: "#1f3f72",
        animationDuration: 0,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "关系图",
            type: "graph",
            layout: "force",
            force: {
              repulsion: 900,
              gravity: 0.1,
              edgeLength: 30,
              layoutAnimation: false
            },
            data: listdata,
            links: linksdata,
            categories: series_categories,
            roam: true,
            label: {
              normal: {
                show: true,
                position: "bottom",
                formatter: "{b}",
                fontSize: 30,
                fontStyle: "800"
              }
            },
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 0.5,
                curveness: 0
              }
            }
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
#Relation {
  width: 50%;
  height: 50%;
  position: relative;
}

#Relation > .Relation_child {
  position: absolute;
  visibility: hidden;
}

#Relation > img {
  position: absolute;
  width: 110%;
  height: 180%;
  z-index: 999;
  top: 10%;
  left: 10%;
}
</style>
