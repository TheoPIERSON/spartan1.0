package com.onyx.spartan.global_security.jwt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.stream.Stream;

public interface JwtRepository extends JpaRepository<Jwt, Integer> {
    Optional<Jwt> findByValueAndDesactiveAndExpire(String value, boolean desactive, boolean expire);
    @Query("FROM Jwt j WHERE j.expire = :expire AND j.desactive = :desactive AND j.customers.email = :email")
    Optional<Jwt> findCustomerValidToken(String email, boolean desactive, boolean expire);

    @Query("FROM Jwt j WHERE j.customers.email = :email")
    Stream<Jwt> findCustomer(String email);

    void deleteAllByExpireAndDesactive(boolean expire, boolean desactive);
}
