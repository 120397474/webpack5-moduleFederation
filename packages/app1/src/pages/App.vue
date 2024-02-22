<template>
	<div class="box">
		<h1>我是App1的入口文件</h1>
		{{ counter }}
		<button type="primary" @click="addCount">添加</button>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
	name: "App",
	// 组合API函数入口
	setup() {
		const store = useStore();

		const counter = computed(() => {
			return store.state.counter;
		});

		const addCount = () => {
			store.commit("addCount");
		};

		return { counter, addCount };
	},
};
</script>

<style lang="less" scoped>
</style>