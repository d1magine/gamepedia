import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

export default function LogIn() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  function handlePasswordVisibility() {
    setPasswordIsVisible(!passwordIsVisible);
  }

  return (
    <div className="mx-auto max-w-md px-5 pt-24 text-center mobile:px-0 mobile:pt-32">
      <Helmet>
        <body
          className={`h-screen bg-[#000000b3] bg-[url("./assets/login-background.jpg")] bg-cover bg-center bg-no-repeat bg-blend-overlay`}
        />
      </Helmet>
      <h1 className="mb-9 mobile:mb-12">Log in</h1>
      <form className="mb-6 flex flex-col gap-6 mobile:gap-10">
        <FormInput id="email" label="Email" type="email" />
        <FormInput
          id="password"
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
        <button
          className="mx-auto rounded-[10px] bg-[#3D3F43] px-8 py-2 text-base font-bold duration-200 hover:opacity-80 mobile:px-10 mobile:py-2 mobile:text-lg"
          type="submit"
        >
          Log In
        </button>
      </form>
      <Link to={"/signup"} className="font-bold underline">
        Don't have an account? Sign up.
      </Link>
    </div>
  );
}
