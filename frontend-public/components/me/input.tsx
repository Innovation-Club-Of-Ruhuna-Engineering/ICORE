export const InputWithLabal = ({
  id, label, type = "text", placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) => {
  return (
    <div className="flex flex-col justify-between">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder || label}
        className="mt-4 w-full outline outline-black/20 hover:outline-sky-300 focus:outline-sky-400 focus:outline-2 rounded-md p-2 placeholder-gray-500/90" />
    </div>
  );
};
