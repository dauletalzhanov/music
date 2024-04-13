
export default function TrackList({song}){

	console.log(song)
	
	
	
	return(<>
		<div className="track">
			<div key={""} className="tracklist-leftie">
				<p>{"index"}</p>
				<p>{song.trackName}</p>
				
			</div>
			
		</div>
	</>)
}