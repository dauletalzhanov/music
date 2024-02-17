import React, { useEffect } from "react"


function Artist(){
	

	async function getArtist(){
		try {
			let artistId = document.URL.split('@')[1]
			let url = `https://itunes.apple.com/lookup?id=${artistId}`
			const res = await fetch(url, {mode:'cors'})
			if(!res.ok)
				throw new Error('error')
			let data = await res.json()


			data = data.results[0]
			console.log(data)
			console.log(data.artistName)
			

			return data.artistName
		} catch(error){
			console.log(error)
		}
	}

	let title = getArtist()
	document.title = `Artist: ${title}`

	


	return(<>
	
	</>)
}

export default Artist