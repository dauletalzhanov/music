import { useState } from "react";

export default function Carousel({ items }) {
  let [currentSlide, setCurrentSlide] = useState(0);

  function prev() {
    if (currentSlide > 0)
		setCurrentSlide((c) => c - 1);
    else
		setCurrentSlide(items.length -1)
  }

  function next() {
    if (currentSlide < items.length - 1)
    	setCurrentSlide((c) => c + 1);
    else
		setCurrentSlide(0)
  }

  return (
    <div className="carousel">
    	<button className="carousel-button" onClick={prev}> {"<"} </button>

    	<div className="carousel-content">
			{items.map((value, index) => {
				return (
					<div 
						key={index} 
						className={"taylor-album " + (index == currentSlide ? 'active' : '')}
					>
						<img
							src={ value.artwork }
							alt={ "album cover for Taylor Swift's " + value.name }
							className="carousel-album"
						/>
					</div>
				)
			})}
    	</div>

    	<button className="carousel-button" onClick={next}> {">"} </button>
    </div>
  );
}