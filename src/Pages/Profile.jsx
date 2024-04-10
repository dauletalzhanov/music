import Header from "../Components/Header"

import "./CSS/profile.css"

export default function Profile(){
	return(<>
		<Header></Header>
		<div className="profile-details">
			<h3>Profile Section</h3>
			<div className="profile-content">
				<div className="mood">
					<h5>Current Mood: </h5>
					<img src={""} alt="GIF of a current mood" id="giffy" />
				</div>

				<div className="metrics">
					<div className="stat">
						<p>Number of Songs:</p>
						<p><strong>{16}</strong></p>
					</div>
					<div className="stat">
						<p>Favourite Genre:</p>
						<p><strong>{"Pop"}</strong></p>
					</div>
					<div className="stat">
						<p>Favourite Artist:</p>
						<p><strong>{"Dua Lipa"}</strong></p>
					</div>
					<div className="stat">
						<p>Latest Track:</p>
						<p><strong>{"Dua Lipa - Dance the Night"}</strong></p>
					</div>
				</div>
			</div>
		</div>

		<div className="playlist">
			<div className="playlist-title">
				
			</div>
			<div className="playlist-content"></div>
		</div>
	</>)
}