package com.guideride.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guideride.app.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Find payments by a specific amount
    List<Payment> findByAmount(double amount);

    // Find payments by a specific payment method
    List<Payment> findByPaymentMethod(String paymentMethod);
}

