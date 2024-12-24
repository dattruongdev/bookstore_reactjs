import "./App.css";
import FeaturedBooks from "./components/FeaturedBooks";
import FeaturesCard from "./components/FeaturesCard";
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import Searches from "./components/Searches";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Searches />
      <div className="mt-10 grid grid-cols-6 justify-items-center">
        <FeaturesCard textA={"Best"} textB={"Seller"} />
        <FeaturesCard textA={"New"} textB={"Release"} />
        <FeaturesCard textA={"Coming"} textB={"Soon"} />
        <FeaturesCard textA={"Audio"} textB={"Book"} />
        <FeaturesCard textA={"E-Books"} textB={""} />
        <FeaturesCard textA={"Sales"} textB={""} />
      </div>

      <FeaturedBooks />
    </>
  );
}

export default App;
