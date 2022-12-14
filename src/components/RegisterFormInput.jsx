import PropTypes from "prop-types";
import React from "react";
import Swal from "sweetalert2";
import useInput from "../hooks/useInput";

const RegisterFormInput = ({ register }) => {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    password === confirmPassword
      ? register({ name, email, password })
      : Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password and password confirm must be same.",
        });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="nama">Name</label>
      <input id="nama" type="text" value={name} onChange={onNameChange} />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={onEmailChange} />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
      />

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />

      <button>Register</button>
    </form>
  );
};

RegisterFormInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterFormInput;
