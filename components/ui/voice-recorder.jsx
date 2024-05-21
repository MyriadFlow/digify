'use client'
import { useState, useRef, useEffect } from 'react'
import { FaMicrophoneAltSlash, FaMicrophoneAlt, FaStop } from 'react-icons/fa'

export const VoiceRecorder = () => {
	const mediaRecorder = useRef(null)

	const [permission, setPermission] = useState(false)
	const [recordingStatus, setRecordingStatus] = useState('inactive')
	const [stream, setStream] = useState(null)
	const [audioChunks, setAudioChunks] = useState([])
	const [audio, setAudio] = useState(null)
	const [isPaused, setIsPaused] = useState(false)

	const [isRecording, setIsRecording] = useState(false)
	const [transcript, setTranscript] = useState('')
	const transcriptRef = useRef(null)

	const [state, setState] = useState({ active: 'stop' })
	const [transcription, setTranscription] = useState('')
	const [recorder, setRecorder] = useState({})
	const [lastPersonTalking, setLastPersonTalking] = useState('')

	const mimeType = 'audio/webm'

	const client = useAbly()
	const requestChannel = useChannel('request-channel').channel

	useChannel('[?rewind=100]broadcast-channel', (message) => {
		// Update the transcript
		let transcript = message.data
		if (lastPersonTalking !== message.name) {
			setTranscription(
				(prevTranscription) => prevTranscription + '\n' + message.name + ': '
			)
			setLastPersonTalking(message.name)
		}
		setTranscription(
			(prevTranscription) => prevTranscription + transcript + ' '
		)
	})

	async function start(_e) {
		setState({ active: 'start' })
		//Add microphone access and send audio to Ably
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then(async (stream) => {
				const mediaRecorder = new MediaRecorder(stream)
				setRecorder(mediaRecorder)

				// Enter Ably Presence to indicate we're ready to send audio
				await requestChannel.presence.enter()

				// Send audio to Ably

				mediaRecorder.addEventListener('dataavailable', async (event) => {
					if (event.data.size > 0) {
						const arrayBuffer = await event.data.arrayBuffer()
						requestChannel.publish(client.auth.clientId, arrayBuffer)
					}
				})
				mediaRecorder.start(1000)
			})
	}

	async function stop(_e) {
		setState({ active: 'stop' })
		// Stop recording
		setState({ active: 'stop' })
		if (recorder.state != null) {
			recorder.stop()
			await requestChannel.presence.leave()
		}
	}

	const connectMicrophone = async () => {
		if (window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				})
				setPermission(true)
				setStream(streamData)
			} catch (error) {
				alert(error.message)
			}
		}
	}

	return (
		<div className='w-80 h-10 bg-slate-950 text-white  rounded-full flex justify-center p-8'>
			{!permission ? (
				<div onClick={connectMicrophone}>
					<FaMicrophoneAltSlash color='white' />
				</div>
			) : (
				<div className='flex gap-4'>
					<p id='realtime-title'>Click start to begin recording!</p>
					<button
						onClick={start}
						className={state.active === 'start' ? 'active' : ''}
					>
						Start
					</button>
					<button
						onClick={stop}
						className={state.active === 'stop' ? 'active' : ''}
					>
						Stop
					</button>
					<p id='message'>{transcription}</p>
					{/* <button onClick={handleStartRecording} disabled={isRecording}>
						Start Recording
					</button>
					<button onClick={handleStopRecording} disabled={!isRecording}>
						Stop Recording
					</button>
					<textarea ref={transcriptRef} value={transcript} readOnly />
					{listening && <p>Listening...</p>} */}
				</div>
			)}
		</div>
	)
}
