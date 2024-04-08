package com.onyx.spartan.repository;

import com.onyx.spartan.model.Customers;
import com.onyx.spartan.model.TypePayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypePaymentRepository extends JpaRepository<TypePayment, Long> {
    TypePayment findTypePaymentById(Long id);

}
