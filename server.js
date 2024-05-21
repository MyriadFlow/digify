// const deepgram = new Deepgram(process.env.NEXT_PUBLIC_DEEPGRAM_API)
// const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_API)

// const fromClientChannel = ably.channels.get('request-channel')
// const broadcastChannel = ably.channels.get('broadcast-channel')

// fromClientChannel.presence.subscribe('enter', (member) => {
// 	console.log('New member joined: ' + member.clientId)
// 	// Start up Deepgram session
// 	const deepgramLive = deepgram.transcription.live({
// 		punctuate: true,
// 		smart_format: true,
// 	})

// 	// Start sending audio to Deepgram
// 	deepgramLive.addListener('transcriptReceived', (transcription) => {
// 		// Publish the transcript to Ably for the clients to receive
// 		const data = JSON.parse(transcription)
// 		if (data.channel == null) return
// 		const transcript = data.channel.alternatives[0].transcript

// 		if (transcript) {
// 			broadcastChannel.publish(member.clientId, transcript)
// 		}
// 	})

// 	deepgramLive.addListener('error', (err) => {
// 		console.log(err)
// 	})

// 	deepgramLive.addListener('close', (closeMsg) => {
// 		console.log('Connection closed')
// 	})

// 	// Listen to clients via Ably for audio messages
// 	const queue = []

// 	fromClientChannel.subscribe(member.clientId, (msg) => {
// 		if (deepgramLive.getReadyState() === 1) {
// 			if (queue.length > 0) {
// 				queue.forEach((data) => {
// 					deepgramLive.send(data)
// 				})
// 				queue.length = 0
// 			}
// 			deepgramLive.send(msg.data)
// 		} else {
// 			queue.push(msg.data)
// 		}
// 	})
// })

// fromClientChannel.presence.subscribe('leave', (member) => {
// 	console.log('Member left: ' + member.clientId)
// })

// const queue = []

// fromClientChannel.subscribe(member.clientId, (msg) => {
// 	if (deepgramLive.getReadyState() === 1) {
// 		if (queue.length > 0) {
// 			queue.forEach((data) => {
// 				deepgramLive.send(data)
// 			})
// 			queue.length = 0
// 		}
// 		deepgramLive.send(msg.data)
// 	} else {
// 		queue.push(msg.data)
// 	}
// })
