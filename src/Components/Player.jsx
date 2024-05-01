import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	playTrack,
	pausePlayback,
	resumePlayback,
	stopPlayback,
	addTime,
	updateTime
} from "../features/playerSlice"

export default function Player({musicSrc}){
	const dispatch = useDispatch()
	const audioRef = useRef(0)
	//const [audioRef, setAudioRef] = useState(0)
	const { currentTrack, isPlaying, playingTime } = useSelector((state) => state.player)

	useEffect(() => {
		
		if(isPlaying){
			audioRef.current.currentTime = playingTime
		}

	}, [isPlaying])

	if(musicSrc !== ""){
		dispatch(playTrack(musicSrc))
		
	}
		

	//console.log(currentTrack)

	function changeTime(event){
		let time = event.target.currentTime
		time = Math.round(time)

		//console.log(time)

		dispatch(updateTime(time))
		console.log(playingTime)
	}

	return(<>
		<audio controls autoPlay
			src={musicSrc=="" ? currentTrack : musicSrc} 
			className="music-player" 
			onTimeUpdate={ changeTime }
			ref = { audioRef }
			
		/>
	</>)
}