<template>
  <header class="header">
    <div class="header-zw"></div>
    <div class="header-search">
      <el-input class="search-input" v-model="searchVal" placeholder="请输入关键词进行检索" @keyup.enter.native="headerSearch">
        <template #suffix>
          <el-icon :size="20" class="search-icon" @click="headerSearch">
            <search />
          </el-icon>
        </template>
      </el-input>
    </div>
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
  <update-pwd :dialogVisible="dialogVisible" :title="'修改密码'" @dialogClose="dialogVisible=false"></update-pwd>
</template>

<script setup lang="ts">
  import { updatePwd } from '../updatePwd/index';
  import { ElIcon, ElDropdown, ElDropdownMenu, ElDropdownItem, ElInput } from 'element-plus';
  import { Avatar, Edit, SwitchButton, Search } from '@element-plus/icons';
  import { LocalStorage } from '@/utils/storage';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue-demi';

  const dialogVisible = ref<boolean>(false);
  const storage = new LocalStorage();
  const router = useRouter();
  const searchVal = ref<string>('');
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

  const headerSearch = () => {
    console.log('search');
  };
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    height: 60px;
    background-color: @black;
    color: @white;
    align-items: center;
    border-bottom: @header-bd-btm;
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
  .search-input {
    --el-input-background-color: rgba(255, 255, 255, 0.2);
    --el-input-border: 1px solid rgba(255, 255, 255, 0.4);
    /deep/ .el-input__inner {
      padding-right: 30px;
      color: #fff;
    }
  }
  .search-icon {
    display: inline-flex;
    height: 100%;
    margin-right: 3px;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
</style>