import Hero from "@/components/Hero";
import Intropage from "@/components/Intropage";
import Privacy from "@/components/privacy";
import Carstype from "@/components/Carstype";
import Choosecars from "@/components/Choosecars";
import History from "@/components/History";
import LastInfoPage from "@/components/Lastinfopage";
import CarsLogo from "@/components/CarsLogo";

const Home = () => {
  return (
    <div className="sm:flex sm:flex-col h-fit pt-32 w-fit lg:overflow-x-hidden xs:overflow-x-auto">
      <Hero />
      <Intropage />
      <Carstype />
      <Choosecars />
      <History />
      <Privacy />
      <CarsLogo />
      <LastInfoPage />
    </div>
  );
};

export default Home;
