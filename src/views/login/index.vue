<template>
  <div class="login">
    <div class="login_form">
      <div class="title_tabs">
        <span :class="[tabsActive=='登录'?'active':'']" @click="tabsActive='登录'">登 录</span>
        <span :class="[tabsActive=='注册'?'active':'']" @click="tabsActive='注册'">注 册</span>
      </div>

      <div v-if="tabsActive=='登录'">
        <div class="input_box">
          <el-input ref="Name" autofocus v-model="name" placeholder="用户名" @keyup.enter.native="login"></el-input>
        </div>
        <div class="input_box">
          <el-input ref="Pwd" show-password v-model="pwd" placeholder="密码" @keyup.enter.native="login"></el-input>
        </div>

        <div class="submit">
          <el-button @click="login">确定</el-button>
        </div>
      </div>

      <div class="register" v-if="tabsActive=='注册'">
        <div class="input_box">
          <el-input ref="RName" autofocus v-model="rname" placeholder="用户名" @keyup.enter.native="register"></el-input>
        </div>
        <div class="input_box">
          <el-input ref="RPwd" show-password v-model="rpwd" placeholder="请输入密码" @keyup.enter.native="register"></el-input>
        </div>
        <div class="input_box">
          <el-input ref="RPwd1" show-password v-model="rpwd1" placeholder="请再次输入密码" @keyup.enter.native="register"></el-input>
        </div>

        <div class="submit">
          <el-button @click="register">注册</el-button>
        </div>

        <div class="tips">注：密码需要字母、数字组合; 至少包含一个字母和数字,长度控制在8-15。</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { Base64 } from 'js-base64';
  import { ElButton, ElInput, ElNotification } from 'element-plus';
  import { h, ref } from 'vue-demi';
  import { LocalStorage } from '@/utils/storage';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  let tabsActive = ref<string>('登录');
  let name = ref<string>('');
  let pwd = ref<string>('');
  let rname = ref<string>('');
  let rpwd = ref<string>('');
  let rpwd1 = ref<string>('');
  const Name = ref<any>(null);
  const RName = ref<any>(null);
  const RPwd = ref<any>(null);
  const RPwd1 = ref<any>(null);
  const storage = new LocalStorage();

  const login = () => {
    if (name.value == '' || pwd.value == '') {
      ElNotification({ message: h('span', { class: 'red' }, '用户名、密码不能为空，请输入') });
      Name.value?.focus();
      return;
    }

    const encodePwd: string = Base64.encode(pwd.value);
    axios.post('/api/login', { name: name.value, pwd: encodePwd }).then((rs) => {
      if (rs.data == '1') {
        ElNotification({ message: h('span', { class: 'green' }, '登录成功') });

        // 存储账户、密码
        storage.set('userName', name.value, 60);
        storage.set('userPwd', encodePwd, 60);

        // 登录成功，跳转页面
        router.push('/home');
      }
      if (rs.data == '-1') {
        ElNotification({ message: h('span', { class: 'red' }, '用户名、密码有误，请重新输入') });
        Name.value?.focus();
      }
    });
  };

  const register = () => {
    const reg: any = /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/; // 字母、数字组合; 至少包含一个字母和数字,长度控制在8-15

    if (rname.value == '' || rpwd.value == '' || rpwd1.value == '') {
      ElNotification({ message: h('span', { class: 'red' }, '用户名、密码不能为空，请输入') });
      RName.value?.focus();
      return;
    }
    if (rpwd.value != rpwd1.value) {
      ElNotification({ message: h('span', { class: 'red' }, '两次密码输入不一致，请重新输入密码') });
      rpwd1.value = '';
      RPwd1.value?.focus();
      return;
    }

    if (!reg.test(rpwd.value)) {
      ElNotification({ message: h('span', { class: 'red' }, '密码不符合规则，请重新输入') });
      RPwd.value?.focus();
      return;
    }
    axios.post('/api/register', { name: rname.value, pwd: Base64.encode(rpwd.value) }).then((rs) => {
      if (rs.data == '-1') {
        ElNotification({ message: h('span', { class: 'red' }, '用户名重复，请重新输入') });
        RName.value?.focus();
      }
      if (rs.data == '1') {
        ElNotification({ message: h('span', { class: 'green' }, '注册成功，请登录') });
        console.log(rs);
        tabsActive.value = '登录';
        Name.value?.focus();
        name.value = rname.value;
      }
    });
  };

  // 判断是否有缓存的账号密码
  const storageUserName: string = storage.get('userName');
  const storageUserPwd: string = storage.get('userPwd');
  if (storageUserName && storageUserPwd) {
    name.value = storageUserName;
    pwd.value = Base64.decode(storageUserPwd);

    if (storageUserName == 'zhangxl') {
      login();
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/login.less';
</style>