import "./Header.css";
import { siteTitle } from "../../../content/header.js";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">{siteTitle}</h1>
      </div>
    </header>
  );
}

export default Header;
