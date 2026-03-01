export function Input({
  alias,
  autoComplete,
  type,
  className,
  defaultValue,
  step,
}) {
  return (
    <input
      id={alias}
      name={alias}
      autoComplete={autoComplete || alias}
      type={type}
      className={`border p-2 focus:bg-teal-100 focus:border-teal-700 focus:boder-1 border-teal-400 rounded-lg mt-3 ${className}`}
      defaultValue={defaultValue}
      step={step}
    />
  );
}
