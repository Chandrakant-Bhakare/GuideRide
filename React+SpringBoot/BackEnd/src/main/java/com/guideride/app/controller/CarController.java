package com.guideride.app.controller;

import com.guideride.app.model.Booking;
import com.guideride.app.model.Car;
import com.guideride.app.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarService carService;

    // Get all cars
    @GetMapping("/")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllCars();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    // Get car by ID
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable("id") Long carId) {
        Optional<Car> car = carService.getCarById(carId);
        return car.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                  .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a new car
    @PostMapping("/")
    public ResponseEntity<Car> createCar(@RequestBody Car car) {
        Car savedCar = carService.saveCar(car);
        return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
    }

    // Update an existing car
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable("id") Long carId, @RequestBody Car carDetails) {
        try {
            Car updatedCar = carService.updateCar(carId, carDetails);
            return new ResponseEntity<>(updatedCar, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a car
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable("id") Long carId) {
        try {
            carService.deleteCar(carId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get bookings for a specific car
    @GetMapping("/{id}/bookings")
    public ResponseEntity<List<Booking>> getBookingsByCarId(@PathVariable("id") Long carId) {
        try {
            List<Booking> bookings = carService.getBookingsByCarId(carId);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Find cars by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Car>> findCarsByStatus(@PathVariable("status") String status) {
        List<Car> cars = carService.findCarsByStatus(status);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    // Find cars by owner
    @GetMapping("/owner/{owner}")
    public ResponseEntity<List<Car>> findCarsByOwner(@PathVariable("owner") String owner) {
        List<Car> cars = carService.findCarsByOwner(owner);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }
}
