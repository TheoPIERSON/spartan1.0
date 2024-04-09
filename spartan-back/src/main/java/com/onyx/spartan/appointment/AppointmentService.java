package com.onyx.spartan.appointment;


import com.onyx.spartan.type_payment.TypePayment;
import com.onyx.spartan.type_payment.TypePaymentRepository;
import com.onyx.spartan.type_payment.TypePaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TypePaymentRepository typePaymentRepository;
    private TypePaymentService typePaymentService;

    public Iterable<Appointment> getAllAppointments() {return appointmentRepository.findAll();
    }

    public Appointment findAppointmentById(Long id){
        return appointmentRepository.findAppointmentById(id);
    }

    public Appointment addAppointment(Appointment appointment) {return appointmentRepository.save(appointment);
    }
    public Appointment updateAppointment(Appointment appointment){
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id){
        appointmentRepository.deleteById(id);
    }



    public Appointment assignPaymentToAppointment(Long idAppointment, Long idTypePayment) {
        Set<TypePayment> typePaymentSet = null;
        Appointment appointment = appointmentRepository.findAppointmentById(idAppointment);
        TypePayment typePayment = typePaymentRepository.findTypePaymentById(idTypePayment);
        typePaymentSet = appointment.getPayment();
        typePaymentSet.add(typePayment);
        appointment.setPayment(typePaymentSet);
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
