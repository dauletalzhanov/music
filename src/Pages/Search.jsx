import React, { useState, useEffect } from "react"
import Header from "../Components/Header"

import './CSS/search.css'

function Search(){
	const [inputText, setInputText] = useState('')

	useEffect(() => {
		let body = document.querySelector('body')
		body.style.backgroundColor = `rgb(${Math.random()*120}, ${Math.random()*120}, ${Math.random()*120})`
		console.log(`color: ${body.style.backgroundColor}`)
	})

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
		let query = ``
		let limit = ``
		let entity = `&entity=song`
		let url = `https://itunes.apple.com/search?term=${term}${entity}${limit}`
		let results = 	await fetch(url, { mode: 'cors' })
		results = 		await results.json()
		results = results.results
		console.log(results)

		populate(results)
	}

	function populate(results){
		
		let ul = document.querySelector('ul')
		ul.innerHTML = ''
		for(let i=0; i<results.length; i++){
			let node = document.createElement('li')
			node.innerHTML = `<img src='${results[i].artworkUrl100}'><a href='/artist/${results[i].artistId}'>${results[i].artistName}</a><p> - ${results[i].trackName} (${results[i].releaseDate.split('-')[0]})</p>`
			ul.appendChild(node)
		}
	}

	function changeBackground(){
		let body = document.querySelector('body')
		body.style.backgroundColor = `rgb(${Math.random()*120}, ${Math.random()*120}, ${Math.random()*120})`
	}

	function start(){
		let search = document.querySelector('#search-bar').value
		if(search != '')
			fetching(search)

		return ''
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

export default Search