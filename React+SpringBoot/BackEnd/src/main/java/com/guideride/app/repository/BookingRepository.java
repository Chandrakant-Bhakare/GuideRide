package com.guideride.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.guideride.app.model.Booking;
import java.util.List;


public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findAllByCustomerCustId(int custId);

    List<Booking> findAllByGuideId(Long guideId);

    List<Booking> findAllByCarCarId(Long carId);
    
    List<Booking> findAllByTripId(Long tripId);  // Corrected method
}
