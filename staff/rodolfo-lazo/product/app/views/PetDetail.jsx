import { useState, useEffect } from "react";

import { useParams } from "react-router";

import { Header } from "./components/commons/Header";
import { Anchor } from "./components/commons/Anchor";
import { Feedback } from "./components/commons/Feedback";
import { Button } from "./components/commons/Button";

import { logic } from "../logic";

export function PetDetail({ onGoToHome, onGoToModifyPet }) {
  console.log("PetDetail -> call");

  const [feedback, setFeedback] = useState(null);
  const [pet, setPet] = useState(null);

  const { petId } = useParams();

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

  const handleBackClick = (event) => {
    event.preventDefault();

    onGoToHome();
  };

  const handleGoToModifyPet = () => onGoToModifyPet(petId);

  const handleLogoClick = (event) => {
    event.preventDefault();

    onGoToHome();
  };

  console.log("PetDetail -> render");

  return (
    <div className="p-4">
      <Header onClick={handleLogoClick} />
      <div className="flex justify-between mb-8">
        <h2 className="font-bold text-teal-700 tracking-widest uppercase">
          Pet Detail
        </h2>

        <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
      </div>

      {pet && (
        <div className="flex flex-col items-center gap-4 border-1 border-teal-500 rounded-2xl p-8 bg-orange-50 lg:w-2/12 mx-auto">
          <img
            src={pet.image}
            className="rounded-full w-40 h-40 object-cover"
          />

          <p className="italic text-teal-800 text-xl">{pet.name}</p>

          <p className="italic text-teal-800 text-xl">{pet.weight}kg</p>

          <p className="italic text-teal-800 text-xl">{pet.birthdate}</p>

          <Button
            className="w-36 bg-teal-500 text-white p-2 hover:bg-teal-600 hover:font-bold mb-8"
            onClick={handleGoToModifyPet}
          >
            Modify
          </Button>
        </div>
      )}

      {feedback && <Feedback feedback={feedback} />}
    </div>
  );
}
