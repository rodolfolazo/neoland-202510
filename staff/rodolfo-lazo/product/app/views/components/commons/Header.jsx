export function Header({ className, onClick }) {
  return (
    <section
      className={`h-[40px] flex flex-row justify-start gap-4 w-[100%] mb-8 ${className}`}
    >
      <img
        src="/images/mypet.png"
        alt="MyPet Logo"
        className="w-10 h-10 cursor-pointer"
        onClick={onClick}
      />
      <h1 className="font-bold text-3xl">MyPet</h1>
      <p className="text-2xl font-semibold ml-auto">
        <span className="cursor-pointer">⚙️</span>ES
      </p>
    </section>
  );
}
