package com.guideride.app.model;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "bookings", "trips"})
public class Customer implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int custId;
    
    @Column(unique=true)
    private String custName;
     
    @Column(unique=true,length=10)
    private String cNum;
    
    @Column(unique=true)
    private String email;

    private String password;  // Add this field for storing the password
    
    private LocalDate dob;
    
    private int addressId;
    

	@Enumerated(value=EnumType.STRING)
    Role role;
    
    public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	
    

    @OneToMany(mappedBy = "customer",cascade=CascadeType.ALL	)
    private Set<Booking> bookings = new HashSet<>();

    // Default constructor
    public Customer() {}

    

    public Customer(int custId, String custName, String cNum, String email, String password, LocalDate dob,
			int addressId, Role role, Set<Booking> bookings) {
		super();
		this.custId = custId;
		this.custName = custName;
		this.cNum = cNum;
		this.email = email;
		this.password = password;
		this.dob = dob;
		this.addressId = addressId;
		this.role = role;
		this.bookings = bookings;
	}

	// Getters and setters for all fields, including password
    public int getCustId() {
        return custId;
    }

    public void setCustId(int custId) {
        this.custId = custId;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getcNum() {
        return cNum;
    }

    public void setcNum(String cNum) {
        this.cNum = cNum;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

   
    
    @Override
	public String toString() {
		return "Customer [custId=" + custId + ", custName=" + custName + ", cNum=" + cNum + ", email=" + email
				+ ", password=" + password + ", dob=" + dob + ", addressId=" + addressId + ", role=" + role
				+ ", bookings=" + bookings + "]";
	}

	public Set<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of(new SimpleGrantedAuthority(role.name()));
	}
	
	 @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }
	 
	 @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }
	 
	 @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }


	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

		@Override
		public String getUsername() {
			// TODO Auto-generated method stub
			return custName;
		}
	


}

  

