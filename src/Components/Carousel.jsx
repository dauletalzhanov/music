import { useState } from "react"
import { NavLink } from "react-router-dom"

import stars from "../assets/stars.svg"

export default function Carousel({ items }) {
  let [currentSlide, setCurrentSlide] = useState(0)

  function prev() {
    if (currentSlide > 0)
		setCurrentSlide((c) => c - 1)
    else
		setCurrentSlide(items.length -1)
  }

  function next() {
    if (currentSlide < items.length - 1)
    	setCurrentSlide((c) => c + 1)
    else
		setCurrentSlide(0)
  }

  return (<>
	<p className="taylor-title">Browse Taylor Swift's Albums</p>
    <div className="carousel">
    	<button className="carousel-button" onClick={prev}> {"<"} </button>

    	<div className="carousel-content">
			{items.map((value, index) => {
				return (
					<div 
						key={index} 
						className={"taylor-album " + (index == currentSlide ? 'active' : '')}
					>	
						<NavLink to={"/album/"+value.album}>
							<img
								src={ value.artwork }
								alt={ "album cover for Taylor Swift's " + value.name }
								className="carousel-album"
							/>
						</NavLink>
						
					</div>
				)
			})}
    	</div>

    	<button className="carousel-button" onClick={next}> {">"} </button>
    </div>
	<div className="taylor-album-details">
		{
			items.map((value, index) => {
				return(<div 
							key={index}
							className={"taylor-album " + (index == currentSlide ? 'active' : '')}
						>
					<p>Album: <NavLink to={"/album/"+value.album}>{value.name}</NavLink></p>
					<p>Track Count: {value.trackCount}</p>
					<p>Release: {value.release}</p>
					
					<NavLink to="/artist/159260351">Taylor Swift</NavLink>

					
				</div>)
			})
		}
	</div>

	<div className="taylor-reviews">
	<p className="taylor-title">Reviews</p>
		{
			items.map((value, index)=>{
				return(<div 
							key={index}
							className={"taylor-album " + (index == currentSlide ? 'active' : '')}
						>
							{
								value.reviews.map((content, index)=>{
									return(<div key={index}>
											<img src={stars} alt="picture of stars" className="review-stars" />
											<p className="fancy-review">"{content.review}"</p>
											<p>{content.reviewer}</p>
										</div>)
								})
							}
				</div>)
			})
		}
		
	</div>
  </>);
}