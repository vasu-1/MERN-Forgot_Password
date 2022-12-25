import React, { useState } from "react";
import { Signup, PinSubmit } from "./api/API";
import "./style.css";
import $ from "jquery";

const SignupScreen = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    photo: "",
    loading: "",
  });
  const [pins, setpins] = useState([]);
  const [loader, setloader] = useState([]);
  // const [usrloggedIn,setusrloggedIn] = useState("");

  const { email, password, photo, loading } = values;

  //   if(localStorage.getItem("Verified")){
  //     usrloggedIn = localStorage.getItem("Verified");
  //   }

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleChangePin = (event) => {
    const value = event.target.value;
    setpins(value);
  };

  const pinVerify = (event) => {
    event.preventDefault();
    setloader("Verifying..");
    var emailPin = localStorage.getItem("PinForEmail");
    // console.log("Hello");
    var pin = $("#pin").val();
    // console.log(pin);
    PinSubmit(emailPin, pin)
      .then((res) => {
        if (res.status !== 201) {
          setloader(res.data.error);
        } else {
          localStorage.removeItem("PinForEmail");
          localStorage.setItem("Verified", emailPin);
          setloader("Verified Successfully!");
        }
      })
      .catch((err) => console.log(err));
  };

  var pin = "";
  if (localStorage.getItem("PinForEmail")) {
    pin = (
      <div className="m-5 p-3">
        <input
          className="form-control bg-secondary"
          name="pin"
          id="pin"
          placeholder="Enter your pin"
          value={pins}
          onChange={handleChangePin}
        />
        <br />
        <button className="btn btn-outline-secondary" onClick={pinVerify}>
          Submit
        </button>
        <br />
        {loader}
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: "Loading..." });
    Signup(email, password, photo)
      .then((res) => {
        if (res.status !== 201) {
          setValues({ ...values, loading: res.data.error });
        } else {
          localStorage.setItem("PinForEmail", email);
          setValues({
            ...values,
            email: "",
            password: "",
            photo: "",
            loading: "",
          });
          console.log("User Created Sucessfully!!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="m-3 p-1 border border-primary rounded">
      <div className="m-4">
        <h2>Signup Here</h2>
        <hr />
        <form enctype="multipart/form-data">
          <div className="m-4">
            <div class="form-group">
              <label for="email" class="form-label mt-4">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange("email")}
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="password" class="form-label mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange("password")}
                class="form-control"
                id="password"
                aria-describedby="emailHelp"
                placeholder="Enter password"
              />
            </div>
            <div class="form-group">
              <label for="img" class="form-label mt-4">
                Upload Your Photo
              </label>
              <input
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
                onChange={handleChange("photo")}
                class="form-control"
                id="img"
              />
            </div>
          </div>
          <div className="m-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-outline-primary"
            >
              Signup
            </button>
          </div>
          {loading}
        </form>
      </div>
      {pin}
    </div>
  );
};

export default SignupScreen;
