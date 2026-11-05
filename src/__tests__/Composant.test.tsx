import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import App from "../App";
import { render, screen, within } from "@testing-library/react";

describe("Question à l’organisateur", () => {
  it("depuis App, conserve le sujet et la question après un envoi sans email, puis confirme le bon atelier et le bon sujet après correction", 
    async() => {
      const user = userEvent.setup();
      render(<App />);



    }
  )
});
