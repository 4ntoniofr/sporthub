import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ShipmentSelection({ userLogged, cart, shipment, setShipment, avanzar, retroceder }) {
	const navigate = useNavigate();
	const date = new Date();
	const urgentDate = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
	const regularDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
	const formatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	useEffect(() => {
		if (userLogged == null) {
			navigate("/login");
		} else if (cart == undefined || cart.length == 0) {
			alert("Shopping cart is empty");
			navigate("/")
		}
	}, []);

	return (
		<div className="container">
			<h3 tabIndex={0}>Select one of the following shipment options</h3>

			<div className="project-section">
				<input type="radio" name="selection" id="shipmentSelection1"
					onChange={(e) => setShipment({ ...shipment, value: e.target.value, date: urgentDate.toLocaleDateString("en-US", formatOptions), price: 5 })}
					value={0} checked={shipment.value == 0}
				/>
				<label className="section-input" for="shipmentSelection1"><strong style={{fontSize: "1.25em"}}>Urgent Shipment: </strong>
					<label style={{color: "black"}}>Arrives on {urgentDate.toLocaleDateString("en-US", formatOptions)}, Additional cost of 5$</label>
				</label>
			</div>

			<div className="project-section">
				<input type="radio" name="selection" id="shipmentSelection2"
					onChange={(e) => setShipment({ ...shipment, value: e.target.value, date: regularDate.toLocaleDateString("en-US", formatOptions), price: 0 })}
					value={1} checked={shipment.value == 1}
				/>
				<label className="section-input" for="shipmentSelection2"><strong style={{fontSize: "1.25em"}}>Regular Shipment: </strong>
					<label style={{color: "black"}}>Arrives on {regularDate.toLocaleDateString("en-US", formatOptions)}, Totally FREE</label>
				</label>
			</div>
			<button onClick={() => retroceder()} className="purchaseButton">Back</button>
			<button onClick={() => avanzar()} disabled={shipment.value < 0}
				className={"purchaseButton " + (shipment.value < 0 ? "disabledPurchaseButton" : "")}>Continue</button>
		</div>
	);
}