import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	// mode: 'history',
	base: '/taiyuanfashe-h5/dist',
	routes: [{
			path: '/',
			name: 'root',
			redirect: {
				name: 'Login',
			},
		},
		{
			path: '/login',
			name: 'Login',
			component: require('@/page/taiyuanfashe/login/Login'),
		},
		{
			path: '/index',
			name: 'Index',
			component: require('@/page/taiyuanfashe/index/Index'),
		},
		{
			path: '/weekwork',
			name: 'Weekwork',
			component: require('@/page/taiyuanfashe/weekWork/WeekWork'),
		},
		{
			path: '/news',
			name: 'NewsList',
			component: require('@/page/taiyuanfashe/newsList/NewsList'),
		},
		{
			path: '/militaryTraining',
			name: 'MilitaryTraining',
			component: require('@/page/taiyuanfashe/militaryTraining/MilitaryTraining'),
		},
		{
			path: '/inEducation',
			name: 'InEducation',
			component: require('@/page/taiyuanfashe/inEducation/InEducation'),
		},
		{
			path: '/newsdetail',
			name: 'newsdetail',
			component: require('@/page/taiyuanfashe/newsDetail/NewsDetail'),
		},
		{
			path: '/management',
			name: 'Management',
			component: require('@/page/taiyuanfashe/Management/Management'),
		},
		{
			path: '/aRecipe',
			name: 'aRecipe',
			component: require('@/page/taiyuanfashe/aRecipe/aRecipe'),
		},
		// importantDiary
		// 要事日记
		{
			path: '/importantDiary',
			name: 'importantDiary',
			component: require('@/page/taiyuanfashe/importantDiary/importantDiary'),
		},
		{
			path: '/preparationAgainstWar',
			name: 'preparationAgainstWar',
			component: require('@/page/taiyuanfashe/preparationAgainstWar/preparationAgainstWar'),
		},
		// Notice
		{
			path: '/Notice',
			name: 'Notice',
			component: require('@/page/taiyuanfashe/Notice/Notice'),
		},
		{
			path: '/leaderLetter',
			name: 'leaderLetter',
			component: require('@/page/taiyuanfashe/leaderLetter/leaderLetter'),
		},
		{
			path: '/complaintMailbox',
			name: 'complaintMailbox',
			component: require('@/page/taiyuanfashe/complaintMailbox/complaintMailbox'),
		}
	],
})
