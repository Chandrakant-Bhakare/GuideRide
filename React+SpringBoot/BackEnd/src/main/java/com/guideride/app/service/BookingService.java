package com.guideride.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guideride.app.dto.PaymentDetailsResponse;
import com.guideride.app.model.Booking;
import com.guideride.app.model.Car;
import com.guideride.app.model.Customer;
import com.guideride.app.model.Guide;
import com.guideride.app.model.Trip;
import com.guideride.app.repository.BookingRepository;
import com.guideride.app.repository.CarRepository;
import com.guideride.app.repository.CustomerRepository;
import com.guideride.app.repository.GuideRepository;
import com.guideride.app.repository.TripRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private GuideRepository guideRepository;
    
    @Autowired
    private TripRepository tripRepository;

    public Booking saveBooking(Booking booking) {
        Customer customer = customerRepository.findById(booking.getCustomer().getCustId())
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        Car car = carRepository.findById(booking.getCar().getCarId())
            .orElseThrow(() -> new RuntimeException("Car not found"));
        Guide guide = guideRepository.findById(booking.getGuide().getId())
            .orElseThrow(() -> new RuntimeException("Guide not found"));
        Trip trip = tripRepository.findById(booking.getTrip().getId())
            .orElseThrow(() -> new RuntimeException("Trip not found"));

        booking.setCustomer(customer);
        booking.setCar(car);
        booking.setGuide(guide);
        booking.setTrip(trip);

        return bookingRepository.save(booking);
    }
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByCustomerId(int custId) {
        return bookingRepository.findAllByCustomerCustId(custId);
    }

    public List<Booking> getBookingsByGuideId(Long guideId) {
        return bookingRepository.findAllByGuideId(guideId);
    }

    public List<Booking> getBookingsByCarId(Long carId) {
        return bookingRepository.findAllByCarCarId(carId);
    }

    public List<Booking> getBookingsByTripId(Long tripId) {
        return bookingRepository.findAllByTripId(tripId);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
    
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
/*
    public double calculateTotalPayment(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            double carFair = (booking.getCar() != null) ? booking.getCar().getCarFair() : 0.0;
            double guideFair = (booking.getGuide() != null) ? booking.getGuide().getGuideFair() : 0.0;
            double tripFair = (booking.getTrip() != null) ? booking.getTrip().getTripFair() : 0.0;
            return carFair + guideFair + tripFair;
        }
        return 0.0;
    }
    */
    
    public PaymentDetailsResponse calculateTotalPayment(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            
            // Calculate individual fairs
            double carFair = (booking.getCar() != null) ? booking.getCar().getCarFair() : 0.0;
            double guideFair = (booking.getGuide() != null) ? booking.getGuide().getGuideFair() : 0.0;
            double tripFair = (booking.getTrip() != null) ? booking.getTrip().getTripFair() : 0.0;
            
            // Calculate total fair
            double totalFair = carFair + guideFair + tripFair;

            // Create and return the response object
            return new PaymentDetailsResponse(carFair, guideFair, tripFair, totalFair);
        }
        
        // Return response with default values if booking not found
        return new PaymentDetailsResponse(0.0, 0.0, 0.0, 0.0);
    }


}
