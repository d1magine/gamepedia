import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import { TiWarningOutline } from "react-icons/ti";

export default function LogIn() {
  const { signIn, logOut } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Вход пользователя
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);

      const credential = await signIn(formData.email, formData.password);

      if (credential.user.emailVerified) {
        navigate("/account");
      } else {
        await logOut();
        throw new Error("You should confirm your email address.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  function handlePasswordVisibility() {
    setPasswordIsVisible(!passwordIsVisible);
  }

  return (
    <div className="mx-auto max-w-md px-5 pt-24 text-center mobile:px-0 mobile:pt-32">
      <Helmet>
        <title>Log In | Gamepedia</title>
        <body
          className={`h-screen bg-[#000000b3] bg-[url("./assets/login-background.jpg")] bg-cover bg-center bg-no-repeat bg-blend-overlay`}
        />
      </Helmet>
      <h1 className="mb-9 mobile:mb-12">Log in</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-6 mobile:gap-10"
      >
        <FormInput
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          label="Email"
          type="email"
        />
        <FormInput
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
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
          {isLoading ? <div className="spinner mx-2 my-1 w-5"></div> : "Log In"}
        </button>
      </form>
      <Link to={"/signup"} className="font-bold underline">
        Don't have an account? Sign up.
      </Link>
    </div>
  );
}
