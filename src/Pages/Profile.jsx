import Header from "../Components/Header"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { collection, doc, getDocs, where, query, orderBy, limit, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase'

import "./CSS/profile.css"

export default function Profile(){
	const key = import.meta.env.VITE_keyGIF //process.env.keyGIF
	let [query, setQuery] = useState(`find me`)
	let url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`
	let [embedURL, setEmbedURL] = useState('')
	let [alt_text, setAltText] = useState('')
	let [playlist, setPlaylist] = useState([])
	let [latest, setLatest] = useState("")

	useEffect(() => {
		let allStyles = document.querySelectorAll("style")
		let head = allStyles.parentNode
		for(let i=0; i<allStyles.length; i++){
			
			console.log(allStyles[i])
		}

	})
	
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
			const songColl = collection(db, "song")
			//let q = await query(songColl, orderBy("createTime", "desc"))
			const songDocs = await getDocs(songColl)

			let songSnap = songDocs.docs.map(doc => {
				let data = doc.data()
				data["id"] = doc.id
				data["timeAdded"] = doc._document.createTime.timestamp.seconds//.timeStamp
				//console.log(doc)
				return data
			})

			songSnap.sort((a, b) => b.timeAdded - a.timeAdded)
			console.log(songSnap)

			setPlaylist(songSnap)
			
			if(songSnap.length > 0){
				let temp = songSnap[0]
				setLatest(temp.artistName + " - " + temp.songName)
				//console.log(latest)
			}
				
			
			//console.log(songSnap)
			//latest = playlist.sort((a, b) => new Date(a.timeAdded) - new Date(b.timeAdded))
			//setLatest("latest")
			//console.log("latest", latest)
		  
		}
		
		getPlaylist(db)


	}, [])

	function updateQuery(event){
		setQuery(event.target.value)
		url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`
	}

	async function removeSong(event){
		//let songName = event.target.parentNode.querySelector(".songName").innerHTML
		//let artistName = event.target.parentNode.querySelector(".artistName").innerHTML
		
		const index = event.target.getAttribute('id')
		const song = playlist[index]
		const songID = song.id
		
		//console.log(index)
		//console.log(song)
		//console.log(`removing "${artistName} - ${songName}"`)

		await deleteDoc(doc(db, "song", songID))
		//playlist.slice(index, 1)
		window.location.reload()
	}

	return(<>
		<Header></Header>
		<div className="profile-details">
			<h3>Profile Section</h3>
			<div className="profile-content">
				<div className="mood">
					<div>
						<label for="search-query" aria-label="Current Mood">Current Mood: </label>
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
						<p><strong>{latest}</strong></p>
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
								<Link className="artistName" to={"/"+song.artistURL}> {song.artistName}</Link>
								<p className="songName">{song.songName}</p>
								<p>{song.length}</p>
							</div>

						</div>
						<button id={index} className="remove-button" onClick={removeSong}>REMOVE</button>
					</div>)
				})}
			</div>
		</div>
	</>)
}