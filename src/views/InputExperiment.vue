<template>
  <h1>Hello {{angle}}!</h1>
</template>

<script>
export default {
  name: 'inputexperiment',
  mounted () {
    this.angle = 10
  },
  data: () => ({
    angle: 0
  })
}
</script>
