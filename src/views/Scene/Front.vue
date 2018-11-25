<template lang="pug">
.root(@click="reset")
	svg.svg(width="1024" height="1024"): g
		path(v-for="edge in edges", :key="edge.id",
			:d="edge.d",
			:stroke="edge.color" stroke-width="15px"
			fill="transparent")

	.score(v-for="(team, index) in teams", :key="team.id", v-if="team.score",
		:class="{right: index%2!=0}") {{team.score}}

	.logo
</template>
<script>
import config from '@/config'
import {getD, bezierCommand} from './lineUtils'

export default {
	data: ()=> ({
		teams: config.teams,
	}),
	computed: {
		edges () {
			const getA = (points, invert)=> points.map((p, i)=>
				`${!i?'M':'L'} ${((p.x-0.5)*(invert?-1:1)+0.5)*window.document.body.clientWidth} `
				+`${p.y*window.document.body.clientHeight}`).join(' ')||'M0 0'
			return this.teams.map(t=> ({
				d: getA(t.points), id: t.id, color: t.color,
			}))
		},
	},
	mounted () {
		this.reset()

		const setit = ()=> this.timeoutId = setTimeout(()=> {
			this.addSegment()
			setit()
		}, 40)
		setit()

		config.api.listenToFormattedData()
	},
	destroyed () {
		clearTimeout(this.timeoutId)
	},
	methods: {
		reset () {
			const forTeam = team=> {
				team.points.splice(0, team.points.length)
				team.points.push({
					x: 0.5, // window.document.body.clientWidth/2,
					y: 1, // window.document.body.clientHeight,
					timestamp: new Date()*1,
				})
			}

			this.teams.map(t=> forTeam(t))
		},
		addSegment () {
			const forTeam = team=> {
				const last = team.points[team.points.length-1]
				team.points.push({
					x: last.x + team.angle*0.007,
					y: last.y - 0.001,
					timestamp: new Date()*1,
				})
				if (team.points.length>100) team.points.shift()
			}

			this.teams.map(t=> forTeam(t))
		},
	},
}
</script>
<style scoped lang="stylus">

$blue = #1d283c
$red = #c24766
$white = #ffffff

fullsize()
	position absolute
	top 0px
	left 0px
	width 100%
	height 100%

.root
	fullsize()
	
	// background $blue

	&>.svg
		fullsize()
	
	$score_padding = 50px
	.score
		position absolute
		font-family "HelveticaNeue-CondensedBold", "HelveticaNeue-Medium", "HelveticaNeue"
		font-size 7em
		pointer-events none
		color $white
		opacity 0.3
		width 200px
		height 100px
		top 20px
		left $score_padding
		&.right
			left auto
			right $score_padding
			text-align right

	.logo
		position absolute
		bottom 10px
		right 20px
		background-image url('/image/logo.png')
		background-repeat no-repeat
		background-size contain
		background-position right center
		width 260px
		height 120px
		opacity 0.5

</style>
