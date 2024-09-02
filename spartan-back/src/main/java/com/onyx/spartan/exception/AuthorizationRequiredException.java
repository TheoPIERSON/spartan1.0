package com.onyx.spartan.exception;

public class AuthorizationRequiredException extends RuntimeException {
    private final String authorizationUrl;

    public AuthorizationRequiredException(String authorizationUrl) {
        super("Authorization required: " + authorizationUrl);
        this.authorizationUrl = authorizationUrl;
    }

    public String getAuthorizationUrl() {
        return authorizationUrl;
    }
}

