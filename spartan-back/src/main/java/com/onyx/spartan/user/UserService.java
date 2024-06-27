package com.onyx.spartan.user;

import com.onyx.spartan.validation.Validation;
import com.onyx.spartan.validation.ValidationService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private ValidationService validationService;


    private static boolean isEmailValid(String email) {
        String regex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
        return Pattern.matches(regex, email);
    }

    public Iterable<Users> getAllUsers(){
        return userRepository.findAll();
    }

    @Transactional
    public Users addUser(Users users) {
        if (!isEmailValid(users.getEmail())) {
            throw new RuntimeException("Votre email n'est pas valide");
        }

        Optional<Users> usersOptional = this.userRepository.findByEmail(users.getEmail());
        if (usersOptional.isPresent()) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }

        String cryptedPassword = passwordEncoder.encode(users.getPassword());
        users.setPassword(cryptedPassword);
        users.setRole("ADMIN");
        this.validationService.register(users);

        return userRepository.save(users);
    }

    @Transactional
    public Users activateCustomer(Map<String, String> activation) {
        Validation validation = this.validationService.readAccordingToCode(activation.get("code"));
        if (Instant.now().isAfter(validation.getExpire())) {
            throw new RuntimeException("Votre code a expiré");
        }

        Users activatedUser = this.userRepository.findById(validation.getUsers().getId())
                .orElseThrow(() -> new RuntimeException("Client inconnu"));
        activatedUser.setActive(true);

        return this.userRepository.save(activatedUser);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Aucun utilisateur ne correspond à cet identifiant"));
    }
}
