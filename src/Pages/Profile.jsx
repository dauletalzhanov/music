import Header from "../Components/Header"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../firebase'

import "./CSS/profile.css"

export default function Profile(){
	const key = import.meta.env.VITE_keyGIF //process.env.keyGIF
	let [query, setQuery] = useState(`find me`)
	let url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`
	let [embedURL, setEmbedURL] = useState('')
	let [alt_text, setAltText] = useState('')
	let [playlist, setPlaylist] = useState([])
	
	useEffect(() => {	
		document.title = `Profile`

		async function getGIF(){
			let result = await fetch(url, { mode: 'cors' })
			result = await result.json()
			setEmbedURL(result.data.images.downsized_medium.url)
			setAltText()
		}

		getGIF()
	}, [url])

	useEffect(()=>{
		async function getPlaylist(db){
			const playlistColl = collection(db, "playlist")
			const playlistDocs = await getDocs(playlistColl)
			const playlistSnap = playlistDocs.docs.map(doc => doc.data())

			setPlaylist(playlistSnap)
		  
			console.log(playlistSnap)
		  
		  }
		  
		getPlaylist(db)


	}, [])

	function updateQuery(event){
		setQuery(event.target.value)
		url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`
	}

	function removeSong(event){
		const songName = event.target.querySelector(".songName").innerHTML
		const artistName = event.target

		console.log(`removing ${songName}`)
	}

	return(<>
		<Header></Header>
		<div className="profile-details">
			<h3>Profile Section</h3>
			<div className="profile-content">
				<div className="mood">
					<div>
						<h5>Current Mood: </h5>
						<input type="text" onChange={updateQuery} value={query} className="search-query"/>
					</div>

					<img src={embedURL} alt="GIF of a current mood" id="giffy" />
				</div>

				<div className="metrics">
					<div className="stat">
						<p>Number of Songs:</p>
						<p><strong>{ playlist.length }</strong></p>
					</div>
					<div className="stat">
						<p>Favourite Genre:</p>
						<p><strong>{"Pop"}</strong></p>
					</div>
					<div className="stat">
						<p>Favourite Artist:</p>
						<p><strong>{"Dua Lipa"}</strong></p>
					</div>
					<div className="stat">
						<p>Latest Track:</p>
						<p><strong>{"Dua Lipa - Dance the Night"}</strong></p>
					</div>
				</div>
			</div>
		</div>

		<div className="playlist">
			<div className="playlist-title">
				<h3>SAVED SONGS</h3>
				<h3>TOTAL SONGS: { playlist.length }</h3>
			</div>

			<div className="playlist-content">
				{ playlist.map((song, index) => {
					return (<div key={index} className="playlist-song">
						<div className="leftie">
							<img src={song.artworkURL} alt={"album cover for " + song.artistName + song.songName} className="album-cover" />
							<div className="song-details">
								<p className="artistName"> <Link to={song.artistURL}> {song.artistName}</Link></p>
								<p className="songName">{song.songName}</p>
								<p>{song.length}</p>
							</div>

						</div>
						<button id="remove-button" onClick={removeSong}>REMOVE</button>
					</div>)
				})}
			</div>
		</div>
	</>)
}