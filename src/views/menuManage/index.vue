<template>
  <div class="tool_box">
    <div class="tool_items">
      <label>菜单名称：</label>
      <el-input v-model="searchStr" placeholder="请输入菜单名称" @keyup.enter.native="search" clearable />
      <el-button type="primary" @click="search">检索</el-button>
    </div>
    <div class="tool_items add_btn">
      <el-button @click="addData">新增菜单</el-button>
    </div>
  </div>
  <el-table stripe :data="infos" style="width: 100%" highlight-current-row @current-change="tableSelectRow">
    <el-table-column prop="name" label="菜单名称" />
    <el-table-column prop="icon" label="菜单图标" header-align="center" width="180" />
    <el-table-column label="操作" header-align="center" align="center" width="200">
      <template #default="scope">
        <el-button @click="editData">编辑</el-button>
        <el-button @click="deleteData">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="paging">
    <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
  </div>

  <add-menu :type="menuType" :visible="dialogVisible"></add-menu>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref } from 'vue-demi';
  import { addMenu } from '../../components/menuDialog/index';
  import { ElInput, ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus';

  let searchStr = ref<string>('');
  let infos = ref<object>([]);
  let selectRow = ref<object>({});
  let menuType = ref<string>('');
  let dialogVisible = ref<boolean>(false);

  const getMenusData = (() => {
    axios.get('/api/getMenus').then((rs) => {
      infos.value = rs.data;
    });
  })();

  const tableSelectRow = (val: object) => {
    selectRow.value = val;
    console.log(val);
  };

  const search = () => {};

  const addData = () => {
    dialogVisible.value = true;
    menuType.value = 'add';
  };
  const editData = () => {
    dialogVisible.value = true;
    menuType.value = 'edit';
  };
  const deleteData = () => {};

  const dialogClose = () => {
    dialogVisible.value = false;
  };
</script>

<style lang="less" scoped>
  .tool_box {
    display: flex;
    padding-bottom: 10px;
  }
  .tool_items {
    display: inline-flex;
    align-items: center;
    padding-bottom: 15px;
    & > label {
      white-space: nowrap;
    }
    & > button {
      margin-left: 10px;
    }
    &.add_btn {
      flex: 1;
      justify-content: flex-end;
    }
  }
  .paging {
    display: flex;
    padding-top: 30px;
    justify-content: center;
  }
</style>