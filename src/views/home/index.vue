<template>
  <div class="home_box">
    <h-header></h-header>
    <section class="content">
      <h-sidebar></h-sidebar>
      <div class="context scrollbar">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { hHeader } from '../../components/header/index';
  import { hSidebar } from '../../components/sidebar/index';
</script>

<style lang="less" scoped>
  .home_box {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
  .content {
    display: flex;
    height: 0;
    flex: 1;
  }
  .context {
    flex: 1;
    height: 100%;
    padding: 15px;
    overflow: auto;
  }
</style>