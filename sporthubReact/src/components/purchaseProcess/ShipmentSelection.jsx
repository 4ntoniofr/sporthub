import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ShipmentSelection({
  userLogged,
  cart,
  shipment,
  setShipment,
  avanzar,
  retroceder,
}) {
  const navigate = useNavigate();
  const date = new Date();
  const urgentDate = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
  const regularDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const formatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    if (userLogged == null) {
      navigate("/login");
    } else if (cart == undefined || cart.length == 0) {
      alert("Shopping cart is empty");
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <h3 tabIndex={0}>Shipment Selection</h3>

      <div
        className="col project-section"
        onClick={() =>
          setShipment({
            ...shipment,
            value: 0,
            date: urgentDate.toLocaleDateString("en-US", formatOptions),
            price: 5,
          })
        }
      >
        <input
          type="radio"
          name="selection"
          onChange={(e) =>
            setShipment({
              ...shipment,
              value: e.target.value,
              date: urgentDate.toLocaleDateString("en-US", formatOptions),
              price: 5,
            })
          }
          value={0}
          checked={shipment.value == 0}
        />
        <h5 className="section-input" tabIndex={0}>
          Urgent Shipment
        </h5>
        <span tabIndex={0}>
          Arrives on {urgentDate.toLocaleDateString("en-US", formatOptions)}
        </span>
        <br />
        <span tabIndex={0}>Additional cost of 5$</span>
      </div>

      <div
        className="col project-section"
        onClick={() =>
          setShipment({
            ...shipment,
            value: 1,
            date: regularDate.toLocaleDateString("en-US", formatOptions),
            price: 0,
          })
        }
      >
        <input
          type="radio"
          name="selection"
          onChange={(e) =>
            setShipment({
              ...shipment,
              value: e.target.value,
              date: regularDate.toLocaleDateString("en-US", formatOptions),
              price: 0,
            })
          }
          value={1}
          checked={shipment.value == 1}
        />
        <h5 className="section-input" tabIndex={0}>
          Regular Shipment
        </h5>
        <span tabIndex={0}>
          Arrives on {regularDate.toLocaleDateString("en-US", formatOptions)}
        </span>
        <br />
        <span tabIndex={0}>Totally FREE</span>
      </div>
      <button onClick={() => retroceder()} className="purchaseButton">
        Back
      </button>
      <button
        onClick={() => avanzar()}
        disabled={shipment.value < 0}
        className={
          "purchaseButton " +
          (shipment.value < 0 ? "disabledPurchaseButton" : "")
        }
      >
        Continue
      </button>
    </div>
  );
}
