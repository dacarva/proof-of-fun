import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/landing/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
