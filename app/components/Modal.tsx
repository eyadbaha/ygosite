"use client";
import Image from "next/image";
import { useModalContext } from "../context/modal";

export const Modal = () => {
  const modalContext = useModalContext();
  const modalDisplay = modalContext.visible ? "scale-100" : "scale-0 delay-500";
  const childrenDisplay = modalContext.visible ? "opacity-100" : "opacity-0";
  return (
    <div
      onClick={(e) => {
        modalContext.setModalContent({ visible: false });
      }}
      className={`border-3 border-double border-blue-500 shadow-inner-blue-500 shadow-blue-500 w-full h-full fixed z-50 transition-scale ${modalDisplay} overflow-hidden`}
    >
      <div
        className={`transition-all duration-500 w-full h-full backdrop-blur-sm flex items-center justify-center font-KafuTechnoStd ${childrenDisplay}`}
      >
        {modalContext.children}
      </div>
    </div>
  );
};
