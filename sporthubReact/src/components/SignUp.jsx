import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/forms.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
    if(usernameInput === "" || nameInput === "" || lastNameInput === "" || emailInput === "" || passwordInput === ""){
      MySwal.fire({
        title: "Error",
        text: "All fields must be filled",
        icon: "error",
        confirmButtonColor: "#ffa500",
      });
      return;
    }

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
          MySwal.fire({
            title: "Success",
            text: "The user has been created successfuly, you are now logged in",
            icon: "success",
            confirmButtonColor: "#ffa500",
          });
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            MySwal.fire({
              title: "Warning",
              text: "The username is alredy in use, please choose another one.",
              icon: "warning",
              confirmButtonColor: "#ffa500",
            });
          } else {
            MySwal.fire({
              title: "Error",
              text: "There was a problem creating the new user.",
              icon: "error",
              confirmButtonColor: "#ffa500",
            });
          }
        });
  };

  const handleDateInputChange = (event) => {
    let value = event.target.value;
    if (value.length === 2) {
      if (dateInput.length === 1) {
        value += "/";
      }
    } else if (value.length === 5) {
      if (dateInput.length === 4) {
        value += "/";
      }
    } else if (value.length === 11) {
      value = dateInput;
    }
    setDateInput(value);
  };

  const handleDateInputClick = () => {
    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.style.display = "none";
    document.body.appendChild(datePicker);

    datePicker.addEventListener("change", () => {
      setSelectedDate(datePicker.value);
      document.body.removeChild(datePicker);
    });

    datePicker.click();
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
            <h2 tabIndex={0}>Sign Up</h2>
            <p tabIndex={0} aria-label="Register here to be part of SportHub !">
              {" "}
              Register here to be part of SportHub !
            </p>

            <div className="inputbox formInputbox" aria-label="Username">
              <ion-icon name="person-outline"></ion-icon>
              <input
                aria-label="Username"
                id="username"
                type="username"
                className={
                  usernameInput !== "" ? "activo form-control" : "form-control"
                }
                onChange={(event) => setUsernameInput(event.target.value)}
              />
              <label>Username</label>
            </div>

            <div className="inputbox formInputbox" aria-label="Name">
              <ion-icon name="id-card-outline"></ion-icon>
              <input
                aria-label="Name"
                id="name"
                type="text"
                className={
                  nameInput !== "" ? "activo form-control" : "form-control"
                }
                onChange={(event) => setNameInput(event.target.value)}
              />
              <label>Name</label>
            </div>

            <div className="inputbox formInputbox" aria-label="Last Name">
              <ion-icon name="id-card-outline"></ion-icon>
              <input
                aria-label="Last Name"
                id="lname"
                type="text"
                className={
                  lastNameInput !== "" ? "activo form-control" : "form-control"
                }
                onChange={(event) => setLastNameInput(event.target.value)}
              />
              <label>Last Name</label>
            </div>

            <div className="inputbox formInputbox" aria-label="Email">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                aria-label="Email"
                id="email"
                type="email"
                className={
                  emailInput !== "" ? "activo form-control" : "form-control"
                }
                onChange={(event) => setEmailInput(event.target.value)}
              />
              <label>Email</label>
            </div>

            <div className="inputbox formInputbox" aria-label="Password">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                aria-label="Password"
                id="password"
                type="password"
                className={
                  passwordInput !== "" ? "activo form-control" : "form-control"
                }
                onChange={(event) => setPasswordInput(event.target.value)}
              />
              <label>Password</label>
            </div>

            <button id="button" type="submit" className="btn btn-primary mb-2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
