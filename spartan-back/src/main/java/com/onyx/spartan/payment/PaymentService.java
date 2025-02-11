package com.onyx.spartan.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public Iterable<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }
}
