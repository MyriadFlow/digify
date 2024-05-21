import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './card'
import { metadata } from '@/data'
import { VscDebugBreakpointLogUnverified } from 'react-icons/vsc'

export const Metacard = () => {
	console.log(metadata.name)

	return (
		<Card className='card text-white'>
			<CardHeader>
				<CardTitle>{metadata.name}</CardTitle>
				<CardDescription>{metadata.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex gap-3 items-center'>
					<VscDebugBreakpointLogUnverified />
					<p>{metadata.collection}</p>
				</div>
				<div className='flex gap-3 items-center'>
					<VscDebugBreakpointLogUnverified />
					<p>{metadata.creator}</p>
				</div>
				<div className='flex gap-3 items-center'>
					<VscDebugBreakpointLogUnverified />
					<p>{metadata.year}</p>
				</div>
				<div className='flex gap-3 items-center'>
					<VscDebugBreakpointLogUnverified />
					<p>{metadata.dimensions}</p>
				</div>
				<div className='flex gap-3 items-center'>
					<VscDebugBreakpointLogUnverified />
					<p>{metadata.album}</p>
				</div>
				{/* {metadata.attributes.map((item) => (
            <div className='flex gap-3 items-center'>
              <VscDebugBreakpointLogUnverified />
              <p>
                {item.trait_type} - {item.value}
              </p>
            </div>
          ))} */}
			</CardContent>
		</Card>
	)
}
