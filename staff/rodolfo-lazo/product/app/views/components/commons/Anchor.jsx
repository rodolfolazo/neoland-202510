export function Anchor({ children, className, onClick }) {
  return (
    <a
      className={`hover:text-teal-700 cursor-pointer underline text-base text-teal-400 font-black ${className}`}
      href=""
      onClick={onClick}
    >
      {children}
    </a>
  );
}
