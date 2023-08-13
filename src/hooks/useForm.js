import { useState } from "react";

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return {
    formData,
    handleFormChange,
  };
}
