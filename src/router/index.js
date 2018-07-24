import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import wrapper from '@/components/wrapper';//主页
import survey from '@/components/survey';//首页统计
import article from '@/components/content/article';//文章管理
import column from '@/components/content/column';//栏目管理
import activity from '@/components/content/activity';//活动管理
import task from '@/components/content/task';//任务管理
import notice from '@/components/content/notice';//公告管理

export default new Router({
	routes: [
		{
			path: '/home',
			name: '主页',
			component: wrapper,
			children: [
				{ path: '/home/survey', name: '概况', component: survey },
				{ path: '/home/contern/article', name: '文章管理', component: article },
				{ path: '/home/contern/column', name: '栏目管理', component: column },
				{ path: '/home/contern/activity', name: '活动管理', component: activity },
				{ path: '/home/contern/task', name: '任务管理', component: task },
				{ path: '/home/contern/notice', name: '公告管理', component: notice },
				{ path: '/home', redirect: 'survey' }
            ]
		}
	]
})
