import React from "react";
import PinContent from "./PinContent";
import "../../styles/Pin.css";

const Masnoary = ({ pins, isLoading, setIsLoading }) => {
  console.log(pins);
  return (
    <section className="masnory">
      {pins?.map((pin) => (
        <PinContent
          key={pin?._id}
          pin={pin}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ))}
    </section>
  );
};

export default Masnoary;
