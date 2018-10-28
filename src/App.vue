<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import axiosToken from '@/util/axiosToken'
import axiosTokenGet from '@/util/axiosTokenGet'
import mutipartAxios from '@/util/mutipartAxios'
import api from 'src/util/api'

export default {
	data(){
		return {

		}
	},
	mounted(){
		//this.disableInfo()
	},
	methods: {
		disableInfo() {
			document.onkeydown = function() {
				var e = window.event || arguments[0];
				//屏蔽F12
				if(e.keyCode == 123) {
					return false;
					//屏蔽Ctrl+Shift+I
				} else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
					return false;
					//屏蔽Shift+F10
				} else if((e.shiftKey) && (e.keyCode == 121)){
					return false;
				}
			};
			//屏蔽右键单击
			document.oncontextmenu = function() {
				return false;
			}
		}
	},
	created() {
    api.ajax.axiosJson.interceptors.request.use((config) => {
      if (sessionStorage.getItem('access-token')) {
        config.headers["access-token"] = sessionStorage.getItem('access-token'); //eslint-disable-line
      }
      return config;
    });


    api.ajax.axiosTokenL.interceptors.request.use((config) => {
      if (sessionStorage.getItem('access-token')) {
        config.headers["access-token"] = sessionStorage.getItem('access-token'); //eslint-disable-line
      }
      return config;
    });

    api.ajax.axiosTokenNo.interceptors.request.use((config) => {
      if (sessionStorage.getItem('access-token')) {
        config.headers["access-token"] = sessionStorage.getItem('access-token'); //eslint-disable-line
      }
      return config;
    });

    axiosToken.interceptors.request.use((config) => {
      if (sessionStorage.getItem('access-token')) {
        config.headers["access-token"] = sessionStorage.getItem('access-token'); //eslint-disable-line
      }
      return config
    })

    axiosTokenGet.interceptors.request.use((config) => {
      if (sessionStorage.getItem('access-token')) {
        config.headers["access-token"] = sessionStorage.getItem('access-token'); //eslint-disable-line
      }
      return config
    })
		//普通校验
		axiosToken.interceptors.response.use((respone) => {
			var _this = this;
			let source = respone.data;
			if(source.code==2004){
				this.$alert(source.msg, '温馨提示',
					{ confirmButtonText: '确定', callback: action => {
						if(sessionStorage.getItem("systemType")=='1'){
							_this.$router.push({ path: '/zhtLogin' });
						}else if(sessionStorage.getItem("systemType")=='2'){
							_this.$router.push({ path: '/sqLogin' });
						}
					}
				});
				return false;
			}else if(source.code!=200){
				this.$alert(source.msg, '温馨提示',
					{ confirmButtonText: '确定', callback: action => { }
				});
			}
			return respone
		}, err => {
				
		})
		//get方法校验
		axiosTokenGet.interceptors.response.use((respone) => {
			var _this = this;
			let source = respone.data;
			if(source.code==2004){
				this.$alert(source.msg, '温馨提示',
					{ confirmButtonText: '确定', callback: action => {
						if(sessionStorage.getItem("systemType")=='1'){
							_this.$router.push({ path: '/zhtLogin' });
						}else if(sessionStorage.getItem("systemType")=='2'){
							_this.$router.push({ path: '/sqLogin' });
						}
					}
				});
				return false;
			}else if(source.code!=200){
				this.$alert(source.msg, '温馨提示',
					{ confirmButtonText: '确定', callback: action => { }
				});
			}
			return respone
		}, err => {
				
		})
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
