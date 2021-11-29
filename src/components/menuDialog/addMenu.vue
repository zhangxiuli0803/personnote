<template>
  <el-dialog v-model="visible" :title="title" @close="close" width="500px">ddd</el-dialog>
</template>

<script setup lang="ts">
  import { ElDialog } from 'element-plus';
  import { ref, toRef, toRefs, watch } from 'vue-demi';
  interface IEmit {
    (e: string): void;
  }

  const props = defineProps({ menuType: String, visible: Boolean });
  const emit = defineEmits<IEmit>();
  const { menuType, visible } = toRefs(props);
  const title = ref<string>('新增菜单');

  watch(
    () => menuType,
    () => {
      title.value = menuType?.value == 'add' ? '新增菜单' : menuType?.value == 'edit' ? '修改菜单' : '';
    }
  );

  const close = () => {
    emit('dialogClose');
  };
</script>


<style lang="less" scoped>
</style>