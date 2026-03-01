export function Form({ children, onSubmit }) {
  return (
    <form className="flex flex-col gap-2 lg:w-6/12 mx-auto" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
