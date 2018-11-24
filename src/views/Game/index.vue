<template lang="pug">
.root
	SelectTeamModal(:show="team===null || true", :teams="teams", @teamSelected="team=> this.team = team", :team="team")

</template>
<script>
import SelectTeamModal from './SelectTeamModal'

export default {
	components: {SelectTeamModal},
	data: ()=> ({
		team: null,
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

</style>
