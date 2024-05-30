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
}
