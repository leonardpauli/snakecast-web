<template lang="pug">
.root
	SelectTeamModal(:show="team===null || true", :teams="teams",
		@teamSelected="team=> this.team = team", :team="team")

</template>
<script>
import SelectTeamModal from './SelectTeamModal'
import config from '@/config'

export default {
	components: {SelectTeamModal},
	data: ()=> ({
		team: null,
		teams: config.teams,
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
