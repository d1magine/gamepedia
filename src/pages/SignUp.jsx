import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import { TiWarningOutline } from "react-icons/ti";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import usePasswordVisibility from "../hooks/usePasswordVisibility";
import useForm from "../hooks/useForm";

export default function SignUp() {
  // Изменение полей формы
  const { formData, handleFormChange } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const { signUp, sendEmail, logOut, setUsername } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Зарегистрировать пользователя
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);

      const credential = await signUp(formData.email, formData.password);

      await setUsername(credential.user, formData.username);
      await sendEmail(credential.user);
      await setDoc(doc(db, "users", credential.user.uid), {
        savedGames: [],
      });
      await logOut();

      alert("Verification message was sent to your email!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const { passwordIsVisible, handlePasswordVisibility } =
    usePasswordVisibility();

  return (
    <div className="mx-auto max-w-md px-5 pt-24 text-center mobile:px-0 mobile:pt-32">
      <Helmet>
        <title>Sign Up | Gamepedia</title>
        <body
          className={`h-screen bg-[#000000ad] bg-[url("./assets/signup-background.jpg")] bg-cover bg-center bg-no-repeat bg-blend-overlay`}
        />
      </Helmet>
      <h1 className="mb-9 mobile:mb-12">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-6 mobile:gap-10"
      >
        <FormInput
          id="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          label="Email"
          type="email"
          autoComplete="email"
        />
        <FormInput
          id="username"
          name="username"
          value={formData.username}
          onChange={handleFormChange}
          label="Username"
          type="text"
        />
        <FormInput
          id="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
          label="Password"
          type={passwordIsVisible ? "text" : "password"}
        >
          {passwordIsVisible ? (
            <MdOutlineVisibility
              color="#222222"
              size="24px"
              className="absolute bottom-2 right-4 cursor-pointer mobile:bottom-3"
              onClick={handlePasswordVisibility}
            />
          ) : (
            <MdOutlineVisibilityOff
              color="#222222"
              size="24px"
              className="absolute bottom-2 right-4 cursor-pointer mobile:bottom-3"
              onClick={handlePasswordVisibility}
            />
          )}
        </FormInput>
        {error && (
          <div className="error">
            <TiWarningOutline color="white" size="23px" />
            <p className="max-w-xs">{error}</p>
          </div>
        )}
        <button
          disabled={isLoading}
          className="mx-auto rounded-[10px] bg-[#3D3F43] px-8 py-2 text-base font-bold duration-200 hover:opacity-80 mobile:px-10 mobile:py-2 mobile:text-lg"
          type="submit"
        >
          {isLoading ? (
            <div className="spinner mx-2 my-1 w-5"></div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <Link to={"/login"} className="font-bold underline">
        Have an account? Log in.
      </Link>
    </div>
  );
}
