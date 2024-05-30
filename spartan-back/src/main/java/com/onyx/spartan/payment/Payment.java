package com.onyx.spartan.payment;

import com.onyx.spartan.appointment.Appointment;
import com.onyx.spartan.type_payment.TypePayment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_payment", nullable = false, updatable = false)
    private Long id;
    @Column(name = "amount", nullable = true)
    private int amount;
    @Column(name = "status")
    private boolean status = false;
    @ManyToOne
    @JoinColumn(name = "id_appointment")
    private Appointment appointment;
    @ManyToOne
    @JoinColumn(name = "id_type_payment", nullable = false)
    private TypePayment typePayment;

}
