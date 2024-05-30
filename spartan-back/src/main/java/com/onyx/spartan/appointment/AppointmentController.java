package com.onyx.spartan.appointment;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments (){
        List<Appointment> appointment = (List<Appointment>) appointmentService.getAllAppointments();
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById (@PathVariable("id") Long id_appointment){
        Appointment appointment = appointmentService.findAppointmentById(id_appointment);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @GetMapping("/latest")
    public ResponseEntity<Appointment> getLatestAppointment (){
        Appointment appointment = appointmentService.findLatestAppointment();
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Appointment> addAppointment(@RequestBody Appointment appointment){
        Appointment newAppointment = appointmentService.addAppointment(appointment);
        return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
    }

    @PutMapping("/{id_appointment}/type-payment/{id_type_payment}")
    public Appointment assignPrestationToAppointment(
            @PathVariable Long id_appointment,
            @PathVariable Long id_type_payment

    ){
        return appointmentService.assignPaymentToAppointment(id_appointment,id_type_payment );
    }
}
