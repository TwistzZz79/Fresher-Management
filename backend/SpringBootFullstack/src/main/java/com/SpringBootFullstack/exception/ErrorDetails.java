package com.SpringBootFullstack.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ErrorDetails {
    private int statusCode;
    private String message;
    private String details;

    public ErrorDetails(int statusCode, String message, String details) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
    }


}
