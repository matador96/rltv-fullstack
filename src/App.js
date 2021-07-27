import "./view/style.scss";
import Navbar from "./components/Navbar";
import NavbarSecond from "./components/NavbarSecond";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import CookieRule from "./components/CookieRule";

const App = (props) => (
  <div className="app night">
    <Navbar />
    {props.children}
    <AboutUs />
    <Footer />
    <CookieRule/>
  </div>
);

export default App;
