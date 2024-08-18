/*
package com.guideride.app.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.guideride.app.model.AuthenticationResponse;
import com.guideride.app.model.Customer;
import com.guideride.app.repository.CustomerRepository;

@Service
public class AuthenticationService {

	private final CustomerRepository repository;
	private final PasswordEncoder passwordEncoder;
	
	private final AuthenticationManager authenticationManager;
	
	private final JwtService jwtService;

	
	
	public AuthenticationService(CustomerRepository repository, PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager, JwtService jwtService) {
	
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}
	
	public void register(Customer customer) {
		String textPassword=customer.getPassword();
        customer.setPassword(passwordEncoder.encode(textPassword));
        customerRepository.save(customer);
    }
   

	public AuthenticationResponse register(Customer customer)
	{
		//Customer customer=new Customer();
		customer.setCustName(customer.getCustName());
		customer.setEmail(customer.getEmail());
		customer.setPassword(passwordEncoder.encode(customer.getPassword()));
		customer.setRole(customer.getRole());
		customer=repository.save(customer);
		
		
		String token=jwtService.generateToken(customer);
		return new AuthenticationResponse(token);
		
	}
	
	 public AuthenticationResponse register(Customer customer) {
	        // Encrypt the password and save the customer
	        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
	        customer = repository.save(customer);

	        // Generate a JWT token for the customer
	        String token = jwtService.generateToken(customer);
	        return new AuthenticationResponse(token);
	    }
	
	public AuthenticationResponse authenticate(Customer request)
	{
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getCustName(),
						request.getPassword()
						)
				);
		Customer customer=repository.findBycustName(request.getCustName()).orElseThrow();
		String token=jwtService.generateToken(customer);
		
		return new AuthenticationResponse(token);
	}
	
	
}
*/
