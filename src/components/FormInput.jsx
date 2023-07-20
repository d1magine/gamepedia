import React from "react";

export default function FormInput({ label, type, id, autocomplete, children }) {
  return (
    <div className="relative text-left">
      <label className="mb-3 block text-sm font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="block w-full rounded-md px-3 py-2 font-medium text-black focus:outline-none focus:ring-[2.5px] focus:ring-sky-500 mobile:p-3"
        type={type}
        autoComplete={autocomplete}
        required
      />
      {children}
    </div>
  );
}