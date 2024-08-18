package com.guideride.app.service;

import com.guideride.app.model.Trip;
import com.guideride.app.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    public Trip createTrip(Trip trip) {
        // You might want to validate tripFair or other fields here
        return tripRepository.save(trip);
    }

    public Trip updateTrip(Long id, Trip tripDetails) {
        Optional<Trip> trip = tripRepository.findById(id);
        if (trip.isPresent()) {
            Trip existingTrip = trip.get();
            existingTrip.setStartLocation(tripDetails.getStartLocation());
            existingTrip.setEndLocation(tripDetails.getEndLocation());
            existingTrip.setNumberOfKm(tripDetails.getNumberOfKm());
            existingTrip.setNumberOfPeople(tripDetails.getNumberOfPeople());
            existingTrip.setTripFair(tripDetails.getTripFair()); // Updated field
            return tripRepository.save(existingTrip);
        }
        return null; // Or throw an exception if preferred
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
}
