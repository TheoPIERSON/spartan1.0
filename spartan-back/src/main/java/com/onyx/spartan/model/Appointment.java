package com.onyx.spartan.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_appointment", nullable = false, updatable = false)
    private Long id;
    private Timestamp appointmentStartDate;
    private Timestamp appointmentEndDate; // Nouvel attribut pour la date de fin

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private Customers customer;

    @ManyToMany
    @JoinTable(name = "payment",
            joinColumns = @JoinColumn(name = "id_appointment"),
            inverseJoinColumns = @JoinColumn(name = "id_type_payment"))
    private Set<TypePayment> typePayment = new HashSet<>();
}