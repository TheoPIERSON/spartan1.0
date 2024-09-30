package com.onyx.spartan.global_security.jwt;

import com.onyx.spartan.customer.Customers;
import com.onyx.spartan.customer.CustomersController;
import com.onyx.spartan.customer.CustomersService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Transactional
@AllArgsConstructor
@Service
public class JwtService {
    public static final String BEARER = "bearer";
    private final String ENCRYPTION_KEY = "8MPbKZPYhcw8r8VSrf3KJD3ysLCZAwUFbhD0eGAfYtVnhq+K6fvGbtdgqNlFVjL4";
    private CustomersService customersService;
    private JwtRepository jwtRepository;
    private static final Logger log = LoggerFactory.getLogger(CustomersController.class);


    public Jwt tokenByValue(String value) {
        return this.jwtRepository.findByValueAndDesactiveAndExpire(value, false, false)
                .orElseThrow(()-> new RuntimeException("Le token n'est pas connu"));
    }
    public Map<String, String> generate(String username){
        Customers customers = (Customers) this.customersService.loadUserByUsername(username);
        this.disableTokens(customers);
        final Map<String, String> jwtMap = this.generateJwt(customers);

        final Jwt jwt = new Jwt(
                jwtMap.get(BEARER),   // valeur du token
                false,                // desactive
                false,                // expire
                customers             // customer associé
        );

        this.jwtRepository.save(jwt);
        return jwtMap;
    }
    private void disableTokens(Customers customers) {
        final List<Jwt> jwtList = this.jwtRepository.findCustomer(customers.getUsername()).peek(
                jwt -> {
                    jwt.setDesactive(true);
                    jwt.setExpire(true);
                }
        ).collect(Collectors.toList());

        this.jwtRepository.saveAll(jwtList);
    }

    public String readUsername(String token) {
        return this.getClaim(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate =  this.getClaim(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    private <T> T getClaim(String token, Function<Claims, T> function){
        Claims claims = getAllClaims(token);
        return function.apply(claims);
    }

    private Claims getAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(this.getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    private Map<String, String> generateJwt(Customers customers) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + 60 * 60 * 1000;

        final Map<String, Object> claims = Map.of(
                "id", customers.getId(),
                "role", customers.getRole() // Inclure le rôle de l'utilisateur
        );
        final String bearer = Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(customers.getUsername())
                .addClaims(claims) // Utiliser addClaims() pour inclure les revendications
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
        return Map.of(BEARER, bearer);
    }
    private Key getKey() {
        final byte[] decoder = Decoders.BASE64.decode(ENCRYPTION_KEY);
        return Keys.hmacShaKeyFor(decoder);
    }

    public void disconnectCustomer() {
        Customers customer = (Customers) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Jwt jwt = this.jwtRepository.findCustomerValidToken(customer.getUsername(), false, false)
                .orElseThrow(()-> new RuntimeException("Le token est invalide"));
        jwt.setExpire(true);
        jwt.setDesactive(true);
        this.jwtRepository.save(jwt);
    }

    @Scheduled(cron = "@daily")
    //@Scheduled(cron = "0 */1 * * * *")
    public void removeUselessJwt(){
        log.info("suppression des token à {}", Instant.now());
        this.jwtRepository.deleteAllByExpireAndDesactive(true, true);
    }
}

