"use client";
import { ReactNode, createContext, useContext, useState, useMemo } from "react";

interface ModalContextType {
  visible: boolean;
  children: ReactNode;
  setModalContent: (props: { visible?: boolean; content?: ReactNode }) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const modal = useContext(ModalContext);
  if (modal === undefined) {
    throw new Error("Modal context has no value");
  }
  return modal;
};

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode>(<></>);
  const [visible, setVisible] = useState(false);

  const setModalContent = (props: { visible?: boolean; content?: ReactNode }) => {
    if (props.content) {
      setContent(<></>);
      setContent(props.content);
    }
    props.visible !== undefined && setVisible(props.visible);
  };

  const contextValue = useMemo(() => {
    return {
      visible,
      children: content,
      setModalContent,
    };
  }, [visible, content, setModalContent]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
