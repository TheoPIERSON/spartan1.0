package com.onyx.spartan.type_payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TypePaymentRepository extends JpaRepository<TypePayment, Long> {
    TypePayment findTypePaymentById(Long id);

}
