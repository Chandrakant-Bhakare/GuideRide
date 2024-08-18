import React from 'react';
import { Link } from 'react-router-dom';
import '../CssFiles/Temp.css'; // Import your CSS file for styling
import service1 from '../Assets/Assests/Service1.webp';
import guide1 from '../Assets/Assests/Guide1.jpeg';
import custom12 from '../Assets/Assests/Custom12.jpg';
import suv from '../Assets/Assests/SUV.jpg';
import sedan from '../Assets/Assests/Seaden.jpg';
import convertible from '../Assets/Assests/Car4.jpeg';
import destination1 from '../Assets/Assests/destination1.jpg';
import destination2 from '../Assets/Assests/destination2.jpeg';
import destination3 from '../Assets/Assests/destination3.jpeg';

const Temp = () => {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Explore with Ease: Rent a Car & a Guide</h1>
          <p>Your adventure starts with the perfect ride and the best guide.</p>
          <Link to="/BookTrip" className="button-link">Book Your Ride!</Link>
          <button className="cta-secondary">Explore Fleet</button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service">
            <img src={service1} alt="Car Rental" />
            <h3>Car Rental</h3>
            <p>Choose from a variety of vehicles for your travel needs.</p>
          </div>
          <div className="service">
            <img src={guide1} alt="Guide Hiring" />
            <h3>Guide Hiring</h3>
            <p>Hire an experienced guide to make the most of your journey.</p>
          </div>
          <div className="service">
            <img src={custom12} alt="Custom Tours" />
            <h3>Custom Tours</h3>
            <p>Personalize your trip with custom tour packages.</p>
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section id="fleet" className="fleet-section">
        <h2>Our Fleet</h2>
        <div className="fleet-container">
          <div className="car">
            <img src={suv} alt="SUV" />
            <h3>SUV</h3>
            <p>Comfortable and spacious for long journeys.</p>
          </div>
          <div className="car">
            <img src={sedan} alt="Sedan" />
            <h3>Sedan</h3>
            <p>Perfect for city drives and short trips.</p>
          </div>
          <div className="car">
            <img src={convertible} alt="Convertible" />
            <h3>Convertible</h3>
            <p>Enjoy the wind in your hair on scenic routes.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Reliable Vehicles</h3>
            <p>Our fleet is regularly maintained for your safety.</p>
          </div>
          <div className="feature">
            <h3>Expert Guides</h3>
            <p>Our guides are knowledgeable and experienced.</p>
          </div>
          <div className="feature">
            <h3>24/7 Support</h3>
            <p>We're here to assist you anytime, anywhere.</p>
          </div>
          <div className="feature">
            <h3>Affordable Pricing</h3>
            <p>Get the best value for your money with our services.</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destinations-container">
          <div className="destination">
            <img src={destination1} alt="City Tours" />
            <h3>City Tours</h3>
          </div>
          <div className="destination">
            <img src={destination2} alt="Mountain Adventures" />
            <h3>Mountain Adventures</h3>
          </div>
          <div className="destination">
            <img src={destination3} alt="Beach Escapes" />
            <h3>Beach Escapes</h3>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="cta-banner">
        <h2>Join GuideRide for Exclusive Offers!</h2>
        <button className="cta-primary">Sign Up Now</button>
      </section>
    </div>
  );
};

export default Temp;
