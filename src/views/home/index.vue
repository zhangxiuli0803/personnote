<template>
  <div class="home_box">
    <header class="header">
      <div class="header-zw"></div>
      <div class="header-search"></div>
      <div class="header-r1">
        欢迎您，{{ storageUserName }}
        <el-dropdown @command="dropdownClick">
          <el-icon :size="30" color="#333">
            <avatar />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu class="header-menu">
              <el-dropdown-item :icon="Edit" command="1">修改密码</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" command="2">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>
    <section class="content scrollbar">
      <p v-for="item in 50" :key="item">content</p>
    </section>
  </div>
  <update-pwd :dialogVisible="dialogVisible" :title="'修改密码'" @dialogClose="dialogVisible=false"></update-pwd>
</template>

<script setup lang="ts">
  import { ElIcon, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
  import { Avatar, Edit, SwitchButton } from '@element-plus/icons';
  import { updatePwd } from '../../components/updatePwd/index';
  import { LocalStorage } from '@/utils/storage';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue-demi';

  const dialogVisible = ref<boolean>(false);
  const storage = new LocalStorage();
  const router = useRouter();
  //  没登录，跳转登录页面
  const storageUserName = storage.get('userName');
  const storageUserPwd = storage.get('userPwd');
  if (!storageUserName || !storageUserPwd) {
    router.push('/');
  }

  const dropdownClick = (type: string) => {
    if (type == '1') {
      // 修改密码
      dialogVisible.value = true;
    }
    if (type == '2') {
      // 注销登录
      storage.remove('userName');
      storage.remove('userPwd');
      router.push('/');
    }
    console.log(type);
  };
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
    display: flex;
    padding: 0 15px;
    align-items: center;
    .el-icon {
      display: inline-flex;
      width: 28px;
      height: 28px;
      margin-left: 10px;
      border-radius: 50%;
      background-color: @white;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .header-menu {
    /deep/ .el-icon {
      font-size: 16px;
    }
    /deep/ .el-dropdown-menu__item {
      display: flex;
      align-items: center;
    }
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