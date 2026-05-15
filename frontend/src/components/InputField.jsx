function InputField({ type, placeholder, name, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="
            w-full
            border-2
            border-black
            p-3
            outline-none
            bg-white
            "
    />
  );
}

export default InputField;
