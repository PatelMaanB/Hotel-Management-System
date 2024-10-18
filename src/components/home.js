import React from 'react';
import BootstrapCarousel from './carousel';
import Taj from '../photos/Taj-Palace-Hotel-in-new-delhi.jpg';
import img2 from '../photos/img2.jpeg';
import img3 from '../photos/img3.jpg';
import '../style/home.css'; 


const Home = () => {
    return (
        <div className="home">
            <BootstrapCarousel images={[Taj, img2, img3]} />
            <div className="hotel-details">
                <div className='home-heading'>
                    <h1>Taj Palace Hotel</h1>
                    <p >
                        Welcome to the Taj Palace Hotel, where luxury meets comfort. 
                        Located in the heart of New Delhi, our hotel offers a serene escape 
                        with stunning views and world-class amenities.
                    </p>
                </div>  
                <div className='home-fac'>  
                    <h2>Amenities</h2>
                    <ul>
                        <li>Free Wi-Fi</li>
                        <li>24/7 Room Service</li>
                        <li>Swimming Pool</li>
                        <li>Spa and Wellness Center</li>
                        <li>Fitness Center</li>
                        <li>Fine Dining Restaurants</li>
                        <li>Conference and Event Facilities</li>
                    </ul>
                </div>
                <div className='home-contact'>
                    <h2>Contact Us</h2>
                    <p>
                        Phone: +91 11 2301 6123<br />
                        Email: info@tajpalace.com<br />
                        Address: Sardar Patel Marg, Diplomatic Enclave, New Delhi, Delhi 110021
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
