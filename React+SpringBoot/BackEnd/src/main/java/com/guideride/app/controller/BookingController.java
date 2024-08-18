package com.guideride.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.guideride.app.dto.PaymentDetailsResponse;
import com.guideride.app.model.Booking;
import com.guideride.app.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.saveBooking(booking);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }
    
    @GetMapping("/")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable("bookingId") Long id) {
        Booking booking = bookingService.getBookingById(id);
        if (booking != null) {
            return new ResponseEntity<>(booking, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/customer/{custId}")
    public ResponseEntity<List<Booking>> getBookingsByCustomerId(@PathVariable("custId") int custId) {
        List<Booking> bookings = bookingService.getBookingsByCustomerId(custId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/guide/{guideId}")
    public ResponseEntity<List<Booking>> getBookingsByGuideId(@PathVariable("guideId") Long guideId) {
        List<Booking> bookings = bookingService.getBookingsByGuideId(guideId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<List<Booking>> getBookingsByCarId(@PathVariable("carId") Long carId) {
        List<Booking> bookings = bookingService.getBookingsByCarId(carId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
    
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<Booking>> getBookingsByTripId(@PathVariable("tripId") Long tripId) {
        List<Booking> bookings = bookingService.getBookingsByTripId(tripId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/payment/{bookingId}")
    public ResponseEntity<PaymentDetailsResponse> calculateTotalPayment(@PathVariable("bookingId") Long bookingId) {
        PaymentDetailsResponse paymentDetails = bookingService.calculateTotalPayment(bookingId);
        return new ResponseEntity<>(paymentDetails, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        if (booking != null) {
            bookingService.deleteBooking(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
