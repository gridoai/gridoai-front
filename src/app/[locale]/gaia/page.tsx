import GaiaHero from "./Hero";
import { CTA } from "./cta";
import { Features } from "./features";
import { GaiaNavbar } from "./navbar";

const GaiaLandingPage = () => {
  return (
    <>
      <GaiaNavbar />
      <GaiaHero />
      <Features />
      <CTA />
    </>
  );
};
export default GaiaLandingPage;
