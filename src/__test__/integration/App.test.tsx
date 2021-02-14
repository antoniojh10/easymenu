import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "@/router/Router";

describe("<App />", () => {
  beforeEach(() => {
    render(<App />);
  });
  it("Renders in Home and navMenu has Home link", () => {
    expect(screen.queryAllByText("Home")).toHaveLength(2);
  });
  it("should go to Register when click on SignUp link in Menu", async () => {
    const linkToSignUp = await screen.findByText("Sign Up");

    fireEvent.click(linkToSignUp);
    await waitFor(() => {
      const registerSection = document.querySelectorAll(".register");
      return expect(registerSection).toHaveLength(1);
    });
  });

  it("should go to Login when click on SignIn link in Menu", async () => {
    const linkToSignIn = await screen.findByText("Sign In");

    fireEvent.click(linkToSignIn);
    await waitFor(() => {
      const loginSection = document.querySelectorAll(".login");
      return expect(loginSection).toHaveLength(1);
    });
  });
});
