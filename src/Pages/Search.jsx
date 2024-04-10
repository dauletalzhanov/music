import React, { useState, useEffect } from "react"
import Header from "../Components/Header"
import SearchTerm from "../Components/SearchTerm"

import './CSS/search.css'

export default function Search(){
	const [inputText, setInputText] = useState('')
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		let body = document.querySelector('body')
		//body.style.backgroundColor = `rgb(${Math.random()*120}, ${Math.random()*120}, ${Math.random()*120})`
		let colorNumber = 120
		function changeBackground(){
			let body = document.querySelector('body')
			body.style.backgroundColor = `rgb(${Math.random()*120}, ${Math.random()*120}, ${Math.random()*120})`
			
		}

		changeBackground()
	}, [searchResults])

	function update(){
		setInputText(event.target.value)
		fetching(inputText)
	}

	let term = `bruno mars`
	let query = ``
	let limit = ``
	let entity = `&entity=song`
	let url = `https://itunes.apple.com/search?term=${term}${entity}${limit}`

	async function fetching(term){
		console.clear()
		
		let query = ``
		let limit = ``
		let entity = `&entity=song`
		let url = `https://itunes.apple.com/search?term=${term}${entity}${limit}`
		let results = 	await fetch(url, { mode: 'cors' })
		results = 		await results.json()
		results = results.results
		
		setSearchResults([])
		for(let i=0; i<results.length; i++)
			searchResults.push(results[i])

		console.log(searchResults)

		populate(results)
		
	}

	function populate(results){
		let ul = document.querySelector('ul')
		ul.innerHTML = ''
		for(let i=0; i<results.length; i++){
			let li = document.createElement('li')

			// album cover
			let img = document.createElement('img')
			img.setAttribute('src', results[i].artworkUrl100)
			img.setAttribute('alt', "Album Cover")
			li.appendChild(img)

			// artist name (url)
			let artist = document.createElement('a')
			artist.setAttribute("href", "/artist/" + results[i].artistId)
			artist.innerHTML = results[i].artistName
			li.appendChild(artist)

			// song title
			let song = document.createElement('p')
			song.innerHTML = ` - ${results[i].trackName} ` 
			song.innerHTML += `(${results[i].releaseDate.split('-')[0]})`
			li.appendChild(song)

			ul.appendChild(li)
		}
	}

	async function start(){
		let search = document.querySelector('#search-bar').value
		setInputText(search)
		if(search != '' || search != inputText)
			await fetching(search)

		let results = document.querySelector('.results')
		results.appendChild(searchResults.map( term => {
			<SearchTerm parameters={term}></SearchTerm>
		}))

		
	

		//let document.querySelector(".results").innerHTML = searchResults.map(term => <SearchTerm parameters={term}></SearchTerm>)
		//document.querySelector('.results').appendChild(searchResults.map(term => <SearchTerm parameters={term}></SearchTerm>))
	}

	//fetching()
	return(<>
		<Header></Header>
		<div className="search">

			<input id="search-bar" type='text' placeholder="search music..."></input>
			<button onClick={start}>Search</button>
		</div>
		
		<ul className="results">
				
		</ul>

	</>)
}