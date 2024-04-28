import Header from "../Components/Header"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { collection, doc, getDocs, where, query, orderBy, limit, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase'

import "./CSS/profile.css"

import "./CSS/album.css?inline"
import "./CSS/search.css?inline"
import "./CSS/no_page.css?inline"
import aaa from './CSS/search.css?inline' 

export default function Profile(){
	const key = import.meta.env.VITE_keyGIF //process.env.keyGIF
	let [query, setQuery] = useState(`find me`)
	let url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${query}`
	let [embedURL, setEmbedURL] = useState('')
	let [alt_text, setAltText] = useState('')
	let [playlist, setPlaylist] = useState([])
	let [latest, setLatest] = useState("")
	//let [genres, setGenres] = useState({})
	let [favGenre, setFavGenre] = useState("")
	let [favArtist, setFavArtist] = useState("")

	let [userCookie, setUser] = useCookies(["user"])
	
	
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
			const songDocs = await getDocs(songColl)

			let songSnap = songDocs.docs.map(doc => {
				let data = doc.data()
				data["id"] = doc.id
				data["timeAdded"] = doc._document.createTime.timestamp.seconds
			
				//console.log(doc)
				return data
			})


			songSnap = songSnap.filter(song => song.user == userCookie.user)

			setPlaylist(songSnap)
		}
		
		getPlaylist(db)


	}, [])

	useEffect(()=>{

		function sorting(){

			playlist.sort((a, b) => b.timeAdded - a.timeAdded)
			console.log(playlist)

			//setPlaylist(songSnap)

			
			if(playlist.length > 0){
				let temp = playlist[0]
				setLatest(temp.artistName + " - " + temp.songName)
				//
				//console.log(latest)
			}

			let temp_genres = {}
			let artists = {}
			let fav_genre = ""
			let fav_artist = ""

			playlist.forEach((song)=>{
				let currentGenre = song.genre
				let currentArtist = song.artistName
				
				if(fav_genre == "")
					fav_genre = currentGenre

				if(fav_artist == "")
					fav_artist = currentArtist

				
				
				if(temp_genres[currentGenre])
					temp_genres[currentGenre]++
				else
					temp_genres[currentGenre] = 1

				if(temp_genres[currentGenre] > temp_genres[fav_genre])
					fav_genre = currentGenre
				
				//////////////////////////////////////////////
				if(artists[currentArtist])
					artists[currentArtist]++
				else
					artists[currentArtist] = 1

				if(artists[currentArtist] > artists[fav_artist])
					fav_artist = currentArtist
			})

			//console.log(`Fav Genre: ${fav_genre} : ${temp_genres[fav_genre]}`)
			//console.log(`Fav Artist: ${fav_artist} : ${artists[fav_artist]}`)

			setFavGenre(fav_genre)
			setFavArtist(fav_artist)
			//console.log("fav artist:", artists)

		}

		sorting()
		
	}, [playlist])

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
		const updatedPlaylist = playlist.filter(song => song.id !== songID)
		setPlaylist(updatedPlaylist)
		//playlist.slice(index, 1)
		//window.location.reload()
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
						<p><strong>{favGenre}</strong></p>
					</div>
					<div className="stat">
						<p>Favourite Artist:</p>
						<p><strong>{favArtist}</strong></p>
					</div>
					<div className="stat">
						<p>Latest Track:</p>
						<p className="latest-song"><strong>{latest}</strong></p>
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
								<Link className="artistName" to={"/artist/"+song.artistURL}> {song.artistName}</Link>
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