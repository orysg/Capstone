import Image from "next/image";
import  HeroSection16  from './components/Hero'
import NavbarDefault from './components/Navbar'
import Footer16 from './components/Footer'
import TeamCard from './components/TeamCard'
import FeaturesSection from './components/Features'
export default function Home() {
  return (
    <div>
      <NavbarDefault />
      <HeroSection16 />
      <FeaturesSection />
      <TeamCard />
      <Footer16 />
    </div>
  );
}
