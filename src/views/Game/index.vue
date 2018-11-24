<template lang="pug">
.root
	SelectTeamModal(:show="false", :teams="teams", @teamSelected="()=> alert('hello')")
	svg.svg(width="200" height="200"): g
		path(v-for="edge in edges", :key="edge.id",
			:d="edge.d",
			stroke="#777" fill="transparent")
		path(v-for="edge in edges", :key="edge.id+'-end'",
			:d="edge.dEnd",
			stroke="transparent" fill="#777")

</template>
<script>
import SelectTeamModal from './SelectTeamModal'

export default {
	components: {SelectTeamModal},
	data: ()=> ({
		teams: [{
			id: 1,
			name: 'The Snakes',
			color: 'HSLA(345, 49%, 53%, 1.00)',
			image: '/image/snakes.png',
		}, {
			id: 2,
			name: 'The Hacks',
			color: 'HSLA(218, 34%, 17%, 1.00)',
			image: '/image/hacks.png',
		}],
	}),

	computed: {
		edges () {
			const getEdge = ({from, to})=> {
				const arrowX = 7
				const arrowY = 4
				const arrowYMargin = 2

				const d = 10
				const configNodeHeight = 50
				const fromP = [from.x+from.width, from.y+configNodeHeight/2]
				const toP = [to.x-arrowX-arrowYMargin, to.y+configNodeHeight/2]
				const xDist = toP[0]-fromP[0]
				const handleDist = Math.max(d, Math.abs(xDist)*(0.5 * (200/Math.max(200, xDist)))
									+ Math.abs(toP[1]-fromP[1])/3)

				return {
					from, to, id: from.id+'-'+to.id,
					d: `M${fromP[0]} ${fromP[1]}`
						+`C ${fromP[0]+handleDist} ${fromP[1]}, `
						+`${toP[0]-handleDist} ${toP[1]}, `
						+`${toP[0]} ${toP[1]}`,
					dEnd: `M${toP[0]} ${toP[1]}`
						+`L${toP[0]} ${toP[1]-arrowY}`
						+`L${toP[0]+arrowX} ${toP[1]}`
						+`L${toP[0]} ${toP[1]+arrowY}`
						+'z',
				}
			}

			return [getEdge({from: {x: 0, width: 30, y: 0, id: 1}, to: {x: 100, y: 100, id: 2}})]
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
	
	&>.svg
		fullsize()

</style>
