import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";
import Cats from "./pages/Cats";
import Cat from "./pages/Cat";
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/cats" replace />} />
          <Route index path="/cats" element={<Cats />} />
          <Route path="/cats/:catId" element={<Cat />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
