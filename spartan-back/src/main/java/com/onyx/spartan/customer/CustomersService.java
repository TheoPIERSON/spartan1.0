package com.onyx.spartan.customer;

import com.onyx.spartan.exception.CustomerNotFoundException;
import com.onyx.spartan.exception.InvalidEmailException;
import com.onyx.spartan.global_security.validation.Validation;
import com.onyx.spartan.global_security.validation.ValidationService;
import com.onyx.spartan.role.Role;
import com.onyx.spartan.role.RoleType;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@AllArgsConstructor
@Service
public class CustomersService implements UserDetailsService {

    private final CustomersRepository customerRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ValidationService validationService;

    private static boolean isEmailValid(String email) {
        String regex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
        return Pattern.matches(regex, email);
    }

    public Iterable<Customers> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customers findCustomerById(Long id) {
        return customerRepository.findCustomerById(id);
    }

    @Transactional
    public Customers addCustomer(Customers customer) {
        if (!isEmailValid(customer.getEmail())) {
            throw new RuntimeException("Votre email n'est pas valide");
        }

        Optional<Customers> customersOptional = customerRepository.findByEmail(customer.getEmail());
        if (customersOptional.isPresent()) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }

        String cryptedPassword = passwordEncoder.encode(customer.getPassword());
        customer.setPassword(cryptedPassword);
        Role customerRole = new Role();
        customerRole.setRole(RoleType.USER);
        customer.setRole(customerRole);
        validationService.register(customer);

        return customerRepository.save(customer);
    }

    @Transactional
    public Customers updateCustomer(Long id, Customers updatedCustomer) {
        Customers existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));

        if (!isEmailValid(updatedCustomer.getEmail())) {
            new InvalidEmailException(updatedCustomer.getEmail());
        }

        BeanUtils.copyProperties(updatedCustomer, existingCustomer, "id");
        return customerRepository.save(existingCustomer);
    }

    @Transactional
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    @Transactional
    public Customers activateCustomer(Map<String, String> activation) {
        Validation validation = validationService.readAccordingToCode(activation.get("code"));
        if (Instant.now().isAfter(validation.getExpire())) {
            throw new RuntimeException("Votre code a expiré");
        }

        Customers activatedCustomer = customerRepository.findById(validation.getCustomers().getId())
                .orElseThrow(() -> new RuntimeException("Client inconnu"));
        activatedCustomer.setActive(true);

        return customerRepository.save(activatedCustomer);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return customerRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Aucun utilisateur ne correspond à cet identifiant"));
    }
}