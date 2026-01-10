import { NavLink, Outlet } from "react-router-dom";
import "./css/style.css";

import gearIcon from "./assets/icons/gear.svg";
import globeIcon from "./assets/icons/globe.svg";

export default function Layout() {
  return (
    <div className="app">
      <header>
        <div className="headers-holder">
          <button className="header-option" type="button" title="Settings" onClick={() => {}}>
            <img src={gearIcon} alt="Settings" />
          </button>

          <NavLink to="/" className="home-button">
            ARKDLE
          </NavLink>

          <button className="header-option" type="button" title="Language" onClick={() => {}}>
            <img src={globeIcon} alt="Language" />
          </button>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
