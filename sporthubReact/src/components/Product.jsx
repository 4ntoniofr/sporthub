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

  const checkLogged = (n) => {
    if (userLogged) {
      MySwal.fire({
        title: "Confirmation needed",
        text:
          "Please confirm to add the product to the " +
          (n == 0 ? "cart" : "wishlist"),
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#ffa500",
        denyButtonText: "Deny",
      }).then((res) =>
        handleClick(res, n == 0 ? props.addToCart : props.addToWishlist)
      );
    } else {
      MySwal.fire({
        title: "You Need to LogIn",
        text:
          "In order to add the product to the " +
          (n == 0 ? "cart" : "wishlist") +
          " you should LogIn with your account.",
        icon: "warning",
        confirmButtonColor: "#ffa500",
      });
    }
  };

  const notifyWishList = () => {
    MySwal.fire({
      title: "Success",
      text: "The product has been added to the wish list",
      icon: "success",
      confirmButtonColor: "#ffa500",
    }).then(() => {
      props.addToWishlist(product);
    });
  };

  return product !== undefined ? (
    <div className="product-div">
      <h2 tabIndex={0}>{product.name}</h2>
      <div className="imageDiv">
        <div>
          <img
            tabIndex={0}
            style={{ width: "300px", height: "auto"}}
            src={product.photo}
            alt={"photo of " + product.name}
          />
        </div>
        <div>
          <b>Description:</b>
          <p tabIndex={0} aria-label={product.description}>
            {product.description === ""
              ? "- No description -"
              : product.description}
          </p>
          <div className="container" id="buttons">
            <p tabIndex={0} aria-label={`Price ${product.price} euros`}>
              Price: {product.price}€
            </p>

            <button
              id="cart"
              className="btn btn-primary"
              onClick={() => checkLogged(0)}
            >
              Add to cart
            </button>
            <button
              id="wishlist"
              className="btn btn-primary"
              onClick={() => checkLogged(1)}
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
