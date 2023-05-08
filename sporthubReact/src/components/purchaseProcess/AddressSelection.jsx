import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
        alert("Selected address not completed");
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
        alert("Selected address not completed");
      } else {
        setSelectedAddress({
          ...selectedAddress,
          address: alternativeAddress,
        });
        avanzar();
      }
    } else {
      alert("Address not selected");
    }
  };

  return (
    <div className="container">
      <h5 tabIndex={0}>Address Selection</h5>

      <div className="col project-section" onClick={() => changedSelection(0)}>
        <input
          type="radio"
          name="address"
          disabled={isAddressEmpty(userLogged)}
          onChange={(e) => changedSelection(0)}
          value={0}
          checked={selectedAddress.value == 0}
        />
        <h3 className="section-input" tabIndex={0}>
          {" "}
          Saved Address
        </h3>

        <div className="input-field">
          <strong tabIndex={0}>Address Line-1</strong> {userLogged?.address1}
        </div>

        <div className="input-field">
          <strong tabIndex={0}>Address Line-2</strong> {userLogged?.address2}
        </div>

        <div className="input-field col-sm-5">
          <strong tabIndex={0}>Country</strong> {userLogged?.country}
        </div>

        <div className="input-field col-sm-3">
          <strong tabIndex={0}>Postal-Code</strong> {userLogged?.postalcode}
        </div>
      </div>

      <div className="col project-section" onClick={() => changedSelection(1)}>
        <input
          type="radio"
          name="address"
          onChange={(e) => changedSelection(1)}
          value={1}
          checked={selectedAddress.value == 1}
        />
        <h3 className="section-input" tabIndex={0}>
          {" "}
          Alternative Address
        </h3>
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
