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
import { DuplicityError, ValidationError } from "../errors";

export function Register({ onGoToLogin, onUserLoggedIn }) {
  console.log("Register -> call");

  const [feedback, setFeedback] = useState(null);

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
    const passwordRepeat = form.passwordRepeat.value;

    try {
      logic
        .registerUser(name, email, username, password, passwordRepeat)
        .then(() => {
          form.reset();

          setFeedback(null);

          onGoToLogin();
        })
        .catch((error) => {
          if (error instanceof ValidationError)
            setFeedback({ message: error.message, level: "warn" });
          else if (error instanceof DuplicityError)
            setFeedback({ message: error.message, level: "danger" });
          else
            setFeedback({
              message: "sorry, something failed. try again later",
              level: "error",
            });
        });
    } catch (error) {
      setFeedback({ message: error.message, level: "error" });
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();

    onGoToLogin();
  };

  const handleLogoClick = (event) => {
    event.preventDefault();

    onUserLoggedIn();
  };

  console.log("Register -> render");

  return (
    <div className="p-4">
      <Header onClick={handleLogoClick} />

      <Form onSubmit={handleRegisterSubmit}>
        <Field alias="name" type="text">
          Name
        </Field>

        <Field alias="email" type="email">
          E-mail
        </Field>

        <Field alias="username" type="text">
          Username
        </Field>

        <PasswordField alias="password">Password</PasswordField>

        <PasswordField alias="passwordRepeat">Repeat Password</PasswordField>

        <Button2
          className="self-center w-56 bg-teal-500 text-white hover:bg-teal-600 hover:font-bold mb-8"
          type="submit"
        >
          Register
        </Button2>
      </Form>

      <Anchor onClick={handleLoginClick}>Login</Anchor>

      {feedback && <Feedback feedback={feedback} />}
    </div>
  );
}
