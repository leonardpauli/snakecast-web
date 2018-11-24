<template lang="pug">
.root(@mousedown="addSegment(angle+=$event.shiftKey?10:-10)")
	svg.svg(width="1024" height="1024"): g
		path(v-for="edge in edges", :key="edge.id",
			:d="edge.d",
			stroke="#777" fill="transparent")

	h1 hello {{angle}}
</template>
<script>
import {getD, bezierCommand} from './lineUtils'

export default {
	data: ()=> ({
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


fullsize()
	position absolute
	top 0px
	left 0px
	width 100%
	height 100%

.root
	fullsize()
	
	&>.svg
		fullsize()

</style>
