package com.onyx.spartan.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomersRepository extends JpaRepository<Customers, Long> {
    Customers findCustomerById(Long id);
    void deleteById(Long id);
}

