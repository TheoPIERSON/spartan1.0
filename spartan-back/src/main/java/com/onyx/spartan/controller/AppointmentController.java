package com.onyx.spartan.controller;


import com.onyx.spartan.model.Appointment;
import com.onyx.spartan.service.AppointmentService;
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
    @PostMapping("/add")
    public ResponseEntity<Appointment> addAppointment(@RequestBody Appointment appointment){
        Appointment newAppointment = appointmentService.addAppointment(appointment);
        return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment){
        Appointment updateAppointment = appointmentService.updateAppointment(appointment);
        return new ResponseEntity<>(updateAppointment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable("id") Long id_appointment){
        appointmentService.deleteAppointment(id_appointment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
