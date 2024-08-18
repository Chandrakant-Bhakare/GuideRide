/*
package com.guideride.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.guideride.app.model.AuthenticationResponse;
import com.guideride.app.model.Customer;
import com.guideride.app.service.AuthenticationService;

@RestController
public class AuthenticationController {
	
	private final AuthenticationService authService;

	public AuthenticationController(AuthenticationService authService) {
		
		this.authService = authService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody Customer request)
	{
		return ResponseEntity.ok(authService.register(request));
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse>login(
			@RequestBody Customer request
			){
		return  ResponseEntity.ok(authService.authenticate(request));
	}
	
	

}
*/
