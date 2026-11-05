import { useEffect, useRef, useState, type FormEvent } from "react";
import { readRequest, requestOptions, type RequestDialogProps, type RequestErrors} from "../requests";

export default function QuestionDialog({
  workshop,
  onClose,
  onSubmit,
}: RequestDialogProps) {
  const [errors, setErrors] = useState({});

  return (
    <dialog aria-labelledby="question-dialog-title">
      <div className="dialog-heading">
        <h2 id="question-dialog-title">
          Poser une question sur {workshop.title}
        </h2>



        <button type="button" className="close-button" onClick={onClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Fermer</span>
        </button>
      </div>

      
    </dialog>
  );
}