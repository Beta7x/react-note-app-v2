import React, { useContext } from "react";
import { register } from "../utils/network-data";
import { Link, useNavigate } from "react-router-dom";
import RegisterFormInput from "../components/RegisterFormInput";
import LocaleContext from "../contexts/LocaleContext";

function RegisterPage() {
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>
        {locale === "id"
          ? "Isi form untuk mendaftar akun"
          : "Fill the form to register account."}
      </h2>
      <RegisterFormInput register={onRegisterHandler} />
      <p>
        {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}{" "}
        <Link to="/">{locale === "id" ? "Login di sini" : "Login here"}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
