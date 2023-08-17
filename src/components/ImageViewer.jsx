import React, { useState, useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore, MdClose } from "react-icons/md";

export default function ImageViewer({
  images,
  selectedImgIndex,
  setSelectedImgIndex,
}) {
  const [currImgIndex, setCurrImgIndex] = useState(selectedImgIndex);

  function handleNextImage() {
    return setCurrImgIndex((currImgIndex + 1) % images.length);
  }

  function handlePrevImage() {
    return setCurrImgIndex((currImgIndex + images.length - 1) % images.length);
  }

  // Листать скриншоты стрелками на клавиатуре
  useEffect(() => {
    const handleArrowsClick = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };

    document.addEventListener("keyup", handleArrowsClick);

    return () => {
      document.removeEventListener("keyup", handleArrowsClick);
    };
  }, [currImgIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 h-screen w-screen bg-zinc-950">
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handlePrevImage}
          className="z-10 rounded-full p-2 transition hover:bg-white hover:bg-opacity-10"
        >
          <MdNavigateBefore size="30px" />
        </button>
        <p className="text-center font-bold">{`${currImgIndex + 1} of ${
          images.length
        }`}</p>
        <button
          onClick={handleNextImage}
          className="z-10 rounded-full p-2 transition hover:bg-white hover:bg-opacity-10"
        >
          <MdNavigateNext size="30px" />
        </button>
      </div>
      <button
        className="absolute right-2 top-2 z-10 rounded-full p-2 transition hover:bg-white hover:bg-opacity-10"
        onClick={() => setSelectedImgIndex(null)}
      >
        <MdClose size="26px" className="text-white" />
      </button>

      <div
        style={{ transform: `translateX(${currImgIndex * -100}%)` }}
        className="absolute bottom-0 left-0 right-0 top-0 flex items-center transition duration-500"
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full">
            <img
              className="mx-auto w-full object-contain mobile:w-[73%]"
              src={img}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
