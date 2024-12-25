import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import FavAuthors from "../components/FavAuthors";
import FeaturedBooks from "../components/FeaturedBooks";
import FeaturesCard from "../components/FeaturesCard";
import Hero from "../components/Hero";
import Milestones from "../components/Milestones";
import NewRelease from "../components/NewRelease";
import ReadersPick from "../components/ReadersPick";
import Searches from "../components/Searches";
import TopFeedbacks from "../components/TopFeedbacks";
import WeekDeals from "../components/WeekDeals";

export default function Home() {
  return (
    <div>
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
      <ReadersPick />
      <TopFeedbacks />
      <WeekDeals />
      <FavAuthors />
      <NewRelease />
      <Milestones />
      <FAQ />
    </div>
  );
}
