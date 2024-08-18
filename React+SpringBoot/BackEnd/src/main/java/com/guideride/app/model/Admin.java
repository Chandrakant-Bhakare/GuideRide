package com.guideride.app.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;
    @Column(unique=true)
    private String adminName;
    private String adminEmail;
    private String adminPassword;
    private String adminRole;
	public Long getAdminId() {
		return adminId;
	}
	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}
	public String getAdminName() {
		return adminName;
	}
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
	public String getAdminEmail() {
		return adminEmail;
	}
	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}
	public String getAdminPassword() {
		return adminPassword;
	}
	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}
	public String getAdminRole() {
		return adminRole;
	}
	public void setAdminRole(String adminRole) {
		this.adminRole = adminRole;
	}
	@Override
	public String toString() {
		return "Admin [adminId=" + adminId + ", adminName=" + adminName + ", adminEmail=" + adminEmail
				+ ", adminPassword=" + adminPassword + ", adminRole=" + adminRole + "]";
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return null;
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
		return adminName;
	}
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return adminPassword;
	}

    
    
}

