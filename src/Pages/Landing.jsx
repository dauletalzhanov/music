import { Helmet } from "react-helmet"
import Header from "../Components/Header"

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


			<Carousel className="w-full max-w-xs carousel">
				<CarouselContent className="carouselContent">
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem key={index}>
							<div className="p-1">
								<Card className="carding">
									<CardContent className="flex aspect-square items-center justify-center p-6">
										<span className="text-4xl font-semibold">{index + 1}</span>
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
		

		<Helmet>
			<title>MUSIC</title>
			<meta name="description" content="MUSIC: Explore Artists, Albums and Songs straight from iTunes Music Library." />
		</Helmet>
	</>)
}