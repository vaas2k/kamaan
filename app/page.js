import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Project";
import Quality from "@/components/Quality";
import Services from "@/components/Services";
import Testimonials from "@/components/Testmonials";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <Hero />
      <Services />
      <Quality />
      <Projects />
      <Testimonials/>
      {/* <Footer /> */}
    </div>
  );
}
