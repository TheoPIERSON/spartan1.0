package com.onyx.spartan.global_security.validation;

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
        message.setTo(validation.getCustomers().getEmail());
        message.setSubject("Votre code d'activation Spartan");
        String text =  String.format(
                "Bonjour %s %s,\n\n"+
                        "Merci d'avoir créé un compte chez Spartan\n\n"+
                        "Voici le code d'activation de votre compte:\n\n %s",
                validation.getCustomers().getFirstname(),
                validation.getCustomers().getLastname(),
                validation.getCode()
        );
        message.setText(text);
        javaMailSender.send(message);
    }

//    public void sendConfirmation(Appointment appointment){
//        SimpleMailMessage confirmation = new SimpleMailMessage();
//        confirmation.setTo(appointment.getCustomer().getEmail());
//
//        confirmation.setSubject("Confirmation de votre rendez-vous Onyx Institut");
//
//        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
//        String date = dateFormat.format(appointment.getAppointmentStartDate());
//
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(appointment.getAppointmentStartDate());
//        calendar.add(Calendar.HOUR_OF_DAY, 2);
//        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
//        String time = timeFormat.format(calendar.getTime());
//
//        String prestation = appointment.getPrestation().iterator().next().getTitle();
//
//        String text = String.format(
//                "Bonjour %s %s,\n\n" +
//                        "Merci d'avoir pris rendez-vous chez Onyx Institut.\n" +
//                        "Ce message vous confirme votre rendez-vous pour une %s le %s à %s.\n\n" +
//                        "Cordialement,\n" +
//                        "L'équipe Onyx Institut",
//                appointment.getCustomer().getFirstname(),
//                appointment.getCustomer().getLastname(),
//                prestation,
//                date,
//                time
//        );
//        confirmation.setText(text);
//        javaMailSender.send(confirmation);
//    }
    public void sendResetPasswordEmail(String email, String resetToken) {
        String resetLink = "http://localhost:4200/password-reset/" + resetToken;
        String message = String.format(
                """
                Bonjour,
                
                Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour procéder :
                %s
                
                Ce lien expirera dans 15 minutes.
                """,
                resetLink
        );
        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(email);
        emailMessage.setSubject("Réinitialisation du mot de passe");
        emailMessage.setText(message);

        javaMailSender.send(emailMessage);
    }

}
