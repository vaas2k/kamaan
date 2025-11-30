import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Team";
import Quality from "@/components/Quality";
import Services from "@/components/Services";
import Testimonials from "@/components/Testmonials";
import Footer from "@/components/Footer";
import Image from "next/image";
import Team from "@/components/Team";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>
      
      {/* Services Section */}
      <section id="services">
        <Services />
      </section>
      
      {/* Quality Section */}
      <section id="about">
        <Quality />
      </section>
      
      {/* Team Section */}
      <section id="team">
        <Team />
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>

    </div>
  );
} 