import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/logo.png";
import { FormLogin } from "./style";

import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

function Login() {
  const { onSubmitFunction, nav } = useContext(LoginContext);

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),
    password: yup.string().required("O campo senha é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  localStorage.clear();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormLogin>
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <h1>Login</h1>
          <label>
            E-mail:
            <input
              placeholder={errors.email ? errors.email.message : "Email"}
              {...register("email")}
            />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </label>

          <label>
            Senha
            <input
              placeholder={errors.password ? errors.password.message : "Senha"}
              type="password"
              {...register("password")}
            />
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          </label>

          <button type="submit">Login</button>
          <div className="noCadastroDiv">
            <p>Ainda não possui cadastro?</p>
            <button className="criarCadastro" onClick={(event) => nav("/form")}>
              Cadastre-se
            </button>
          </div>
        </form>
      </FormLogin>
    </motion.div>
  );
}

export default Login;
