let term = `bruno mars`
let query = ``
let limit = ``
let entity = `&entity=song`


const button = document.querySelector('#search')
const searchBar = document.querySelector('#search-bar')
let ul = document.querySelector('.results > ul')

let url = `https://itunes.apple.com/search?term=${term}${query}${entity}${limit}`

///////////////////////////////////////////////////

async function fetchData(){
	try{
		if(searchBar.value != '')
			term = searchBar.value
		

		url = `https://itunes.apple.com/search?term=${term}${query}${entity}${limit}`

		const response = await fetch(url, { mode: 'cors' })
		if(!response.ok){
			throw new Error('could not fetch resource')
		}

		const data = await response.json()
		
		console.log(data.results)	
		ul.innerHTML = ''
		mountData(data.results)
	} catch(error){
		console.log(error)
	}
}

fetchData()

///////////////////////////////////////////////////
button.addEventListener('click', fetchData)
searchBar.addEventListener('keypress', ()=>{
	if(event.key == 'Enter'){
		fetchData()
	}
})

///////////////////////////////////////////////////

function mountData(songs){
	for(let i=0; i<songs.length; i++){
		let newSong = document.createElement('li')
		
		let trackTime = Math.round(songs[i].trackTimeMillis / 1000)
		let secs = Math.round((trackTime/60 - Math.floor(trackTime/60)) * 60)
		secs = `${secs < 10 ? '0'+secs : secs}`
		trackTime = `- ${Math.floor(trackTime/60)}:${secs}`
		trackTime = ``

		let artist = `<a href="artist.html?artist=@${songs[i].artistId}">${songs[i].artistName}</a>`

		newSong.innerHTML = `${artist} - ${songs[i].trackName} ${trackTime} (${songs[i].releaseDate.slice(0, 4)})`

		ul.appendChild(newSong)
	}
}