package com.onyx.spartan.appointment;


import com.onyx.spartan.payment.Payment;
import com.onyx.spartan.payment.PaymentRepository;
import com.onyx.spartan.type_payment.TypePayment;
import com.onyx.spartan.type_payment.TypePaymentRepository;
import com.onyx.spartan.type_payment.TypePaymentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TypePaymentRepository typePaymentRepository;
    private TypePaymentService typePaymentService;
    @Autowired
    private PaymentRepository paymentRepository;


    public Iterable<Appointment> getAllAppointments() {return appointmentRepository.findAll();
    }

    public Appointment findAppointmentById(Long id){
        return appointmentRepository.findAppointmentById(id);
    }

    public Appointment addAppointment(Appointment appointment) {return appointmentRepository.save(appointment);
    }
    public Appointment assignPaymentToAppointment(Long idAppointment, Long idTypePayment, int amount) {
        // Trouver le rendez-vous par son ID
        Appointment appointment = appointmentRepository.findAppointmentById(idAppointment);
        if (appointment == null) {
            throw new EntityNotFoundException("Appointment not found");
        }

        // Trouver le type de paiement par son ID
        TypePayment typePayment = typePaymentRepository.findTypePaymentById(idTypePayment);
        if (typePayment == null) {
            throw new EntityNotFoundException("TypePayment not found");
        }

        // Créer un nouveau paiement
        Payment payment = new Payment();
        payment.setAppointment(appointment);
        payment.setTypePayment(typePayment);
        payment.setAmount(amount);
        payment.setStatus(false); // ou true, selon votre logique métier

        // Sauvegarder le paiement
        paymentRepository.save(payment);

        // Ajouter le type de paiement au rendez-vous (si nécessaire)
        Set<TypePayment> typePaymentSet = appointment.getPayment();
        if (typePaymentSet == null) {
            typePaymentSet = new HashSet<>();
        }
        typePaymentSet.add(typePayment);
        appointment.setPayment(typePaymentSet);

        // Sauvegarder le rendez-vous avec le type de paiement associé
        return appointmentRepository.save(appointment);
    }


    public Appointment findLatestAppointment() {
        List<Appointment> latestAppointment = appointmentRepository.findAll(
                PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "id"))).getContent();

        if (!latestAppointment.isEmpty()) {
            return latestAppointment.get(0);
        } else {
            // Gérer le cas où il n'y a pas de rendez-vous
            return null;
        }
    }

}
