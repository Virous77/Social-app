import { createContext, useState, useContext } from "react";

const PinDetail = createContext();

export const PinDetailProvider = ({ children }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");

  return (
    <PinDetail.Provider
      value={{
        pins,
        setComment,
        setPinDetail,
        setPins,
        pinDetail,
        comment,
      }}
    >
      {children}
    </PinDetail.Provider>
  );
};

export const usePinDetail = () => useContext(PinDetail);
