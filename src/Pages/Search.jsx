import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import Header from "../Components/Header"
import SearchTerm from "../Components/SearchTerm"

import './CSS/search.css'

export default function Search(){
	const [inputText, setInputText] = useState('')
	const [searchResults, setSearchResults] = useState([])
	let params = useParams(":query")
	
	if(params != {})
		console.log(params)

	useEffect(() => {
		let body = document.querySelector('body')
		//body.style.backgroundColor = `rgb(${Math.random()*120}, ${Math.random()*120}, ${Math.random()*120})`
		let colorNumber = 120
		function changeBackground(){
			let body = document.querySelector('body')
			let root = document.querySelector('#root')
			let color =  `rgb(${Math.random()*120}, ${Math.random()*120}, ${Math.random()*120})`
			body.style.backgroundColor = color
			root.style.backgroundColor = color
		}

		changeBackground()
	}, [searchResults])

	function update(event){
		setInputText(event.target.value)
		fetching(inputText)
	}
	if(inputText.length == 0)
		document.title = "Search"
	else
		document.title = 'Searching: "' + inputText + '"'

	let term = ``
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
		let results = await fetch(url, { mode: 'cors' })
		results = await results.json()
		results = results.results
		
		setSearchResults([])
		for(let i=0; i<results.length; i++){
			let albumCover = results[i].artworkUrl100.replace("100x100bb", "1000x1000bb")
			results[i].artworkUrl100 = albumCover
			searchResults.push(results[i])
		}
			
		

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
			img.setAttribute('alt', `Album Cover for ${results[i].artistName} ${results[i].trackName}`)
			img.classList.add('album-search')
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

	function queryChange(event){
		document.title = "Δ: " + event.target.value
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
		<div role="search" className="search">
			<input id="search-bar" type='text' onChange={queryChange} placeholder="search music..."></input>
			<button onClick={start}>Search</button>
		</div>
		
		<main>
			<ul className="results">
				{ searchResults.map((term)=> {
					return(<SearchTerm parameters={term}></SearchTerm>)
				}) }
			</ul>
		</main>


	</>)
}