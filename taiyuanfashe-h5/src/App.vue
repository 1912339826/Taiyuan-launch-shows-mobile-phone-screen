<template>
  <div id="app" v-cloak>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <!-- <router-view></router-view> -->
  </div>
</template>
<!--<style src="@/assets/css/mobile.scss"></style>-->
<style>
#app {
  width: 100%;

  /* font-size: 14px; */
} 

*::-webkit-scrollbar {
  width: 0vw;
  height: 0vw;
}

#app::-webkit-scrollbar {
  width: 0vw;
  height: 0vw;
  z-index: 9999;
}
#app::-webkit-scrollbar-track {
  width: 0vw;
}
#app::-webkit-scrollbar-thumb {
  background-color: #a1dad2;
  border-radius: 0vw;
}
.pay-item-content input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}
.pay-item-content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
.pay-item-content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
.pay-item-content input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
}
</style>
<script>
export default {
  name: "app"
};
</script>