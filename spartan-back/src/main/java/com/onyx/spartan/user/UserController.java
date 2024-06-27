package com.onyx.spartan.user;

import com.onyx.spartan.security.AuthenticationDto;
import com.onyx.spartan.security.JwtService;
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


@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/all")
    public ResponseEntity<List<Users>> getAllCustomers (){
        List<Users> customers = (List<Users>) userService.getAllUsers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Users> addCustomer(@RequestBody Users user){
        Users newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    @PostMapping("/activate")
    public ResponseEntity<Users> activateUser(@RequestBody Map<String, String>activation){
        Users newCustomer = userService.activateCustomer(activation);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }
    @PostMapping("/connexion")
    public Map<String, String> connexion(@RequestBody AuthenticationDto authenticationDto){
        final Authentication authenticate =  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationDto.username(), authenticationDto.password())
        );
        log.info("connexion ok {}", authenticate.isAuthenticated());
        if (authenticate.isAuthenticated()){
            log.info("authenticate ok");

            return this.jwtService.generate(authenticationDto.username());
        }
        log.info("connexion ok2");
        return null;
    }
}
