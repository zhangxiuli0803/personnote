<template>
  <div>{{ getData }}</div>
  <div>{{ postData }}</div>
</template>

<script setup lang="ts">
  import { Base64 } from 'js-base64';
  import axios from 'axios';
  import { ref } from 'vue-demi';

  // --
  // encode 加密
  axios.post('/api/login', { name: 'zhangxl', pwd: Base64.encode('123456') }).then((rs) => {
    console.log(Base64.encode('123456'));

    console.log(rs);
  });

  // --

  const getData = ref('');
  const postData = ref('');

  axios.get('/api/a').then((rs) => {
    getData.value = rs.data;
  });

  axios.post('/api/sum', { a: 1, b: 2 }).then((rs) => {
    postData.value = rs.data;
  });
</script>

<style lang="less" scoped>
</style>