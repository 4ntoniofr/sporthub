import "../assets/styles/cart.css"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const MySwal = withReactContent(Swal);

export default function Wishlist({ userLogged, wishlist, setWishlist }) {
	const navigate = useNavigate();

	const removeFromWishlist = (productId) => {
		if (userLogged) {
			axios.post("http://localhost:8080/removeFromWishlist", {
				username: userLogged.username,
				productId: productId,
			}).then((res) => {
				if(res.status == 200){
					setWishlist(wishlist.filter(item => item.id !== productId));
				}
			});
		}
	};

	const handleClick = (result, id) => {
    if (result.isConfirmed) {
      MySwal.fire({
        title: "Success",
        text: "The product has been the removed from the wishlist",
        icon: "success",
        confirmButtonColor: "#ffa500",
      }).then(() => {
        removeFromWishlist(id);
      });
    }
  };

	useEffect(() => {
		if(userLogged == null){
			navigate("/");
		}
	}, []);

	const openProduct = (product) => {
		let path = "/product/" + product.id;
		navigate(path, {product: product});
	}

	return (
		<div>
			<h1>WishList</h1>
			<br />
			{wishlist.length === 0 ? (
				<p>Your wishlist is empty.</p>
			) : (
				<div className="container">
					{wishlist.map((product) => {
						return (
							<div class="card mb-2">
								<div class="card-body text-center">
									<div className="row align-items-center">
										<div className="col-3">
											<img
												style={{ maxWidth: "30%", height: "auto" }}
												src={product.photo}
												alt="photo"
											/>
										</div>
										<div className="col-3">
											<h5 onClick={() => openProduct(product)} tabIndex={0} class="card-title prod-link">{product.name}</h5>
										</div>
										<div className="col-3">
											<h5 tabIndex={0} aria-label={`Price ${product.price} euros`}>Price: {product.price}€</h5>
										</div>
										<div className="col-3">
											<button aria-label="delete product"
												onClick={() => {
                          MySwal.fire({
                            title: "Confirmation needed",
                            text: "Do you really want to remove the product from the wishlist?",
                            icon: "info",
                            showCancelButton: true,
                            confirmButtonText: "Confirm",
                            confirmButtonColor: "#ffa500",
                            denyButtonText: "Deny",
                          }).then((result) => {
                            handleClick(result, product.id);
                          });
                        }}
												className="removeAllButton mx-1"
											>
												<ion-icon name="trash-bin-outline"></ion-icon>
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
