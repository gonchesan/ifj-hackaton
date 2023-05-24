import { useState } from "react";
import ListOffers from "../components/ListOfOffers";
import { getAllOffers } from "../services/offers";

function Offers() {
  const [offers, setOffers] = useState();
  const [query, setQuery] = useState("");

  const show = () => {
    getAllOffers(query).then((items) => setOffers(items.offers));
  };

  return (
    <div className="container pt-5">
      <h1 className="mt-5">Sticky footer with fixed navbar</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Puesto, empresa o palabra clave"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button className="btn btn-primary" onClick={show}>
          Buscar
        </button>
      </div>

      {offers ? <ListOffers offers={offers}></ListOffers> : "No hay resultados"}
    </div>
  );
}

export default Offers;
