import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterComponent, {
  RegisterInput
} from "@/components/RegisterComponent";

const mockRegister = jest.fn((data: RegisterInput) => {
  return Promise.resolve({ ...data });
});

describe("<RegisterComponent />", () => {
  beforeEach(() => {
    render(<RegisterComponent sendRegisterData={mockRegister} />);
  });

  it("should display required error when value is invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(5);
    expect(mockRegister).not.toBeCalled();
  });

  it("should display matching error when email is invalid", async () => {
    const firstName = screen.getByLabelText("firstName") as HTMLInputElement;
    fireEvent.input(firstName, { target: { value: "test" } });

    const lastName = screen.getByLabelText("lastName") as HTMLInputElement;
    fireEvent.input(lastName, { target: { value: "test" } });

    const email = screen.getByLabelText("email") as HTMLInputElement;
    fireEvent.input(email, { target: { value: "test" } });

    const password = screen.getByLabelText("password") as HTMLInputElement;
    fireEvent.input(password, { target: { value: "testing" } });

    const confirmPassword = screen.getByLabelText(
      "confirmPassword"
    ) as HTMLInputElement;
    fireEvent.input(confirmPassword, { target: { value: "testing" } });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockRegister).not.toBeCalled();
    expect(firstName.value).toBe("test");
    expect(lastName.value).toBe("test");
    expect(email.value).toBe("test");
    expect(password.value).toBe("testing");
    expect(confirmPassword.value).toBe("testing");
  });

  it("should display min length error when password is invalid", async () => {
    const firstName = screen.getByLabelText("firstName") as HTMLInputElement;
    fireEvent.input(firstName, { target: { value: "test" } });

    const lastName = screen.getByLabelText("lastName") as HTMLInputElement;
    fireEvent.input(lastName, { target: { value: "test" } });

    const email = screen.getByLabelText("email") as HTMLInputElement;
    fireEvent.input(email, { target: { value: "test@mail.com" } });

    const password = screen.getByLabelText("password") as HTMLInputElement;
    fireEvent.input(password, { target: { value: "test" } });

    const confirmPassword = screen.getByLabelText(
      "confirmPassword"
    ) as HTMLInputElement;
    fireEvent.input(confirmPassword, { target: { value: "test" } });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockRegister).not.toBeCalled();
    expect(firstName.value).toBe("test");
    expect(lastName.value).toBe("test");
    expect(email.value).toBe("test@mail.com");
    expect(password.value).toBe("test");
    expect(confirmPassword.value).toBe("test");
  });

  it("should display error when password is different to confirmPassword", async () => {
    const firstName = screen.getByLabelText("firstName") as HTMLInputElement;
    fireEvent.input(firstName, { target: { value: "test" } });

    const lastName = screen.getByLabelText("lastName") as HTMLInputElement;
    fireEvent.input(lastName, { target: { value: "test" } });

    const email = screen.getByLabelText("email") as HTMLInputElement;
    fireEvent.input(email, { target: { value: "test@mail.com" } });

    const password = screen.getByLabelText("password") as HTMLInputElement;
    fireEvent.input(password, { target: { value: "testing" } });

    const confirmPassword = screen.getByLabelText(
      "confirmPassword"
    ) as HTMLInputElement;
    fireEvent.input(confirmPassword, { target: { value: "tested" } });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockRegister).not.toBeCalled();
    expect(firstName.value).toBe("test");
    expect(lastName.value).toBe("test");
    expect(email.value).toBe("test@mail.com");
    expect(password.value).toBe("testing");
    expect(confirmPassword.value).toBe("tested");
  });

  it("should not display error when data is valid", async () => {
    const firstName = screen.getByLabelText("firstName") as HTMLInputElement;
    fireEvent.input(firstName, { target: { value: "test" } });

    const lastName = screen.getByLabelText("lastName") as HTMLInputElement;
    fireEvent.input(lastName, { target: { value: "test" } });

    const email = screen.getByLabelText("email") as HTMLInputElement;
    fireEvent.input(email, { target: { value: "test@mail.com" } });

    const password = screen.getByLabelText("password") as HTMLInputElement;
    fireEvent.input(password, { target: { value: "testing" } });

    const confirmPassword = screen.getByLabelText(
      "confirmPassword"
    ) as HTMLInputElement;
    fireEvent.input(confirmPassword, { target: { value: "testing" } });

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(mockRegister).toBeCalledWith({
      firstName: "test",
      lastName: "test",
      email: "test@mail.com",
      password: "testing",
      confirmPassword: "testing"
    });
    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
    expect(email.value).toBe("");
    expect(password.value).toBe("");
    expect(confirmPassword.value).toBe("");
  });
});
