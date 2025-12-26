import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Mechanical from "./Pages/Mechanical";
import Embedded from "./Pages/Embedded";
import Careers from "./Pages/Careers";
import Contact from "./Pages/Contact";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mechanical" element={<Mechanical />} />
        <Route path="/embedded" element={<Embedded />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
