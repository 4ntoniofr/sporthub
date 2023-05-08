import { useNavigate } from "react-router-dom";
import "../assets/styles/cart.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

export default function Cart({ userLogged, cart, setCart }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged == null) {
      navigate("/");
    }
  }, []);

  const removeOneFromCart = (productId) => {
    if (userLogged) {
      const newCart = [...cart];
      newCart.map((item) => {
        if (item.prod.id === productId) {
          if (item.quantity == 1) {
            MySwal.fire({
              title: "Confirmation needed",
              text: "Do you really want to remove the product from the cart?",
              icon: "info",
              showCancelButton: true,
              confirmButtonText: "Confirm",
              confirmButtonColor: "#ffa500",
              denyButtonText: "Deny",
            }).then((result) => handleClick(result, productId));
          } else {
            item.quantity--;
          }
        }
      });
      setCart(newCart.filter((item) => item.quantity != 0));
    }
  };

  const removeFromCart = (productId) => {
    if (userLogged) {
      setCart(cart.filter((item) => item.prod.id !== productId));
    }
  };

  const addOneToCart = (productId) => {
    if (userLogged) {
      const newCart = [...cart];
      newCart.map((item) => {
        if (item.prod.id === productId) {
          item.quantity++;
        }
      });
      setCart(newCart);
    }
  };

  const openProduct = (product) => {
    let path = "/product/" + product.id;
    navigate(path, { product: product });
  };

  const cartInfo = (cart) => {
    let items = 0;
    let total = 0;
    cart.forEach((item) => {
      items += item.quantity;
      total += item.quantity * item.prod.price;
    });
    return [items, total];
  };

  const handleClick = (result, id) => {
    if (result.isConfirmed) {
      MySwal.fire({
        title: "Success",
        text: "The product has been the removed from the cart",
        icon: "success",
        confirmButtonColor: "#ffa500",
      }).then(() => {
        removeFromCart(id);
      });
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <br />
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="container cartContainer">
          {cart.map((product) => {
            return (
              <div className="card mb-2">
                <div className="card-body text-center">
                  <div className=" align-items-center itemRow">
                    <div className="imgDiv">
                      <img
                        tabIndex={0}
                        src={product.prod.photo}
                        alt={"photo of " + product.prod.name}
                      />
                    </div>
                    <div>
                      <h5
                        onClick={() => openProduct(product.prod)}
                        tabIndex={0}
                        class="card-title prod-link"
                        aria-label={product.prod.name}
                      >
                        {product.prod.name}
                      </h5>
                    </div>
                    <div className="quantityDiv">
                      <button
                        aria-label="remove product"
                        onClick={() => removeOneFromCart(product.prod.id)}
                        className="removeButton px-1"
                      >
                        <ion-icon name="remove-circle-outline"></ion-icon>
                      </button>

                      <span
                        className="px-1"
                        tabIndex={0}
                        aria-label={`Cantidad ${product.quantity}`}
                      >
                        Quantity: {product.quantity}
                      </span>

                      <button
                        aria-label="Add another product"
                        onClick={() => addOneToCart(product.prod.id)}
                        className="addButton px-1"
                      >
                        <ion-icon name="add-circle-outline"></ion-icon>
                      </button>
                    </div>
                    <div className="priceDiv">
                      <p
                        tabIndex={0}
                        aria-label={`Price ${product.prod.price} euros`}
                      >
                        Price: {product.prod.price}€
                      </p>
                      <h5
                        tabIndex={0}
                        aria-label={`Subtotal ${
                          product.prod.price * product.quantity
                        } euros`}
                      >
                        Subtotal: {product.prod.price * product.quantity}€
                      </h5>
                    </div>
                    <div>
                      <button
                        aria-label="Remove all"
                        onClick={() => {
                          MySwal.fire({
                            title: "Confirmation needed",
                            text: "Do you really want to remove the product from the cart?",
                            icon: "info",
                            showCancelButton: true,
                            confirmButtonText: "Confirm",
                            confirmButtonColor: "#ffa500",
                            denyButtonText: "Deny",
                          }).then((result) => {
                            handleClick(result, product.prod.id);
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

          <div className="card totalCard">
            <div className="card-body text-center">
              <div className="row align-items-center priceRow">
                <div className="col-3">
                  <h5
                    tabIndex={0}
                    aria-label={`Total products ${cartInfo(cart)[0]}`}
                  >
                    Total products: {cartInfo(cart)[0]}
                  </h5>
                </div>
                <div className="col-3">
                  <h4
                    tabIndex={0}
                    aria-label={`Total ${cartInfo(cart)[1]} euros`}
                  >
                    Total: {cartInfo(cart)[1]}€
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <button
            className="finishButton mt-2"
            onClick={() => {
              navigate("/purchaseFinish");
            }}
          >
            Finish Purchase
          </button>
        </div>
      )}
    </div>
  );
}
