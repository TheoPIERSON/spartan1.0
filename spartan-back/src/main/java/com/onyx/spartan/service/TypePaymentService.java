package com.onyx.spartan.service;

import com.onyx.spartan.model.TypePayment;
import com.onyx.spartan.repository.TypePaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypePaymentService {
    @Autowired
    private TypePaymentRepository typePaymentRepository;

    public Iterable<TypePayment> getAllTypePayments(){
        return typePaymentRepository.findAll();
    }
    public TypePayment addTypePayment(TypePayment typePayment){
        return typePaymentRepository.save(typePayment);
    }
    public TypePayment findById(Long id){
        return typePaymentRepository.findTypePaymentById(id);
    }

    public TypePayment updateTypePayment(TypePayment typePayment){
        return typePaymentRepository.save(typePayment);
    }
    public void deleteTypePayment(Long id){
        typePaymentRepository.deleteById(id);
    }
}

