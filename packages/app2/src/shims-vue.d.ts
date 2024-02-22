/*
 * @description:
 * @Author: Gouxinyu
 * @Date: 2020-11-13 15:34:03
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