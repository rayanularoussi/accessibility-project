import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
    readRequest,
    requestOptions,
    type RequestDialogProps,
    type RequestErrors,
} from "../requests";

export default function QuestionDialog({
    workshop,
    onClose,
    onSubmit,
}: RequestDialogProps) {
    const [errors, setErrors] = useState<RequestErrors>({});
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const prefix = useId();
    const id = (part: string) => `${prefix}-${part}`;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (!dialog.open) dialog.showModal();
        titleRef.current?.focus();
    }, [workshop.id]);

    useEffect(() => {
        const first = (["choice", "contact", "message"] as const).find(
            (name) => errors[name],
        );
        if (first) document.getElementById(id(first))?.focus();
    }, [errors]);

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = readRequest(event.currentTarget, "question", workshop.id);
        setErrors(result.errors);

        if (Object.keys(result.errors).length > 0) return;

        onSubmit(result.values);
        closeDialog();
    };

    return (
        <dialog ref={dialogRef} aria-labelledby={id("title")} onClose={onClose}>
            <div className="dialog-heading">
                <h2 id={id("title")} ref={titleRef} tabIndex={-1}>
                    Poser une question sur {workshop.title}
                </h2>

                <button
                    type="button"
                    className="close-button"
                    aria-label="Fermer la fenêtre de question"
                    onClick={closeDialog}
                >
                    <span aria-hidden="true">×</span>
                </button>
            </div>

            <form noValidate onSubmit={submit}>
                <div className="field">
                    <label htmlFor={id("choice")}>Sujet de votre question</label>
                    <p id={id("choice-help")} className="field-help">
                        Choisissez le sujet qui correspond à votre question.
                    </p>

                    <select
                        name="choice"
                        id={id("choice")}
                        defaultValue=""
                        required
                        aria-invalid={Boolean(errors.choice)}
                        aria-describedby={
                            errors.choice
                                ? `${id("choice-help")} ${id("choice-error")}`
                                : id("choice-help")
                        }
                    >
                        <option value="" disabled>
                            Choisissez un sujet
                        </option>
                        {requestOptions.question.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {errors.choice && (
                        <p id={id("choice-error")} className="field-error">
                            {errors.choice}
                        </p>
                    )}
                </div>

                <div className="field">
                    <label htmlFor={id("contact")}>Adresse électronique</label>
                    <p id={id("contact-help")} className="field-help">
                        Format attendu : nom@exemple.fr.
                    </p>

                    <input
                        id={id("contact")}
                        type="email"
                        name="contact"
                        autoComplete="email"
                        required
                        aria-invalid={Boolean(errors.contact)}
                        aria-describedby={
                            errors.contact
                                ? `${id("contact-help")} ${id("contact-error")}`
                                : id("contact-help")
                        }
                    />

                    {errors.contact && (
                        <p id={id("contact-error")} className="field-error">
                            {errors.contact}
                        </p>
                    )}
                </div>

                <div className="field">
                    <label htmlFor={id("message")}>Votre question</label>
                    <p id={id("message-help")} className="field-help">
                        Décrivez votre question en quelques mots.
                    </p>

                    <textarea
                        id={id("message")}
                        name="message"
                        required
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                            errors.message
                                ? `${id("message-help")} ${id("message-error")}`
                                : id("message-help")
                        }
                    />

                    {errors.message && (
                        <p id={id("message-error")} className="field-error">
                            {errors.message}
                        </p>
                    )}
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="error-summary" role="alert">
                        <h3>La demande n’a pas pu être envoyée</h3>
                        <p>Corrigez les champs indiqués puis réessayez.</p>
                    </div>
                )}

                <div className="dialog-actions">
                    <button type="submit" className="primary-button">
                        Envoyer la question
                    </button>
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={closeDialog}
                    >
                        Revenir aux ateliers
                    </button>
                </div>
            </form>
        </dialog>
    );
}
