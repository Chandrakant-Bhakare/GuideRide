package com.guideride.app.model;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
    private final String message;
    private final int status;

    private ErrorResponse(String message, HttpStatus status) {
        this.message = message;
        this.status = status.value();
    }

    public static ErrorResponse of(String message, HttpStatus status) {
        return new ErrorResponse(message, status);
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }
}
