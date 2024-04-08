package com.onyx.spartan.payment;

import com.onyx.spartan.model.TypePayment;
import com.onyx.spartan.repository.TypePaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public Iterable<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }
    public Payment addPayment(Payment payment){
        return paymentRepository.save(payment);
    }
    public Payment findById(Long id){
        return paymentRepository.findPaymentById(id);
    }

    public Payment updatePayment(Payment payment){
        return paymentRepository.save(payment);
    }
    public void deletePayment(Long id){
        paymentRepository.deleteById(id);
    }
}
