<template lang="pug">
.root
	h1 a page asdfasf {{name}}
	input(v-model="name", :class="{valid: name.length > 3}", @keypress.enter="name = ''")
</template>
<script>

export default {
	data: ()=> ({
		name: 'andersasdasf',
	}),
}
</script>
<style scoped lang="stylus">

input:not(.valid)
	border 10px solid red

</style>
