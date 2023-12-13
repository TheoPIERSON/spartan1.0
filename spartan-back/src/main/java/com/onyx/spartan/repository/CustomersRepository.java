package com.onyx.spartan.repository;

import com.onyx.spartan.model.Customers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomersRepository extends CrudRepository<Customers, Long> {
    Customers findCustomerById(Long id);
}

