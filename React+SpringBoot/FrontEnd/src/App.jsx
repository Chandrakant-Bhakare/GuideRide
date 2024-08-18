import React from 'react';
import Navbar from '../Componants/Navbar';
import Login from '../Componants/Login';
import Register from '../Componants/Register';
import Profile from '../Pages/UserProfile';
import Cars from '../Pages/Cars';
import Guides from '../Pages/Guides';
import TripForm from '../Pages/TripForm';
import GuideAdmin from '../Pages/GuideAdmin';
import CarsController from '../Pages/CarsAdmin';
import UserController from '../Pages/UserAdmin';
import Booking from '../Pages/Booking';
import TripPage from '../Pages/TripPage';
import BookingController from '../Pages/BookingAdmin';
import Temp from '../Pages/Temp';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../Service/TheProvider';  // Context provider
import ProtectedRoute from '../Service/ProtectedRoutes'; // Protected 
import UserProfile from '../Pages/UserProfile';
import AboutUs from '../Pages/AboutUs';
function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Temp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/BookCar" element={<ProtectedRoute element={Cars} allowedRoles={['CUSTOMER']} />} />
        <Route path="/BookGuide" element={<ProtectedRoute element={Guides} allowedRoles={['CUSTOMER']} />} />
        <Route path="/BookTrip" element={<ProtectedRoute element={TripForm} allowedRoles={['CUSTOMER']} />} />
        <Route path="/UserProfile" element={<ProtectedRoute element={UserProfile} allowedRoles={['CUSTOMER']} />} />
        <Route path="/UserBooking" element={<ProtectedRoute element={Booking} allowedRoles={['CUSTOMER']} />} />
        {/* Admin Routes */}
        <Route path="/userController" element={<ProtectedRoute element={UserController} allowedRoles={['ADMIN']} />} />
        <Route path="/GuideAdmin" element={<ProtectedRoute element={GuideAdmin} allowedRoles={['ADMIN']} />} />
        <Route path="/CarAdmin" element={<ProtectedRoute element={CarsController} allowedRoles={['ADMIN']} />} />
       
        <Route path="/TripAdmin" element={<ProtectedRoute element={TripPage} allowedRoles={['ADMIN']} />} />
        <Route path="/BookingAdmin" element={<ProtectedRoute element={BookingController} allowedRoles={['ADMIN']} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
