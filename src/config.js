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
						`wss://stagecast.se/api/events/${config.eventName}/ws?x-user-listener=1`)
					this._websocket.onopen = ()=> this.isOpen = true
					return this._websocket
				},
				isOpen: false,
				sendUserData (data) {
					if (!this.websocket || !this.isOpen) return console.log('ws not open yet')
					this.websocket.send(JSON.stringify(data))
				},
				listenToData (handleMessage) {
					this.websocket.onmessage = data=> {
						try {
							data = JSON.parse(data.data)
							handleMessage(data)
						} catch (e) {
							console.error(e)
						}
					}
				},
			},
		},
		sendUserData ({teamId, angle}) {
			const data = { teamId, angle, userId: this.data.userId }
			this.backend.sendUserData(data)
		},
		listendToData (listener) {
			this.backend.listenToData(listener)
		},
		listenToFormattedData () {
			this.listendToData(d=> {
				this.data.users[d.userId] = d
				const team = config.teams.find(t=> t.id == d.teamId)
				console.log(team)
				if (!team) return
				const usersForTeam = Object.values(this.data.users).filter(u=> u.teamId == team.id)
				const sum = xs=> xs.reduce((p, x)=> p+x, 0)
				const avg = xs=> sum(xs)/(xs.length||1)
				team.angle = avg(usersForTeam.map(u=> u.angle))
				// console.log(team.angle, usersForTeam)
			})
		},
		data: {
			userId: uuidv4(),
			users: {},
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
		points: [],
	}, {
		id: 2,
		name: 'The Hacks',
		color: 'HSLA(218, 34%, 17%, 1.00)',
		image: '/image/hacks.png',
		angle: -0.3,
		score: 3,
		points: [],
	}],
}

const attachAccel = ()=> {
	let lx, ly, lz
	if (!window.DeviceOrientationEvent) return
	window.addEventListener('deviceorientation', event=> {
		const z = event.alpha/40
		const x = event.gamma/40
		const y = event.beta/40
		const changed = z != lz || y != ly || x != lx
		if (!changed) return
		lx = x
		ly = y
		lz = z
		if (config.device.rawacc) {
			config.device.rawacc.x = x
			config.device.rawacc.y = y
			config.device.rawacc.z = z
		}
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
