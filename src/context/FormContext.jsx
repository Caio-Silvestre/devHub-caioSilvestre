import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../pages/service/api";

export const FormContext = createContext({});

const FormProvider = ({ children }) => {
  const nav = useNavigate();
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
  const onSubmitFunction = (data) => {
    api
      .post("/users", data)
      .then((response) => nav("/"))
      .catch((error) =>
        notify("Revise os campos de cadastro. E-mail ou nome já cadastrado")
      );
  };
  return (
    <FormContext.Provider value={{ onSubmitFunction, nav }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
