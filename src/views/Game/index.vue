<template lang="pug">
.root
	SelectTeamModal(:show="true")
</template>
<script>
import SelectTeamModal from './SelectTeamModal'

export default {
	components: {SelectTeamModal},
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
