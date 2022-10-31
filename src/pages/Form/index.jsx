import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../assets/logo.png";
import { FormCadastro } from "./style";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
function Form() {
  const { onSubmitFunction, nav } = useContext(FormContext);
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome Obrigatório")
      .min(10, "Insira nome completo")
      .max(30, "Abrevie seu nome a 30 caracteres"),
    email: yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),

    password: yup
      .string()
      .required("O campo senha é obrigatório")
      .min(6, "Insira pelo menos 6 caracteres")
      .matches(/[A-Z]/, "Deve conter ao menos 1 letra maiúscula")
      .matches(/([a-z])/, "Deve conter ao menos 1 letra minúscula")
      .matches(/(\d)/, "Deve conter ao menos 1 número")
      .matches(/.{3,}/, "Deve conter ao menos 3 dígitos"),
    passwordConfirm: yup
      .string()
      .required("O campo senha é obrigatório")
      .oneOf([yup.ref("password")], "A senhas não são iguais"),
    bio: yup
      .string()
      .required("Bio Obrigatório")
      .min(10, "Nos conte mais sobre você!")
      .max(100, "Máximo de 100 caracteres"),
    contact: yup.string().required("Contato Obrigatório"),
    course_module: yup.string().required("Selecione um Módulo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormCadastro>
        <header>
          <img src={logo} alt="Logo" />
          <button onClick={(event) => nav("/")}>Voltar</button>
        </header>
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <label>
            Nome:
            <input
              placeholder={errors.name ? errors.name.message : "Name"}
              {...register("name")}
            />
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          </label>
          <label>
            E-mail:
            <input
              placeholder={errors.email ? errors.email.message : "E-mail"}
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
          <label>
            Confirme a senha
            <input
              placeholder={
                errors.passwordConfirm
                  ? errors.passwordConfirm.message
                  : "Confirme a senha"
              }
              type="password"
              {...register("passwordConfirm")}
            />
            <span style={{ color: "red" }}>
              {errors.passwordConfirm?.message}
            </span>
          </label>
          <label>
            Bio:
            <input
              placeholder={errors.bio ? errors.name.message : "Bio"}
              {...register("bio")}
            />
            <span style={{ color: "red" }}>{errors.bio?.message}</span>
          </label>
          <label>
            Contato:
            <input
              placeholder={errors.contact ? errors.contact.message : "Contato"}
              {...register("contact")}
            />
            <span style={{ color: "red" }}>{errors.contact?.message}</span>
          </label>
          <label>
            Selecionar módulo:
            <select placeholder="Módulo" {...register("course_module")}>
              <option value="Primeiro módulo (Introdução ao Frontend)">
                M1
              </option>
              <option value="Segundo módulo (Frontend Avançado)">M2</option>
              <option value="Terceiro módulo (Introdução ao Backend)">
                M3
              </option>
              <option value="Quarto módulo (Backend Avançado)">M4</option>
            </select>
            <span style={{ color: "red" }}>
              {errors.course_module?.message}
            </span>
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      </FormCadastro>
    </motion.div>
  );
}

export default Form;
