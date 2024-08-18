package com.guideride.app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.guideride.app.model.Booking;
import com.guideride.app.model.Customer;
import com.guideride.app.model.Role;
import com.guideride.app.repository.CustomerRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class CustomerService implements UserDetailsService {

	@Autowired
	private CustomerRepository customerRepository;
	
	
	  @Autowired
	   private PasswordEncoder passwordEncoder;
	   
	 
	  
	   
	 
	   
	public Customer save(Customer customer) {
		return customerRepository.save(customer);
	}
	
	public List <Customer> findAll(){
		return customerRepository.findAll();
	}
	
	public Optional findById(int id) {
		Optional <Customer> op=customerRepository.findById(id);
		return op;
	}
	
	public void remove(int id) {
		customerRepository.deleteById(id);
	}
	
	public long countAll() {
		return customerRepository.count();
	}
	
	public Customer updateCustomer(int id, Customer customerDetails) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Prevent username change
        if (!customer.getCustName().equals(customerDetails.getCustName())) {
            throw new RuntimeException("Username cannot be changed.");
        }

        // Prevent password change
        if (!customer.getPassword().equals(customerDetails.getPassword())) {
            throw new RuntimeException("Password cannot be changed.");
        }

        // Update the allowed fields (cNum, dob, addressId)
        customer.setcNum(customerDetails.getcNum());
        customer.setDob(customerDetails.getDob());
        customer.setAddressId(customerDetails.getAddressId());

        // Save and return the updated customer
        return customerRepository.save(customer);
    }



	
	public Set<Booking> getBookingsForCustomer(int custId) {
        Optional<Customer> customerOpt = customerRepository.findById(custId);
        if (customerOpt.isPresent()) {
            return customerOpt.get().getBookings();
        }
        return null; // or throw an exception if preferred
    }

    // Method to add a new booking to a customer
    public Customer addBookingToCustomer(int custId, Booking booking) {
        Optional<Customer> customerOpt = customerRepository.findById(custId);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            customer.getBookings().add(booking);
            booking.setCustomer(customer);
            return customerRepository.save(customer);
        }
        return null; // or throw an exception if preferred
    }




	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional <Customer> customerOptional= customerRepository.findBycustName(username);
		
		return customerOptional.orElseThrow(()-> new UsernameNotFoundException("Customer not found with custname: " + username));
	
	}
	
    /*
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Customer> customerOptional = customerRepository.findBycustName(username);

        return customerOptional
            .map(customer -> {
                // Convert Collection to List
                List<GrantedAuthority> authorities = new ArrayList<>(customer.getAuthorities());
                return new org.springframework.security.core.userdetails.User(customer.getUsername(), customer.getPassword(), authorities);
            })
            .orElseThrow(() -> new UsernameNotFoundException("Customer not found with username: " + username));
    }
    */

	
	public void register(Customer customer) {
        // Encode the password before saving
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        
        // Set a default role if not already set
        if (customer.getRole() == null) {
            customer.setRole(Role.CUSTOMER); // Default to USER role
        }
        
        customerRepository.save(customer);
    }
	
	
	
	
	
}
