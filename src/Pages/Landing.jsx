import { Helmet } from "react-helmet"
import Header from "../Components/Header"
import { Link } from "react-router-dom"

import notTaylor from "../assets/taylor_cropped.jpg"
import mic from "../assets/mic.jpg"

import fb from "../assets/fb.svg"
import twit from "../assets/twitter.svg"
import ig from "../assets/ig.svg"
import yt from "../assets/youtube.svg"

import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
  } from "@/Components/ui/carousel.jsx"

import "./CSS/landing_page.css"
  
export default function Landing(){
	return(<>
		<Helmet>
			<title>MUSIC</title>
			<meta name="description" content="MUSIC: Explore Artists, Albums and Songs straight from iTunes Music Library." />
		</Helmet>

		<Header></Header>

		<div id="artistSection">	
			
		</div>
		
		<main>
			<div className="browse-taylor-swift">
				<div className="transition-pb"></div>

				<div className="taylors-section">
					<img src={notTaylor} alt="not-taylor-swift" />
					<div className="taylors-stats">
						<Link to="/artist/159260351">Browse Taylor Swift</Link>
						<p className="white">65 Billion Plays on iTunes</p>
						<p className="white">104 Million Monthly Listeners on Spotify</p>
						<p className="white">30 Billion Plays on Youtube</p>
						<p className="gold">11 Grammys ‧ 34 VMAs ‧ 12 Billboard Awards</p>
						

					</div>
					<img src={mic} alt="not-taylor-swift" />
				</div>

				<div className="transition-ba"></div>
			</div>

			<div className="transition-review-youtube">

			</div>
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