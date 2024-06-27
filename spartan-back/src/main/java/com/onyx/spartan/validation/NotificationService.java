package com.onyx.spartan.validation;

import com.onyx.spartan.appointment.Appointment;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;


@AllArgsConstructor
@Service
public class NotificationService {
    @Autowired
    JavaMailSender javaMailSender;

    public void sendNotification(Validation validation){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@onyx.fr");
        message.setTo(validation.getUsers().getEmail());
        message.setSubject("Votre code d'activation Onyx Institut");
        String text =  String.format(
                "Bonjour %s %s,\n\n"+
                        "Merci d'avoir créer un compte chez Onyx Institut\n\n"+
                        "Voici le code d'activation de votre compte:\n\n %s",
                validation.getUsers().getFirstname(),
                validation.getUsers().getLastname(),
                validation.getCode()
        );
        message.setText(text);
        javaMailSender.send(message);
    }
}
