<template>
  <div class="home_box">
    <header class="header">
      <div class="header-zw"></div>
      <div class="header-search"></div>
      <div class="header-r1">欢迎您，{{ storageUserName }}</div>
    </header>
    <section class="content scrollbar">
      <p v-for="item in 50" :key="item">content</p>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { LocalStorage } from '@/utils/storage';
  import { useRouter } from 'vue-router';

  const storage = new LocalStorage();
  const router = useRouter();
  //  没登录，跳转登录页面
  const storageUserName: string = storage.get('userName');
  const storageUserPwd: string = storage.get('userPwd');
  if (!storageUserName || !storageUserPwd) {
    router.push('/');
  }
</script>

<style lang="less" scoped>
  .home_box {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
  .header {
    display: flex;
    height: 60px;
    background-color: @black;
    color: @white;
    align-items: center;
  }
  .header-zw {
    flex: 1;
  }
  .header-search {
    padding: 0 15px;
  }
  .header-r1 {
    padding: 0 15px;
  }
  .header,
  .content {
    border: 1px solid #000;
  }
  .content {
    flex: 1;
    height: 0;
    overflow: auto;
  }
</style>