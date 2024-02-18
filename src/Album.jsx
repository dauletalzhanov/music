
function Album(props){
	const toggleDD = () => {
		//let trackList = document.querySelector('#trackList')
		
		
		let h3 = document.querySelectorAll('h3')
		for(let i=0; i<h3.length;i++){
			let trackList = h3[i].nextElementSibling
			trackList.classList.toggle('invisible')
		}
		
		
		//trackList = trackList.nextElementSibling
		//trackList.classList.toggle('invisible')
	}
	
	async function getSongs(){
		try {
			let artistId = props.album.artistId
			let collectionId = props.album.collectionId
			let url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=2000`
			const res = await fetch(url, { mode: `cors` })
			
			if(!res.ok)
				throw new Error(res.error)

			let data = await res.json()
			console.log(data)
			return data
		} catch(error){
			console.log(error)
		}
	}

	getSongs()

	return(<>
		<h3 onClick={toggleDD}>{props.album.collectionName} ({props.album.releaseDate.slice(0,4)})</h3>
		<ul id="trackList" className="invisible">
			<li>1</li>
		</ul>
	</>)
}

export default Album