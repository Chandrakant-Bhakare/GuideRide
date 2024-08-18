package com.guideride.app.service;

import com.guideride.app.model.Booking;
import com.guideride.app.model.Car;
import com.guideride.app.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    // Method to get all cars
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Method to get a car by ID
    public Optional<Car> getCarById(Long carId) {
        return carRepository.findById(carId);
    }

    // Method to save a car
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    // Method to update a car
    public Car updateCar(Long carId, Car carDetails) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));

        car.setCarName(carDetails.getCarName());
        car.setCarNo(carDetails.getCarNo());
        car.setCarOwner(carDetails.getCarOwner());
        car.setCarStatus(carDetails.getCarStatus());
        car.setCarFair(carDetails.getCarFair());

        return carRepository.save(car);
    }

    // Method to delete a car
    public void deleteCar(Long carId) {
        if (carRepository.existsById(carId)) {
            carRepository.deleteById(carId);
        } else {
            throw new RuntimeException("Car not found");
        }
    }

    // Method to find cars by status
    public List<Car> findCarsByStatus(String status) {
        return carRepository.findByCarStatus(status);
    }

    // Method to find cars by owner
    public List<Car> findCarsByOwner(String owner) {
        return carRepository.findByCarOwner(owner);
    }

    // Method to get all bookings for a car
    public List<Booking> getBookingsByCarId(Long carId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));
        return car.getBookings(); // Assuming getBookings() is available in the Car entity
    }
}
