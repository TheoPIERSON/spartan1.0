package com.onyx.spartan.user;

import com.onyx.spartan.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/customer")
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
}
