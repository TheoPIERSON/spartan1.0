package com.onyx.spartan.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_payment", nullable = false, updatable = false)
    private Long id;
    private int amount;
    private boolean status;
    @ManyToOne
    @JoinColumn(name = "id_appointment")
    private Appointment appointment;

    @ManyToOne
    @JoinColumn(name = "id_type_payment")
    private TypePayment typePayment;

}
