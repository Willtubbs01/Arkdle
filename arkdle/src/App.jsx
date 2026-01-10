import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage.jsx";

// placeholders for now
function DinoPage() { return <div style={{ color: "white" }}>Dino Page</div>; }
function NpcPage() { return <div style={{ color: "white" }}>NPC Quote Page</div>; }
function MapPage() { return <div style={{ color: "white" }}>Map Page</div>; }

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dino" element={<DinoPage />} />
        <Route path="/npc" element={<NpcPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
