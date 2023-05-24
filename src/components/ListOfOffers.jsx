import { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getOfferById } from "../services/offers";

import { OffersContext } from "../context/OffersContext";

function ListOfOffers({ offers }) {
  const [name, setName] = useLocalStorage("offers", "");
  const { addOffer, folder } = useContext(OffersContext);

  const addToCompare = (id) => {
    if (folder.length < 3)
      getOfferById(id)
        .then((offer) => {
          addOffer(offer);
          setName([...name, id]);
        })
        .catch((err) => console.log("Hubo un error al cargar la oferta", err));
  };

  return (
    <div>
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">1</th>
                <td>{item.title}</td>
                <td>{item.subcategory.value}</td>
                <td>{item.salaryDescription}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCompare(item.id)}
                  >
                    ➕
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListOfOffers;
