import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import wrapper from '@/components/wrapper';
import survey from '@/components/survey';//首页统计
/*内容管理*/
import article from '@/components/totalManag/content/article';//文章管理
import articleAdd from '@/components/totalManag/content/articleAdd';//新增文章
import column from '@/components/totalManag/content/column';//栏目管理
import columnAdd from '@/components/totalManag/content/columnAdd';//新增栏目
import activity from '@/components/totalManag/content/activity';//活动管理
import activityAdd from '@/components/totalManag/content/activityAdd';//新增活动
import task from '@/components/totalManag/content/task';//任务管理
import taskAdd from '@/components/totalManag/content/taskAdd';//新增任务
import notice from '@/components/totalManag/content/notice';//公告管理
import noticeAdd from '@/components/totalManag/content/noticeAdd';//新增公告
/*社区管理*/
import organization from '@/components/totalManag/community/organization';//社区管理
import organizationAdd from '@/components/totalManag/community/organizationAdd';//新增社区
import personnel from '@/components/totalManag/community/personnel';//居民列表
/*商品管理*/
import goodsList from '@/components/totalManag/goods/goodsList';//商品列表
import goodsListAdd from '@/components/totalManag/goods/goodsListAdd';//新增列表
/*权限管理*/
import powerUser from '@/components/totalManag/power/user';//管理员
import powerPowerGroup from '@/components/totalManag/power/powerGroup';//权限组

export default new Router({
	routes: [
		{
			path: '/home',
			name: '主页',
			component: wrapper,
			children: [
				{ path: '/home', redirect: 'survey' },
				{ path: '/home/survey', name: '概况', component: survey },
				//内容模块
				{ path: '/home/contern/article', name: '文章管理', component: article },
				{ path: '/home/contern/articleAdd', name: '新增文章', component: articleAdd },
				{ path: '/home/contern/column', name: '栏目管理', component: column },
				{ path: '/home/contern/columnAdd', name: '新增栏目', component: columnAdd },
				{ path: '/home/contern/activity', name: '活动管理', component: activity },
				{ path: '/home/contern/activityAdd', name: '新增活动', component: activityAdd },
				{ path: '/home/contern/task', name: '任务管理', component: task },
				{ path: '/home/contern/taskAdd', name: '新增任务', component: taskAdd },
				{ path: '/home/contern/notice', name: '公告管理', component: notice },
				{ path: '/home/contern/noticeAdd', name: '新增管理', component: noticeAdd },
				//社区管理
				{ path: '/home/community/organization', name: '社区管理', component: organization },
				{ path: '/home/community/organizationAdd', name: '新增社区', component: organizationAdd },
				{ path: '/home/community/personnel', name: '居民列表', component: personnel },
				//商品管理
				{ path: '/home/goods/goodsList', name: '商品管理', component: goodsList },
				{ path: '/home/goods/goodsListAdd', name: '新增商品', component: goodsListAdd },
				//权限管理
				{ path: '/home/power/powerUser', name: '管理员', component: powerUser },
				{ path: '/home/power/powerPowerGroup', name: '权限组', component: powerPowerGroup },
            ]
		}
	]
})
