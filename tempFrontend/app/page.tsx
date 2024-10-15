import  HeroSection16  from './components/landing/Hero'
import NavbarDefault from './components/landing/Navbar'
import Footer16 from './components/landing/Footer'
import TeamCard from './components/landing/TeamCard'
import FeaturesSection from './components/landing/Features'
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
