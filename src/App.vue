<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import axiosToken from '@/util/axiosToken'
import mutipartAxios from '@/util/mutipartAxios'
export default {
	created() {
		//普通校验
		axiosToken.interceptors.response.use((respone) => {
			let source = respone.data;
			if(source.code!=200){
				this.$alert(source.msg, '温馨提示',
					{ confirmButtonText: '确定', callback: action => { }
				});
			}
			return respone
		}, err => {
				
			}
		)
		//上传校验
		mutipartAxios.interceptors.response.use((respone) => {
			let source = respone.data;
			if(source.code!=200){
				this.$alert(source.msg, '温馨提示',
					{ confirmButtonText: '确定', callback: action => { }
				});
			}
			return respone
		}, err => {
				
			}
		)
	}
};
</script>

<style>

</style>
