package com.guideride.app.repository;




import org.springframework.data.jpa.repository.JpaRepository;

import com.guideride.app.model.Trip;

public interface TripRepository extends JpaRepository<Trip, Long> {
	
}

