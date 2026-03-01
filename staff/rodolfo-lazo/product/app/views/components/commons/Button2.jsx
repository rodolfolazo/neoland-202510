export function Button2({ children, type, className, onClick, id, ...props }) {
  return (
    <button
      id={id}
      className={`cursor-pointer border-1 border-teal-400 shadow-md rounded-lg px-6 py-3 text-base ${className}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
