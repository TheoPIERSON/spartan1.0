package com.onyx.spartan.appointment;

import com.onyx.spartan.appointment.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Appointment findAppointmentById(Long id);
    void deleteById(Long id);
}
