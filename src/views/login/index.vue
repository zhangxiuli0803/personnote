<template>
  <div class="login">
    <div class="login_form">
      <div class="title_tabs">
        <span :class="[tabsActive=='登录'?'active':'']" @click="tabsActive='登录'">登 录</span>
        <span :class="[tabsActive=='注册'?'active':'']" @click="tabsActive='注册'">注 册</span>
      </div>

      <div v-if="tabsActive=='登录'">
        <div class="input_box">
          <el-input autofocus v-model="name" placeholder="用户名"></el-input>
        </div>
        <div class="input_box">
          <el-input show-password v-model="password" placeholder="密码"></el-input>
        </div>

        <div class="submit">
          <el-button @click="login">确定</el-button>
        </div>
      </div>

      <div class="register" v-if="tabsActive=='注册'">
        <div class="input_box">
          <el-input autofocus v-model="rname" placeholder="用户名"></el-input>
        </div>
        <div class="input_box">
          <el-input show-password v-model="rpassword" placeholder="请输入密码"></el-input>
        </div>
        <div class="input_box">
          <el-input show-password v-model="rpassword1" placeholder="请再次输入密码"></el-input>
        </div>

        <div class="submit">
          <el-button>注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { Base64 } from 'js-base64';
  import { ElButton, ElInput } from 'element-plus';
  import { ref } from 'vue-demi';

  let tabsActive = ref('登录');
  let name = ref('');
  let password = ref('');
  let rname = ref('');
  let rpassword = ref('');
  let rpassword1 = ref('');

  const login = () => {
    // , { name: name.value, password: password.value }
    axios.get('/api/aaa').then((rs) => {
      console.log(rs);
    });
  };

</script>

<style lang="less" scoped>
  @import '../../assets/less/login.less';
</style>