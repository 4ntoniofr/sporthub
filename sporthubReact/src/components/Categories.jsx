import { useNavigate } from "react-router-dom";
import "../assets/styles/categories.css";

export default function Categories() {
	const navigate = useNavigate();

	return (
		<div className="row">
			<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" onClick={() => navigate("/search?c=all")}>
				<div className="card categoriesCard">
					<div className="img">
						<img src="https://cdn-icons-png.flaticon.com/512/5110/5110777.png" alt="All categories" />
					</div>
					<div className="content categoriesCardContent">
						<h5>All categories</h5>
						<button onClick={() => navigate("/search?c=all")}>Search All</button>
					</div>
				</div>
			</div>
			<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" onClick={() => navigate("/search?c=football")}>
				<div className="card categoriesCard">
					<div className="img card-image-top">
						<img src="https://cdn-icons-png.flaticon.com/512/1099/1099672.png" alt="Football" />
					</div>
					<div className="content categoriesCardContent">
						<h5>Football</h5>
						
							<button tabindex={0} onClick={() => navigate("/search?c=football")}>Search Football</button>
					
					</div>
				</div>
			</div>
			<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" onClick={() => navigate("/search?c=basketball")}>
				<div className="card categoriesCard">
					<div className="img card-image-top">
						<img src="https://cdn-icons-png.flaticon.com/512/217/217076.png" alt="Basketball" />
					</div>
					<div className="content categoriesCardContent">
						<h5>Basketball</h5>
						<button onClick={() => navigate("/search?c=basketball")}>Search Basketball</button>
					</div>
				</div>
			</div>
			<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" onClick={() => navigate("/search?c=boxing")}>
				<div className="card categoriesCard">
					<div className="img card-image-top">
						<img src="https://cdn-icons-png.flaticon.com/512/5022/5022167.png" alt="Boxing" />
					</div>
					<div className="content categoriesCardContent">
						<h5>Boxing</h5>
						<button onClick={() => navigate("/search?c=boxing")}>Search Boxing</button>
					</div>
				</div>
			</div>

			<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" onClick={() => navigate("/search?c=swimming")}>
				<div className="card categoriesCard">
					<div className="img card-image-top">
						<img src="https://cdn-icons-png.flaticon.com/512/186/186192.png" alt="Swimming" />
					</div>
					<div className="content categoriesCardContent">
						<h5>Swimming</h5>
						<button onClick={() => navigate("/search?c=swimming")}>Search Swimming</button>
					</div>
				</div>
			</div>
			<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" onClick={() => navigate("/search?c=track")}>
				<div className="card categoriesCard">
					<div className="img card-image-top">
						<img src="https://cdn-icons-png.flaticon.com/512/1576/1576746.png" alt="Track & Field" />
					</div>
					<div className="content categoriesCardContent">
						<h5>Track & Field</h5>
						<button onClick={() => navigate("/search?c=track")}>Search Track & Field</button>
					</div>
				</div>
			</div>
			<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" onClick={() => navigate("/search?c=tennis")}>
				<div className="card categoriesCard">
					<div className="img card-image-top">
						<img src="https://cdn-icons-png.flaticon.com/512/523/523686.png" alt="Tennis" />
					</div>
					<div className="content categoriesCardContent">
						<h5>Tennis</h5>
						<button onClick={() => navigate("/search?c=tennis")}>Search Tennis</button>
					</div>
				</div>
			</div>
			<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5" onClick={() => navigate("/search?c=cycling")}>
				<div className="card categoriesCard">
					<div className="img card-image-top">
						<img src="https://www.pngitem.com/pimgs/m/463-4635382_circle-icons-bike-bike-icon-png-circle-transparent.png" alt="Cycling" />
					</div>
					<div className="content categoriesCardContent">
						<h5>Cycling</h5>
						<button onClick={() => navigate("/search?c=cycling")}>Search Cycling</button>
					</div>
				</div>
			</div>
		</div>
	);
}