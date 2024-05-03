import React, {useState, useEffect} from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"

import Header from "../Components/Header"
import Player from "@/Components/Player"

//import "./CSS/artist.css"
import "./CSS/artist.css"
import "./CSS/artist_mobile.css"

function Artist(){
	const params = useParams()
	const { currentTrack } = useSelector((state) => state.player)

	let [albums, setAlbums] = useState([])
	let [artistInfo, setAristInfo] = useState({})
	let [dataResult, setDataResults] = useState([])
	let [orderDate, setOrderDate] = useState("desc")
	let [orderName, setOrderName] = useState("desc")
	

	useEffect(()=>{
		const artistID = params['id']

		async function getAlbums(){
			try {
				let url = `https://itunes.apple.com/lookup?id=${artistID}&entity=album&limit=2000`
				const res = await fetch(url, { mode: `cors` })

				if(!res.ok)
					throw new Error(res.error)
	
				let data = await res.json()
				data = data.results
				

				setAristInfo({ ...data[0] })
				//document.title = "Artist: " + artistInfo.artistName

				let alb = data.slice(1)

				setDataResults(alb)
				console.log(data)

				//alb = alb.filter(a => a.trackCount > 3)

				//alb.forEach(a => a.artworkUrl100 = alb.artworkUrl100.replace("100x100bb", "1000x1000bb"))
				//alb.artworkUrl100 = alb.artworkUrl100.replace("100x100bb", "1000x1000bb")
				//console.log(alb)

				for(let i=0; i<alb.length; i++){
					let albumCover = alb[i].artworkUrl100.replace("100x100bb", "1000x1000bb")
					alb[i].albumCover = albumCover
				}

				alb = alb.filter(a => a.collectionName.toLowerCase().includes("single") == false && a.collectionName.toLowerCase().includes(" ep") == false && a.trackCount >= 5)
				//let alb = dataResult.filter(a => a.collectionName.toLowerCase().includes("single") == false)

				setAlbums([...alb])
				
				return data
			} catch(error){
				console.log(error)
			}
		}

		getAlbums()
	}, [])


	function filterAlbums(event){

		const query = event.target.value.toLowerCase()

		
		let albumFiltered = dataResult.filter((album) => {
			let albumName = album.collectionName
			albumName = albumName.toLowerCase()

			
			return albumName.includes(query)
		})

		setAlbums(albumFiltered)

	}

	function sortDate(){
		let albumSorted = albums.sort((a, b) => {
			const firstDate = new Date(a.releaseDate.slice(0, 10)) 
			const seconDate = new Date(b.releaseDate.slice(0, 10)) 

			let returnVal = null
			if(orderDate == "desc"){
				returnVal = seconDate - firstDate
				setOrderDate("asc")
			} else {
				returnVal = firstDate - seconDate
				setOrderDate("desc")
			}


			return returnVal
		})

		setAlbums(albumSorted)

	}

	function sortName(specific = "desc"){
		let albumSorted = []
		if(orderName == "asc"){
			albumSorted = albums.slice().sort((a, b) => a.collectionName.localeCompare(b.collectionName))
			setOrderName("desc")
		} else {
			albumSorted = albums.slice().sort((a, b) => b.collectionName.localeCompare(a.collectionName))
			setOrderName("asc")
		}
			
		setAlbums(albumSorted)
	}

	function getSingles(){
		let albumFiltered = dataResult.filter((album) => {
			let albumName = album.collectionName.toLowerCase()
			//console.log(albumName)

			return albumName.includes("single")  || albumName.includes(" ep") || album.trackCount < 5
		})

		setAlbums(albumFiltered)
	}

	function setDefault(){

		//let alb = dataResult.filter(a => a.trackCount > 3)
		//let alb = dataResult.filter(a => a.collectionName.toLowerCase().includes("single") == false)
		let alb = dataResult.filter(a => a.collectionName.toLowerCase().includes(" single") == false && a.collectionName.toLowerCase().includes(" ep") == false && a.trackCount >= 5)
		
		setAlbums(alb)
	}

	function selectExplicitness(event){
		const selectedOption = event.target.value
		
		if(selectedOption == "default"){
			setDefault()
			return
		}
		let albumFiltered = []

		albumFiltered = dataResult.filter((album)=> album.collectionExplicitness == selectedOption)
		
		/*
		if(albums.length == 0)
			albumFiltered = dataResult.filter((album)=> album.collectionExplicitness == selectedOption)
		else
			albumFiltered = albums.filter((album)=> album.collectionExplicitness == selectedOption)
		*/

		setAlbums(albumFiltered)


	}

	function hoverAlbum(event){
		const id = event.target.getAttribute("id")
		const target = albums[id]
		//console.log(target)
		
		let details = document.querySelector(".details-about-the-album")
		details.innerHTML = ""

		for(let key in target){
			let node = document.createElement("p")

			let inputText = ""
			if(typeof target[key] == "string")
				inputText = `${key} : ${ target[key].length < 50 ? target[key] : "too long" }`
			else
				inputText = `${key} : ${target[key]}`
			
			if(inputText.includes("too long"))
				continue
			
			
			
			node.innerHTML = inputText
			//details.appendChild(node)
			
		}
	}

	return(<>
		<Header></Header>

		<div role="contentinfo" className="artistSection desktop-only">
			<p>Artist Name: {artistInfo.artistName}</p>
			<p>Primary Genre: {artistInfo.primaryGenreName}</p>
			
			{artistInfo.artistType != "Artist" ? <p>Artist Type: {artistInfo.artistType}</p> : ""}

			<a href={artistInfo.artistLinkUrl}>iTunes</a>

			<div className="artist-filter">
				<p>Filtering and Sorting</p>
				<input type="text" name="filter-albums" id="filter-albums" placeholder="filter albums here" onChange={filterAlbums}/>
				<button type="button" onClick={ sortDate } >Sort by Date</button>
				<button type="button" onClick={ sortName } >Sort by Name</button>
				<button type="button" onClick={ getSingles } > Singles Only </button>
				<button type="button" onClick={ setDefault } > Default </button>
				
				<select name="explicitness" id="explicitness" onChange={selectExplicitness} >
					<option value="default">Choose Explicitness</option>
					<option value="explicit" >Explicit</option>
					<option value="notExplicit">Not Explicit</option>
					<option value="cleaned" >Clean</option>
				</select>
			</div>

			<div className="details-about-the-album">
				

			</div>

			
		</div>

		<div className="artist-info mobile-only">
			<p>{artistInfo.artistName}</p>
			<input type="text" name="filter-albums" id="filter-albums" placeholder="filter albums here" onChange={filterAlbums}/>


		</div>

		<div aria-label="list of albums" role="main" className="artist-albums">
			{albums.map((value, index)=> {
				const altText = `album cover for "${ value.collectionName }"`
				const albumUrl = `/album/${ value.collectionId }`
				return (
					<Link key={index} id={index} onMouseEnter={hoverAlbum} to={albumUrl}>
						<img className="artist-album-cover" alt={ altText } src={ value.albumCover } /> 

						<div>
							<p aria-label="album name" role="definition" > { value.collectionName }</p>
							<p aria-label="how release date">{ value.releaseDate.slice(0, 10) }</p>
							<p aria-label="number of songs">{ value.trackCount } { value.trackCount == 1 ? "Song" : "Songs" }</p>
							<p aria-label="how naughty the album is">{  value.collectionExplicitness }</p>
						</div>
						
						 
					</Link>
				)})
			}

			
		</div>

		<div className="artist-bottom-panel mobile-only">
			<div className="bottom-panel-sort">
				<p>it is </p>

			</div>

			<button>Default</button>

			<div className="bottom-pane-filter">
				<p className="drop-up-access-filter-albums">hee</p>
				<div className="drop-up-filter-albums-artist">
					<p>Singles Only</p>
					<p>Explicitnes</p>
				</div>
				

				
			</div>
		</div>

		{ currentTrack ? <Player /> : "" }

		<Helmet>
			<title> Artist: { artistInfo.artistName ? artistInfo.artistName : "Loading" } </title>
			<meta name="description" content={ `Music Catalogue for the Artist: "${artistInfo.artistName ? artistInfo.artistName : "Loading"}". Their entire discography available right here.` } />
			<meta name="keywords" content={ `Music, iTunes, Apple, ${ artistInfo.artistName ? artistInfo.artistName + ", " + dataResult.slice(0, 10).map((a) => a.collectionName) : "Loading" }`} />

		</Helmet>

	</>)
}

export default Artist