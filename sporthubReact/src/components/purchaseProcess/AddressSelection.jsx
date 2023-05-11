import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function AddressSelection({
	userLogged,
	cart,
	selectedAddress,
	setSelectedAddress,
	avanzar,
}) {
	const navigate = useNavigate();
	const [alternativeAddress, setAlternativeAddress] = useState({});

	useEffect(() => {
		if (userLogged == null) {
			navigate("/login");
		} else if (cart == undefined || cart.length == 0) {
			alert("Shopping cart is empty");
			navigate("/");
		} else if (selectedAddress.value == 1) {
			setAlternativeAddress(selectedAddress.address);
		}
	}, []);

	const isAddressEmpty = (address) => {
		return (
			address == null ||
			address.address1 == undefined ||
			address.address2 == undefined ||
			address.country == undefined ||
			address.postalcode == undefined ||
			address?.address1 === "" ||
			address?.address2 === "" ||
			address?.country === "" ||
			address?.postalcode === ""
		);
	};

	const changedSelection = (value) => {
		setSelectedAddress({ ...selectedAddress, value: value });
	};

  const submitEvent = () => {
    if (selectedAddress.value == 0) {
      if (isAddressEmpty(userLogged)) {
        MySwal.fire({
          title: "Error",
          text: "Selected address not completed",
          icon: "error",
          confirmButtonColor: "#ffa500",
        });
      } else {
        setSelectedAddress({
          ...selectedAddress,
          address: {
            address1: userLogged.address1,
            address2: userLogged.address2,
            country: userLogged.country,
            postalcode: userLogged.postalcode,
          },
        });
        avanzar();
      }
    } else if (selectedAddress.value == 1) {
      if (isAddressEmpty(alternativeAddress)) {
        MySwal.fire({
          title: "Error",
          text: "Selected address not completed",
          icon: "error",
          confirmButtonColor: "#ffa500",
        });
      } else {
        setSelectedAddress({
          ...selectedAddress,
          address: alternativeAddress,
        });
        avanzar();
      }
    } else {
      MySwal.fire({
        title: "Error",
        text: "Address not selected",
        icon: "error",
        confirmButtonColor: "#ffa500",
      });
    }
  };

	return (
		<div className="container">
			<h5 tabIndex={0}>Select one of the following address options</h5>


			<div className="project-section" onClick={() => changedSelection(0)}>
				<input
					type="radio"
					name="address"
					id="addressSelection1"
					disabled={isAddressEmpty(userLogged)}
					onChange={(e) => changedSelection(0)}
					value={0}
					checked={selectedAddress.value == 0}
				/>
				<label className="section-input" tabIndex={0} for="addressSelection1">
					<strong style={{fontSize: "1.25em"}}>Saved Address:</strong> <label style={{color: "black"}}>{userLogged?.address1}, {userLogged?.address2}, {userLogged?.country}, {userLogged?.postalcode}</label>
				</label>
			</div>

			<div className="project-section" onClick={() => changedSelection(1)}>
				<input
					type="radio"
					name="address"
					id="addressSelection2"
					onChange={(e) => changedSelection(1)}
					value={1}
					checked={selectedAddress.value == 1}
				/>
				<label className="section-input" tabIndex={0} for="addressSelection2">
					<strong style={{fontSize: "1.25em"}}>Alternative Address</strong>
				</label>
				{selectedAddress.value == 1 ?
					(<div>
						<div className="input-field">
							<label htmlFor="address-1">Address Line-1</label>
							<input
								type="address"
								className="form-control input-formulario"
								name="Locality"
								id="address-1"
								onChange={(e) =>
									setAlternativeAddress({
										...alternativeAddress,
										address1: e.target.value,
									})
								}
								defaultValue={
									selectedAddress.value == 1 ? selectedAddress.address.address1 : ""
								}
							/>
						</div>

						<div className="input-field">
							<label htmlFor="address-2">Address Line-2</label>
							<input
								type="address"
								className="form-control input-formulario"
								name="address"
								id="address-2"
								onChange={(e) =>
									setAlternativeAddress({
										...alternativeAddress,
										address2: e.target.value,
									})
								}
								defaultValue={
									selectedAddress.value == 1 ? selectedAddress.address.address2 : ""
								}
							/>
						</div>

						<div className="input-field col-sm-5">
							<label htmlFor="State">Country</label>
							<input
								type="address"
								className="form-control input-formulario"
								name="State"
								id="State"
								onChange={(e) =>
									setAlternativeAddress({
										...alternativeAddress,
										country: e.target.value,
									})
								}
								defaultValue={
									selectedAddress.value == 1 ? selectedAddress.address.country : ""
								}
							/>
						</div>

						<div className="input-field col-sm-3">
							<label htmlFor="zip">Postal-Code</label>
							<input
								type="zip"
								className="form-control input-formulario"
								name="Zip"
								id="zip"
								onChange={(e) =>
									setAlternativeAddress({
										...alternativeAddress,
										postalcode: e.target.value,
									})
								}
								defaultValue={
									selectedAddress.value == 1
										? selectedAddress.address.postalcode
										: ""
								}
							/>
						</div>
					</div>)
					:
					""
				}
			</div>
			<button
				onClick={() => submitEvent()}
				disabled={selectedAddress.value < 0}
				className={
					"purchaseButton " +
					(selectedAddress.value < 0 ? "disabledPurchaseButton" : "")
				}
			>
				Continue
			</button>
		</div>
	);
}
