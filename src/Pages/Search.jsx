import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { Helmet } from "react-helmet"

import { useSelector, useDispatch } from "react-redux"
import {
	playTrack,
	pausePlayback,
	resumePlayback,
	stopPlaying,
	updateTime
} from "../features/playerSlice"


import { addDoc, collection,  } from "firebase/firestore"
import { db } from "../../firebase"

import Header from "../Components/Header"
import SearchTerm from "../Components/SearchTerm"
import Player from "../Components/Player"

import './CSS/search.css'
import "./CSS/search_mobile.css"

import "./CSS/album.css?inline"
import "./CSS/profile.css?inline"
import "./CSS/no_page.css?inline"
import aaa from './CSS/search.css?inline' 

export default function Search(){
	// search engine
	const [inputText, setInputText] = useState('')
	
	// search results
	const [searchResults, setSearchResults] = useState([])
	
	// cookie results
	const [userCookie, setUserCookie] = useCookies(["user"])

	// redux
	const dispatch = useDispatch()
	const { currentTrack } = useSelector((state) => state.player)
	//const { currentTrack, isPlaying, playingTime } = useSelector((state) => state.player)
	
	//const dispatch = useDispatch()
	const [musicSrc, setMusicSrc] = useState("")

	let params = useParams("query")

	let term = ``
	let query = ``
	let limit = ``
	let entity = `&entity=song`

	let url = `https://itunes.apple.com/search?term=${term}${entity}${limit}`
	
	if(params != {})
		console.log(params)

	useEffect(() => {
		let body = document.querySelector('body')
		let colorNumber = 120
		function changeBackground(){
			let body = document.querySelector('body')
			let root = document.querySelector('#root')
			let color =  `rgb(${Math.random()*120}, ${Math.random()*120}, ${Math.random()*120})`
			body.style.backgroundColor = color
			root.style.backgroundColor = color
		}

		//changeBackground()

	}, [])

	useEffect(()=>{
		async function searchStuff(query=params){
			let term = query
			let limit = ``
			let entity = `&entity=song`
		
			let url = `https://itunes.apple.com/search?term=${term}${entity}${limit}`

			let data = await fetch(url, { mode: "cors" })
			data = await data.json()
			
			data = data.results

			console.log(data)
			setSearchResults(data)
		}
		
		if(inputText.length == 0)
			searchStuff( params.query ? params.query : inputText)
		else
			searchStuff(inputText)


		if(inputText.length == 0)
			document.title = "Search"
		else
			document.title = 'Searching: "' + inputText + '"'

	}, [inputText])

	useEffect(()=>{
		console.log(musicSrc)

	}, [musicSrc])


	function queryChange(event){
		document.title = "Δ: " + event.target.value
	}

	async function start(){
		const search = document.querySelector('#search-bar').value
		setInputText(search)
	}

	function convertTime(millies){

        let time = millies
        time /= 1000
        time = Math.floor(time)
        let mins = Math.floor(time/60)
        let secs = time - 60*mins
        mins = mins < 10 ? "0"+mins : mins
        secs = secs < 10 ? "0"+secs : secs
        time = `${mins}:${secs}`

        return time
    }

	async function addSong(event){

		const id = event.target.getAttribute("id")
		const song = searchResults[id]

		const addition = {
			songName: song.trackName,
			artistName: song.artistName,
			artistURL: song.artistId,
			albumId: song.collectionId,
			length: convertTime(song.trackTimeMillis),
			artworkURL: song.artworkUrl100.replace("100x100bb", "1000x1000bb"),
			genre: song.primaryGenreName,
            musicSrc: song.previewUrl,
            albumID: song.collectionId,
			user: userCookie.user
		}

		await addDoc(collection(db, "song"), addition)

		//console.log(song)
		//console.log(addition)
	}

	async function playMusic(event){
		const id = event.target.getAttribute("id")
		const song = searchResults[id]

		setMusicSrc(song.previewUrl)
		dispatch(playTrack(song.previewUrl))

	}


	return(<>
		<Header></Header>
		<div role="search" className="search">
			<div class="form-group">
				<input
					type="text"
					class="form-control"
					id="search-bar"
					placeholder=" "
					aria-label="Search music"
					onChange={queryChange}
				/>
				<label for="search-bar" class="form-label">Search Music</label>
			</div>
			<button onClick={start}>Search</button>
		</div>
		
		<main>
			<div>

			</div>
			<ul className="results">
				{ searchResults.length == 0 ? "No Songs Here" : searchResults.map((song, index)=> {

					let albumCover = song.artworkUrl100
					albumCover = albumCover.replace("100x100bb", "1000x1000bb")

					return(<li key={index} id={index} onDoubleClick={playMusic}>
							<Link to={"/album/" + song.collectionId}>
								<img 
									src={albumCover} 
									alt={`Album Cover for ${song.artistName} ${song.trackName}`} 
									className="album-search"
								/>
							</Link>

							<div className="search-album-details">
								<Link className="search-artist" to={"/artist/" + song.artistId}>{song.artistName}</Link>

								<p className="search-song-details">{song.trackName}</p>
								
								<p> { song.releaseDate.split('-')[0] } </p>
							</div>

							

							<div className="search-actions ">
								<button id={index} className="play-music-search" onClick={playMusic}> Play </button>

								{userCookie.user == "guest"?"" : <button id={index}  onClick={addSong}> Add </button>}
							
							</div>
					</li>)
				})}

			</ul>
		
			{ currentTrack !== "" ? <Player musicSrc={musicSrc} /> : "" }
		</main>


		<Helmet>
			<meta name="description" content="Search Music: Songs, Albums, Artist and anything music related! Play any song in an instant! Carry the song with to other pages!" />

		</Helmet>
	</>)
}