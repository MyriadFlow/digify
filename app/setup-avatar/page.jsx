'use client'
import { AvaturnSDK } from '@avaturn/sdk'
import { useEffect, useRef } from 'react'

export default function SetupAvatar() {
	const containerRef = useRef(null)

	const loadAvatar = async () => {
		const container = document.getElementById('avaturn-sdk-container')
		const sdk = new AvaturnSDK()

		await sdk.init(container, {
			url: 'https://phygitals.avaturn.dev',
			disableUi: true,
		})

		sdk.on('load', () => {
			sdk.getBodyList.then((list) => console.log(list))
		})
	}

	useEffect(() => {
		// loadAvatar()
	}, [])

	return (
		<main className='h-screen bg-fuchsia-950'>
			<section className='h-5/6 bg-orange-700'>
				<div
					id='avaturn-sdk-container'
					ref={containerRef}
					className='h-full w-5/6  m-auto'
				></div>
			</section>
		</main>
	)
}
