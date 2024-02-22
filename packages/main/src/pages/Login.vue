<template>
  <div class="login_main">
    <div class="login_main_left"></div>
    <div class="login_main_right">
      <div class="login_main_right_login">
        <a-typography-title :level="2">大屏管理系统</a-typography-title>
        <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          class="login_main_right_form"
        >
          <a-form-item has-feedback label="" name="userName">
            <a-input v-model:value="formState.userName" size="large" autocomplete="off" style="width: 250px" placeholder="请输入账号">
              <template #prefix>
                <user-outlined type="user" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback label="" name="password" >
            <template #prefix>
              <user-outlined type="user" />
            </template>
            <a-input v-model:value="formState.password" size="large" type="password" autocomplete="off" style="width: 250px" placeholder="请输入密码">
              <template #prefix>
                <KeyOutlined type="user" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }" style="margin-top:60px;">
            <a-button type="primary" shape="round" size="large" @click="onSubmit">
              <template #icon>
                <DownloadOutlined />
              </template>
              登&nbsp;&nbsp;录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from 'vue';
import { UserOutlined, KeyOutlined} from '@ant-design/icons-vue';
import {login} from '../api/login'
import {useRoute, useRouter} from "vue-router";
export default defineComponent({
  components: {
    UserOutlined,
    KeyOutlined
  },

  setup() {
      const router = useRouter()

      const formRef = ref();
      const formState = reactive({
        userName: '',
        password: ''
      })

      const rules = {
        userName: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      };

      // 登录
      const onSubmit = async() => {
        // const validate = await new Promise((resolve, reject) => {formRef.value.validate().then(() => { resolve(true)})
        // })
        // if(!validate) return;
        sessionStorage.setItem('token', 'Basic eXVuamlhbi13ZWI6S2liYW4=')
        const params = {
          url: `?username=${formState.userName}&password=${formState.password}&scope=app&grant_type=password`
        }
        const response = await login(params).finally(() => {})
        sessionStorage.setItem('userInfo', JSON.stringify(response.data))
        router.push('/Home')
        console.log(response)
          
      };

      return {
        formRef,
        formState,
        rules,
        onSubmit
      };
  },
});
</script>

<style lang="scss" scoped>
  .login_main{
    height:100%;
    width:100%;
    display:flex;
    .login_main_left{
      width:70%;
      height:100%;
      background-image: url('../assets/back.png');
      background-repeat:no-repeat;
      background-size: auto auto;
    }
    .login_main_right{
      width:30%;
      .login_main_right_login{
        width:100%;
        text-align: center;
        margin-top:100px;
      }
      .login_main_right_form{
        margin-top:80px;
      }
    }
  }

</style>