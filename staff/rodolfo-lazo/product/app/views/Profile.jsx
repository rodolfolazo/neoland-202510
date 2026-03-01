import { useState } from "react";

import { Header } from "./components/commons/Header";
import { Anchor } from "./components/commons/Anchor";
import { ChangeUserEmail } from "./components/ChangeUserEmail";
import { ChangeUserPassword } from "./components/ChangeUserPassword";
import { ChangeUserImage } from "./components/ChangeUserImage";

export function Profile({ onGoToHome }) {
  console.log("Profile -> call");

  const [view, setView] = useState(null);

  const handleBackClick = (event) => {
    event.preventDefault();

    onGoToHome();
  };

  const handleChangeEmailClick = (event) => {
    event.preventDefault();

    setView("change-email");
  };

  const handlePasswordClick = (event) => {
    event.preventDefault();

    setView("change-password");
  };

  const handleImageClick = (event) => {
    event.preventDefault();

    setView("change-image");
  };

  const handleLogoClick = (event) => {
    event.preventDefault();

    onGoToHome();
  };

  console.log("Profile -> render");

  return (
    <div className="p-4">
      <Header onClick={handleLogoClick} />

      <div className="flex justify-between mb-6">
        <h2 className="font-bold text-teal-700 tracking-widest uppercase">
          Profile
        </h2>

        <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
      </div>

      <ul className="mb-6">
        <li>
          <Anchor onClick={handleChangeEmailClick}>Change e-mail</Anchor>
        </li>
        <li>
          <Anchor onClick={handlePasswordClick}>Change password</Anchor>
        </li>
        <li>
          <Anchor onClick={handleImageClick}>Change image</Anchor>
        </li>
      </ul>

      {view === "change-email" && <ChangeUserEmail />}

      {view === "change-password" && <ChangeUserPassword />}

      {view === "change-image" && <ChangeUserImage />}
    </div>
  );
}
