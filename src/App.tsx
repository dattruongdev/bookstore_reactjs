import "./App.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
