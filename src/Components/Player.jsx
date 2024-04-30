import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	playTrack,
	pausePlayback,
	resumePlayback,
	stopPlayback,
	addTime
} from "../features/playerSlice"

export default function Player({musicSrc}){
	const dispatch = useDispatch()
	const { currentTrack, isPlaying, currentTime} = useSelector((state) => state.player)

	useEffect(() => {
		
		if(isPlaying){
			dispatch(addTime)
			console.log(currentTime)
		}

	})

	if(musicSrc !== "")
		dispatch(playTrack(musicSrc))

	console.log(currentTrack)

	
	return(<>
		<audio controls src={musicSrc=="" ? currentTrack : musicSrc} autoPlay className="music-player" />
	</>)
}