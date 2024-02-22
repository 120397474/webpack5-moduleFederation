/*
 * @Author: YourName
 * @Date: 2021-04-16 18:13:16
 * @LastEditTime: 2022-07-26 22:06:12
 * @LastEditors: YourName
 * @Description: 文件功能描述
 * @FilePath: \yunjian-form\packages\app1\src\shims-vue.d.ts
 */

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module "vue/types/vue" {
    interface Vue {
        $http: any;
        $Message: any;
        $Modal: any;
    }
}