import { Link } from "react-router-dom";
import React from "react";
import "../assets/styles/navBar.css";

export default function Nav({ userLogged, setUserLogged, cart }) {
  const cartItems = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  

  const loginAndRegister = () => {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to={"/login"}>
            <button className="button2">Login</button>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={"/signup"}>
            <button className="button2">Sign Up</button>
          </Link>
        </li>
      </>
    );
  };

  const helloUserAndLogout = () => {
    
    return (
      <>
        <li className="nav-item item-cart">
          <Link className="nav-link button-link" to={"/cart"}>
            {cartItems()}
            <ion-icon name="cart" id="icono"></ion-icon>
          </Link>
        </li>
        <li className="nav-item item-user-profile">
          <div className="dropdown dropdownUser" id="profile-dropdown">
            <button
              type="button"
              className="button-profile"
              id="menuBtn"
              data-bs-toggle="dropdown"
              aria-label={userLogged.username}
            >
              <ion-icon name="person-circle-outline" id="icono"></ion-icon>
              {"   " + userLogged.username + "   "}
              <ion-icon name="chevron-forward-outline" id="icono2"></ion-icon>
            </button>

            <ul className="dropdown-menu menuUser">
              <li>
                {" "}
                <Link
                  className="dropdown-item"
                  to={`/profile/${userLogged.username}`}
                >
                  Profile
                </Link>{" "}
              </li>
              <li>
                {" "}
                <Link className="dropdown-item" to="/wishlist/">
                  Wish list
                </Link>{" "}
              </li>
              <li>
                {" "}
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => {
                    setUserLogged(null);
                    localStorage.removeItem("user");
                    history.push("/");
                  }}
                >
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg p-0 fixed-top top-nav">
        <div className="container-fluid">
          <div className="navbar-brand item-brand">
            <a href="/">
              <img
                width="200"
                alt="Logo"
                aria-label="Sporthub"
                src="https://user-images.githubusercontent.com/100539990/221368717-a32486ad-8628-4658-8354-b97b5eaa3a43.png"
              />
            </a>
          </div>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav">
              {/* I don`t know how, but we might consider the navbar component being able to know the page which is located and add 'className="nav-link active" aria-current="page"'*/}

              <li className="nav-item">
                <Link className="nav-link" to={"/"} aria-label="Home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/categories"} aria-label="Categories">
                  Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/about-us"} aria-label="About us">
                  About Us
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto d-flex">
              {
                userLogged ? helloUserAndLogout() : loginAndRegister()
                /* IDK if function must be called () => loginAndRegister(), in that case, there is an error */
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
