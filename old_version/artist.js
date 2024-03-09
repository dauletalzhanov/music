//let data = Request.QueryString['artistId'] ?? string.Empty //document.querySelector('#artistId').data
//let abcFromUrl = Request.toString() //["abc"] ?? string.Empty;
const pp = document.querySelector('p')
let artist = document.URL

////////////////////////////////

artist = artist.split('@')[1]
let album = `&entity=album`
album = ''
let url = `https://itunes.apple.com/lookup?id=${artist}${album}`

console.log(artist)

async function fetchData(){
	try{
		const res = await fetch(url, {mode:'cors'})
		if(!res.ok){
			throw new Error('error')
		}
		let data = await res.json()
		data = data.results[0]
		console.log(data)
		artist = data.artistName

		pp.innerHTML += `${artist}`
		document.title = `Artist: ${artist}`
	}
	catch(error){
		console.log(error)
	}	
}

fetchData()

//pp.innerHTML += `${artist}`