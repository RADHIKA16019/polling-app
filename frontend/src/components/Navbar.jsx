import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="
            max-w-7xl
            mx-auto
            mt-5
            border-2
            border-black
            bg-white
            px-8
            py-4
            flex
            justify-between
            items-center
            "
    >
      <Link to="/" className="font-black text-xl">
        POLLX
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/login">
          <button
            className="
                        border-2
                        border-black
                        px-5
                        py-2
                        font-semibold
                        "
          >
            LOG IN
          </button>
        </Link>

        <Link to="/signup">
          <button
            className="
                        bg-yellow-300
                        border-2
                        border-black
                        px-5
                        py-2
                        font-bold
                        "
          >
            SIGN UP FREE
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
