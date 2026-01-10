import { NavLink } from "react-router-dom";
import "../css/HomePage.css";

export default function HomePage() {
  return (
    <div className="home-center">
      <div className="tab-holders-main">
        <nav>
          <NavLink to="/dino" className="home-main-link">
            Dino
          </NavLink>

          <NavLink to="/npc" className="home-main-link">
            NPC Quote
          </NavLink>

          <NavLink to="/map" className="home-main-link">
            Which Map
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
