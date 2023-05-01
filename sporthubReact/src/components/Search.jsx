import "../assets/styles/search.css";

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
      } else if (
        product.name
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(query.toLowerCase())
      ) {
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
    let path = "/product/" + product.id;
    navigate(path, { product: product });
  };

  const gridView = (list, ROW_SIZE) => {
    if (list.length === 0) {
      return "No results for " + query;
    }
    let res = [];
    for (let i = 0; i < list.length; i += ROW_SIZE) {
      res.push(
        <div className="row">
          {list.slice(i, i + ROW_SIZE).map((p) => {
            return (
              <div tabIndex={0}
                onClick={() => openProduct(p)}
                className="col-12 col-sm-6 col-md-4 col-lg-3 my-2"
                key={p.id}
                aria-label={`${p.name} ${p.price} euros`}
              >
                <div className="card h-100 text-center productCard">
                  <img
                    src={p.photo}
                    alt="photo"
                    className="card-img-top h-100"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title">{p.price + "€"}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return res;
  };

  const getSeachQuote = (query, category) => {
    if (query === null) {
      if (category === "all") {
        return "all products in the store";
      } else {
        return "all products in " + category;
      }
    } else {
      return query + " in " + category;
    }
  };

  useEffect(() => {
    setFilteredList(filter(productList, category, query));
  }, [category, query]);

  const specificSearch = query + " in " + category;

  return (
    <div>
      <SearchBar lastQuery={query} lastCategory={category} />

      <h5 className="mb-3">Looking for {getSeachQuote(query, category)} </h5>

      <div>{gridView(filteredList, ROW_SIZE)}</div>
    </div>
  );
}
