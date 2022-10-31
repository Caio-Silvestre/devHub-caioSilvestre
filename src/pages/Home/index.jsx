import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

import { HomeDiv } from "./style";
import { TehcList } from "./style";
import ModalNewTech from "../ModalNewTech";
import ModalEditTech from "../ModalEditTEch";

import { BsPlusSquare } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { HomeContext } from "../../context/HomeContext";
import { useState } from "react";

function Home() {
  const nav = useNavigate();
  const [modalVisi, setModalVisi] = useState(false);
  const [modalEditVisi, setModalEditVisi] = useState(false);
  const [idTech, setIdTech] = useState("");
  const { userData, loading, userTech } = useContext(HomeContext);

  if (loading) {
    return <div>Carregando Página</div>;
  }

  function logout(event) {
    event.preventDefault();
    localStorage.clear();
    nav("/");
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HomeDiv>
        <header>
          <img src={logo} alt="Logo" />
          <button onClick={(event) => logout(event)}>Logout</button>
        </header>
        <main>
          <div className="userData">
            <h2>Olá {userData.name}</h2>

            <p>{userData.course_module}</p>
          </div>
          <div className="techsDiv">
            <header>
              <h4 className="tehcTitle">Tecnologias</h4>
              <button
                className="newTechBtn"
                onClick={() => {
                  setModalVisi(true);
                }}
              >
                <BsPlusSquare style={{ color: "white", size: "50px" }} />
              </button>
            </header>
            <TehcList>
              {userTech?.map((techs, index) => {
                return (
                  <div key={index} className="techs">
                    <p>{techs.title}</p>
                    <div>
                      <span>{techs.status}</span>
                      <p
                        onClick={(event) => {
                          event.preventDefault();
                          setModalEditVisi(true);
                          setIdTech(event.target.id);
                        }}
                        id={techs.id}
                      >
                        ...
                      </p>
                    </div>
                  </div>
                );
              })}
            </TehcList>
          </div>
        </main>
        <ModalNewTech modalVisi={modalVisi} setModalVisi={setModalVisi} />
        <ModalEditTech
          modalVisi={modalEditVisi}
          setModalVisi={setModalEditVisi}
          idTech={idTech}
        />
      </HomeDiv>
    </motion.div>
  );
}

export default Home;
