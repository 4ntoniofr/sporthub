import "../assets/styles/cart.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const MySwal = withReactContent(Swal);

export default function Wishlist({ userLogged, wishlist, setWishlist }) {
  const navigate = useNavigate();

  const removeFromWishlist = (productId) => {
    if (userLogged) {
      axios
        .post("http://localhost:8080/removeFromWishlist", {
          username: userLogged.username,
          productId: productId,
        })
        .then((res) => {
          if (res.status == 200) {
            setWishlist(wishlist.filter((item) => item.id !== productId));
          }
        });
    }
  };

  const handleClick = (id) => {
    MySwal.fire({
      title: "Success",
      text: "The product has been the removed from the wishlist",
      icon: "success",
      confirmButtonColor: "#ffa500",
    }).then(() => {
      removeFromWishlist(id);
    });
  };

  useEffect(() => {
    if (userLogged == null) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>WishList</h1>
      <br />
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="container">
          {wishlist.map((product) => {
            return (
              <div class="card mb-2">
                <div class="card-body text-center">
                  <div className="row align-items-center">
                    <div className="col-3">
                      <img
                        style={{ maxWidth: "30%", height: "auto" }}
                        src={product.photo}
                        alt="photo"
                      />
                    </div>
                    <div className="col-3">
                      <h5 class="card-title">{product.name}</h5>
                    </div>
                    <div className="col-3">
                      <h5>Price: {product.price}€</h5>
                    </div>
                    <div className="col-3">
                      <button
                        onClick={() => {
                          handleClick(product.id);
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
        </div>
      )}
    </div>
  );
}
