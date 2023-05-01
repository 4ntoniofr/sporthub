import "../assets/styles/home.css";
import SearchBar from "./SearchBar";

export default function Home() {
	return (
		<div className="imagesSearch homeImagesSearch">
			<div className="container-fluid mt-3 mb-3">

				<h1 tabIndex={0}>Your reliable sports shop</h1>

				<SearchBar lastQuery={""} lastCategory={"all"} />

				<div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
					<div className="carousel-inner" id="imagesContainer">
						<div className="carousel-item homeCarouselItem active">
							<img alt="Image not found" aria-label="Imagen de muchos deportes" src="https://www.hausdessports.ch/pictures/W1siZiIsIjIwMjEvMDgvMDMvNWx6bW1vdmZ1Ml9IZWFkZXJfSG9tZS5qcGciXSxbInAiLCJlbmNvZGUiLCJqcGVnIiwiLXF1YWxpdHkgODUiXV0/Header%20Home.jpeg?sha=9b9e941c8cc5becf" className="d-block w-100 h-100" />
						</div>
						<div className="carousel-item homeCarouselItem" >
							<img alt="Image not found" aria-label="Imagen de persona boxeando" src="https://img2.storyblok.com/1800x743/filters:focal():format(png)/f/115220/2400x990/244feeeb75/fightcamp-ways-to-improve-your-reflexes-for-boxing.png" className="d-block w-100 h-100" />
						</div>
						<div className="carousel-item homeCarouselItem">
							<img alt="Image not found" aria-label="Imagen de persona surfeando" src="https://spunout.ie/wp-content/uploads/elementor/thumbs/surfing-q0ubkc6jrqbfnadhc7p5r5sbms3ybsqbmctk2g2u2g.jpg" className="d-block w-100 h-100" />
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
