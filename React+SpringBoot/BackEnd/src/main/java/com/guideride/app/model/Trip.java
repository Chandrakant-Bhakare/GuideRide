package com.guideride.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startLocation;
    private String endLocation;
    private double numberOfKm;
    private int numberOfPeople;
    private double tripFair; // New attribute for trip fare

    @OneToOne(mappedBy = "trip")
    @JsonBackReference
    private Booking booking;
    
    
    private static final double FARE_PER_KM = 10.0; // Example rate per kilometer
    private static final double FARE_PER_PERSON = 5.0; // Example rate per person
    
    
 // Method to calculate trip fare
    public void calculateTripFare() {
        this.tripFair = (numberOfKm * FARE_PER_KM) + (numberOfPeople * FARE_PER_PERSON);
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public double getNumberOfKm() {
        return numberOfKm;
    }

    public void setNumberOfKm(double numberOfKm) {
        this.numberOfKm = numberOfKm;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public double getTripFair() {
        return tripFair;
    }

    public void setTripFair(double tripFair) {
        this.tripFair = tripFair;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    @Override
    public String toString() {
        return "Trip{" +
                "id=" + id +
                ", startLocation='" + startLocation + '\'' +
                ", endLocation='" + endLocation + '\'' +
                ", numberOfKm=" + numberOfKm +
                ", numberOfPeople=" + numberOfPeople +
                ", tripFair=" + tripFair + // Added toString output
                ", booking=" + (booking != null ? booking.getId() : "N/A") +
                '}';
    }
}
