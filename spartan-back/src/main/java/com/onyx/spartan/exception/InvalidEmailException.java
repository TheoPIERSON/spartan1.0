package com.onyx.spartan.exception;

public class InvalidEmailException {
    private final String message;

    public InvalidEmailException(String email) {
        this.message = "This email : " + email + " is not valid";
    }

    // Getters and other methods for accessing the message
}
