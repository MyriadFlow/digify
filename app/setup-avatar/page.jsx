'use client'

import { AvatarCreator } from '@readyplayerme/react-avatar-creator'

const config = {
	clearCache: true,
	bodyType: 'fullbody',
	quickStart: false,
	language: 'en',
}

const style = {
	width: '100%',
	height: '80vh',
	border: 'none',
	marginBlock: 'auto',
}

const SUBDOMAIN = 'https://phygitals.readyplayer.me/'

export default function SetupAvatar() {
	const handleOnAvatarExported = (event) => {
		console.log(`Avatar URL is: ${event.data.url}`)
	}

	return (
		<main className='h-screen bg-fuchsia-950'>
			<section className='h-5/6 bg-orange-700'>
				<AvatarCreator
					subdomain='SUBDOMAIN'
					config={config}
					style={style}
					onAvatarExported={handleOnAvatarExported}
				/>
			</section>
		</main>
	)
}
