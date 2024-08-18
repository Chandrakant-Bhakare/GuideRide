package com.guideride.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guideride.app.model.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
	 List<Car> findByCarStatus(String status);
	    List<Car> findByCarOwner(String owner);
}
