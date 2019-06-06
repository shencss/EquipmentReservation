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
import { getBaseUrl, getOpenInterfaceUrl, getAccessToken } from '../common/env'

export default {
	components: {
		Head,
		Nav
	},
	data() {
		return {
			user: {}
		};
	},
	async created() {
		// 获取吾托帮用户信息
		await this.$axios.get(getOpenInterfaceUrl() + '/core/v4/user/me', {
			params: {
				access_token: getAccessToken(),
				aid: '40039349578107852678',
				format: 'JSON'
			}
		}).then(res => {
			if(res.data.rows.length > 0) {
				this.user = res.data.rows[0]
			}
		}).catch(err => {
			console.log(err)
		})
		
		this.$axios.get(getBaseUrl() + '&action=setUser&userId=' + this.user.userID + '&userName=' + this.user.userName).then(res => {
			console.log('获取吾托帮用户成功')
		})
		this.$store.commit('INIT_USER', this.user)
	}
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
	padding: 40px 0 45px 0;
	color: #303133;
	
}
.app-content {
	height: 100%;
	overflow: hidden;
}
::-webkit-scrollbar {
	width: 0;
}
</style>
