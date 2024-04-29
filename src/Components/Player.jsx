
export default function Player({musicSrc}){
	let oldmusic = <audio className="music-player" controls> 
			<source src={musicSrc} type="audio/aac" />
			<source src={musicSrc} type="audio/ogg" />
  			<source src={musicSrc} type="audio/mpeg" />
			Your browser does not support music!
		</audio>
	return(<>
		<audio controls src={musicSrc} autoPlay className="music-player" />
	</>)
}