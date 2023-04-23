import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/product.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Product(props) {
  const [product, setProduct] = useState();

  let params = useParams();
  let userLogged = props.userLogged;
  let productId = params.productId;
  let productList = props.productList;

  useEffect(() => {
    productList.forEach((product) => {
      if (product.id == productId) {
        setProduct(product);
      }
    });
  }, []);

  const handleClick = (result, func) => {
    if (result.isConfirmed) {
      func(product);
      MySwal.fire({
        title: "Success",
        text: "The product has been added to the cart",
        icon: "success",
        confirmButtonColor: "#ffa500",
      });
    }
  };

  const checkLogged = () => {
    if (userLogged) {
      MySwal.fire({
        title: "Confirmation needed",
        text: "Please confirm to add the product to the cart",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#ffa500",
        denyButtonText: "Deny",
      }).then((res) => handleClick(res, props.addToCart));
    } else {
      MySwal.fire({
        title: "You Need to LogIn",
        text: "In order to add the product to the cart you should LogIn with your account.",
        icon: "warning",
        confirmButtonColor: "#ffa500",
      });
    }
  };

  const notifyWishList = () => {
    if (userLogged) {
      MySwal.fire({
        title: "Success",
        text: "The product has been added to the wish list",
        icon: "success",
        confirmButtonColor: "#ffa500",
      }).then(() => {
        props.addToWishlist(product);
      });
    } else {
      MySwal.fire({
        title: "You Need to LogIn",
        text: "In order to add the product to the wishlist you should LogIn with your account.",
        icon: "warning",
        confirmButtonColor: "#ffa500",
      });
    }
  };

  return product !== undefined ? (
    <div className="product-div">
      <div style={{ flex: "1", width: "300px" }}>
        <img
          style={{ maxWidth: "90%", height: "auto" }}
          src={product.photo}
          alt="photo"
        />
      </div>
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="container" id="buttons">
          <p>Price: {product.price}€</p>
          <button id="cart" className="btn btn-primary" onClick={checkLogged}>
            Add to cart
          </button>
          <button
            id="wishlist"
            className="btn btn-primary"
            onClick={notifyWishList}
          >
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
