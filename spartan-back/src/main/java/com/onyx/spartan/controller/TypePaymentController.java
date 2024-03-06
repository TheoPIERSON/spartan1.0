package com.onyx.spartan.controller;

import com.onyx.spartan.model.TypePayment;
import com.onyx.spartan.model.TypePayment;
import com.onyx.spartan.service.TypePaymentService;
import com.onyx.spartan.service.TypePaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/type_payment")
public class TypePaymentController {

    @Autowired
    private TypePaymentService typePaymentService;

    @GetMapping("/all")
    public ResponseEntity<List<TypePayment>> getAllTypePayments (){
        List<TypePayment> typePayment = (List<TypePayment>) typePaymentService.getAllTypePayments();
        return new ResponseEntity<>(typePayment, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<TypePayment> getTypePaymentById (@PathVariable("id") Long id_type_payment){
        TypePayment typePayment = typePaymentService.findById(id_type_payment);
        return new ResponseEntity<>(typePayment, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<TypePayment> addTypePayment(@RequestBody TypePayment typePayment){
        TypePayment newTypePayment = typePaymentService.addTypePayment(typePayment);
        return new ResponseEntity<>(newTypePayment, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TypePayment> updateTypePayment(@RequestBody TypePayment typePayment){
        TypePayment updateTypePayment = typePaymentService.updateTypePayment(typePayment);
        return new ResponseEntity<>(updateTypePayment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTypePayment(@PathVariable("id") Long id_type_payment){
        typePaymentService.deleteTypePayment(id_type_payment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
