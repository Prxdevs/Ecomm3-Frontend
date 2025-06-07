import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './Pages/Home';
import About from './Pages/About';
import ProductDetails from './Pages/ProductDetails/index.js';
import Collection from './Pages/Collection/index.js';
import Footer from './components/footer';
import TermsAndCondition from './Pages/TermsAndCondition.js';
import Refund from './Pages/Refund.js';
import Privacy from './Pages/Privacy.js';
import FilteredProducts from './Pages/filteredProducts.js';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login.js';
import Otp from './Pages/Otp.js';
import Profile from './Pages/Profile.js';
import Testing from './Pages/Testing.js';

function App() {
  return (
    <Router>
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/products/:categoryName" element={<FilteredProducts />} />
        <Route path="/about" element={<About />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
