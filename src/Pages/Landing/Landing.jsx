import { useState } from "react"
import { Helmet } from "react-helmet"
import Header from "../../Components/Header"
import { Link } from "react-router-dom"

// images
import notTaylor from "../../assets/taylor_cropped.jpg"
import mic from "../../assets/mic.jpg"
import taylor_albums from "./taylor.json"

// social media icons
import fb from "../../assets/fb.svg"
import twit from "../../assets/twitter.svg"
import ig from "../../assets/ig.svg"
import yt from "../../assets/youtube.svg"

// services icons
import looking_glass from "../../assets/looking_glass.svg"
import pedestal from "../../assets/charts.svg"
import floppy_disk from "../../assets/floppy.svg"
import retro from "../../assets/retro.svg"

// powered by images
import itunes from "../../assets/itunes.svg"
import firebase from "../../assets/firebase.svg"
import giphy from "../../assets/giphy.svg"
import react from "../../assets/react.svg"

// css
import "./landing_page.css"
import "./landing_mobile.css"

import Carousel from "../../Components/Carousel"

export default function Landing(){
	console.log(taylor_albums)

	return(<>
		<Helmet>
			<title>MUSIC</title>
			<meta name="description" content="MUSIC: Explore Artists, Albums and Songs straight from iTunes Music Library." />
		</Helmet>

		<Header></Header>
		
		<main>
			<div id="services">
				<h5>Services</h5>
				<div className="service-boxes">
					<div className="service-box">
						<div className="service-container">
							<img src={looking_glass} alt="looking glass symbolising searching" />

						</div>
						<h6>1. Search Music</h6>
						<p>
							Browse iTunes’ Extensive Library with your favourite artists, 
							albums and tracks! The catalogue has music from all over the 
							world with updates occuring in moments’ notice!
						</p>

					</div>

					<div className="service-box">
						<div className="service-container">
							<img src={pedestal} alt="pedestal symbolising charts" />


						</div>
						<h6>2. Charts</h6>
						<p>
							Get updated on most popular music that get updated every week 
							straight from Billboard charts! You can check out Top Songs, 
							Albums and Songs Globally!
						</p>

					</div>

					<div className="service-box">
						<div className="service-container">
							<img src={floppy_disk} alt="floppy disk symbolising saving music" />

						</div>
						<h6>3. Save Songs</h6>
						<p>
							Save your favourite tracks into your very own personal playlists!
							Add or remove as many songs as you please.
						</p>

					</div>

					<div className="service-box">
						<div className="service-container">
							<img src={retro} alt="scenery symbolising visualisations" />

						</div>
						<h6>4. Play Music</h6>
						<p>
							Play music samples available from the iTunes at any moment! Take 
							the music with you wherever you please.
						</p>

					</div>
				</div>

				<div className="service-line"></div>

				<h5>Powered By</h5>

				<div className="powered-bys">
					<div className="powered-by">
						<img src={itunes} alt="itunes logo" />
						<p>iTunes' Music Catalogue</p>
					</div>

					<div className="powered-by">
						<img src={firebase} alt="firebase logo" />
						<p>Google's Firebase Database</p>
					</div>

					<div className="powered-by">
						<img src={giphy} alt="giphy logo" />
						<p>Giphy's Dynamic GIFs</p>
					</div>

					<div className="powered-by">
						<img src={react} alt="react logo" />
						<p>Facebook's React Library</p>
					</div>

					


				</div>
				
			</div>

			

			<div className="browse-taylor-swift">
				<div className="transition-pb"></div>

				<div className="taylors-section">
					<img src={notTaylor} alt="this is not a picture of taylor swift" />
					<div className="taylors-stats">
						<Link to="/artist/159260351">Browse Taylor Swift</Link>
						<p className="white">65 Billion Plays on iTunes</p>
						<p className="white">104 Million Monthly Listeners on Spotify</p>
						<p className="white">30 Billion Plays on Youtube</p>
						<p className="gold">11 Grammys ‧ 34 VMAs ‧ 12 Billboard Awards</p>
						

					</div>
					<img src={mic} alt="picture of a microphone" />
				</div>
				<div className="transition-ba"></div>
			</div>

			<div className="taylors-albums">
				<Carousel items={taylor_albums} />
					
			</div>

			<div className="transition-review-youtube"></div>
			<div className="youtube-section">

				<div className="itunes-section">
					<h5 className="itunes-heading" >iTunes Music</h5>
					<p className="itunes-lorem-ipsum" >
						In the realm of digital music, iTunes Music has long been a cornerstone, 
						offering users a vast library of songs, albums, and playlists accessible 
						across Apple devices. Seamlessly integrated with the broader Apple ecosystem, 
						iTunes Music not only provides a platform for discovering and enjoying music 
						but also fosters a sense of community and connection through features like 
						curated playlists, artist exclusives, and personalized recommendations. As 
						part of the Apple ecosystem, iTunes Music embodies the company's commitment 
						to innovation, quality, and user experience, shaping the way millions of 
						people around the world engage with music in the digital age.
					</p>
				</div>

				<iframe
					src="https://www.youtube.com/embed/TaVFCdwT0hk?si=uvaBjq533lcdNeWQ"
					title="YouTube video: colourful iTunes ad"
					allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin" 
				/>
			</div>

			<footer >
				<h6 className="footer-title">Music Catalogue</h6>
				<div role="contentinfo"  className="footer-body">
					<div className="footer-leftie">
						<label for="footer-signup-email">Stay In Touch</label>
						<input type="email" id="footer-signup-email" placeholder="your email"/>
						<button className="footer-button" >Sign Up</button>
					</div>

					<div className="footer-rightie">
						<div className="footer-services">
							<p>Services</p>
							<p><Link to="/">Search</Link></p>
							<p><Link to="/charts">Charts</Link></p>
							<p><Link to="/profile">Profile</Link></p>
							<p><Link to="/landing">Landing Page</Link></p>
						</div>

						<div className="footer-company">
							<p>Company</p>
							<p><a href="https://indeed.co.uk">Careers</a></p>
							<p><a href="https://music.apple.com">iTunes</a></p>
							<p><a href="https://react.dev/learn">React</a></p>
							<p><a href="https://firebase.google.com/docs/firestore/quickstart">Firebase</a></p>
						</div>

						<div className="footer-contact">
							<p>Contact Us</p>
							<p className="footer-address">15 Guomini Way, London, UK, L0ND0V1</p>
							<div className="footer-socials">
								<a href="http://facebook.com"><img src={fb} alt="facebook logo" /></a>
								<a href="http://twitter.com"><img src={twit} alt="twitter logo" /></a>
								<a href="http://instagram.com"><img src={ig} alt="instagram logo" /></a>
								<a href="http://youtube.com"><img src={yt} alt="youtube logo" /></a>
								

							</div>

						</div>
					</div>
				</div>

				<div className="footer-footer">
					2024 - Daulet Alzhanov ©
				</div>
			</footer>
		</main>
	</>)
}