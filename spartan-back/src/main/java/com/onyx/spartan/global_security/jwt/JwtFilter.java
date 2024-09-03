package com.onyx.spartan.global_security.jwt;

import com.onyx.spartan.customer.CustomersService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service

public class JwtFilter extends OncePerRequestFilter {

    private CustomersService customersService;
    private JwtService jwtService;

    public JwtFilter(CustomersService customersService, JwtService jwtService) {
        this.customersService = customersService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = null;
        Jwt tokenInDatabase = null;
        String username = null;
        boolean isTokenExpired = true;

        // Extraire le JWT du cookie
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("JWT_TOKEN".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token != null) {
            tokenInDatabase = this.jwtService.tokenByValue(token);
            isTokenExpired = jwtService.isTokenExpired(token);
            username = jwtService.readUsername(token);
        }

        if (!isTokenExpired
                && tokenInDatabase.getCustomers().getEmail().equals(username)
                && SecurityContextHolder.getContext().getAuthentication() == null
        ) {
            UserDetails userDetails = customersService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response);
    }

}