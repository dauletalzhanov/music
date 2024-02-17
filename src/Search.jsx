import React, { useState } from "react"

function Search(){
	const [inputText, setInputText] = useState('')

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
		let results = await fetch(url, { mode: 'cors' })
		results = await results.json()
		results = await results.results
		console.log(results)

		await populate(results)
		
		//return results
	}

	function populate(results){
		
		let ul = document.querySelector('ul')
		ul.innerHTML = ''
		for(let i=0; i<results.length; i++){
			let node = document.createElement('li')
			node.innerHTML = `<a href='artist/artist.html?artist=@${results[i].artistId}'>${results[i].artistName}</a> - ${results[i].trackName}`
			ul.appendChild(node)
		}
	}

	function start(){
		let search = document.querySelector('#search-bar').value
		fetching(search)

		return ''
	}

	//fetching()
	return(<>

		<div className="search">

			<input id="search-bar" type='text' placeholder="search music..."></input>
			<button onClick={start}>Search</button>
		</div>
		
		<ul className="results">
			
		</ul>
	</>)
}

export default Search