import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/forms.css"
// import axios from "axios";

export default function Login({ userLogged, setUserLogged }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const loginEvent = (e) => {
    e.preventDefault();
    // Here we will send the username and password to the backend
    // and check if the user is registered
    // If the user is registered, we will redirect to the home page
    // If the user is not registered, we will display an error message

    axios
      .post("http://localhost:8080/login/", {
        username: usernameInput,
        password: passwordInput,
      })
      .then((response) => {
        const user = { username: usernameInput };
        setUserLogged(user);
        localStorage.setItem("user", response.data);
        navigate("/");
      })
      .catch((error) => {
        alert("The username or password were incorrect.");
      });
  };

  useEffect(() => {
    if (userLogged) {
      navigate("/");
    }
  }, []);

  return (
    <section id="formSection">
      <div className="form-box formBox" id="login">
        <div className="form-value">
          <form onSubmit={loginEvent}>
            <h2 tabIndex={0}>Log in</h2>
            <p tabIndex={0} aria-label="Introduce your credentials to log in"> Introduce your credentials to log in</p>

            <div className="inputbox formInputbox" aria-label="Username">
              <ion-icon name="person-outline"></ion-icon>
              <input
                aria-label="Username" 
                id="username"
                type="username"
                value={usernameInput}
                className={usernameInput!=="" ? "activo form-control" : "form-control"}
                onChange={(event) => setUsernameInput(event.target.value)}
                />
                <label>Username</label>
            </div>

            <div className="inputbox formInputbox" aria-label="Password">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input 
                aria-label="Password"
                id="password"
                type="password"
                value={passwordInput}
                className={passwordInput!=="" ? "activo form-control" : "form-control"}
                onChange={(event) => setPasswordInput(event.target.value)}
                />
                <label>Password</label>
            </div>
            <button id="button"
              type="login"
              className="btn btn-primary mb-2"
            >
              Log in
            </button>
            <div className="register">
              <label>Not registered already? <a href="/signup">Register here</a></label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}