<!--
 * @Author: YourName
 * @Date: 2021-08-16 17:03:33
 * @LastEditTime: 2022-07-26 22:03:14
 * @LastEditors: YourName
 * @Description: 文件功能描述
 * @FilePath: \yunjian-form\packages\main\src\pages\Home.vue
-->
<template>
 <ContentElement title="My journey with Vue"></ContentElement>


 <ContentElement1></ContentElement1>
</template>
<script>
import Header from '../layout/Header.vue'
import { defineComponent } from 'vue';
export default defineComponent({
  components: { Header },
  setup() {
   
  },
});
</script>