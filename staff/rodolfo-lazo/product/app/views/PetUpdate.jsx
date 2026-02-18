import { useState, useEffect } from "react";

import { Form } from "./components/commons/Form";
import { Field } from "./components/commons/Field";
import { Button } from "./components/commons/Button";
import { Anchor } from "./components/commons/Anchor";
import { Feedback } from "./components/commons/Feedback";

import { logic } from "../logic";

export function PetUpdate({ onGoToHome, petId }) {
  console.log("PetUpdate -> call");

  const [feedback, setFeedback] = useState(null); // { message, level }
  const [pet, setPet] = useState(null);

  useEffect(() => {
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
  }, []);

  const handleChangePetSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const birthdate = form.birthdate.value;
    const weight = Number(form.weight.value);
    const image = form.image.value;

    const clearForm = () => {
      form.name.value = "";
      form.birthdate.value = "";
      form.weight.value = "";
      form.image.value = "";
    };

    try {
      logic
        .updatePet(petId, name, birthdate, weight, image)
        .then(() => {
          debugger;
          //clearForm();
          setFeedback({
            message: "pet successfully updated",
            level: "success",
          });
        })
        .catch((error) =>
          setFeedback({ message: error.message, level: "error" }),
        );
    } catch (error) {
      setFeedback({ message: error.message, level: "error" });
    }
  };

  const handleBackClick = (event) => {
    event.preventDefault();

    onGoToHome();
  };
  return (
    <div className="flex flex-col gap-4 p-3">
      <h1 className="font-bold text-xl">MyPet</h1>

      <div className="flex justify-between">
        <h2 className="font-bold">Update Pet</h2>

        <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
      </div>
      <Form onSubmit={handleChangePetSubmit}>
        <Field alias="name" type="text" defaultValue={pet && pet.name}>
          Name
        </Field>
        <Field
          alias="birthdate"
          type="date"
          defaultValue={pet && pet.birthdate}
        >
          Birthdate
        </Field>

        <Field alias="weight" type="number" defaultValue={pet && pet.weight}>
          Weight (kg)
        </Field>

        <Field alias="image" type="url" defaultValue={pet && pet.image}>
          Image
        </Field>
        <Button className="self-center mt-4" type="submit">
          Update Pet
        </Button>
      </Form>
      {feedback && <Feedback feedback={feedback} />}
    </div>
  );
}
