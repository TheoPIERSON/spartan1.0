package com.onyx.spartan.customer;

import com.onyx.spartan.global_security.dto.AuthenticationDto;
import com.onyx.spartan.global_security.jwt.JwtService;
import com.onyx.spartan.global_security.validation.NotificationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/customer")
public class CustomersController {

    @Autowired
    private CustomersService customersService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private NotificationService notificationService;


    private static final Logger log = LoggerFactory.getLogger(CustomersController.class);


    @GetMapping("/all")
    public ResponseEntity<List<Customers>> getAllCustomers (){
        List<Customers> customers = (List<Customers>) customersService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Customers> getCustomerById (@PathVariable("id") Long id_customer){
        Customers customers = customersService.findCustomerById(id_customer);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Customers> addCustomer(@RequestBody Customers customer){
        System.out.println("Received customer: " + customer); // Log simple

        Customers newCustomer = customersService.addCustomer(customer);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Customers> updateCustomer(@PathVariable Long id, @RequestBody Customers updatedCustomer){
        Customers customer = customersService.updateCustomer(id, updatedCustomer);
        if(customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Long id_customer){
        customersService.deleteCustomer(id_customer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/activate")
    public ResponseEntity<Customers> activateCustomer(@RequestBody Map<String, String> activation){
        Customers newCustomer = customersService.activateCustomer(activation);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }
    @PostMapping("/disconnect")
    public ResponseEntity<Void> disconnectCustomer(HttpServletResponse response) {
        this.jwtService.disconnectCustomer();

        // Supprimer le cookie en réécrivant avec une durée de vie nulle
        Cookie jwtCookie = new Cookie("JWT_TOKEN", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0); // Le cookie expire immédiatement

        response.addCookie(jwtCookie);

        log.info("client déconnecté");
        return ResponseEntity.ok().build();
    }


    @PostMapping("/connexion")
    public ResponseEntity<Void> connexion(@RequestBody AuthenticationDto authenticationDto, HttpServletResponse response) {
        final Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationDto.username(), authenticationDto.password())
        );
        log.info("connexion ok {}", authenticate.isAuthenticated());

        if (authenticate.isAuthenticated()) {
            log.info("authenticate ok");

            // Générer le JWT
            String jwt = this.jwtService.generate(authenticationDto.username()).get(JwtService.BEARER);

            // Créer un cookie HTTP-Only pour le JWT
            Cookie jwtCookie = new Cookie("JWT_TOKEN", jwt);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(true); // Important de le mettre à true en production
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(60 * 60); // Le cookie expire en 1 heure

            // Ajouter le cookie à la réponse
            response.addCookie(jwtCookie);

            return ResponseEntity.ok().build();
        }

        log.info("connexion échouée");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        try {
            Customers customer = (Customers) customersService.loadUserByUsername(email);
            Map<String, String> resetTokenMap = jwtService.generatePasswordResetToken(customer);
            notificationService.sendResetPasswordEmail(email, resetTokenMap.get(JwtService.BEARER));

            Map<String, String> response = new HashMap<>();
            response.put("message", "Email envoyé pour réinitialisation du mot de passe");
            return ResponseEntity.ok(response);
        } catch (UsernameNotFoundException ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Email non trouvé");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String password = request.get("password");
        System.out.println("Token recu : " + token);


        if (!jwtService.isResetTokenValid(token)) {
            System.out.print("Token invalide ou expiré");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token invalide ou expiré");
        }

        String email = jwtService.readUsername(token);
        System.out.print("Demande de réinitialisation pour : " + email);

        Customers customer = (Customers) customersService.loadUserByUsername(email);
        if (customer == null) {
            System.out.print("Utilisateur non trouvé : " + email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        }

        customersService.updatePassword(customer, password);
        System.out.print("Mot de passe mis à jour pour : " + email);
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body("Mot de passe réinitialisé avec succès");
    }
}