import { useState, useEffect } from "react";

import { Form } from "./components/commons/Form";
import { Field } from "./components/commons/Field";
import { Button } from "./components/commons/Button";
import { Anchor } from "./components/commons/Anchor";
import { Feedback } from "./components/commons/Feedback";

import { logic } from "../logic";

export function PetUpdate({ onGoToHome, petId }) {
  console.log("PetUpdate1 -> call");

  const [feedback, setFeedback] = useState(null); // { message, level }
  const [pet, setPet] = useState(null);
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    weight: "",
    image: "",
  });

  useEffect(() => {
    try {
      logic
        .getPet(petId)
        .then((pet) => {
          setPet(pet);
          setForm({
            name: pet.name,
            birthdate: pet.birthdate,
            weight: pet.weight,
            image: pet.image,
          });
        })
        .catch((error) =>
          setFeedback({ message: error.message, level: "error" }),
        );
    } catch (error) {
      setFeedback({ message: error.message, level: "error" });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePetSubmit = (event) => {
    event.preventDefault();

    const { name, birthdate, weight, image } = formData;

    try {
      logic
        .updatePet(petId, name, birthdate, Number(weight), image)
        .then(() => {
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
        <Field
          alias="name"
          type="text"
          value={pet?.name}
          onChange={handleChange}
        >
          Name
        </Field>
        <Field
          alias="birthdate"
          type="date"
          value={pet?.birthdate}
          onChange={handleChange}
        >
          Birthdate
        </Field>

        <Field
          alias="weight"
          type="number"
          value={pet?.weight}
          onChange={handleChange}
        >
          Weight (kg)
        </Field>

        <Field
          alias="image"
          type="url"
          value={pet?.image}
          onChange={handleChange}
        >
          Image
        </Field>
        <Button className="self-center mt-4" type="submit">
          Update Pet
        </Button>
      </Form>
      {feedback && <Feedback feedback={feedback} />}
    </div>
  );

  //Final
}
