<template>
  <h1>Unicorns! <br>{{ y }}g</h1>
</template>

<script>

export default {
	name: 'Inputexperiment',
	data: ()=> ({
		angle: 0,
		x: 0,
		y: 0,
		z: 0,
	}),
	mounted () {
		movementListener(([xx, yy, zz])=> {
			this.x = Math.round(xx)
			this.y = Math.round(yy)
			this.z = Math.round(zz)
		})
		this.angle = 10
	},
}

const movementListener = tilt=> {
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', event=> {
			tilt([event.beta, event.gamma, event.alpha])
		}, true)
	} else if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', event=> {
			tilt([event.acceleration.x * 2, event.acceleration.y * 2, event.acceleration.z])
		}, true)
	} else {
		window.addEventListener('MozOrientation', event=> {
			tilt([event.orientation.x * 50, event.orientation.y * 50, event.orientation * 50])
		}, true)
	}
}
</script>
