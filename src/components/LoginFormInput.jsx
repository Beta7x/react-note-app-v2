import PropTypes from "prop-types";
import React from "react";
import useInput from "../hooks/useInput";

const LoginFormInput = ({ login }) => {
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={onEmailChangeHandler}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={password}
        onChange={onPasswordChangeHandler}
      />
      <button>Login</button>
    </form>
  );
};

LoginFormInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginFormInput;
