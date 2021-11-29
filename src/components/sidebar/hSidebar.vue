<template>
  <div class="sidebar scrollbar">
    <el-menu class="sidebar-menu">
      <el-menu-item :index="info.id" class="menu-item" v-for="info in infos" :key="info.id" @click="menuItemClick">
        <el-icon>
          <icon-menu></icon-menu>
        </el-icon>
        <span>{{ info.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang='ts'>
  import { ElMenu, ElMenuItem, ElIcon } from 'element-plus';
  import { Menu as IconMenu } from '@element-plus/icons';
  import axios from 'axios';
  import { ref } from 'vue-demi';
  import { useRouter } from 'vue-router';

  const infos = ref([]);
  const router = useRouter();

  const getMenusData = () => {
    axios.get('/api/getMenus').then((rs) => {
      infos.value = rs.data;
    });
  };

  getMenusData();

  const menuItemClick = (e: any) => {
    if (e.index == '1') {
      router.push('/home/menuManage');
    }
  };
</script>

<style lang="less" scoped>
  .sidebar {
    margin-top: 3px;
    width: 280px;
    height: calc(100% - 3px);
    background-color: @black;
  }
  .sidebar-menu {
    background-color: transparent;
    border-right: none;
  }
  .menu-item {
    color: @white;
    border-bottom: @header-bd-btm;
    &:hover {
      background-color: darken(@white, 65%);
    }
    &.is-active {
      background-color: darken(@white, 5%);
      color: @lightColor;
    }
  }
</style>