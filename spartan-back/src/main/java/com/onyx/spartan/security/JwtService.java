package com.onyx.spartan.security;

import com.onyx.spartan.user.Users;
import com.onyx.spartan.user.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Slf4j
@AllArgsConstructor
@Service
public class JwtService {
    private final String ENCRYPTION_KEY = "3+2jJx5Hqrj4JRe4EJWFXX86BHyWFAOw9Olu6x/OfKYsrcbonnLTO8B5XDBaXXqP";
    private UserService userService;
    public Map<String, String> generate(String username){
        Users users = (Users) this.userService.loadUserByUsername(username);
        return this.generateJwt(users);
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
    private Map<String, String> generateJwt(Users users) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + 60 * 60 * 1000;

        final Map<String, Object> claims = Map.of(
                "id", users.getId(),
                "role", users.getRole() // Inclure le rôle de l'utilisateur
        );
        final String bearer = Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(users.getEmail())
                .addClaims(claims) // Utiliser addClaims() pour inclure les revendications
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
        return Map.of("Bearer", bearer);
    }



    private Key getKey() {
        final byte[] decoder = Decoders.BASE64.decode(ENCRYPTION_KEY);
        return Keys.hmacShaKeyFor(decoder);
    }
}

