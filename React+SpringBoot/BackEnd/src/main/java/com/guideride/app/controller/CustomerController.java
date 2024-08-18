package com.guideride.app.controller;

import org.springframework.stereotype.Controller;

import com.guideride.app.constants.ResponseKey;
import com.guideride.app.constants.ResponseMessage;
import com.guideride.app.model.Booking;
import com.guideride.app.model.Customer;
import com.guideride.app.service.CustomerService;
import com.guideride.app.service.EmailService;
import com.guideride.app.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
//import jakarta.validation.Valid;
import java.util.List;

import java.util.Optional;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/api/customers")

public class CustomerController {
	
	

	@Autowired
    private CustomerService customerService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
    private EmailService emailService;

	// Get all customers
	
    @GetMapping("/")
    public ResponseEntity<?>findAll() {
    	try {
    		List <Customer>customerList=customerService.findAll();
            if(customerList.isEmpty())
            {
            	HashMap<String,String>data=new HashMap<> ();
            	data.put(ResponseKey.MESSAGE, ResponseMessage.NO_CUSTOMER_FOUND);
            	
            	return new ResponseEntity<>(data,HttpStatus.NOT_FOUND);
            }else {
            	HashMap<String,Object> data=new HashMap<>();
            	data.put(ResponseKey.COUNT, customerService.countAll());
            	data.put(ResponseKey.CUSTOMERS,customerList );
            	
            	return new ResponseEntity<>(data,HttpStatus.OK);
            }
    		
    	}catch(Exception e) {
    		HashMap<String,String> data=new HashMap<>();
    		data.put(ResponseKey.MESSAGE, ResponseMessage.SOMETHING_WENT_WRONG);
    		return new ResponseEntity<>(data,HttpStatus.INTERNAL_SERVER_ERROR);
    		
    	}
    }
    

    
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id")  int id) {
    	HashMap<Object,Object> data=new HashMap<>();
       try {
    	  Optional<Customer>customerOptional=customerService.findById(id);
    	  if(customerOptional.isPresent()) {
    		  Customer customer=customerOptional.get();
    		  return new ResponseEntity<>(customer,HttpStatus.OK);
    	  }
    	  else {
    		  data.put(ResponseKey.MESSAGE, ResponseMessage.NO_CUSTOMER_FOUND_BY_ID);
    		  return new ResponseEntity<>(data,HttpStatus.NOT_FOUND);
    	  }
       }catch(Exception e) {
    	   
   		data.put(ResponseKey.MESSAGE, ResponseMessage.SOMETHING_WENT_WRONG);
   		return new ResponseEntity<>(data,HttpStatus.INTERNAL_SERVER_ERROR);
   		
       }
    }
    

    
    @PostMapping("/")
    public ResponseEntity<?> save(@RequestBody Customer customer) {
    	
    	try {
    		Customer savedCustomer= customerService.save(customer);
    		return new ResponseEntity<>(savedCustomer,HttpStatus.CREATED);
    		
    	}catch (Exception e) {
    		HashMap<String,String> data=new HashMap<>();
    		data.put(ResponseKey.MESSAGE, ResponseMessage.SOMETHING_WENT_WRONG);
    		return new ResponseEntity<>(data,HttpStatus.INTERNAL_SERVER_ERROR);
    		
			
		}
    	 
    }
    
    @DeleteMapping("/{custId}")
    public ResponseEntity<?> remove(@PathVariable("custId")  int id){
    	HashMap<Object,Object> data=new HashMap<>();
        try {
     	  Optional<Customer>customerOptional= customerService.findById(id);
     	  if(customerOptional.isPresent()) {
     		 customerService.remove(id);
     		  return new ResponseEntity<>(HttpStatus.NO_CONTENT);
     	  }
     	  else {
     		  data.put(ResponseKey.MESSAGE, ResponseMessage.NO_CUSTOMER_FOUND_BY_ID);
     		  return new ResponseEntity<>(data,HttpStatus.NOT_FOUND);
     	  }
        }catch(Exception e) {
     	   
    		data.put(ResponseKey.MESSAGE, ResponseMessage.SOMETHING_WENT_WRONG);
    		return new ResponseEntity<>(data,HttpStatus.INTERNAL_SERVER_ERROR);
    		
        }
        
  }
     

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCustomer(@PathVariable("id") int id, @RequestBody Customer customerDetails) {
        HashMap<Object, Object> data = new HashMap<>();
        try {
            // Attempt to update the customer
            Customer updatedCustomer = customerService.updateCustomer(id, customerDetails);
            // Return the updated customer object in the response
            return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Handle username or password change attempts
            data.put("message", e.getMessage());
            return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Handle any other exceptions
            data.put("message", "Something went wrong.");
            return new ResponseEntity<>(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
 // Get all bookings for a customer by customer ID
    @GetMapping("/{custId}/bookings")
    public ResponseEntity<Set<Booking>> getBookingsForCustomer(@PathVariable int custId) {
        Set<Booking> bookings = customerService.getBookingsForCustomer(custId);
        if (bookings != null) {
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Add a new booking to a customer
    @PostMapping("/{custId}/bookings")
    public ResponseEntity<Customer> addBookingToCustomer(@PathVariable int custId, @RequestBody Booking booking) {
        Customer updatedCustomer = customerService.addBookingToCustomer(custId, booking);
        if (updatedCustomer != null) {
            return new ResponseEntity<>(updatedCustomer, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
  
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
    	customerService.register(customer);
    	
    	// Prepare email content
        String subject = "Registration Successful";
        String text = "Dear " + customer.getCustName() + ",\n\n" +
                      "Thank you for registering with us!\n\n" +
                      "Best regards,\nThe GuideRide Team";
        // Send email
        emailService.sendRegistrationEmail(customer.getEmail(), subject, text);
        
       HashMap<String,String> body=new HashMap<>();
       body.put(ResponseKey.MESSAGE, ResponseMessage.CUSTOMER_REGISTERED);
       return new ResponseEntity<>(body,HttpStatus.OK);
    }
   
    /*
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer customer) {
       
        
        HashMap<String, String> body = new HashMap<>();
        try {
		
				UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(customer.getCustName(),customer.getPassword());
				authenticationManager.authenticate(authentication);
          } 
        catch (BadCredentialsException e) {
			
			body.put(ResponseKey.MESSAGE, ResponseMessage.INVALID_CREDENTIALS);
			return new ResponseEntity<>(body,HttpStatus.BAD_REQUEST);
		}
        String token = jwtService.generateToken(customer.getCustName());
		body.put(ResponseKey.TOKEN, token);
		return new ResponseEntity<>(body,HttpStatus.OK);

    }
    */
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer customer) {
        HashMap<String, Object> body = new HashMap<>(); // Changed to Object to support multiple types of values

        try {
            // Authenticate the user
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(customer.getCustName(), customer.getPassword());
            authenticationManager.authenticate(authentication);

            // Load the authenticated customer's details using the loadUserByUsername method
            Customer authenticatedCustomer = (Customer) customerService.loadUserByUsername(customer.getCustName());

            // Generate token using the full customer object
            String token = jwtService.generateToken(authenticatedCustomer);

            // Add token and role to the response body
            body.put(ResponseKey.TOKEN, token);
            body.put("role", authenticatedCustomer.getRole().name()); // Add the role to the response

            return new ResponseEntity<>(body, HttpStatus.OK);

        } catch (BadCredentialsException e) {
            body.put(ResponseKey.MESSAGE, ResponseMessage.INVALID_CREDENTIALS);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            body.put(ResponseKey.MESSAGE, ResponseMessage.SOMETHING_WENT_WRONG);
            return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





    
    
 }

