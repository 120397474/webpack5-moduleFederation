<!--
 * @Author: YourName
 * @Date: 2021-04-19 09:08:49
 * @LastEditTime: 2022-07-26 22:05:50
 * @LastEditors: YourName
 * @Description: 文件功能描述
 * @FilePath: \yunjian-form\packages\app2\src\pages\App.vue
-->
<template>
	<div class="box">
    --------------------
		<h1>我是App2的入口文件</h1>
		<!-- <button type="primary" @click="addCount">添加</button> -->
	</div>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
export default {
	name: "App",
	// 组合API函数入口
	setup() {
		const store = useStore();

		// const counter = computed(() => {
		// 	return store.state.counter;
		// });
    let counter = reactive(0)

		const addCount = () => {
			counter += 1
		};

		return { counter, addCount };
	},
};
</script>

<style lang="less" scoped>
</style>