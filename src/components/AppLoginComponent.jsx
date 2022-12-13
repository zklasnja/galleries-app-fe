import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function AppLoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleOnLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="form-signin w-100 m-auto">
      <form onSubmit={handleOnLogin}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={({ target }) => setEmail(target.value)}
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <label>Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
