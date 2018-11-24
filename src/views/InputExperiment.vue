<template lang="pug">
h1
	| Unicorns!
	br
	| value= {{ value }}
	br
	canvas(id="myCanvas" width="400" height="400" style="border:1px solid #d3d3d3;").
		Your browser does not support the HTML5 canvas tag
</template>

<script>

export default {
	name: 'Inputexperiment',
	data: ()=> ({
		value: 0,
		connection: new WebSocket('ws://localhost:9030'),
		clientId: guid(),
	}),
	mounted () {
		// Log errors
		this.connection.onerror = error=> {
			this.connection.close(0, '')
			console.error('WebSocket Error ' + error)
			this.connection= new WebSocket('ws://b30e4191.ngrok.io:9030')
		}
		const tilt = v=> {
			this.value = twoDecimals(v)
			console.log('unicorn value'+this.value)
			const c=document.getElementById('myCanvas')
			const ctx=c.getContext('2d')
			const myGradient=ctx.createLinearGradient(0, 0, 400, 0)
			const paddLeft = Math.max(this.value -0.2, 0.0)
			const paddRight = Math.min(this.value +0.2, 1.0)
			myGradient.addColorStop(0, 'black')
			myGradient.addColorStop(paddLeft, 'black')
			myGradient.addColorStop(this.value, 'red')
			myGradient.addColorStop(paddRight, 'black')
			myGradient.addColorStop(1, 'black')
			ctx.fillStyle=myGradient
			ctx.fillRect(0, 0, 400, 400)
			this.connection.send(JSON.stringify({userId: this.clientId, tilt: v, team: 1}))
		}

		movementListener(tilt)
		this.angle = 10
	},
}

const guid = ()=> 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=> {
	// eslint-disable-next-line
	const r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8
	return v.toString(16)
})

const twoDecimals = v=> Math.round(v *1000)/1000

const movementListener = tilt=> {
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', event=> {
			tilt(event.gamma/70)
		}, true)
	} else if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', event=> {
			tilt((event.acceleration.y * 2)/70)
		}, true)
	} else {
		window.addEventListener('MozOrientation', event=> {
			tilt((event.orientation.y * 50)/70)
		}, true)
	}
	window.addEventListener('mousemove', event=> {
		tilt(Math.round(event.y)/850)
	}, true)
}
</script>
