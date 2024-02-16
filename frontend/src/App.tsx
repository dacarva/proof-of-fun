import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/landing/Home";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<></>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
