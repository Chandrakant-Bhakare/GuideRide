import React from 'react';
import '../CssFiles/AboutUs.css';
const AboutUs = () => {
  return (
    <div className="about-us">
    <div className="about-section">
      <h2>About Grand Celebrations</h2>
      <p>Welcome to Grand Celebrations, your premier party planning service. We specialize in creating unforgettable events tailored to your vision. Whether it's a wedding, corporate event, or birthday party, we bring your ideas to life with creativity and precision.</p>
    </div>
    <div style={{display:"flex", alignItems:"center"}} className="mission-vision-section">
        <div className="mission-vision-content">
          <h2 style={{textAlign:"left"}} >Mission</h2>
          <p>Our mission is to deliver exceptional events that exceed expectations, focusing on personalized service and attention to detail.</p> 
           </div>
           </div>
           <div className="vision-section">
        <h2 style={{textAlign:"left"}}   > Vision</h2>
        <p>Our future vision is to expand our services globally, setting new standards in the event planning industry. We aim to innovate and provide extraordinary experiences that leave lasting impressions.</p>
      </div>
      
      
           </div>
           
  );
}

export default AboutUs;




  {/* return (
  
      
      
      
          
  )
  }
export default AboutUs; */}
