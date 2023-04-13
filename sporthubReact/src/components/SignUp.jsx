import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/forms.css"

export default function SignUp({ userLogged, setUserLogged }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const signUpEvent = (e) => {
    e.preventDefault();
    // Here we will send the username and password to the backend
    // and check if the user is registered
    // If the user is registered, we will display an error message
    // If the user is not registered, we will register the user and redirect to the home page

    axios
      .post("http://localhost:8080/newUser/", {
        username: usernameInput,
        password: passwordInput,
        name: nameInput,
        email: emailInput,
        lastName: lastNameInput,
      })
      .then((response) => {
        const user = { username: usernameInput };
        setUserLogged(user);
        localStorage.setItem("user", response.data);
        alert("User has been created correctly, you are logged in now.");
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("The username is already in use, please pick a new one.");
        } else {
          alert("There was a problem when creating the new user.");
        }
      });
  };

  useEffect(() => {
    if (userLogged) {
      navigate("/");
    }
  }, []);

  return (
    <section id="formSection">
      <div className="form-box formBox" id="signup">
        <div className="form-value">
          <form onSubmit={signUpEvent}>
            <h2>Sign Up</h2>
            <p> Register here to be part of SportHub !</p>

            <div className="inputbox formInputbox">
            	<ion-icon name="person-outline"></ion-icon>
              <input id="username"
                type="username"
                className="form-control"
                onChange={(event) => setUsernameInput(event.target.value)}
              />
              <label>Username</label>
            </div>

            <div className="inputbox formInputbox">
              <ion-icon name="id-card-outline"></ion-icon>
              <input id="name"
                type="text"
                className="form-control"
                onChange={(event) => setNameInput(event.target.value)}
              />
              <label>Name</label>
            </div>

            <div className="inputbox formInputbox">
              <ion-icon name="people-circle-outline"></ion-icon>
              <input id="lname"
                type="text"
                className="form-control"
                onChange={(event) => setLastNameInput(event.target.value)}
              />
              <label>Last Name</label>
            </div>

            <div className="inputbox formInputbox">
            {/*
            <input type="text" id="fecha" className="form-control" placeholder="dd/mm/yyyy"></input>
          */}
              <input id="date"
                type="date"
                className="form-control"
                onChange={(event) => setDateInput (event.target.value)}
              />
            </div>

            <div className="inputbox formInputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input id="email"
                type="email"
                className="form-control"
                onChange={(event) => setEmailInput(event.target.value)}
              />
              <label>Email</label>
            </div>
              
            <div className="inputbox formInputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input id="password"
                type="password"
                className="form-control"
                onChange={(event) => setPasswordInput(event.target.value)}
              />
              <label>Password</label>
            </div>

            <button id="button"
              type="submit" 
              className="btn btn-primary mb-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}