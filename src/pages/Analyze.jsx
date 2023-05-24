import { OffersContext } from "../context/OffersContext";
import { useContext, useState } from "react";

function Analyze() {
  const { folder, removeOffer } = useContext(OffersContext);
  const [messages, setMessages] = useState([]);
  const handleSendMessage = async ({ description }) => {
    const message = {
      model: "gpt-3.5-turbo",
      prompt: `Give me only a cover letter for a job application making sure to tell your skills and why i could bring value for the company in english using this description:'${description}'`,
      max_tokens: 300,
      temperature: 0.3,
      k: 36,
      stop_sequences: [],
      return_likelihoods: "GENERATION",
    };
    // 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
    try {
      const response = await fetch("https://api.chatgpt.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        const data = await response.json();
        const botReply = data.reply;

        console.log([
          ...messages,
          {
            text: `Necesito unos consejos para el siguiente puesto ${description}`,
            sender: "user",
          },
          { text: botReply, sender: "bot" },
        ]);

        setMessages([...messages, { text: botReply, sender: "bot" }]);
      } else {
        throw new Error("Error en la respuesta de la API");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div className="row container">
      {folder.length > 0 ? (
        folder.map((offer) => {
          const {
            id,
            description,
            title,
            profile,
            creationDate,
            province,

            experienceMin,
            teleworking,
            contractType,
            journey,

            country,
            skillsList,
            studiesMin,
            salaryDescription,
            link,
          } = offer;

          return (
            <div key={id} className="card col-4">
              <img
                src={profile.logoUrl}
                className="card-img-top image-responsive"
                alt={profile.name}
              />
              <button
                className="btn btn-outline-danger"
                onClick={() => removeOffer(id)}
              >
                ❌
              </button>
              <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <h5 className="card-title">{profile.name}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {`${province.value}, ${country.value}.`}
                </li>
                <li className="list-group-item">{teleworking.value}</li>
                <li className="list-group-item">Publicada el {creationDate}</li>
                <li className="list-group-item">
                  Salario: {salaryDescription}
                </li>
                <li className="list-group-item">
                  Experiencia mínima: {experienceMin.value}
                </li>
                <li className="list-group-item">
                  {`Tipo de contrato: ${
                    contractType.value
                  }, jornada ${journey.value.toLowerCase()}`}
                </li>
                <li className="list-group-item">
                  <h3>Requisitos</h3>
                  <h5>Estudios mínimos</h5>
                  {studiesMin.value}
                  <h5> Experiencia mínima</h5>
                  {experienceMin.value}
                  <h5>Conocimientos necesarios</h5>
                  <div>
                    {skillsList.map((item) => (
                      <span key={item.skill} className="badge bg-secondary">
                        {item.skill}
                      </span>
                    ))}
                  </div>
                </li>
                <li className="list-group-item">
                  <h3>Descripcion</h3>
                  {description}
                </li>
              </ul>

              <div className="card-body">
                <button
                  onClick={() => handleSendMessage(description)}
                  className="btn btn-outline-primary"
                >
                  Pedir recomendacion
                </button>
                <a
                  target="_blank"
                  href={link}
                  className="btn btn-primary"
                  rel="noreferrer"
                >
                  Ir a la descripcion
                </a>
              </div>
            </div>
          );
        })
      ) : (
        <p>
          No hay niguna oferta seleccionada para comparar. Te recomendamos que
          selecciones al menos dos ofertas para comparar
        </p>
      )}
    </div>
  );
}

export default Analyze;
