function AuthCard({ children, title, subtitle }) {
  return (
    <div
      className="
            bg-white
            border-4
            border-black
            p-10
            w-[400px]
            shadow-[8px_8px_0px_black]
            "
    >
      <h1 className="text-3xl font-black mb-2">{title}</h1>

      <p className="text-sm mb-8">{subtitle}</p>

      {children}
    </div>
  );
}

export default AuthCard;
