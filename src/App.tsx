import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import About from "./pages/Features";
import Home from "./pages/Home";
import Todo from "./mainFeatures/Todo";
import Timer from "./mainFeatures/Timer";
import Journal from "./mainFeatures/Journal";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
