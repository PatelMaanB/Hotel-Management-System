import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import Navbar from './components/navbar';
import Footer from './components/footer';
import BookingForm from './components/bookingform';
import Billing from './components/billing';

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/bookingform" element={<BookingForm />} /> 
                <Route path="/billing" element={<Billing />} />
            </Routes>
        </Router>
      <Footer/>
    </div>
  );
}

export default App;
