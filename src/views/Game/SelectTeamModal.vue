<template lang="pug">
.select-team(:class="{show}")
	.overlay
	.title Select Your Team
	.modal
		.team(v-for="team in teams", onclick="teamSelected(team)",
			:style="{background: team.color}")
			.title(:style="{color: team.colorText}") {{team.name}}
</template>
<script>

export default {
	props: {
		show: {type: Boolean, required: true},
	},
	data: ()=> ({
		teams: [{
			id: 1,
			name: 'The Snakes',
			color: '#4488FF',
			colorText: '#000000',
		}, {
			id: 2,
			name: 'The Hacks',
			color: '#FF32aa',
			colorText: '#000000',
		}],
		teamSelected: team=> { /**/ },
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

.select-team
	fullsize()
	box-sizing border-box
	
	$padding = 20px
	.overlay
		fullsize()
		background hsla(0,0%,0%,0.2)
		opacity 100%

		transition opacity 0.3s
		opacity 0
	
	$title_height = 40px + $padding
	& > .title
		position relative
		height ($title_height - $padding)
		left $padding
		color $white
		margin-top $padding
				
	.modal
		position absolute
		left $padding
		width "calc(100% - %s)" % ($padding * 2)
		height "calc(100% - %s)" % ($title_height + $padding)
		background $red
		border-radius 3px
		overflow: hidden
		
		transition opacity 0.1s, transform 0.4s
		opacity 0
		transform translateY(50px)
		
		display flex
		align-items stretch
		flex-direction column
		.team
			display flex
			flex-grow: 1
			font-size 3em
			justify-content: center
			align-items center

			
	
	pointer-events none
	&.show
		pointer-events all
		.overlay
			opacity 1
		.modal
			opacity 1
			transform translateY(0px)

</style>
