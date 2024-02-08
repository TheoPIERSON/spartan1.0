package com.onyx.spartan.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class TypePayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type_payment", nullable = false, updatable = false)
    private Long id;
    private Timestamp description;
}
