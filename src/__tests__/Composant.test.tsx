import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../App";
import { render, screen, within } from "@testing-library/react";

describe("Question à l’organisateur", () => {
  it("depuis App, conserve le sujet et la question après un envoi sans email, puis confirme le bon atelier et le bon sujet après correction",
    async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(
        screen.getByRole("button", {
          name: /poser une question.*une tasse en céramique/i,
        })
      );

      const dialog = screen.getByRole("dialog");

      await user.selectOptions(
        within(dialog).getByRole("combobox", {
          name: /sujet de votre question/i,
        }),
        "materiel"
      );

      const question = within(dialog).getByRole("textbox", {
        name: /votre question/i,
      });
      await user.type(question, "Le matériel est-il fourni ?");

      await user.click(
        within(dialog).getByRole("button", {
          name: /envoyer la question/i,
        })
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(
        within(dialog).getByText(/saisissez une adresse électronique/i)
      ).toBeInTheDocument();
      expect(
        within(dialog).getByRole("combobox", {
          name: /sujet de votre question/i,
        })
      ).toHaveValue("materiel");
      expect(question).toHaveValue("Le matériel est-il fourni ?");

      expect(
        screen.queryByText(/nous avons bien reçu votre question/i)
      ).not.toBeInTheDocument();

      await user.type(
        within(dialog).getByRole("textbox", {
          name: /adresse électronique/i,
        }),
        "lea@example.com"
      );

      await user.click(
        within(dialog).getByRole("button", {
          name: /envoyer la question/i,
        })
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(
        await screen.findByText(
          /le matériel à apporter.*une tasse en céramique/i
        )
      ).toBeInTheDocument();
    });
});
