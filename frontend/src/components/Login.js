import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login container mt-3">
      <h2 className="my-4" style={{ fontWeight: "bold", fontStyle: "italic" }}>
        Login to continue to iNotebook
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
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
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            style={{ width: "35rem" }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="my-3">
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
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
            style={{ width: "35rem" }}
          />
        </div>
        <div className="form-row text-center">
          <div className="btn-padding-y d-grid gap-2 col-3 mx-auto">
            <button type="submit" className="btn btn-danger">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
