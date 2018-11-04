import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import wrapper from '@/components/wrapper';
/*
 * 总后台管理系统界面
 */
import zhtLogin from '@/components/totalManag/zhtLogin'; //总后台登录界面
import zhtSurvey from '@/components/totalManag/zhtSurvey'; //首页统计
// import article from '@/components/totalManag/content/article'; //文章管理
// import articleAdd from '@/components/totalManag/content/articleAdd'; //新增文章
import column from '@/components/totalManag/content/column'; //栏目管理
import columnAdd from '@/components/totalManag/content/columnAdd'; //新增栏目
import activity from '@/components/totalManag/content/activity'; //活动管理
import activityAdd from '@/components/totalManag/content/activityAdd'; //新增活动
import task from '@/components/totalManag/content/task'; //任务管理
import taskAdd from '@/components/totalManag/content/taskAdd'; //新增任务
import notice from '@/components/totalManag/content/notice'; //公告管理
import noticeAdd from '@/components/totalManag/content/noticeAdd'; //新增公告
import garbageType from '@/components/totalManag/content/garbageType'; //垃圾分类
import garbageTypeAdd from '@/components/totalManag/content/garbageTypeAdd'; //新增垃圾分类
import organization from '@/components/totalManag/community/organization'; //社区管理
import organizationAdd from '@/components/totalManag/community/organizationAdd'; //新增社区
import personnel from '@/components/totalManag/community/personnel'; //居民列表
import goodsList from '@/components/totalManag/goods/goodsList'; //商品列表
import goodsListAdd from '@/components/totalManag/goods/goodsListAdd'; //新增列表
import powerUser from '@/components/totalManag/power/user'; //管理员
import powerPowerGroup from '@/components/totalManag/power/powerGroup'; //权限组
/*
 * 社区管理系统界面
 */
import sqLogin from '@/components/commManag/sqLogin'; //总后台登录界面
import sqSurvey from '@/components/commManag/sqSurvey'; //首页统计
import sqNotice from '@/components/commManag/content/sqNotice'; //公告管理
import sqNoticeAdd from '@/components/commManag/content/sqNoticeAdd'; //新增公告
import sqActivity from '@/components/commManag/content/activity'; //活动管理
import sqActivityAdd from '@/components/commManag/content/activityAdd'; //新增活动
import sqTask from '@/components/commManag/content/task'; //任务管理
import sqTaskAdd from '@/components/commManag/content/taskAdd'; //新增任务
import sqOrganization from '@/components/commManag/community/volunteer'; //社区管理
import sqOrganizationAdd from '@/components/commManag/community/volunteerAdd'; //新增社区
import sqPersonnel from '@/components/commManag/community/sqPersonnel'; //居民列表
import sqPersonnelAdd from '@/components/commManag/community/sqPersonnelAdd'; //居民新增修改
import sqPowerUser from '@/components/commManag/power/user'; //管理员
import sqPowerPowerGroup from '@/components/commManag/power/powerGroup'; //权限组
import postManage from 'src/components/commManag/circle/postManage';

import circleManage from '@/components/commManag/circle/circleManage'; //圈子管理
import circleManageAdd from '@/components/commManag/circle/circleManageAdd'; //新增圈子
import circleNotice from '@/components/commManag/circle/circleNotice'; //圈子公告
import circleNoticeAdd from '@/components/commManag/circle/circleNoticeAdd'; //新增公告
import circleComment from '@/components/commManag/circle/circleComment'; //评论管理


//建议投诉
import complaintManage from '@/components/commManag/complaint/complaintManage'; //圈子管理

import partyRemember from 'src/components/commManag/partyRemember'
import pictures from 'src/components/pictures'
import picturesAdd from 'src/components/picturesAdd'

import postAdd from 'src/components/commManag/circle/postAdd'
import article from 'src/components/commManag/content/article'
import articleAdd from 'src/components/commManag/content/articleAdd'
import classify from 'src/components/commManag/content/classify'
import classifyAdd from 'src/components/commManag/content/classifyAdd'
import shangjia from 'src/components/commManag/circle/shangjia'
import shangjiaAdd from 'src/components/commManag/circle/shangjiaAdd'
import complaintManageAdd from 'src/components/commManag/complaint/complaintManageAdd'
import meun from 'src/components/commManag/power/meun'
import meunAdd from 'src/components/commManag/power/meunAdd'
import coupon from 'src/components/commManag/circle/coupon'
import couponAdd from 'src/components/commManag/circle/couponAdd'
import grid from 'src/components/commManag/content/grid'
import gridAdd from 'src/components/commManag/content/gridAdd'
import dangjian from 'src/components/commManag/content/dangjian'
import dangjianAdd from 'src/components/commManag/content/dangjianAdd'
import dangjianClass from 'src/components/commManag/content/dangjianClass'
import dangjianClassAdd from 'src/components/commManag/content/dangjianClassAdd'
import gridClass from 'src/components/commManag/content/gridClass'
import gridClassAdd from 'src/components/commManag/content/gridClassAdd'

const router = new Router({
  routes: [{
    path: '/zhtLogin',
    name: '总后台登录界面',
    component: zhtLogin,
  },
    {
      path: '/sqLogin',
      name: '社区登录界面',
      component: sqLogin,
    },
    {
      path: '/home',
      name: '主页',
      component: wrapper,
      children: [
        {path: '/home', redirect: 'zhtSurvey'},
        {path: '/home/zhtSurvey', name: '首页', component: zhtSurvey},
        /*
         * 总后台
         */
        // {path: '/home/zhtContern/article', name: '文章管理', component: article},
        // {path: '/home/zhtContern/articleAdd', name: '新增文章', component: articleAdd},
        {path: '/home/zhtContern/column', name: '栏目管理', component: column},
        {path: '/home/zhtContern/columnAdd', name: '新增栏目', component: columnAdd},
        {path: '/home/zhtContern/activity', name: '活动管理', component: activity},
        {path: '/home/zhtContern/activityAdd', name: '新增活动', component: activityAdd},
        {path: '/home/zhtContern/task', name: '任务管理', component: task},
        {path: '/home/zhtContern/taskAdd', name: '新增任务', component: taskAdd},
        {path: '/home/zhtContern/notice', name: '公告管理', component: notice},
        {path: '/home/zhtContern/noticeAdd', name: '新增管理', component: noticeAdd},
        {path: '/home/zhtContern/garbageType', name: '垃圾分类', component: garbageType},
        {path: '/home/zhtContern/garbageTypeAdd', name: '新增垃圾分类', component: garbageTypeAdd},
        {path: '/home/zhtCommunity/organization', name: '社区管理', component: organization},
        {path: '/home/zhtCommunity/organizationAdd', name: '新增社区', component: organizationAdd},
        {path: '/home/zhtCommunity/personnel', name: '居民列表', component: personnel},
        {path: '/home/zhtGoods/goodsList', name: '商品管理', component: goodsList},
        {path: '/home/zhtGoods/goodsListAdd', name: '新增商品', component: goodsListAdd},
        {path: '/home/zhtPower/powerUser', name: '管理员', component: powerUser},
        {path: '/home/zhtPower/powerPowerGroup', name: '权限组', component: powerPowerGroup},
        /*
         * 社区
         */
        {path: '/home/sqSurvey', name: '首页', component: sqSurvey},
        {path: '/home/sqContern/notice', name: '公告管理', component: sqNotice},
        {path: '/home/sqContern/noticeAdd', name: '新增公告', component: sqNoticeAdd},
        {path: '/home/sqContern/activity', name: '活动管理', component: sqActivity},
        {path: '/home/sqContern/activityAdd', name: '新增活动', component: sqActivityAdd},
        {path: '/home/sqContern/task', name: '任务管理', component: sqTask},
        {path: '/home/sqContern/taskAdd', name: '新增任务', component: sqTaskAdd},
        {path: '/home/sqCommunity/volunteer', name: '志愿者管理', component: sqOrganization},
        {path: '/home/sqCommunity/volunteerAdd', name: '新增志愿者', component: sqOrganizationAdd},
        {path: '/home/sqCommunity/personnel', name: '居民列表', component: sqPersonnel},
        {path: '/home/sqCommunity/personnelAdd', name: '新增居民', component: sqPersonnelAdd},
        {path: '/home/sqPower/powerUser', name: '管理员', component: sqPowerUser},
        {path: '/home/sqPower/powerPowerGroup', name: '权限组', component: sqPowerPowerGroup},

        {path: '/home/sqCircle/circleManage', name: '圈子管理', component: circleManage},
        {path: '/home/sqCircle/circleManageAdd', name: '新增圈子', component: circleManageAdd},
        {path: '/home/sqCircle/circleNotice', name: '圈子公告', component: circleNotice},
        {path: '/home/sqCircle/circleNoticeAdd', name: '新增公告', component: circleNoticeAdd},
        {path: '/home/sqCircle/circleComment', name: '评论管理', component: circleComment},
        {path: '/home/sqComplaint/complaintManage', name: '建议投诉', component: complaintManage},
        {path: '/postManage', name: 'postManage', component: postManage,},
        {path: '/postAdd', name: '新增帖子', component: postAdd},
        {path: '/article', name: '文章管理', component: article},
        {path: '/articleAdd', name: '新增文章', component: articleAdd},
        {path: '/classify', name: '分类管理', component: classify},
        {path: '/classifyAdd', name: '新增分类', component: classifyAdd},
        {path: '/shangjia', name: '商家管理', component: shangjia},
        {path: '/shangjiaAdd', name: '新增商家', component: shangjiaAdd},
        {path: '/complaintManageAdd', name: '新增建议投诉', component: complaintManageAdd},
        {path: '/meun', name: '菜单管理', component: meun},
        {path: '/meunAdd', name: '新增菜单', component: meunAdd},
        {path: '/coupon', name: '优惠券', component: coupon},
        {path: '/couponAdd', name: '新增优惠券', component: couponAdd},
        {path: '/grid', name: '网格化', component: grid},
        {path: '/gridAdd', name: '新增网格化', component: gridAdd},
        {path: '/dangjian', name: '党建文章', component: dangjian},
        {path: '/dangjianAdd', name: '新增党建文章', component: dangjianAdd},
        {path: '/dangjian/class', name: '党建分类', component: dangjianClass},
        {path: '/dangjianClassAdd', name: '新增党建分类', component: dangjianClassAdd},
        {path: '/grid/class', name: '网格化分类', component: gridClass},
        {path: '/gridClassAdd', name: '新增网格化分类', component: gridClassAdd},
        {path: '/partyRemember', name: '党建管理', component: partyRemember},
        {path: '/pictures', name: '轮播图管理', component: pictures},
        {path: '/picturesAdd', name: '新增轮播图', component: picturesAdd}
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  }
  window.scrollTo(0, 0);
  next()
})

export default router
