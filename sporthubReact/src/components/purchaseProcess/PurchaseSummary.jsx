import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";

export default function PurchaseSummary({ userLogged, cart, setCart, selectedAddress, shipment }) {
	const navigate = useNavigate();
	const [oldCart, setOldCart] = useState(cart);

	useEffect(() => {
		if (userLogged == null) {
			navigate("/login");
		} else if (cart == undefined || cart.length == 0) {
			alert("Shopping cart is empty");
			navigate("/")
		} else {
			setCart([]);
		}
	}, []);

	return (
		<div className="container">
			<h3 tabIndex={0}>Thank you for your purchase!</h3>
			<h5 tabIndex={0}>You will receive it on: {shipment.date}</h5>
			<div className="row">
					<div className="col project-section">
					<h3 className="section-input" tabIndex={0}> Selected Address</h3>

						<div className="input-field">
							<strong tabIndex={0} aria-label={`Address Line-1 ${selectedAddress.address.address1}`}>Address Line-1</strong> {selectedAddress.address.address1}
						</div>

						<div className="input-field">
							<strong tabIndex={0}  aria-label={`Address Line-2 ${selectedAddress.address.address2}`}>Address Line-2</strong> {selectedAddress.address.address2}
						</div>

						<div className="input-field col-sm-5">
							<strong tabIndex={0}  aria-label={`Country ${selectedAddress.address.country}`}>Country</strong> {selectedAddress.address.country}
						</div>

						<div className="input-field col-sm-3">
							<strong tabIndex={0}  aria-label={`Postal-Code ${selectedAddress.address.postalcode}`}>Postal-Code</strong> {selectedAddress.address.postalcode}
						</div>
				</div>
				<ProductList cart={oldCart} shipment={shipment} />
			</div>
			<button className="purchaseButton longButton" onClick={() => navigate("/")}>Back to main page</button>
		</div>
	);
}