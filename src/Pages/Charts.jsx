import react, { useEffect, useState } from "react"
import Song from "../Song"
// https://github.com/KoreanThinker/billboard-json

function Charts() {
	const [top100, set100] = useState([])
	const [day, setDay] = useState('')
	
	const url100 = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json'
	const url200 = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-200/recent.json'
	const urlGlo = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-global-200/recent.json'

	useEffect(()=>{
		async function getCharts(url) {
			let response = await fetch('https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json')
			response = await response.json()
			//console.log(response)
			if(day == '')
				setDay(response.date)
			
			set100(response['data'])
			return response
		}
		getCharts(url100)
	}, [])
	
	console.log(top100)
	return(<>
		<h1>Billboard 100</h1>
		<h3>{day}</h3>
		<div className="top100">
			{top100.map((i) =>{ 
				return <Song name={i['name']} artist={i['artist']}></Song>
			})}
		</div>
		

	</>)
}

export default Charts