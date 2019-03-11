<template>
  <div class="app-wrapper">
    <slide-item class="sidebar-container"></slide-item>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import appMain from './components/appMain'
import slideItem from './components/slideBar/slideItem'
export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {
    appMain, slideItem
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "~@/style/mixin.scss";
 .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    .sidebar-container {
      width: 180px!important;
      position: fixed;
      font-size: 0;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>