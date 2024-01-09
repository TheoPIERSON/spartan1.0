package com.onyx.spartan.model;


import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_appointment", nullable = false, updatable = false)
    private Long id;
    private Timestamp appointmentStartDate;
    private Timestamp appointmentEndDate;

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private Customers customer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getAppointmentStartDate() {
        return appointmentStartDate;
    }

    public void setAppointmentStartDate(Timestamp appointmentStartDate) {
        this.appointmentStartDate = appointmentStartDate;
    }

    public Timestamp getAppointmentEndDate() {
        return appointmentEndDate;
    }

    public void setAppointmentEndDate(Timestamp appointmentEndDate) {
        this.appointmentEndDate = appointmentEndDate;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }
}



