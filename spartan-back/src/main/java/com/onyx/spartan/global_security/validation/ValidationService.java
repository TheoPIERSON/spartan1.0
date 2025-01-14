package com.onyx.spartan.global_security.validation;

import com.onyx.spartan.customer.Customers;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@AllArgsConstructor
@Service
public class ValidationService {
    @Autowired
    private ValidationRepository validationRepository;
    private NotificationService notificationService;

    public void register(Customers customers){
        Validation validation = new Validation();
        validation.setCustomers(customers);
        Instant creation = Instant.now();
        validation.setCreation(creation);
        Instant expiration = creation.plus(15, ChronoUnit.MINUTES);
        validation.setExpire(expiration);
        Random random = new Random();
        int randomInteger = random.nextInt(999999);
        String code = String.format("%06d", randomInteger);

        validation.setCode(code);
        this.validationRepository.save(validation);
        this.notificationService.sendNotification(validation);
    }

    public Validation readAccordingToCode(String code){
        return this.validationRepository.findByCode(code).orElseThrow(()->new RuntimeException("votre code est invalide"));
    }
}
