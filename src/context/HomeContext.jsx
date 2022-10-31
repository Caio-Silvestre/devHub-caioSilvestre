import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import { api } from "../pages/service/api";

export const HomeContext = createContext({});

const HomeProvider = ({ children }) => {
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
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [userTech, setUserTech] = useState([]);
  const userToken = localStorage.getItem("userToken");

  function newTech(data) {
    const dataNewTech = {
      title: data.name_tech,
      status: data.status_tech,
    };
    api
      .post(`/users/techs`, dataNewTech)
      .then((response) => {
        setUserTech((oldData) => [...oldData, response.data]);
        notify("Tecnologia criada com Sucesso");
      })
      .catch((err) => notify("Erro ao criar tecnologia, tente novamente"));
  }

  function editTech(data, id) {
    // const dataEditTech = {
    //   status: data.status_tech,
    // };
    api
      .put(`/users/techs/${id}`, data)
      .then((response) => {
        setUserTech((oldData) => [...oldData, response.data]);
        notify("Tecnologia editada com Sucesso");
      })
      .catch((err) => notify("Erro ao editar tecnologia, tente novamente"));
  }
  function deleteTech(id) {
    const userTechFilter = userTech.filter((tech) => {
      return tech.id !== id;
    });
    api
      .delete(`/users/techs/${id}`)
      .then((response) => {
        setUserTech(userTechFilter);
        notify("Tecnologia editada com Sucesso");
      })
      .catch((err) => notify("Erro ao editar tecnologia, tente novamente"));
  }

  useEffect(() => {
    async function loadUser() {
      await api
        .get(`/profile`)
        .then((response) => {
          setUserData(response.data);
          setUserTech(response.data.techs);
        })
        .catch((err) => {
          nav("/");
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (userToken) {
      loadUser();
    }
  }, []);

  return (
    <HomeContext.Provider
      value={{ userData, newTech, loading, editTech, deleteTech, userTech }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
