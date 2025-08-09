import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import FeatureRow from "../components/FeatureRow";
import CategoryStrip from "../components/CategoryStrip";
import AboutSection from "../components/AboutSection";
import SiteFooter from "../components/SiteFooter";

export default function HomePage(){
  return (
    <>
      <TopBars />
      <NavBar />
      <Hero />
      <FeatureRow />
      <CategoryStrip />
      <AboutSection />
      <SiteFooter />
    </>
  );
}
