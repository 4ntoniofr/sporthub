//import "../assets/styles/search.css";

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../assets/styles/search.css";

const filter = (list, category, query) => {
	let filteredList = [];

	list.forEach((product) => {
		if (category === "all" || product.category === category) {
			if (!query) {
				filteredList.push(product);
			} else if (product.name.toLowerCase().replaceAll(" ","").includes(query)) {
				filteredList.push(product);
			}
		}
	});

	return filteredList;
};


export default function Search({ productList }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filteredList, setFilteredList] = useState([]);
	const category = searchParams.get("c");
	const query = searchParams.get("q");
	const ROW_SIZE = 4;
	const navigate = useNavigate();

const openProduct = (product) => {
	// REMINDER
	// hacer el path con un id en vez de con nombre
	let path = "/product/" + product.name;
	navigate(path, { product: product });
};

const gridView = (list, ROW_SIZE) => {
	let res = [];
	for (let i = 0; i < list.length; i += ROW_SIZE){
		res.push(
			<div className="row">
				{
					list.slice(i,i+ROW_SIZE).map((p) => {
						return (
							<div onClick={() =>  openProduct(p)} className="col-3 my-2" key={p.name}>
								<div className="card h-100">
									<img src={p.photo} alt="photo" className="card-img-top" />
									<div className="card-body">
										<h5 className="card-title">{p.name}</h5>
										<p className="card-text">{p.description}</p>
									</div>
								</div>
							</div>
						);
					})
				}
			</div>
		);
	}
	return res;
};

	useEffect(() => {
		setFilteredList(filter(productList, category, query));
	}, [category,query]);

	return (
		<div>
			<SearchBar lastQuery={query} lastCategory={category} />

			<h5 className="mb-3">Looking for {query !== null ? query : "products "} in {category}</h5>

			<div>
				{gridView(filteredList, ROW_SIZE)}
			</div>
		</div>
	);
}