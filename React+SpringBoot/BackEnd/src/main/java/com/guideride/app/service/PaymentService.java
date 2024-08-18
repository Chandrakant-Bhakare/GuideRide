package com.guideride.app.service;

import com.guideride.app.model.Payment;
import com.guideride.app.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // Method to get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Method to get a payment by ID
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    // Method to save a new payment
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Method to update an existing payment
    public Payment updatePayment(Long id, Payment paymentDetails) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setAmount(paymentDetails.getAmount());
        payment.setPaymentDate(paymentDetails.getPaymentDate());
        payment.setPaymentMethod(paymentDetails.getPaymentMethod());
        payment.setBooking(paymentDetails.getBooking());

        return paymentRepository.save(payment);
    }

    // Method to delete a payment
    public void deletePayment(Long id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Payment not found");
        }
    }
}

