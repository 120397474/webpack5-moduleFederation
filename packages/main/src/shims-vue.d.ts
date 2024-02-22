/*
 * @description:
 * @Author: austin wong
 * @Date: 2021-04-16 13:26:28
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