import { useState, useEffect } from "react";

import { useParams } from "react-router";

import { Header } from "./components/commons/Header";
import { Form } from "./components/commons/Form";
import { Field } from "./components/commons/Field";
import { Button } from "./components/commons/Button";
import { Anchor } from "./components/commons/Anchor";
import { Feedback } from "./components/commons/Feedback";
import { Spinner } from "./components/Spinner";

import { logic } from "../logic";

export function ModifyPet({ onGoBack }) {
  console.log("ModifyPet -> call");

  const [feedback, setFeedback] = useState(null);
  const [pet, setPet] = useState(null);

  const { petId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      try {
        logic
          .getPet(petId)
          .then((pet) => setPet(pet))
          .catch((error) =>
            setFeedback({ message: error.message, level: "error" }),
          );
      } catch (error) {
        setFeedback({ message: error.message, level: "error" });
      }
    }, 1000);
  }, []);

  const handleBackClick = (event) => {
    event.preventDefault();

    onGoBack(petId);
  };

  const handleModifyPetSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const birthdate = form.birthdate.value;
    const weight = Number(form.weight.value);
    const image = form.image.value;

    try {
      logic
        .modifyPet(petId, name, birthdate, weight, image)
        .then(() =>
          setFeedback({
            message: "pet successfully modified",
            level: "success",
          }),
        )
        .catch((error) =>
          setFeedback({ message: error.message, level: "error" }),
        );
    } catch (error) {
      setFeedback({ message: error.message, level: "error" });
    }
  };

  const handleLogoClick = (event) => {
    event.preventDefault();

    onGoBack();
  };

  console.log("ModifyPet -> render");

  return (
    <div className="p-4">
      <Header onClick={handleLogoClick} />

      <div className="flex justify-between">
        <h2 className="font-bold text-teal-700 tracking-widest uppercase">
          Modify Pet
        </h2>

        <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
      </div>

      {pet ? (
        <Form onSubmit={handleModifyPetSubmit}>
          <Field alias="name" type="text" defaultValue={pet.name}>
            Name
          </Field>

          <Field alias="birthdate" type="date" defaultValue={pet.birthdate}>
            Birthdate
          </Field>

          <Field
            alias="weight"
            type="number"
            defaultValue={pet.weight}
            step="0.1"
          >
            Weight (kg)
          </Field>

          <Field alias="image" type="url" defaultValue={pet.image}>
            Image
          </Field>

          <Button
            className="w-36 bg-teal-500 text-white p-2 hover:bg-teal-600 hover:font-bold mb-8 self-center mt-4"
            type="submit"
          >
            Modify Pet
          </Button>
        </Form>
      ) : (
        <Spinner />
      )}

      {feedback && <Feedback feedback={feedback} />}
    </div>
  );
}
