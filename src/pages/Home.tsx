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
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-10">
        <FeaturesCard textA={"Featured"} textB={"Books"} id="featured" />
        <FeaturesCard textA={"New"} textB={"Release"} id="new-release" />
        <FeaturesCard textA={"Week"} textB={"Deals"} id="week-deals" />
        <FeaturesCard textA={"Reader's"} textB={"Pick"} id="readers-pick" />
      </div>

      <FeaturedBooks />
      <ReadersPick />
      <TopFeedbacks />
      <WeekDeals />
      {/* <FavAuthors /> */}
      <NewRelease />
      {/* <Milestones /> */}
      <FAQ />
    </div>
  );
}
