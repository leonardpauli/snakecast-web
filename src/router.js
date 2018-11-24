import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import Settings from './views/Settings'

import Scene from './views/Scene'
import SceneCeiling from './views/Scene/Ceiling'
import SceneFront from './views/Scene/Front'
import SceneBars from './views/Scene/Bars'

import Game from './views/Game'

import InputExperiment from './views/InputExperiment.vue'


/* global process */

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{ path: '/', name: 'home', component: Home },
		{
			path: '/about',
			name: 'about',
			component: ()=> import(/* webpackChunkName: "about" */ './views/About.vue'),
		},
		{ path: '/settings', name: 'settings', component: Settings },
		{ path: '/scene', name: 'scene', component: Scene, children: [
			{ path: '/ceiling', name: 'scene-ceiling', component: SceneCeiling },
			{ path: '/front', name: 'scene-front', component: SceneFront },
			{ path: '/bars', name: 'scene-bars', component: SceneBars },
		] },
		{ path: '/game', name: 'game', component: Game },
		{ path: '/input-experiment', name: 'inputexperiment', component: InputExperiment },
	],
})
