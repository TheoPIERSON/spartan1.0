package com.onyx.spartan.service;


import com.onyx.spartan.model.Appointment;
import com.onyx.spartan.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

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

}
