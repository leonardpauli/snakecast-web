<template lang="pug">
.select-team(:class="{show, hasExpanded: !!selectedTeam}")
	.overlay
	.modal
		.team(v-for="team in teams",
			@click="()=> $emit('teamSelected', team)",
			@touchstart="teamsTouchDown[team.id] = true",
			@touchend="teamsTouchDown[team.id] = false",
			:class="{active: teamsTouchDown[team.id]===true, expanded: selectedTeam && team.id===selectedTeam.id}"
			:style="{background: team.color}")
			.image(:style="{backgroundImage: 'url('+team.image+')', transform: 'rotateZ('+angleForTeam(team)*40+'deg)'}")
			//- .title(:style="{color: team.colorText}") {{team.name}}
	.title: .inner CHOOSE TEAM
</template>
<script>
import config from '@/config'

export default {
	props: {
		show: {type: Boolean, required: true},
		teams: {type: Array, required: true},
		team: {type: Object, required: false},
	},
	data: ()=> ({
		teamsTouchDown: {},
		angle: 0,
		rawacc: {x: null, y: null, z: null},
		mouse: {x: null, y: null},
	}),
	computed: {
		selectedTeam () { return this.team },
		angleForTeam () { return team=> this.selectedTeam && team.id===this.selectedTeam.id? this.angle: team.angle },
	},
	mounted () {
		config.device.rawacc = this.rawacc
		config.device.mouse = this.mouse

		this.$watch('rawacc', newVal=> {
			if (!this.team) return
			this.angle = newVal.x
			config.api.sendUserData({angle: this.angle, teamId: this.team.teamId})
		}, { deep: true })

		this.$watch('mouse', newVal=> {
			if (!this.team) return
			this.angle = newVal.x
			config.api.sendUserData({angle: this.angle, teamId: this.team.teamId})
		}, { deep: true })
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

.select-team
	fullsize()
	box-sizing border-box
	
	$padding = 20px
	.overlay
		fullsize()
		background hsla(0,0%,0%,0.2)

		transition opacity 0.3s
		opacity 0
	
	$title_height = 0
	
	& > .title
		position abosolute
		font-family "HelveticaNeue-CondensedBold", "HelveticaNeue-Medium", "HelveticaNeue"
		font-size 3em
		height 100%
		pointer-events none
		color $white
		transform translateY(0px)
		
		align-items stretch
		flex-direction column
		justify-content: center
		align-items center
		display flex
		
		transition opacity 0.15s
		opacity 0
		
	.modal
		position absolute
		left 0px
		top 0px
		width 100%
		height 100%
		
		transition opacity 0.1s, transform 0.4s
		opacity 0
		transform translateY(50px)
		
		display flex
		align-items stretch
		flex-direction column
		
		.team
			position relative
			display flex
			flex-grow 1
			font-size 3em
			justify-content: center
			align-items center
			overflow hidden
			
			transition flex-grow 0.2s
			&.expanded
				flex-grow
			&:hover
				cursor pointer
			.image
				position absolute
				width 80%
				height 40%
				left ((100% - 80%) / 2)
				top ((100% - 40%) / 2)
				background-position center center
				background-size contain
				background-repeat no-repeat
				transition transform 0.15s
				transform-origin 50% 100%
			&:active, .active
				.image
					transform scale(0.94) !important

	
	pointer-events none
	&.show
		pointer-events all
		.overlay, .title
			opacity 1
		.modal
			opacity 1
			transform translateY(0px)
			
	&.hasExpanded
		.title
			opacity 0
		.team:not(.expanded)
			flex-grow 0.0001
		.modal
			pointer-events none

</style>
