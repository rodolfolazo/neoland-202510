import { Header } from "./components/commons/Header";
import { Button2 } from "./components/commons/Button2";

export function Landing({ onGoToLogin, onGoToRegister }) {
  console.log("Landing -> call");

  const handleLoginClick = (event) => {
    event.preventDefault();

    onGoToLogin();
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();

    onGoToRegister();
  };

  console.log("Landing -> render");

  return (
    <div className="flex flex-col items-center bg-orange-50 relative gap-8 h-screen p-4">
      <Header />
      <section className="flex flex-col items-center gap-8 text-center">
        <div
          class="w-80 h-100 rounded-xl shadow-lg
                      bg-[#cbd9e6]
                      bg-[url('../images/landingimage.png')]
                      bg-cover bg-center
                      bg-blend-multiply hover:scale-105"
        ></div>
        <h2 class="text-3xl font-bold tracking-widest font-serif mb-16">
          Tu veterinara de <span className="text-emerald-500">confianza</span>
        </h2>
      </section>

      <section class="flex flex-col items-center gap-4 lg:mt-auto mb-12">
        <Button2
          onClick={handleLoginClick}
          className="w-56 font-bold hover:border-2 hover:border-teal-500"
        >
          Login
        </Button2>
        <Button2
          onClick={handleRegisterClick}
          className="w-56 bg-teal-500 text-white hover:bg-teal-600 hover:font-bold"
        >
          Register
        </Button2>
      </section>
    </div>
  );
}
