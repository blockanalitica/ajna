import { useId } from "react";

const Checkbox = ({ label, onChange, checked }) => {
  const id = useId();
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className="w-4 h-4 cursor-pointer"
        onChange={(e) => onChange(e.target.checked)}
      />

      <label htmlFor={id} className="ms-2 text-sm cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
