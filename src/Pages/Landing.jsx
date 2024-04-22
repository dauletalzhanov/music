import { Helmet } from "react-helmet"
import Header from "../Components/Header"
import { Link } from "react-router-dom"

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
		<Header></Header>

		<div id="artistSection">

			<Carousel opts={{ align: "start", }} className="w-full max-w-sm carousel" >
				
				<CarouselContent className="carouselContent">
					
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 carouselItem">
							<div className="p-1">
								<Card className="carding">
									<CardContent className="flex aspect-square items-center justify-center p-6">
										<span className="text-3xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}

				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>			
			
		</div>

		<footer>
			<h6 role="heading" className="footer-title">Music Catalogue</h6>
			<div role="contentinfo" className="footer-body">
				<div className="footer-leftie">
					<label for="signup-email">Stay In Touch</label>
					<input type="email" id="footer-signup-email" placeholder="your email"/>
					<button className="footer-button" type="submit" formAction="/profile" >Sign Up</button>
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
		

		<Helmet>
			<title>MUSIC</title>
			<meta name="description" content="MUSIC: Explore Artists, Albums and Songs straight from iTunes Music Library." />
		</Helmet>
	</>)
}