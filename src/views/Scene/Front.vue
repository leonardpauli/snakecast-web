<template lang="pug">
.root(@mousedown="addSegment(angle+=$event.shiftKey?10:-10)")
	svg.svg(width="1024" height="1024"): g
		path(v-for="edge in edges", :key="edge.id",
			:d="edge.d",
			stroke="#777" fill="transparent")

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
		time: 0,
		angle: 0,
		points: [],
	}),
	computed: {
		edges () {
			return [{d: getD(this.points, bezierCommand), id: 1}]
		},
	},
	mounted () {
		setInterval(()=> {
			this.time += 1
		}, 16)
	},
	methods: {
		addSegment (rightLeft) {
			const c = window.innerWidth / 2
			const inH = window.innerHeight
			 const last = inH-this.time

			if (last < inH / 2) {
				this.points.pop()
			}

			this.points.push([c +this.angle, last])
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
