package com.guideride.app.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "bookings", "trips"})
public class Guide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String experience;
    private Double guideFair;        // New attribute
    private String guideStatus;      // New attribute
    private Double guideRatings;     // New attribute

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<Booking> bookings = new HashSet<>();

    // Default constructor
    public Guide() {}

    // Parameterized constructor
    public Guide(Long id, String name, String experience, Double guideFair, String guideStatus, Double guideRatings, Set<Booking> bookings) {
        this.id = id;
        this.name = name;
        this.experience = experience;
        this.guideFair = guideFair;
        this.guideStatus = guideStatus;
        this.guideRatings = guideRatings;
        this.bookings = bookings;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public Double getGuideFair() {
        return guideFair;
    }

    public void setGuideFair(Double guideFair) {
        this.guideFair = guideFair;
    }

    public String getGuideStatus() {
        return guideStatus;
    }

    public void setGuideStatus(String guideStatus) {
        this.guideStatus = guideStatus;
    }

    public Double getGuideRatings() {
        return guideRatings;
    }

    public void setGuideRatings(Double guideRatings) {
        this.guideRatings = guideRatings;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return "Guide{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", experience='" + experience + '\'' +
                ", guideFair=" + guideFair +
                ", guideStatus='" + guideStatus + '\'' +
                ", guideRatings=" + guideRatings +
                ", bookings=" + bookings +
                '}';
    }
}
