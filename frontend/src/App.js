import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import Detail from "./Components/Detail/Detail";
import LandingPage from "./Components/LandingPage/LandinPage";
import Create from "./Components/Create/Create";
import Profile from "./Components/Profile/Profile";
import About from "./Components/About/About";
import Favorite from "./Components/Favorite/Favorite";
import Shop from "./Components/Shop/Shop";
import Data from "./Components/Profile/Extras/Data";
import Cards from "./Components/Profile/Extras/Cards";
import Adress from "./Components/Profile/Extras/Adress";
import Ask from "./Components/Profile/Extras/Ask";
import Mailer from "./Components/Mailer/mailer"
import PaymentCreate from "./Components/PayMents/PaymentCreate/PaymentCreate"
import CheckoutSuccess from "./Components/PayMents/CheckoutSuccess/CheckoutSuccess"

function App() {
  return (
    <div className="App">
      <NavBar path="/" element={NavBar} />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="about" element={<About />} />
        <Route exact path="home" element={<Home />} />
        <Route exact path="products/:id" element={<Detail />} />
        <Route exact path="products/:id/payment" element={<PaymentCreate />} />
        <Route exact path="products/:id/checkout" element={<CheckoutSuccess />} />
        <Route exact path="products/contact" element={<Mailer />} />
        <Route path="new" element={<Create />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/data" element={<Data />} />
        <Route path="profile/cards" element={<Cards />} />
        <Route path="profile/favorite" element={<Favorite />} />
        <Route path="profile/adress" element={<Adress />} />
        <Route path="profile/ask" element={<Ask />} />
        <Route path="shop" element={<Shop />} />
        <Route path="newproduct" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
