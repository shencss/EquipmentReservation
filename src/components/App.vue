<template>
	<div class="main-container">
		<Head></Head>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
	</div>
</template>
<script>
import Vue from 'vue';
import Head from './Head';
import 'style/reset';
import 'style/common';
// Vue.directive('loadmore', ...);

export default {
	components: {
		Head
	},
	data() {
		return {

		};
	},
	mounted() {

	},
}
</script>
<style lang="scss">
@import 'style/mixin';

.router-fade-enter-active, .router-fade-leave-active {
	transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
	opacity: 0;
}
.main-container {
	width: 100vw;
	height: 100vh;
	background-color: rgb(245, 245, 245);
}
</style>
