import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Todo from "./mainFeatures/Todo";
import Timer from "./mainFeatures/Timer";
import Journal from "./mainFeatures/Journal";
import Features from "./pages/Features";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
