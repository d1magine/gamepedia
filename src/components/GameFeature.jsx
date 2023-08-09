import React from "react";

export default function GameFeature({ feature, label }) {
  return (
    <>
      {feature.length !== 0 && (
        <div>
          <div className="mb-2 text-sm font-bold text-[#616161]">{label}</div>
          <div className="font-bold underline">{feature.join(", ")}</div>
        </div>
      )}
    </>
  );
}
