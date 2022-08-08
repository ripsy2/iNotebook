import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="login container mt-2">
      <h2 className="my-2" style={{ fontWeight: "bold", fontStyle: "italic" }}>
        Create an account to use iNotebook
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3" style={{ width: "35rem" }}>
          <label
            htmlFor="name"
            className="form-label"
            style={{ fontStyle: "italic" }}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3" style={{ width: "35rem" }}>
          <label
            htmlFor="email"
            className="form-label"
            style={{ fontStyle: "italic" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3" style={{ width: "35rem" }}>
          <label
            htmlFor="password"
            className="form-label"
            style={{ fontStyle: "italic" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={6}
            required
          />
        </div>
        <div className="mb-3" style={{ width: "35rem" }}>
          <label
            htmlFor="cpassword"
            className="form-label"
            style={{ fontStyle: "italic" }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={6}
            required
          />
        </div>
        <div class="form-row text-center">
          <div class="btn-padding-y d-grid gap-2 col-3 mx-auto">
            <button type="submit" className="btn btn-danger">
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
