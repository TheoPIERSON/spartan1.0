// Package declaration and imports
package com.onyx.spartan.user;

import com.onyx.spartan.security.AuthenticationDto;
import com.onyx.spartan.security.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// Slf4j annotation for logging
@Slf4j
// RestController annotation to mark this class as a Spring MVC controller
@RestController
// RequestMapping to map web requests to the /users endpoint
@RequestMapping("/users")
public class UserController {

    // Autowiring the UserService to manage user-related operations
    @Autowired
    private UserService userService;

    // Autowiring the AuthenticationManager to handle authentication
    @Autowired
    private AuthenticationManager authenticationManager;

    // Autowiring the JwtService to handle JWT token generation
    @Autowired
    private JwtService jwtService;

    // GET endpoint to retrieve all users
    @GetMapping("/all")
    public ResponseEntity<List<Users>> getAllCustomers (){
        // Retrieve all users from the UserService
        List<Users> customers = (List<Users>) userService.getAllUsers();
        // Return the list of users with an OK status
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    // POST endpoint to add a new user
    @PostMapping("/add")
    public ResponseEntity<Users> addCustomer(@RequestBody Users user){
        // Add the new user using the UserService
        Users newUser = userService.addUser(user);
        // Return the newly created user with a CREATED status
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    // POST endpoint to activate a user
    @PostMapping("/activate")
    public ResponseEntity<Users> activateUser(@RequestBody Map<String, String> activation){
        // Activate the user using the activation details from the UserService
        Users newCustomer = userService.activateCustomer(activation);
        // Return the activated user with a CREATED status
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }

    // POST endpoint for user login
    @PostMapping("/connexion")
    public ResponseEntity<Map<String, String>> connexion(@RequestBody AuthenticationDto authenticationDto, HttpServletResponse response){
        // Authenticate the user using the provided username and password
        final Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationDto.username(), authenticationDto.password())
        );
        // Log the authentication status
        log.info("connexion ok {}", authenticate.isAuthenticated());

        // If the user is authenticated
        if (authenticate.isAuthenticated()){
            log.info("authenticate ok");
            // Generate a JWT token for the authenticated user
            Map<String, String> tokenMap = this.jwtService.generate(authenticationDto.username());
            String jwtToken = tokenMap.get("bearer");

            // Create a new cookie to store the JWT token
            Cookie jwtCookie = new Cookie("jwt", jwtToken);
            jwtCookie.setHttpOnly(true); // Make the cookie HTTP-only to prevent client-side scripts from accessing it
            jwtCookie.setSecure(false); // Utilisez true si vous utilisez HTTPS
            jwtCookie.setPath("/"); // Définissez le chemin pour le cookie
            jwtCookie.setMaxAge(24 * 60 * 60); // Durée de vie du cookie (1 jour ici)

            // Ajouter le cookie à la réponse
            response.addCookie(jwtCookie);

            return ResponseEntity.ok(tokenMap);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}
