<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="close" width="500px">
    <div class="form_box">
      <div class="input_box">
        <el-input autofocus show-password v-model="ypwd" placeholder="请输入原密码" @keyup.enter.native="updatePwd"></el-input>
      </div>
      <div class="input_box">
        <el-input show-password v-model="pwd" placeholder="请输入新密码" @keyup.enter.native="updatePwd"></el-input>
      </div>
      <div class="input_box">
        <el-input show-password v-model="xpwd" placeholder="请再次输入新密码" @keyup.enter.native="updatePwd"></el-input>
      </div>
      <div class="tips">注：密码需要字母、数字组合; 至少包含一个字母和数字,长度控制在8-15。</div>
    </div>

    <template #footer>
      <div class="dialog_footer">
        <el-button type="primary" @click="updatePwd">修改</el-button>
        <el-button @click="close">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
  import { Base64 } from 'js-base64';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { ElDialog, ElInput, ElButton, ElNotification } from 'element-plus';
  import { ref, toRefs } from 'vue-demi';
  import { reg } from '@/utils/regexp';
  import { LocalStorage } from '@/utils/storage';

  interface IEmits {
    (e: 'dialogClose'): void;
  }
  const emit = defineEmits<IEmits>();
  const router = useRouter();
  const props = defineProps({ dialogVisible: Boolean, title: String });
  const { dialogVisible, title } = toRefs(props);
  const ypwd = ref('');
  const pwd = ref('');
  const xpwd = ref('');
  const storage = new LocalStorage();
  const storageName = storage.get('userName');
  const storagePwd = storage.get('userPwd');

  const close = () => {
    emit('dialogClose');
  };

  const updatePwd = () => {
    const storagePwdDecode = Base64.decode(storagePwd);
    if (ypwd.value == '' || pwd.value == '' || xpwd.value == '') {
      ElNotification({ message: '密码输入不能为空，请输入！' });
      return;
    }

    if (storagePwdDecode != ypwd.value) {
      ElNotification({ message: '原始密码输入不正确，请重新输入！' });
      return;
    }
    if (pwd.value != xpwd.value) {
      ElNotification({ message: '新密码两次输入不一样，请重新输入' });
      return;
    }
    if (!reg.test(pwd.value)) {
      ElNotification({ message: '新密码不符合规则，请重新输入' });
      return;
    }

    axios.post('/api/updatePwd', { pwd: Base64.encode(pwd.value), name: storageName }).then((rs) => {
      if (rs.data == '1') {
        ElNotification({ message: '密码修改成功，请重新登录！' });
        storage.remove('userName');
        storage.remove('userPwd');
        router.push('/');
      }
    });
  };
</script>

<style lang="less" scoped>
  .form_box {
    padding: 15px 30px 0;
  }
  .input_box {
    padding-bottom: 20px;
  }
  .dialog_footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>