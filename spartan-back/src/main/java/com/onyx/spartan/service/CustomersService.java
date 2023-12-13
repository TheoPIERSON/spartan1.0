package com.onyx.spartan.service;

import com.onyx.spartan.model.Customers;
import com.onyx.spartan.repository.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomersService {
    @Autowired
    private CustomersRepository customerRepository;

    public Iterable<Customers> getAllCustomers(){
        return customerRepository.findAll();
    }

    public Customers findCustomerById(Long id){
        return customerRepository.findCustomerById(id);
    }

    public Customers addCustomer(Customers customer){
        return customerRepository.save(customer);
    }

    public Customers updateCustomer(Customers customer){
        return customerRepository.save(customer);
    }


}
