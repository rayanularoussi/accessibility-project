import { useId, useState, type ReactNode } from "react";
import type { Workshop } from "../workshops";

type Props = {
  workshop: Workshop;
  onReserve: (workshop: Workshop) => void;
  extraAction?: ReactNode;
};

export default function WorkshopCard({ workshop, onReserve, extraAction }: Props) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <article className="workshop-card">
      <div className="card-art">
        {workshop.id === "serigraphie"
          ? <img src={workshop.image} />
          : <img src={workshop.image} alt="" />}
        <span className="category">{workshop.category}</span>
      </div>
      <button
        type="button"
        className="details-trigger"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded(value => !value)}
      >
        Détails de l'atelier <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div
        id={panelId}
        className={"details-panel " + (expanded ? "is-open" : "")}
        inert={!expanded}
      >
        <div className="details-inner">
          <p>{workshop.description}</p>
          <a href="#infos-pratiques">Consulter les informations pratiques</a>
        </div>
      </div>
      <div className="card-actions">
        {workshop.available ? (
          <button type="button" className="reserve-button" onClick={() => onReserve(workshop)}>
            M’inscrire à {workshop.title}
          </button>
        ) : <p className="closed-message">Inscriptions closes</p>}
        {extraAction}
      </div>
    </article>
  );
}
