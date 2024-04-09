package com.onyx.spartan.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/all")
    public ResponseEntity<List<Payment>> getAllPayments (){
        List<Payment> payment = (List<Payment>) paymentService.getAllPayments();
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById (@PathVariable("id") Long id_payment){
        Payment payment = paymentService.findById(id_payment);
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment){
        Payment newPayment = paymentService.addPayment(payment);
        return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Payment> updatePayment(@RequestBody Payment payment){
        Payment updatePayment = paymentService.updatePayment(payment);
        return new ResponseEntity<>(updatePayment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable("id") Long id_payment){
        paymentService.deletePayment(id_payment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
