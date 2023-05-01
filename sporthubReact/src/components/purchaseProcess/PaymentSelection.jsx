import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PaymentSelection({
  userLogged,
  cart,
  shipment,
  avanzar,
  retroceder,
}) {
  const navigate = useNavigate();
  const [creditCard, setCreditCard] = useState({});

  useEffect(() => {
    if (userLogged == null) {
      navigate("/login");
    } else if (cart == undefined || cart.length == 0) {
      alert("Shopping cart is empty");
      navigate("/");
    }
  }, []);

  const isUncompleted = () => {
    return (
      creditCard.name == undefined ||
      creditCard.number == undefined ||
      creditCard.expirationDate == undefined ||
      creditCard.name == "" ||
      creditCard.number == "" ||
      creditCard.expirationDate == ""
    );
  };

  const handleClick = (result) => {
    if (result.isConfirmed) {
      MySwal.fire({
        title: "Success",
        text: "The purchase has been finished successfuly",
        icon: "success",
        confirmButtonColor: "#ffa500",
      }).then(() => {
        avanzar();
      });
    }
  };

  const notify = () => {
    MySwal.fire({
      title: "Confirmation needed",
      text: "Please confirm to finish the purchase and pay it",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#ffa500",
      denyButtonText: "Deny",
    }).then((result) => {
      handleClick(result);
    });
  };

  return (
    <div className="container">
      <h3 tabIndex={0}>Payment Selection</h3>

      <div className="row">
        <div className="col project-section">
          <h5 tabIndex={0} className="section-input">Credit Card</h5>

          <div className="input-field">
            <label htmlFor="name">Credit Card Name</label>
            <input 
              aria-label="Credit Card Name"
              type="text"
              className="form-control input-formulario"
              name="Locality"
              onChange={(e) =>
                setCreditCard({ ...creditCard, name: e.target.value })
              }
            />
          </div>

          <div className="input-field">
            <label htmlFor="number">Credit Card Number</label>
            <input
            aria-label="Credit Card Number"
              type="text"
              className="form-control input-formulario"
              name="number"
              onChange={(e) =>
                setCreditCard({ ...creditCard, number: e.target.value })
              }
            />
          </div>

          <div className="input-field col-sm-2">
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              aria-label="Expiration Date"
              type="month"
              className="form-control input-formulario"
              name="expirationDate"
              onChange={(e) =>
                setCreditCard({ ...creditCard, expirationDate: e.target.value })
              }
            />
          </div>
        </div>
        <ProductList cart={cart} shipment={shipment} />
      </div>
      <button tabIndex={0}  onClick={() => retroceder()} className="purchaseButton">
        Back
      </button>
      <button
        onClick={notify}
        disabled={isUncompleted()}
        tabIndex={0}
        className={
          "purchaseButton " + (isUncompleted() ? "disabledPurchaseButton" : "")
        }
      >
        Continue
      </button>
    </div>
  );
}
