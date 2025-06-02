import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="../../../public/images/logo.svg" alt="logo" />
    </Link>
  );
}

export default Logo;
