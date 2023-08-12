import { useState } from "react";

export default function usePasswordVisibility(initialVisibility = false) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(initialVisibility);

  function handlePasswordVisibility() {
    setPasswordIsVisible(!passwordIsVisible);
  }

  return {
    passwordIsVisible,
    handlePasswordVisibility,
  };
}
