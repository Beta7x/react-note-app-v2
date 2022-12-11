import PropTypes from "prop-types";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";

const LogoutButton = ({ logout, name }) => {
  return (
    <button onClick={logout} className="button-logout" type="button">
      <HiOutlineLogout /> {name}
    </button>
  );
};

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default LogoutButton;
