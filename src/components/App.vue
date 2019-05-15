<template>
	<div class="equipment-reservation">
		<Head></Head>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive" class="app-content"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" class="app-content"></router-view>
		<Nav></Nav>
	</div>
</template>
<script>
import Vue from 'vue';
import Head from './Head';
import Nav from './Nav';
import 'style/reset';
import 'style/common';
// Vue.directive('loadmore', ...);

export default {
	components: {
		Head,
		Nav
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
.equipment-reservation {
	box-sizing: border-box;
	width: 100vw;
	height: 100vh;
	background-color: rgb(245, 245, 245);
	padding: 40px 0 0 0;
	color: #303133;
	.app-content {
		height: calc(100vh - 85px);
		overflow: hidden;
	}
	input, select, textarea {
		border: 1px solid #AAA;
	}
	input, select {
		height: 22px;
	}
}
</style>
