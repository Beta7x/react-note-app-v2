import React, { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import LogoutButton from "./components/LogoutButton";
import LocaleToggleButton from "./components/LocaleToggleButton";
import ThemeToggleButton from "./components/ThemeToggleButton";
import NavigationBar from "./components/NavigationBar";
import LocaleContext from "./contexts/LocaleContext";
import ThemeContext from "./contexts/ThemeContext";
import AddNotePage from "./pages/AddNotePage";
import ArchiveNotePage from "./pages/ArchiveNotePage";
import DetailNotePage from "./pages/DetailNotePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const home = "/";
  const login = "/*";
  const register = "/register";
  const archives = "/archives";
  const add = "/notes/new";
  const detail = "/notes/:id";
  const notFound = "*";

  const [authedUser, setAuthedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const themeContextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  const localeContextValue = useMemo(
    () => ({
      locale,
      toggleLocale,
    }),
    [locale]
  );

  useEffect(() => {
    const fetchGetUserLogged = async () => {
      const { data } = await getUserLogged();

      setAuthedUser(data);
      setLoading(false);
    };

    fetchGetUserLogged();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onLoginSucces = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);

    putAccessToken("");
  };

  if (loading) {
    return null;
  }

  if (authedUser === null) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">
                  {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
                </Link>
              </h1>
              <LocaleToggleButton />
              <ThemeToggleButton />
            </header>
            <main>
              <Routes>
                <Route
                  path={login}
                  element={<LoginPage loginSuccess={onLoginSucces} />}
                />
                <Route path={register} element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container">
          <header>
            <h1>
              <Link to="/">
                {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
              </Link>
            </h1>
            <NavigationBar />
            <LocaleToggleButton />
            <ThemeToggleButton />
            <LogoutButton logout={onLogout} name={authedUser.name} />
          </header>
          <main>
            <Routes>
              <Route path={home} element={<HomePage />} />
              <Route path={archives} element={<ArchiveNotePage />} />
              <Route path={add} element={<AddNotePage />} />
              <Route path={detail} element={<DetailNotePage />} />
              <Route path={notFound} element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
