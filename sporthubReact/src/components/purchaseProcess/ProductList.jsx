import "../../assets/styles/paymentSelection.css";

export default function ProductList({ cart, shipment }) {

	const cartInfo = (cart, shipment) => {
		let items = 0;
		let total = 0;
		cart.forEach((item) => {
			items += item.quantity;
			total += (item.quantity * item.prod.price);
		});
		total += shipment.price;
		return [items, total];
	};

	return (
		<div id="summary" className="project-section ">
			<h5 className="section-input" tabIndex={0}>Purchase Summary</h5>
			{cart.map((product) => {
				return (
					<div className="row align-items-center mb-2" tabIndex={0} 
					aria-label={`${product.quantity} products of ${product.prod.name} ${product.quantity * product.prod.price} euros`}>
						<div className="col">
							<img src={product.prod.photo} style={{ width: "60%" }} alt="Image not found"></img>
						</div>
						<div className="col">
							x{product.quantity}
						</div>
						<div className="col">
							{product.quantity * product.prod.price}$
						</div>
					</div>
				);
			})}
			<div className="row align-items-center mb-2" tabIndex={0} aria-label={`Shipment ${shipment.price} euros`}> 
				<div className="col-8">
					Shipment
				</div>
				<div className="col">
					{shipment.price}$
				</div>
			</div>
			<div className="row align-items-center" tabIndex={0} 
			aria-label={`Total ${cartInfo(cart, shipment)[0]} products ${cartInfo(cart, shipment)[1]} euros`}>
				<div className="col">
					TOTAL
				</div>
				<div className="col">
					x{cartInfo(cart, shipment)[0]}
				</div>
				<div className="col">
					{cartInfo(cart, shipment)[1]}$
				</div>
			</div>
		</div>
	);
}