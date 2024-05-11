'use client'

import { useEffect, useRef, useState } from 'react'
import { VoiceRecorder } from '@/components/ui/voice-recorder'
import { Speech } from '@/utils/speechSynthesis'

export default function Home() {
	useEffect(() => {
		Speech('I watch you slip away')
	}, [])

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

	return (
		<main className='relative h-screen'>
			<a-scene className='h-48'>
				<a-sky src='/guico.jpg' rotation='0 -130 0'></a-sky>
			</a-scene>
			<div className='absolute bg-slate-950 h-[35vh] top-8 right-5 p-4 rounded-md'>
				<div className='text-white'>
					<h3>Metadata</h3>
					<div>randowm data location</div>
				</div>
			</div>
			<div className='absolute bottom-12 left-[30%]'>
				<p className='text-center font-bold '>Click on the mic icon to speak</p>
				<VoiceRecorder />
			</div>
		</main>
	)
}
