'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODMyNjc5OWItODdlMS00MmRkLWE4OTgtMjllN2VjZjdhMGMxIiwidHlwZSI6ImFwaV90b2tlbiJ9.cwufaIyFL-doCyuUB9-ZVJXy1m8qZ36uZ4IFVrs_Qd0'
const url = 'https://api.edenai.run/v2/audio/text_to_speech'

export default function Home() {
	const mediaRecorder = useRef(null)
	const [formText, setFormText] = useState('')
	const [convertedText, setConvertedText] = useState('')
	const [permisssion, setPermission] = useState(false)
	const [recordingStatus, setRecordingStatus] = useState('inactive')
	const [stream, setStream] = useState(null)
	const [audioChunks, setAudioChunks] = useState([])
	const [audio, setAudio] = useState(null)

	const mimeType = 'audio/webm'

	const sendFile = async (url) => {
		try {
			await fetch(`http://localhost:3000/api/recording`, {
				method: 'POST',
				body: JSON.stringify(url),
			})
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	const displayText = async () => {
		console.log('Media' + media)

		const data = {
			providers: ['openai'],
			language: 'en',
			file_url: media,
			speakers: 2,
			profanity_filter: false,
			convert_to_wav: false,
		}

		const options = {
			method: 'POST',

			headers: {
				Authorization: `Bearer ${TOKEN}`,
				accept: 'application/json',
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		}

		try {
			const res = await fetch(
				'https://api.edenai.run/v2/audio/speech_to_text_async',
				options
			)
			const data = await res.json()

			setConvertedText(data?.results?.openai.text)

			localStorage.setItem('Texts', JSON.stringify(data?.results?.openai))
		} catch (error) {
			console.log('error' + error)
		}
	}

	const getMicrophone = async () => {
		console.log('beloved haunted in the kitchen')
		// console.log(window)

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

	const startRecording = async () => {
		setRecordingStatus('recording')

		//we create a new Media recorder instance using the stream

		const media = new MediaRecorder(stream, { type: mimeType })

		//set the mediarecorder instance to the mediarecord ref
		mediaRecorder.current = media

		//invokes the start method to start the recording process
		mediaRecorder.current.start()

		let localAudioChunks = []
		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === 'undefined') return
			if (event.data.size === 0) return
			localAudioChunks.push(event.data)
		}

		setAudioChunks(localAudioChunks)
	}

	const stopRecording = () => {
		setRecordingStatus('inactive')

		//stops the recording instance
		mediaRecorder.current.stop()
		mediaRecorder.current.onstop = () => {
			//creates a blob file from the audiochunks data
			const audioBlob = new Blob(audioChunks, { type: mimeType })
			//creates a playable URL from the blob file

			const audioUrl = URL.createObjectURL(audioBlob)

			sendFile(audioUrl.slice(5))
			console.log(audioUrl.slice(5))

			setAudio(audioUrl)
			setAudioChunks([])
		}
	}

	return (
		<main className='bg-dark flex min-h-screen flex-col items-center justify-between p-24'>
			<section>
				<div className='flex flex-col gap-4 mb-8'>
					<h3>Cereal for breakfast</h3>
				</div>

				<div>
					{/* <figure>
						<figcaption>Text to speech, listen to what you wrote</figcaption>
						<audio controls src={speech?.openai?.audio_resource_url}></audio>
					</figure> */}
				</div>
				<div className='flex flex-col gap-4'>
					<Button type='submit' onClick={displayText}>
						Speech to text
					</Button>
					<div>
						<p>{convertedText}</p>
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					{!permisssion ? (
						<Button type='submit' onClick={getMicrophone}>
							Connect Microphone
						</Button>
					) : (
						<Button type='submit' onClick={startRecording}>
							Record Audio
						</Button>
					)}
				</div>
				<div className='flex flex-col gap-4'>
					{recordingStatus === 'recording' && (
						<Button onClick={stopRecording} type='button'>
							Stop Recording
						</Button>
					)}
				</div>
				<div className='flex flex-col gap-4'>
					{audio && (
						<div className='audio-container'>
							<audio src={audio} controls></audio>
							<a download href={audio}>
								Download Recording
							</a>
						</div>
					)}
				</div>
			</section>
		</main>
	)
}
