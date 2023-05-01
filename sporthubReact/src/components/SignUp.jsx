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

    const [dia, mes, anio] = dateInput.split("/");
    if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 1900 || anio > 2023) {
      alert("La fecha debe seguir el formato dd/mm/yyyy y ser válida.");
    } else {
      let dateSend = (anio + "-" + mes + "-" + dia);
      axios
      .post("http://localhost:8080/newUser/", {
        username: usernameInput,
        password: passwordInput,
        name: nameInput,
        email: emailInput,
        lastName: lastNameInput,
        date: dateSend,
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
    }
    

  };

  const handleDateInputChange = (event) => {
    let value = event.target.value; 
    if(value.length === 2){
      if(dateInput.length === 1){
        value += '/';
      }
    }else if(value.length === 5){
      if(dateInput.length === 4){
        value += '/';
      }
    }else if(value.length === 11){
      value = dateInput;
    }
    setDateInput(value);
  };

  const handleDateInputClick = () => {
    const datePicker = document.createElement('input');
    datePicker.type = 'date';
    datePicker.style.display = 'none';
    document.body.appendChild(datePicker);

    datePicker.addEventListener('change', () => {
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
            <h2>Sign Up</h2>
            <p> Register here to be part of SportHub !</p>

            <div className="inputbox formInputbox" aria-label="Username">
            	<ion-icon name="person-outline"></ion-icon>
              <input id="username"
                type="username"
                className={usernameInput!=="" ? "activo form-control" : "form-control"}
                onChange={(event) => setUsernameInput(event.target.value)}
              />
              <label>Username</label>
            </div>

            <div className="inputbox formInputbox" aria-label="Name">
              <ion-icon name="id-card-outline"></ion-icon>
              <input id="name"
                type="text"
                className={nameInput!=="" ? "activo form-control" : "form-control"}
                onChange={(event) => setNameInput(event.target.value)}
              />
              <label>Name</label>
            </div>

            <div className="inputbox formInputbox" aria-label="Last Name">
              <ion-icon name="people-circle-outline"></ion-icon>
              <input id="lname"
                type="text"
                className={lastNameInput!=="" ? "activo form-control" : "form-control"}
                onChange={(event) => setLastNameInput(event.target.value)}
              />
              <label>Last Name</label>
            </div>

            <div className="inputbox formInputbox" aria-label="Birth Date, format dd/mm/yyyy">
            <ion-icon name="calendar-outline"></ion-icon>
            <input type="text" maxLength={10} id="fecha" className={dateInput!=="" ? "activo form-control" : "form-control"}
            value={dateInput} onChange={handleDateInputChange} onClick={handleDateInputClick}/>
            <label>Birth Date dd/mm/yyyy </label>
            </div>

            <div className="inputbox formInputbox" aria-label="Email">
              <ion-icon name="mail-outline"></ion-icon>
              <input id="email"
                type="email"
                className={emailInput!=="" ? "activo form-control" : "form-control"}
                onChange={(event) => setEmailInput(event.target.value)}
              />
              <label>Email</label>
            </div>
              
            <div className="inputbox formInputbox" aria-label="Password">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input id="password"
                type="password"
                className={passwordInput!=="" ? "activo form-control" : "form-control"}
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