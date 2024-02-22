/*
 * @description: 开发模式，vue需要完整入口文件
 * @Author: austin wong
 * @Date: 2021-04-16 13:26:28
 */
import { createApp, defineAsyncComponent } from "vue";
import box from "./pages/App.vue";
import store from './store';
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less';

const Content = defineAsyncComponent(() =>
    import ('app1/Test'))

const Content1 = defineAsyncComponent(() =>
    import ('app2/APP'))

const app = createApp(box);

app.component('ContentElement', Content)
app.component('ContentElement1', Content1)
app.use(store).use(Antd).use(router).mount('#app');