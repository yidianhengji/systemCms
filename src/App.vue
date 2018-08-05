<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'
import mutipartAxios from '@/util/mutipartAxios'
export default {
	data(){
		return {

		}
	},
	mounted(){
		
	},
	created() {
		//普通校验
		axiosToken.interceptors.response.use((respone) => {
			var _this = this;
			let source = respone.data;
			// if(source.code==2004){
			// 	this.$alert(source.msg, '温馨提示',
			// 		{ confirmButtonText: '确定', callback: action => {
			// 			_this.$router.push({path: '/zhtLogin'})
			// 		}
			// 	});
			// 	return false;
			// }else
			if(source.code!=200){
				this.$alert(source.msg, '温馨提示',
					{ confirmButtonText: '确定', callback: action => { }
				});
			}
			return respone
		}, err => {
				
		})
		//get方法校验

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
				
		})
	}
};
</script>

<style>

</style>
