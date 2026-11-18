import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Photos from "@/components/Photos";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import ProjectList from "@/components/ProjectList";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <main>
      <Cursor />
      <SmoothScroll />
      <Loader />
      <Navbar />

      <div
        id="page-content"
        className="relative z-10 mb-[100vh] rounded-b-[2.5rem] bg-background md:rounded-b-[5rem]"
      >
        <Hero />
        <About />
        <Photos />
        <Services />
        <Skills />
        <div id="projects">
          <ProjectList />
        </div>
        <Achievements />
        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}