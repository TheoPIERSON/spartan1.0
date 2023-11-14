package com.onyx.spartan.controller;


import com.onyx.spartan.model.Customer;
import com.onyx.spartan.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {

    private final CustomerService customerService;

    public HelloController(CustomerService customerService) {
        this.customerService = customerService;}

    @CrossOrigin

    @GetMapping("/hello")
    public String hello() {
        return "Hello From API ;)";
    }

    @GetMapping("/find/{id_customer}")
    public ResponseEntity<Customer> getCustomerById (@PathVariable("id_customer") Long id_customer){
        Customer customer = customerService.findCustomerById(id_customer);
        return new ResponseEntity<>(customer, HttpStatus.OK);}
}


