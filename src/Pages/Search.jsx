import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { addDoc, collection,  } from "firebase/firestore"
import { db } from "../../firebase"

import Header from "../Components/Header"
import SearchTerm from "../Components/SearchTerm"

import './CSS/search.css'

export default function Search(){
	const [inputText, setInputText] = useState('')
	const [searchResults, setSearchResults] = useState([])

	let params = useParams(":query")

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

		changeBackground()

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
		
		searchStuff(inputText)


		if(inputText.length == 0)
			document.title = "Search"
		else
			document.title = 'Searching: "' + inputText + '"'

	}, [inputText])


	function queryChange(event){
		document.title = "Δ: " + event.target.value
	}

	async function start(){
		let search = document.querySelector('#search-bar').value
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
			user: "user"
		}

		await addDoc(collection(db, "song"), addition)

		//console.log(song)
		//console.log(addition)
	}


	return(<>
		<Header></Header>
		<div role="search" className="search">
			<input id="search-bar" type='text' onChange={queryChange} placeholder="search music..."></input>
			<button onClick={start}>Search</button>
		</div>
		
		<main>
			<ul className="results">
				{searchResults.map((song, index)=> {
					let albumCover = song.artworkUrl100
					albumCover = albumCover.replace("100x100bb", "1000x1000bb")

					return(<li key={index}>
						<a href={"/album/" + song.collectionId}>
							<img 
								src={albumCover} 
								alt={`Album Cover for ${song.artistName} ${song.trackName}`} 
								className="album-search"
							/>
						</a>
						<a className="search-artist" href={"/artist/" + song.artistId}>{song.artistName} -</a>
		
						<p className="search-song-details">{song.trackName} - {song.releaseDate.split('-')[0]}</p>

						<button id={index} className="addingFromSearch" onClick={addSong}> Add </button>
				
					</li>)
				})}

			</ul>
		</main>


	</>)
}