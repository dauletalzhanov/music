import react, { useEffect, useState } from "react"
import Song from "../Components/Song"
import Header from "../Components/Header"
import Ranking from "../Components/Ranking"

// https://github.com/KoreanThinker/billboard-json

import './CSS/charts.css'

function Charts() {
	const [top100, set100] = useState([])
	const [top200, set200] = useState([])
	const [topGlo, setGlo] = useState([])
	const [day, setDay] = useState('')
	
	const url100 = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json'
	const url200 = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-200/recent.json'
	const urlGlo = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-global-200/recent.json'

	useEffect(()=>{
		async function getCharts(url) {
			let response = await fetch(url)
			response = await response.json()

			if(day == '')
				setDay(response.date)
			
			return response['data']
		}

		function getRandomIntInclusive(min, max) {
			const minCeiled = Math.ceil(min);
			const maxFloored = Math.floor(max);
			return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
		}

		getCharts(url100)


		document.body.style.backgroundColor = `rgb(${getRandomIntInclusive(210, 255)},${getRandomIntInclusive(210, 255)},${getRandomIntInclusive(210, 255)})`
	}, [])
	
	console.log(top100)
	return(<>
		<Header></Header>
		<div className="title">
			<h1>Billboard Charts</h1>
			<h3>{day}</h3>
		</div>
		
		<div className="rank-container">
			<Ranking title='Albums' url={url200}></Ranking>
			<Ranking title='Songs' url={url100}></Ranking>
			<Ranking title='Global' url={urlGlo}></Ranking>
			
		</div>
		
		
	</>)
}

export default Charts