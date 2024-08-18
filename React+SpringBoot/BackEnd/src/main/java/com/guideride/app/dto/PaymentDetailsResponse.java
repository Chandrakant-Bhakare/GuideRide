package com.guideride.app.dto;





public class PaymentDetailsResponse {
    private double carFair;
    private double guideFair;
    private double tripFair;
    private double totalFair;

    // Constructors
    public PaymentDetailsResponse(double carFair, double guideFair, double tripFair, double totalFair) {
        this.carFair = carFair;
        this.guideFair = guideFair;
        this.tripFair = tripFair;
        this.totalFair = totalFair;
    }

    // Getters and setters
    public double getCarFair() {
        return carFair;
    }

    public void setCarFair(double carFair) {
        this.carFair = carFair;
    }

    public double getGuideFair() {
        return guideFair;
    }

    public void setGuideFair(double guideFair) {
        this.guideFair = guideFair;
    }

    public double getTripFair() {
        return tripFair;
    }

    public void setTripFair(double tripFair) {
        this.tripFair = tripFair;
    }

    public double getTotalFair() {
        return totalFair;
    }

    public void setTotalFair(double totalFair) {
        this.totalFair = totalFair;
    }
}
