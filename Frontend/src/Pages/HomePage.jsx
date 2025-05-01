
import { Container } from "react-bootstrap";
import AboutUs from "./AboutUs";
import HeroSection from "./Hero";

import Footer from "./Footer";
import Contact from "./Contact";



const HomePage = () => {
    return (
      <>
      
        <Container fluid className="p-0 mt-5"> 
          <HeroSection />
         <AboutUs></AboutUs>
         <Contact></Contact>
        <Footer></Footer>
         
        </Container> 
      </>
    );
};

export default HomePage;
