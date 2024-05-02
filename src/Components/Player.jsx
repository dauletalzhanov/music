import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
//import { useCookies } from "react-cookie"

import {
	playTrack,
	pausePlayback,
	resumePlayback,
	stopPlaying,
	updateTime
} from "../features/playerSlice"


export default function Player({musicSrc = ""}){
	const dispatch = useDispatch()
	const { currentTrack, isPlaying, playingTime } = useSelector( (state) => state.player )
	//let [timeCookie, setTiming] = useCookies(["timing"])
	const audioRef = useRef(playingTime)
	
	
	useEffect(() => {
		if(isPlaying){
			audioRef.current.currentTime = playingTime
			//document.querySelector(".music-player").classList.toggle("invisible")
			
		}
		audioRef.current.currentTime = playingTime

	}, [isPlaying])

	if(musicSrc !== ""){
		dispatch(playTrack(musicSrc))
	}
		

	//console.log(currentTrack)

	function changeTime(event){
		let time = event.target.currentTime
		//time = Math.round(time * 10) / 10
		time = Math.floor(time)
		//console.log(time)

		//setTiming("timing", time)

		dispatch(updateTime(time))
		//console.log(playingTime)
	}

	function stopMusic(event){
		dispatch(stopPlaying())
		dispatch(playTrack(""))
		//useDispatch(stopPlaying())
		event.target.previousSibling.pause()

		//event.target.parentNode.classList.toggle("invisible")

	}

	return(<div className="music-player-container">
		<audio controls autoPlay
			src={ musicSrc=="" ? currentTrack : musicSrc} 
			className="music-player" 
			onTimeUpdate={ changeTime }
			ref = { audioRef }
		></audio>
		<button className="player-stop-button" onClick={stopMusic}> Stop </button>
	</div>)
}