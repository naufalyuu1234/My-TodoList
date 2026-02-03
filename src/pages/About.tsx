import AboutHero from "../component/about/AboutHero";
import AboutPurpose from "../component/about/AboutPurpose";
import AboutFeatures from "../component/about/AboutFeatures";
import AboutHowItWorks from "../component/about/AboutHowItWorks";
import AboutCTA from "../component/about/AboutCTA";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="container mx-auto max-w-5xl space-y-8">
        <AboutHero />
        <AboutPurpose />
        <AboutFeatures />
        <AboutHowItWorks />
        <AboutCTA />
      </div>
    </div>
  );
}
