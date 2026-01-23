import Hero from "@/components/mainPage/Hero/Hero";
import RoadMap from "@/components/mainPage/RoadMap/RoadMap";
import Products from "@/components/mainPage/Products/Products";
import Calculator from "@/components/mainPage/Calculator/Calculator";
import About from "@/components/mainPage/About/About";
import Contacts from "@/components/mainPage/Contacts/Contacts";


export default function Home() {
  return (
    <>
    <Hero/>
    <RoadMap/>
    <Products/>
    <Calculator/>
    <About/>
    <Contacts/>
    </>
  );
}
