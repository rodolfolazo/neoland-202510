import { useState } from "react";

import { Form } from "./components/commons/Form";
import { Field } from "./components/commons/Field";
import { PasswordField } from "./components/commons/PasswordField";

import { Header } from "./components/commons/Header";
import { Button } from "./components/commons/Button";
import { Button2 } from "./components/commons/Button2";
import { Anchor } from "./components/commons/Anchor";
import { Feedback } from "./components/commons/Feedback";

import { logic } from "../logic";
import { CredentialError, ExistenceError, ValidationError } from "../errors";

export function Login({ onUserLoggedIn, onGoToRegister }) {
  console.log("Login -> call");

  const [feedback, setFeedback] = useState(null);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const username = form.username.value;
    const password = form.password.value;

    try {
      logic
        .loginUser(username, password)
        .then(() => onUserLoggedIn())
        .catch((error) => {
          if (error instanceof ValidationError)
            setFeedback({ message: error.message, level: "warn" });
          else if (
            error instanceof ExistenceError ||
            error instanceof CredentialError
          )
            setFeedback({ message: error.message, level: "danger" });
          else
            setFeedback({
              message: "sorry, something failed. Try again later",
              level: "error",
            });
        });
    } catch (error) {
      setFeedback({ message: error.message, level: "error" });
    }
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();

    onGoToRegister();
  };

  const handleLogoClick = (event) => {
    event.preventDefault();

    onUserLoggedIn();
  };

  console.log("Login -> render");

  return (
    <div className="p-4 flex flex-col gap-12 items-center">
      <Header onClick={handleLogoClick} />

      <Form onSubmit={handleLoginSubmit} className="w-8/12">
        <Field alias="username" type="text">
          Username
        </Field>

        <PasswordField alias="password">Password</PasswordField>

        <Button2
          className="self-center w-56 bg-teal-500 text-white hover:bg-teal-600 hover:font-bold mb-8"
          type="submit"
        >
          Login
        </Button2>
      </Form>

      <Anchor className="self-start pl-4" onClick={handleRegisterClick}>
        Register
      </Anchor>

      {feedback && <Feedback feedback={feedback} />}
    </div>
  );
}
