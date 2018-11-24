<template lang="pug">
.select-team(:class="{show}")
	.overlay
	.modal
		.team(v-for="team in teams", onclick="()=> $emit('teamSelected', team)",
			:style="{background: team.color}")
			.image(:style="{backgroundImage: 'url('+team.image+')'}")
			//- .title(:style="{color: team.colorText}") {{team.name}}
	.title: .inner CHOOSE TEAM
</template>
<script>

export default {
	props: {
		show: {type: Boolean, required: true},
		teams: {type: Array, required: true},
	},
	data: ()=> ({}),
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
		
		transition opacity 0.3s
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
			flex-grow: 1
			font-size 3em
			justify-content: center
			align-items center
			.image
				position absolute
				width 70%
				height 70%
				left 15%
				top 15%
				background-position center center
				background-size contain
				background-repeat no-repeat

			
	
	pointer-events none
	&.show
		pointer-events all
		.overlay, .title
			opacity 1
		.modal
			opacity 1
			transform translateY(0px)

</style>
