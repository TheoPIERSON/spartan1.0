package com.onyx.spartan.repository;

import com.onyx.spartan.model.Customers;
import com.onyx.spartan.model.TypePayment;
import org.springframework.data.repository.CrudRepository;

public interface TypePaymentRepository extends CrudRepository<TypePayment, Long> {
    TypePayment findTypePaymentById(Long id);

}
