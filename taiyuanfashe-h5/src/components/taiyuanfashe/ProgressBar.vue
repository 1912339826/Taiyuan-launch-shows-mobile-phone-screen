<template>
  <div id="ProgressBar">
    <table border="1">
      <tr style="background-color: #284891;">
        <th style="width:15%">训练类别</th>
        <th style="width:15%">实训时长</th>
        <th style="width:15%">应训时长</th>
        <th colspan="2" style="width:55%">训练进度</th>
      </tr>
      <tr v-for="(item,index) in data2" :key="index" style="height:5vw;">
        <td>{{item.name}}</td>
        <td>{{item.real}}</td>
        <td>{{item.plan}}</td>
        <td class="Progress">
          <div class="box"></div>
          <div class="change" :style="{width:`${item.avg}%`}"></div>
        </td>
        <td style="border-left:none;">{{item.avg}}%</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  data() {
    return {};
  },
  props: {
    data2: {
      type: Array,
      default: function() {
        return [
          { real: 2.33, plan: 75.0, name: "专业训练", avg: 3.1 },
          { real: 0.29, plan: 356.0, name: "技能训练", avg: 0.08 },
          { real: 0.49, plan: 355.0, name: "队列训练", avg: 0.14 },
          { real: 0.25, plan: 11.0, name: "共同训练", avg: 2.27 },
          { real: 2.33, plan: 75.0, name: "专业训练", avg: 3.1 },
          { real: 0.29, plan: 356.0, name: "技能训练", avg: 0.08 },
          { real: 0.49, plan: 355.0, name: "队列训练", avg: 0.14 },
          { real: 0.25, plan: 11.0, name: "共同训练", avg: 2.27 }
        ];
      }
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#ProgressBar {
}

table {
  width: 100%;
  border: 1px solid #3f6cd8;
  text-align: center;
  color: #fff;
  font-size: 0.13rem;
}

#ProgressBar tr {
  width: 100%;
  height: 7vw;
}

#ProgressBar .Progress {
  position: relative;
  width: 40%;
  border-right: none;
}

#ProgressBar .Progress > div {
  position: absolute;
  top: 20%;
  left: 7%;
}

#ProgressBar .Progress > .change {
  height: 65%;
  background-color: rgb(52, 202, 77);
}
#ProgressBar .Progress > .box {
  width: 100%;
  height: 65%;
  background-color: #fff;
}
</style>