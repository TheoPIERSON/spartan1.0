package com.onyx.spartan.service;

import com.onyx.spartan.exception.UserNotFoundException;
import com.onyx.spartan.model.Customer;
import com.onyx.spartan.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private final CustomerRepo customerRepo;
    @Autowired
    public CustomerService(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    public Customer findCustomerById(Long id){
        return customerRepo.findCustomerById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id" + id + " was not found"));
    }

}
