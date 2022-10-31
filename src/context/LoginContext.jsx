import { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../pages/service/api";

export const LoginContext = createContext({});

const LoginProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");

  const [auth, setAuth] = useState(false);
  const nav = useNavigate();

  function isAuth(state) {
    if (!state) {
      nav("/");
    } else {
      nav("/home");
    }
  }
  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  function onSubmitFunction(data) {
    api
      .post("/sessions", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("userToken", response.data.token);
        setUserToken(response.data.token);
        setAuth(true);
        isAuth(auth);
      })
      .catch((error) => notify("E-mail ou senha inválidos"));
  }

  return (
    <LoginContext.Provider value={{ onSubmitFunction, nav, userToken }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
