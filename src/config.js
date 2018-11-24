const uuidv4 = ()=> 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=> {
	// eslint-disable-next-line
	const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
	return v.toString(16)
})


const config = {
	eventName: 'snakecast_event',
	api: {
		backendSelected: 'stagecast',
		get backend () { return this.backends[this.backendSelected] },
		backends: {
			stagecast: {
				_websocket: null,
				get websocket () {
					if (this._websocket) return this._websocket
					this._websocket = new WebSocket(
						`ws://stagecast.se/api/events/${config.eventName}/ws?x-user-listener=1`)
					console.log(this._websocket)
					this._websocket.onopen = ()=> this.isOpen = true
					return this._websocket
				},
				isOpen: false,
				sendUserData (data) {
					if (!this.websocket || !this.isOpen) return console.log('ws not open yet')
					this.websocket.send(JSON.stringify(data))
				},
			},
		},
		sendUserData ({teamId, angle}) {
			const data = { teamId, angle, userId: this.data.userId }
			this.backend.sendUserData(data)
		},
		data: {
			userId: uuidv4(),
		},
	},
	device: {
		rawacc: null,
		mouse: null,
	},
	teams: [{
		id: 1,
		name: 'The Snakes',
		color: 'HSLA(345, 49%, 53%, 1.00)',
		image: '/image/snakes.png',
		angle: 0,
		score: 0,
	}, {
		id: 2,
		name: 'The Hacks',
		color: 'HSLA(218, 34%, 17%, 1.00)',
		image: '/image/hacks.png',
		angle: -0.3,
		score: 3,
	}],
}

const attachAccel = ()=> {
	let lx, ly, lz
	if (!window.DeviceOrientationEvent) return
	window.addEventListener('deviceorientation', event=> {
		const z = Math.round(event.alpha)
		const x = Math.round(event.gamma)
		const y = Math.round(event.beta)
		const changed = z != lz || y != ly || x != lx
		if (!changed) return
		lx = x
		ly = y
		lz = z
		if (config.device.rawacc)
			Object.assign(config.device.rawacc, {x, y, z})
	}, true)
}
const attachMouse = ()=> {
	window.document.body.addEventListener('mousemove', event=> {
		const normX = event.clientX/window.document.body.offsetWidth
		const normCenteredX = normX*2-1
		const normY = event.clientY/window.document.body.offsetHeight
		const normCenteredY = normY*2-1
		if (config.device.mouse) {
			config.device.mouse.x = normCenteredX
			config.device.mouse.y = normCenteredY
		}
	})
}
window.addEventListener('load', ()=> {
	attachMouse()
	attachAccel()
})

export default config
