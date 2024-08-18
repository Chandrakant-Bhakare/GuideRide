package com.guideride.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guideride.app.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {

	    Optional <Customer> findBycustName(String username);
	
}
