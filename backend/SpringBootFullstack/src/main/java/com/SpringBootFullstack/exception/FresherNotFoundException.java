package com.SpringBootFullstack.exception;

import com.SpringBootFullstack.dto.FresherDTO;

public class FresherNotFoundException extends RuntimeException{
    public FresherNotFoundException(String message){
        super(message);
    }
}
