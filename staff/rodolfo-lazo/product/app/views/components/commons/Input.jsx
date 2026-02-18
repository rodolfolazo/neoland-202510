export function Input({ alias, autoComplete, type, className, ...props }) {
  return (
    <input
      id={alias}
      name={alias}
      autoComplete={autoComplete || alias}
      type={type}
      className={`border px-1 ${className}`}
      {...props}
    />
  );
}
