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

    public Appointment addAppointment(Appointment appointment) {return appointmentRepository.save(appointment);
    }
}
