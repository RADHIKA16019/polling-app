function Button({ text, type }) {
  return (
    <button
      type={type}
      className="
            w-full
            bg-yellow-300
            border-2
            border-black
            py-3
            font-bold
            hover:translate-x-[2px]
            hover:translate-y-[2px]
            transition-all
            cursor-pointer
            "
    >
      {text}
    </button>
  );
}

export default Button;
