import { createContext, useState } from "react";

export const OffersContext = createContext(null);

export const OffersProvider = ({ children }) => {
  const [folder, setFolder] = useState([]);

  const addOffer = (offer) => {
    if (isInFolder(offer.id) === false) {
      setFolder([...folder, offer]);
    } else {
      console.log("Ya se encuentra en la carpeta");
    }
  };

  const removeOffer = (offerId) => {
    const newArray = folder.filter((offer) => offer.id !== offerId);
    setFolder(newArray);
  };

  const isInFolder = (id) => folder.some((offer) => offer.id === id);

  const clear = () => {
    setFolder([]);
  };

  return (
    <OffersContext.Provider
      value={{ folder, setFolder, removeOffer, clear, addOffer }}
    >
      {children}
    </OffersContext.Provider>
  );
};
