package com.guideride.app.service;

import com.guideride.app.model.Admin;
import com.guideride.app.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Method to get all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Method to get an admin by ID
    public Optional<Admin> getAdminById(Long adminId) {
        return adminRepository.findById(adminId);
    }

    // Method to save a new admin
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Method to update an existing admin
    public Admin updateAdmin(Long adminId, Admin adminDetails) {
        Admin admin = adminRepository.findById(adminId)
                                      .orElseThrow(() -> new RuntimeException("Admin not found"));

        admin.setAdminName(adminDetails.getAdminName());
        admin.setAdminEmail(adminDetails.getAdminEmail());
        admin.setAdminPassword(adminDetails.getAdminPassword());
        admin.setAdminRole(adminDetails.getAdminRole());

        return adminRepository.save(admin);
    }

    // Method to delete an admin
    public void deleteAdmin(Long adminId) {
        adminRepository.deleteById(adminId);
    }
}
